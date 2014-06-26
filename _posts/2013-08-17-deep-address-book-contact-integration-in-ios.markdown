---
layout: post
title: Deep Address Book Contact integration in iOS
slug: deep-address-book-contact-integration-in-ios
date: 2013-08-17 13:39 +02:00
categories:
- iOS
tags:
- iOS
- Design pattern
meta: Find the best pattern design to optimize the integration of contacts from the iOS Address Book.
published: false
---

We will dive into a real world Address Book integration, the one I've used in the brand new version of [FriendCash 3](http://friendcashapp.com) (available soon).

## What to store ?

### Reference to the ABRecordID

**Good**
> Record identifiers can be safely passed between threads

** Bad **
> They are not guaranteed to remain the same across devices.

So a good way to maintain a robust reference is to follow this idea [Property checking][abrecordid--stackoverflow].

### Respect user data privacy

> Treat user data like if anything was a password

That's a little too much I agree, but it gives the tone!
We can't store phone numbers, email and maybe upload all of that to our servers, that's against the user willing and a very bad pattern if you do so, really be ashame !

There is plenty of ways to protect user data and still have a solution to compare emails, in fact that really close to the way we manage user password. Don't know the exact data but be able to compare values. 

> So why not just hash the values ? 

David Smith had developped this idea to [hash user sensitive data][hashed-contacts--blog] some time ago.


[abrecordid--apple-doc]: http://developer.apple.com/library/ios/documentation/ContactData/Conceptual/AddressBookProgrammingGuideforiPhone/Chapters/DirectInteraction.html#//apple_ref/doc/uid/TP40007744-CH6-SW2
[abrecordid--stackoverflow]: http://stackoverflow.com/a/14816704/1886070
[hashed-contacts--github]: https://github.com/crossforward/HashedContacts
[hashed-contacts--blog]: http://david-smith.org/blog/2012/02/15/hashcontacts-ios-address-book-wrapper/