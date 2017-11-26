---
layout: post
title: Run Kiwi tests from the command line with XCode 4.6
slug: run-kiwi-tests-from-command-line
date: 2013-04-22 17:09:00
categories:
- iOS
tags:
- iOS
- Tips & Tricks
meta: Running your tests from command line is the first step to make continuous integration on your Xcode projects.
published: true
---

> *Just finished this article when Apple has released a major update, I've named XCode 5.0, so soon an updated article on how to achieve the same task under the new version of Xcode !*

At first, I made some research on my favorite search engine, unfortunately none of the resources I found talked about running test suits for a project that was using CocoaPods.

The first article very interesting &ndash; but outdated &ndash; is [Running OCUnit & Kiwi Tests on the Command Line](http://www.stewgleadow.com/blog/2012/02/09/running-ocunit-and-kiwi-tests-on-the-command-line/) by Stewart Gleadow. It helped me a lot to understand where to look, but since his article XCode has been updated and the private script that he was hacking has been changed&hellip; that is no longer a viable solution.

That's why I thought about writing a new fresh article.

## Configure your XCode schemes

First duplicate your main scheme. And let's call this duplicated scheme `CommandLineUnitTests`.

You need to activate the `Run` checkbox for the `CommandLineUnitTests` scheme
<img src="{{ '/images/activate-run-tests.png' | prepend:site.baseurl }}">

Here is a `Makefile` that you can use. It takes care of various things : 

{% highlight make %}
test:
    osascript -e 'tell app "iPhone Simulator" to quit'
    xcodebuild -workspace Example/Example.xcworkspace -scheme CommandLineUnitTests -sdk iphonesimulator6.1 -configuration Debug ONLY_ACTIVE_ARCH=NO TEST_AFTER_BUILD=YES RUN_APPLICATION_TESTS_WITH_IOS_SIM=YES

{% endhighlight %}

* first thing to do is to shutdown the iPhone simulator, otherwise it can fail
* `ONLY_ACTIVE_ARCH` tells Xcode to build for all architectures and not only for the one active
* `TEST_AFTER_BUILD` no need to tell you about this one I guess
* `RUN_APPLICATION_TESTS_WITH_IOS_SIM` pretty straight forward too

## Real world example

I've integrate the whole thing into a project of mine, [DPMeterView][dp-meter-view--github] hosted on [GitHub][github], and the project is integrated with [Travis Continuition Integration][travis] servers. Learn more on how to [integrate Travis-CI][objective-c--travis] in your open source iOS project, to build stronger libraries!


[dp-meter-view--github]: https://github.com/dulacp/DPMeterView
[github]: https://github.com/
[travis]: https://travis-ci.org/
[objective-c--travis]: http://about.travis-ci.org/docs/user/languages/objective-c/