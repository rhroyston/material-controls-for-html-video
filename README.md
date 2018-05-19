# Material Controls for HTML5 Video
### Synopsis

JavaScript programatically wraps all native HTML5 `video` elements with `class="htt-mvp"` with custom Google Material Design controls. 
Wrap means that Material Design Scalable Vector Graphics, SVG, icons and Google's Material Components Web, MDC-Web, library are programatically created and attached in the browser. 
Small CSS file accompanies the script. All CSS classes are prepended with `htt-mvp` so as to avoid collisions. 
The JavaScript is encapsulated in an immediately-invoked function expression, IIFE. 

CREDITS: 
 - This project took direction from Mozilla Developer Network, MDN's, article [Creating a cross-browser video player](//developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/cross_browser_video_player).
 - Google's [Material Components Web](https://github.com/material-components/material-components-web), MDC-Web Library

### Code Example

Live example at [//hightechtele.com/articles/material-controls-for-html-video](//hightechtele.com/articles/material-controls-for-html-video).

<img src="https://github.com/rhroyston/rhroyston.github.io/blob/master/gm.jpg" alt="screenshot">

### Motivation

Automate Material Design custom controls for HTML5 video elements.

### Installation

 - Add the `htt-mvp` class to all video elements that you want the script to customize with Material Design controls. Do not add the `htt-mvp` class to any other elements.
 - Include the CSS and JavaScript. NOTE, you need to also include Google's Material Components Web, MDC-We, CSS and JavaScript as well as Google's Roboto font. 

:pushpin: A May 2018 snapshot of Google's MDC-Web, is included in this repository as MDC-Web remains in alpha and breaking changes occur. 
Use the latest MDC-Web package and if you experience issues, simply roll back and include the MDC-Web snapshot from May 2018 included in this repository. 

Styling of the video size and layout is left up to you as this package only modifies video controls. 
A bare bones HTML example file would look something like: 

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <title>My MDC-Web Styled Web Video</title> 
    <link rel="stylesheet" href="mdc-web-05-18-2018.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:100,300,400,700,900">
    <link rel="stylesheet" href="mvp-css.min.css">
    <style>
         /*unrelated CSS to style the layout of the page*/
        html , body {
            height:100%;
        }
        main {
            height:100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-content: center;
            align-items: center;
        }
        @media screen and (max-width: 879px) {
            video {
                max-width: 100%;
            }
            .main-flex > * {
                max-width: 100%;
            }
        }
        @media screen and (min-width: 880px) {
            video {
                max-width: 800px;
            }
            .main-flex > * {
                max-width: 1200px;
            }
        }
    </style>
</head>
<body>
    <main class="main-flex">
        <video class="htt-mvp" controls preload="metadata" poster="//example.com/vid1-poster.jpg">
            <source src="//example.com/vid1.webm" type="video/webm">
            <source src="//example.com/vid1.mp4" type="video/mp4">
            <a href="//example.com/vid1.mp4">Download MP4</a>
        </video>
        <video class="htt-mvp" controls preload="metadata" poster="//example.com/vid2-poster.jpg">
            <source src="//example.com/vid2.webm" type="video/webm">
            <source src="//example.com/vid2.mp4" type="video/mp4">
            <a href="//example.com/vid2.mp4">Download MP4</a>
        </video>
    </main>
        
    <script src="mdc-web-05-18-2018.min.js"></script>
    <script src="mvp-script.min.js"></script>
<body>
```

### API Reference

Add the `htt-mvp` class to any video element that you want the script to customize with Material Design controls.

### Contribute

If you found a bug, have any questions or want to contribute please let me know, ron@hightechtele.com.

### License

Ron Royston, [//hightechtele.com](https://hightechtele.com), [MIT License](https://en.wikipedia.org/wiki/MIT_License)