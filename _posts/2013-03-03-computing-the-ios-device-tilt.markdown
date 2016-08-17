---
layout: post
title: Computing the iOS device tilt
date: 2013-03-03 12:23 +01:00
categories:
- iOS
tags:
- iOS
- Mathematics
meta: Use quaternion mathematic properties to efficiently and easily compute the tilt of an iPhone.
published: true
---

The tilt of a device is probably the most useful information you can get from the acceleration data of your iPhone, iPad or iPod touch. Besides, a lot of games are using it. The question is, **how to get this tilt value ?**

## First thought

I've looked into the [Core Motion documention][core-motion--doc] and found out that Apple is computing some values for us, which is available within a `CMAttitude` class instance.

> An instance of the CMAttitude class represents a measurement of the device’s attitude at a point in time.
>
> <cite>[CMAttitude reference][cmattitude--doc]</cite>

Well, Apple isn't talking about a [ballerina attitude][ballerina--img] but more of a [flight-type attitude][flight-dynamics--wiki]. Indeed, the iPhone orientation can be described just like an airplane by its `roll`, `pitch` and `yaw`.

<img src="{{ '/images/iphone-attitude.png' | prepend:site.baseurl }}">

And you have guessed, the `yaw` value is the rotation against the red axis. It seems pretty straight forward so let's implement that.

{% highlight objc %}
- (void)viewDidLoad {
    [super viewDidLoad];

    self.motionManager = [[CMMotionManager alloc] init];
    self.motionManager.deviceMotionUpdateInterval = 0.02;  // 50 Hz

    self.motionDisplayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(motionRefresh:)];
    [self.motionDisplayLink addToRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];

    if ([self.motionManager isDeviceMotionAvailable]) {
        // to avoid using more CPU than necessary we use `CMAttitudeReferenceFrameXArbitraryZVertical`
        [self.motionManager startDeviceMotionUpdatesUsingReferenceFrame:CMAttitudeReferenceFrameXArbitraryZVertical];
    }
}

- (void)motionRefresh:(id)sender {
    double yaw = self.motionManager.deviceMotion.attitude.yaw;

    // use the yaw value
    // ...
}
{% endhighlight %}

And I thought *"easy, problem solved"*. In fact, it was terrible and unusable because the `yaw` value was impacted by the iPhone `roll` and `pitch`. I mean, if we keep the iPhone vertical and twist it against the *blue axis*, it will modify the `yaw`&hellip; **Bad!**

<small>Check out the [gimbal lock][gimbal-lock--wiki] problem if you want to understand more about it.</small>

So back to square one, I had to find a way to compute the `yaw` by myself and I felt that math may rescue me!

## The beauty of Quaternions

**If you don't know what a quaternion is yet, please don't freak out by this strange word that seems coming right out of Star Trek.**

> Quaternions were first described by Hamilton in 1843 and applied to mechanics in three-dimensional space.
>
> <cite>[Wikipedia][quaternion--wiki]</cite>

It eases the way we deal with the orientation of a *body* in a 3D space, and is better suited than the [Euler angles][euler-angles--wiki] that Apple is computing for us because of three reasons :

* it's easier to compose rotations or to extract values from it.
* it avoids the [gimbal lock][gimbal-lock--wiki] problem.
* and Apple provides a quaternion in the `CMAttitude` class instance.

And because we only want to compute the `yaw` we do not have to worry about the [gimbal lock][gimbal-lock--wiki] problem, since our goal is not to describe the complete iPhone orientation in the 3D space but only the tilt of it.

There is a very simple formula to [compute `yaw` from a quaternion][quaternion-to-yaw--wiki] :

$$
\begin{equation}
q = \begin{bmatrix}q_{0} & q_1 & q_2 & q_3\end{bmatrix}
\end{equation}
$$

$$
\begin{equation}
\phi = \arcsin( 2 (q_0 q_2 - q_1 q_3 ))
\end{equation}
$$

So, the `motionRefresh:` method described above become :

{% highlight objc %}
- (void)motionRefresh:(id)sender {
    CMQuaternion quat = self.motionManager.deviceMotion.attitude.quaternion;
    double yaw = asin(2*(quat.x*quat.z - quat.w*quat.y));

    // use the yaw value
    // ...
}
{% endhighlight %}

## The icing on the cake

We can improve the code a bit to have a perfectly smooth `yaw` signal, or to have some kind of internia in the tilt movement (just like I needed in my [DPMeterView][dp-meter-view--github] project).

In order to do that, we need a very simple one dimensional [Kalman-filter][kalman-filter--wiki]. I'm not discussing the details of how it works because it's not the purpose of the article. However, you can experiment by yourself the impact of changing some of those values.

{% highlight objc %}
- (void)motionRefresh:(id)sender {
    CMQuaternion quat = self.motionManager.deviceMotion.attitude.quaternion;
    double yaw = asin(2*(quat.x*quat.z - quat.w*quat.y));

    if (self.motionLastYaw == 0) {
        self.motionLastYaw = yaw;
    }

    // kalman filtering
    static float q = 0.1;   // process noise
    static float r = 0.1;   // sensor noise
    static float p = 0.1;   // estimated error
    static float k = 0.5;   // kalman filter gain

    float x = self.motionLastYaw;
    p = p + q;
    k = p / (p + r);
    x = x + k*(yaw - x);
    p = (1 - k)*p;
    self.motionLastYaw = x;

    // use the x value as the "updated and smooth" yaw
    // ...
}
{% endhighlight %}

## Fork it !

<iframe src="//ghbtns.com/github-btn.html?user=dulaccc&repo=DPMeterView&type=watch&count=true&size=large"
  allowtransparency="true" frameborder="0" scrolling="0" width="152" height="30"></iframe>
<iframe src="//ghbtns.com/github-btn.html?user=dulaccc&repo=DPMeterView&type=fork&count=true&size=large"
  allowtransparency="true" frameborder="0" scrolling="0" width="152" height="30"></iframe>

If you have some ideas of improvement, or just want to play with a working example, don't hesitate to fork the [DPMeterView][dp-meter-view--github] project hosted on GitHub.


<small>iPhone 5 model created by [Pixeden][pixeden-source].</small>


[core-motion--doc]: http://developer.apple.com/library/ios/#documentation/CoreMotion/Reference/CoreMotion_Reference/_index.html
[cmattitude--doc]: http://developer.apple.com/library/ios/#documentation/CoreMotion/Reference/CMAttitude_Class/Reference/Reference.html

[ballerina--img]: http://favim.com/orig/201106/03/attitude-ballerina-bolshoi-ballet-dance-ekatrina-shipulina-odette-Favim.com-65534.jpg

[flight-dynamics--wiki]: http://en.wikipedia.org/wiki/Flight_dynamics
[quaternion--wiki]: http://en.wikipedia.org/wiki/Quaternion
[quaternion-to-yaw--wiki]: http://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles#Conversion
[euler-angles--wiki]: http://en.wikipedia.org/wiki/Euler_angles
[gimbal-lock--wiki]: http://en.wikipedia.org/wiki/Gimbal_lock
[kalman-filter--wiki]: http://en.wikipedia.org/wiki/Kalman_filter

[dp-meter-view--github]: https://github.com/dulaccc/DPMeterView

[pixeden-source]: http://www.pixeden.com/psd-mock-up-templates/3d-view-iphone-5-psd-vector-mockup


<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG"></script>
