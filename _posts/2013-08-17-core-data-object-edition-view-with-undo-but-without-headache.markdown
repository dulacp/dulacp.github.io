---
layout: post
title: Core Data object creation/edition view with undo capabilities but without headache
date: 2013-08-17 18:01 +02:00
categories:
- iOS
tags:
- iOS
- Design pattern
meta: Easily manage creation/edition views for Core Data objects with undo functionality
published: true
---

Never wonder again how to handle editing your `NSManagedObject` instances. This design pattern will improve your code, reduce the amount of lines to write and give you great extensibility, as long as **you do not require iOS 4 support**.

I know that an iOS 5 feature is not *fresh* news, and a lot of you guys already know this pattern very well. But I've found out that it is always treated like an "everybody-knows this" feature, and new developers might miss this one.

I'm assuming that you are already familiar with Core Data and that you know the purpose of a `NSManagedObjectContext`. If not, please read the [Core Data Tutorial for iOS][core-data-tutorial] or if you are in a hurry skip the tutorial and read the [NSManagedObjectContext reference][nsmanagedobjectcontext--apple-doc] introduction.

## Analyze the problem

We want to let the user be able to modify some properties on an `NSManagedObject` instance, but still be able at the same time to rollback these modifications.

### The solution

Nested contexts. Thank you Apple.

## Create the right context type

To use nested contexts you need to create a *child* `NSManagedObjectContext` with the right context type, otherwise changes won't be merged when you want to save.

Indeed, the `NSManagedObjectContext` instance can be initialized with a concurrency type, see the [`initWithConcurrencyType:`][nsmanagedobjectcontext-concurrency-method--apple-doc] method.

There is three type available to us

- *NSConfinementConcurrencyType* (default)
- *NSPrivateQueueConcurrencyType*
- *NSMainQueueConcurrencyType*

> Which one to choose ?

**NSConfinementConcurrencyType**  
It can **only** be used within the thread where it has been created. It seems good enough for our case, and is the default type by the way, but it won't work because :

> **NB** if you want to use a context as a nested context you need a "queue context". So <del>*NSConfinementConcurrencyType*</del> is not enough.

**NSPrivateQueueConcurrencyType**  
Very good for performance optimization when you need to perform some work on data, it uses a private queue and you need to use `performBlock:` or `performBlockAndWait:` to run some code inside the so called private queue. For the record, that's what project like [RestKit][restkit--github] or [AFIncrementalStore][afincrementalstore--github] are using behind the scene.

**NSMainQueueConcurrencyType**  
As the type name implies, this context would be associated to the main dispatch queue (and not a private queue as seen previously). So this is perfect if your managed object properties are used in some UI elements&hellip; which is our case !

Now we know how to intialize our child managed object context :

{% highlight objective-c %}
#import "MSAEventEditionViewController.h"

@implementation MSAEventEditionViewController

- (id)initWithCoder:(NSCoder *)aDecoder
{
    self = [super initWithCoder:aDecoder];
    if (!self) {
        return nil;
    }

    NSManagedObjectContext *childContext = [[NSManagedObjectContext alloc] initWithConcurrencyType:NSMainQueueConcurrencyType];
    childContext.parentContext = [NSManagedObjectContext defaultContext];
    
    return self;
}

//...
{% endhighlight %}

## Pass objects between different contexts

If you ever tried to pass a `NSManagedObject` instance between two different contexts it will raise a `NSInvalidArgumentException` exception.

Instead of `NSManagedObject` instances you need to pass a `NSManagedObjectID` instance, and only then fetch the object in the other context.

**MSAEventEditionViewController.m**

{% highlight objective-c %}
#import "MSAEventEditionViewController.h"
#import "Event.h"

@interface MSAEventEditionViewController ()
@property (strong, nonatomic) Event *event;
@end

@implementation MSAEventEditionViewController

- (void)loadEvent:(Event *)event 
{
    // fetch the event from the child context
    self.event = (Event *)[self.childContext objectWithID:event.objectID];
}
//...
{% endhighlight %}

## To undo or not to undo

The undo part is so simple, you just need to throw the context away because it encapsulates all the changes that had been made.

When you want to save, just invoke the `save:` method of the child context, and it will propagate the changes up to the parent context. The way the properties that will be merged, will depend on the parent context `mergePolicy` property. You can find the detail of each merging policy in the [NSManagedObjectContext reference][nsmanagedobjectcontext-merge-policies--apple-doc]. 

> However, the most widely used merge policy is *NSMergeByPropertyStoreTrumpMergePolicy*.

{% highlight objective-c %}
- (void)saveChanges {
    NSError *error = nil;
    BOOL success = [self.childContext save:&error];
    if (!success) {
        NSLog(@"Error when saving event: %@", error);
        [SVProgressHUD showErrorWithStatus:error.localizedDescription];
    }
}
{% endhighlight %}

> **Tips** I've taken the good habit of writing a small display error message code along with the usual `NSLog` line. This is a good behavior because we usually tend to say "I will come back later to handle properly the error", but we never came back! Right?  
So why not write this one line of code that will not handle anything but at least let the user know that an error has occurred. And to do that I'm using the excellent [SVProgressHUD][svprogresshud--github] project by [Sam Vermette][sam-vermette--twitter].

## Conclusion

So now you have all the pieces to make a great creation/edition view with save and cancel functionalities, and with so little code that you will feel light and full of joy!

[core-data-tutorial]: http://developer.apple.com/library/ios/documentation/DataManagement/Conceptual/iPhoneCoreData01/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008305-CH1-SW1
[nsmanagedobjectcontext--apple-doc]: http://developer.apple.com/library/ios/documentation/Cocoa/Reference/CoreDataFramework/Classes/NSManagedObjectContext_Class/NSManagedObjectContext.html#//apple_ref/occ/cl/NSManagedObjectContext
[nsmanagedobjectcontext-concurrency--apple-doc]: http://developer.apple.com/library/ios/documentation/Cocoa/Reference/CoreDataFramework/Classes/NSManagedObjectContext_Class/NSManagedObjectContext.html#//apple_ref/doc/uid/TP30001182-SW39
[nsmanagedobjectcontext-concurrency-method--apple-doc]: http://developer.apple.com/library/ios/documentation/Cocoa/Reference/CoreDataFramework/Classes/NSManagedObjectContext_Class/NSManagedObjectContext.html#//apple_ref/occ/instm/NSManagedObjectContext/initWithConcurrencyType:
[nsmanagedobjectcontext-merge-policies--apple-doc]: http://developer.apple.com/library/ios/documentation/CoreData/Reference/NSMergePolicy_Class/Reference/Reference.html#//apple_ref/doc/uid/TP40010614-CH1-SW1

[restkit--github]: https://github.com/RestKit/RestKit
[afincrementalstore--github]: https://github.com/AFNetworking/AFIncrementalStore
[svprogresshud--github]: https://github.com/samvermette/SVProgressHUD

[sam-vermette--twitter]: https://twitter.com/samvermette

[double-rainbow-guy--youtube]: http://www.youtube.com/watch?v=OQSNhk5ICTI