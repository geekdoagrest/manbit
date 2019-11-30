# Repaint, Reflow and Layout Thrashing - Performance Beyond Loading

In this article we will talk about rendering and best practices in DOM manipulation :)

The web has changed a lot in the last few years, we now have more and more access through mobile devices and more and more users expect our pages to be simple and interactive. There are several services running in parallel, dynamic features like embedded video or audio players, so it's essential to dedicate our rendering performance time and avoid Layout Thrashing.

Layout Thrashing is a rendering failure that occurs when javascript reads or writes to the DOM multiple times, causing page reflow (crashing), when we change some property of a DIV for example the browser invalidates the layout and has to recalculate the entire page's layout, but it waits for the next frame to reflow. If at this interval we do some reading in the DOM the browser is forced to recalculate the layout first, which is known as forced synchronous layout, causing crashes and performance breaks.

Most devices currently update screens 60 times per second, which means the browser has to deliver a new frame every 16ms. During such time the browser has to do all the DOM writing, readings and redraw the layout and if you have any script delaying this process we have a 60fps rate break and a layout thrashing case.

Having understood the whole process, I now give you the good news, there are several tools that take care of controlling all this flow, among them my favorite FastDOM:) -

You can install from NPM:> $ npm install fastdom –save

The use is very simple as in the example bellow:

```javascript
fastdom.read(function() { // here you do the readings in DOM
    var h1 = element1.clientHeight;
    fastdom.write(function() { //now the writing
        element1.style.height = (h1 * 2) + 'px';
    });
});
```
*The hard way*

The window.requestAnimationFrame () method tells the browser that you want to make a change to the DOM and asks the browser to call a specific function to update an animation frame before the next repaint, so we can schedule it to change only on the next frame.

In practice the implementation is very simple:  do all the necessary calculations first to only then schedule the change in the DOM. Ex:

```javascript
var start = null;
var element = document.getElementById("ElementYouWantToAnimate");
element.style.position = 'absolute';

function frame(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;  
  element.style.left = Math.min(progress/10, 200) + "px";//enables the change in DOM
  if (progress < 2000) {
    window.requestAnimationFrame(frame);//schedule next change
  }
}

//start first change
window.requestAnimationFrame(frame);
```
In the old days we only had time methods like setInterval, but setTimeOut wasn't the best way to do that.

## Conclusion
Nowadays we have more and more devices accessing the web, and often with low memory resources, we should always be concerned with rendering performance and ensuring the best possible performance on all devices, even at the price of a short learning curve. use of a higher percentage of code.