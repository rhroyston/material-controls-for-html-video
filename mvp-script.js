/*!
 Material Video Player for HTML5
 Copyright (c) 2018 High Tech Telecom, LLC
 License: MIT
*/
(function() {
    var doc = document;
    var bufferLengthDetector;
    var linearProgressObjects = [];
    var multimediaElements;
    var parent;
    var videoPercent;
    var wrapper;
    var fullScreenEnabled = !!(
        doc.fullscreenEnabled || 
        doc.mozFullScreenEnabled || 
        doc.msFullscreenEnabled || 
        doc.webkitSupportsFullscreen || 
        doc.webkitFullscreenEnabled || 
        doc.createElement('video').webkitRequestFullScreen);
    var elCustomMediaControls;
    var elProgressBar;
    var elProgressBuffer;
    var elPrimaryProgress;
    var elPrimarySpan;
    var elSecondaryProgress;
    var elSecondarySpan;
    var elCustomContainer;
    var elLeftControls;
    var elPlayPauseButton;
    var elPlayButton;
    var elPlayButtonPath1;
    var elPlayButtonPath2;
    var elPauseButton;
    var elPauseButtonPath1;
    var elPauseButtonPath2;
    var elStopButton;
    var stopButtonSvg;            
    var elStopButtonPath1;
    var elStopButtonPath2;
    var elVolumeControls;
    var elMuteButton;
    var elVolumeOnSvg;
    var elVolumeOnSvgPath1;
    var elVolumeOnSvgPath2;
    var elVolumeOffSvg;
    var elVolumeOffSvgPath1;
    var elVolumeOffSvgPath2;
    var elSliderContainer;
    var elSlider;
    var sliderObj;
    var elTrackContainer;
    var elTrack;
    var elThumbContainer;
    var svgThumb;
    var elCircle;
    var elTimerContainer;
    var elP;
    var elCurrent;
    var elTotal;
    var elRightControls;
    var elDownloadButton;
    var svgDownload;
    var downloadSvgPath1;
    var downloadSvgPath2;
    var elFsButton;
    var svgFs;
    var fsSvgPath1;
    var fsSvgPath2;
    var svgPlay;
    var playSvgPath1;
    var playSvgPath2;
    
    var isFullScreen = function() {
      return !!(doc.fullScreen || doc.webkitIsFullScreen || doc.mozFullScreen || doc.msFullscreenElement || doc.fullscreenElement);
    };
    
    var setFullscreenData = function(state,el) {
        el.setAttribute('data-fullscreen', !!state);
    };
    
    doc.addEventListener('fullscreenchange', function(e) {
      setFullscreenData(!!(doc.fullScreen || doc.fullscreenElement));
    });
    doc.addEventListener('webkitfullscreenchange', function() {
      setFullscreenData(!!doc.webkitIsFullScreen);
    });
    doc.addEventListener('mozfullscreenchange', function() {
      setFullscreenData(!!doc.mozFullScreen);
    });
    doc.addEventListener('msfullscreenchange', function() {
      setFullscreenData(!!doc.msFullscreenElement);
    });            
    
    multimediaElements = doc.querySelectorAll(".htt-mvp");
    
    for (var i = 0; i < multimediaElements.length; i++) {
        var tn = multimediaElements[i].tagName.toLowerCase();
        if(tn !== "video"){
            console.log("ERROR: htt-mvp class only allowed on video elements!");
            return;
        }
        multimediaElements[i].controls = false;
        
        parent = multimediaElements[i].parentNode;
        wrapper = doc.createElement("figure");
        wrapper.classList.add("htt-mvp-media-container", "mdc-typography");
        parent.replaceChild(wrapper, multimediaElements[i]);
        wrapper.appendChild(multimediaElements[i]);
        
        elCustomMediaControls = doc.createElement("div");
        elCustomMediaControls.classList.add("htt-mvp-custom-media-controls","htt-mvp-hidden");
        
        elProgressBar = doc.createElement("div");
        elProgressBar.setAttribute("role","progressbar");
        elProgressBar.classList.add("mdc-linear-progress","htt-mvp-media-progress-bar");
        elProgressBar.dataset.buffer = "true";
        elProgressBuffer = doc.createElement("div");
        elProgressBuffer.classList.add("mdc-linear-progress__buffer");
        
        elPrimaryProgress = doc.createElement("div");
        elPrimaryProgress.classList.add("mdc-linear-progress__bar","mdc-linear-progress__primary-bar");
        
        elPrimarySpan = doc.createElement("span");
        elPrimarySpan.classList.add("mdc-linear-progress__bar-inner");
        elPrimaryProgress.appendChild(elPrimarySpan);
        
        elSecondaryProgress = doc.createElement("div");
        elSecondaryProgress.classList.add("mdc-linear-progress__bar","mdc-linear-progress__secondary-bar");
        
        elSecondarySpan = doc.createElement("span");
        elSecondarySpan.classList.add("mdc-linear-progress__bar-inner");
        elSecondarySpan.appendChild(elSecondaryProgress);
        
        elProgressBar.appendChild(elProgressBuffer);
        elProgressBar.appendChild(elPrimaryProgress);
        elProgressBar.appendChild(elSecondaryProgress);
        
        elCustomContainer = doc.createElement("div");
        elCustomContainer.classList.add("htt-mvp-custom-media-controls-container");
        
        elLeftControls = doc.createElement("div");
                 
        elPlayPauseButton = doc.createElement("button");
        elPlayPauseButton.classList.add("mdc-button", "htt-mvp-custom-playpause-button","htt-mvp-mdc-button");
        
        elPlayButton = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        elPlayButton.classList.add("htt-mvp-custom-play");
        elPlayButton.setAttribute("width","24");
        elPlayButton.setAttribute("height","24");
        elPlayButton.setAttribute("viewBox","0 0 24 24");
        elPlayButton.setAttribute("fill","white");
        elPlayButton.setAttribute("pointer-events","none");
        
        elPlayButtonPath1 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elPlayButtonPath1.setAttribute("d","M8 5v14l11-7z");
        elPlayButtonPath2 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elPlayButtonPath2.setAttribute("d","M0 0h24v24H0z");
        elPlayButtonPath2.setAttribute("fill","none");
        
        elPlayButton.appendChild(elPlayButtonPath1);
        elPlayButton.appendChild(elPlayButtonPath2);
        
        elPauseButton = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        elPauseButton.classList.add("htt-mvp-custom-pause","htt-mvp-hidden");
        elPauseButton.setAttribute("width","24");
        elPauseButton.setAttribute("height","24");
        elPauseButton.setAttribute("viewBox","0 0 24 24");
        elPauseButton.setAttribute("fill","white");
        elPauseButton.setAttribute("pointer-events","none");
        
        elPauseButtonPath1 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elPauseButtonPath1.setAttribute("d","M6 19h4V5H6v14zm8-14v14h4V5h-4z");
        elPauseButtonPath2 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elPauseButtonPath2.setAttribute("d","M0 0h24v24H0z");
        elPauseButtonPath2.setAttribute("fill","none");
        
        elPauseButton.appendChild(elPauseButtonPath1);
        elPauseButton.appendChild(elPauseButtonPath2);
        
        elPlayPauseButton.appendChild(elPlayButton);
        elPlayPauseButton.appendChild(elPauseButton);
        
        elStopButton = doc.createElement("button");
        elStopButton.classList.add("mdc-button","htt-mvp-custom-stop","htt-mvp-mdc-button");
        
        stopButtonSvg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        stopButtonSvg.setAttribute("width","24");
        stopButtonSvg.setAttribute("height","24");
        stopButtonSvg.setAttribute("viewBox","0 0 24 24");
        stopButtonSvg.setAttribute("fill","white");
        stopButtonSvg.setAttribute("pointer-events","none");            
        
        elStopButtonPath1 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elStopButtonPath1.setAttribute("d","M0 0h24v24H0z");
        elStopButtonPath1.setAttribute("fill","none");
        elStopButtonPath2 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elStopButtonPath2.setAttribute("d","M6 6h12v12H6z");
        
        stopButtonSvg.appendChild(elStopButtonPath1);
        stopButtonSvg.appendChild(elStopButtonPath2);
        
        elStopButton.appendChild(stopButtonSvg);
        
        elVolumeControls = doc.createElement("div");
        elVolumeControls.classList.add("htt-mvp-volume-controls"); ////need to append stuff here
        
        elMuteButton = doc.createElement("button");
        elMuteButton.classList.add("mdc-button","custom-mute-button","htt-mvp-mdc-button");
        
        elVolumeOnSvg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        elVolumeOnSvg.classList.add("volume-on");
        elVolumeOnSvg.setAttribute("width","24");
        elVolumeOnSvg.setAttribute("height","24");
        elVolumeOnSvg.setAttribute("viewBox","0 0 24 24");
        elVolumeOnSvg.setAttribute("fill","white");
        elVolumeOnSvg.setAttribute("pointer-events","none");
        
        elVolumeOnSvgPath1 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elVolumeOnSvgPath1.setAttribute("d","M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z");
        elVolumeOnSvgPath2 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elVolumeOnSvgPath2.setAttribute("d","M0 0h24v24H0z");
        elVolumeOnSvgPath2.setAttribute("fill","none");
        
        elVolumeOnSvg.appendChild(elVolumeOnSvgPath1);
        elVolumeOnSvg.appendChild(elVolumeOnSvgPath2);
        
        elVolumeOffSvg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        elVolumeOffSvg.classList.add("volume-off","htt-mvp-hidden");
        elVolumeOffSvg.setAttribute("width","24");
        elVolumeOffSvg.setAttribute("height","24");
        elVolumeOffSvg.setAttribute("viewBox","0 0 24 24");
        elVolumeOffSvg.setAttribute("fill","white");
        elVolumeOffSvg.setAttribute("pointer-events","none");
        
        elVolumeOffSvgPath1 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elVolumeOffSvgPath1.setAttribute("d","M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z");
        elVolumeOffSvgPath2 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        elVolumeOffSvgPath2.setAttribute("d","M0 0h24v24H0z");
        elVolumeOffSvgPath2.setAttribute("fill","none");
        
        elVolumeOffSvg.appendChild(elVolumeOffSvgPath1);
        elVolumeOffSvg.appendChild(elVolumeOffSvgPath2);
        
        elMuteButton.appendChild(elVolumeOnSvg);
        elMuteButton.appendChild(elVolumeOffSvg);

        elSliderContainer = doc.createElement("div");
        elSliderContainer.classList.add("htt-mvp-vol-slider-container");
        
        elSlider = doc.createElement("div");
        elSlider.classList.add("mdc-slider","htt-mvp-mdc-slider","vol-slider");
        elSlider.setAttribute("tabindex","0");
        elSlider.setAttribute("role","slider");
        elSlider.setAttribute("aria-valuemin","0");
        elSlider.setAttribute("aria-valuemax","10");
        elSlider.setAttribute("aria-valuenow","10");
        elSlider.setAttribute("aria-label","Select Value");
        
        elSliderContainer.appendChild(elSlider);
        
        elTrackContainer = doc.createElement("div");
        elTrackContainer.classList.add("mdc-slider__track-container","htt-mvp-mdc-slider__track-container");
        
        elTrack = doc.createElement("div");
        elTrack.classList.add("mdc-slider__track");
        elTrackContainer.appendChild(elTrack);
        
        elThumbContainer = doc.createElement("div");
        elThumbContainer.classList.add("mdc-slider__thumb-container");
        
        svgThumb = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgThumb.classList.add("mdc-slider__thumb");
        svgThumb.setAttribute("width","21");
        svgThumb.setAttribute("height","21");
        
        elCircle = doc.createElementNS("http://www.w3.org/2000/svg", "circle");
        elCircle.setAttribute("cx","10.5");
        elCircle.setAttribute("cy","10.5");
        elCircle.setAttribute("r","7.875");
        svgThumb.appendChild(elCircle);
        elThumbContainer.appendChild(svgThumb);
        elSlider.appendChild(elTrackContainer);
        elSlider.appendChild(elThumbContainer);
        
        elVolumeControls.appendChild(elMuteButton);
        elVolumeControls.appendChild(elSliderContainer);
        
        elTimerContainer = doc.createElement("div");
        elTimerContainer.classList.add("htt-mvp-media-timer-container");
        elP = doc.createElement("p");
        elP.classList.add("mdc-typography--body2");
        elCurrent = doc.createElement("span");
        elCurrent.classList.add("current-time","special-font");
        elCurrent.appendChild(doc.createTextNode("00:00"));
        elTotal = doc.createElement("span");
        elTotal.classList.add("total-time","special-font");
        elTotal.appendChild(doc.createTextNode("00:00"));
        elP.appendChild(elCurrent);
        elP.appendChild(doc.createTextNode(" / "));
        elP.appendChild(elTotal);
        elTimerContainer.appendChild(elP);
        
        elLeftControls.appendChild(elPlayPauseButton);
        elLeftControls.appendChild(elStopButton);
        elLeftControls.appendChild(elMuteButton);
        elLeftControls.appendChild(elVolumeControls);
        elLeftControls.appendChild(elTimerContainer);
        
        elRightControls = doc.createElement("div");
        
        elDownloadButton = doc.createElement("button");
        elDownloadButton.classList.add("mdc-button", "media-download-button","htt-mvp-mdc-button");
        svgDownload = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgDownload.setAttribute("width","24");
        svgDownload.setAttribute("height","24");
        svgDownload.setAttribute("viewBox","0 0 24 24");
        svgDownload.setAttribute("fill","white");
        svgDownload.setAttribute("pointer-events","none");
        
        downloadSvgPath1 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        downloadSvgPath1.setAttribute("d","M0 0h24v24H0z");
        downloadSvgPath1.setAttribute("fill","none");
        downloadSvgPath2 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        downloadSvgPath2.setAttribute("d","M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z");
        svgDownload.appendChild(downloadSvgPath1);
        svgDownload.appendChild(downloadSvgPath2);
        elDownloadButton.appendChild(svgDownload);
       
        elFsButton = doc.createElement("button");
        elFsButton.classList.add("mdc-button","media-fullscreen-button","htt-mvp-mdc-button");
        
        svgFs = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgFs.setAttribute("width","24");
        svgFs.setAttribute("height","24");
        svgFs.setAttribute("viewBox","0 0 24 24");
        svgFs.setAttribute("fill","white");
        svgFs.setAttribute("pointer-events","none");
        
        fsSvgPath1 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        fsSvgPath1.setAttribute("d","M0 0h24v24H0z");
        fsSvgPath1.setAttribute("fill","none");
        fsSvgPath2 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        fsSvgPath2.setAttribute("d","M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z");
        svgFs.appendChild(fsSvgPath1);
        svgFs.appendChild(fsSvgPath2);
        elFsButton.appendChild(svgFs);
            
        elPlayButton = doc.createElement("div");
        elPlayButton.classList.add("play-icon");
        svgPlay = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgPlay.classList.add("htt-mvp-play-svg");
        svgPlay.setAttribute("width","96");
        svgPlay.setAttribute("height","96");
        svgPlay.setAttribute("viewBox","0 0 24 24");
        svgPlay.setAttribute("fill","#eeeeee");
        svgPlay.setAttribute("pointer-events","none");
        
        playSvgPath1 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        playSvgPath1.setAttribute("d","M0 0h24v24H0z");
        playSvgPath1.setAttribute("fill","none");
        playSvgPath2 = doc.createElementNS("http://www.w3.org/2000/svg", "path");
        playSvgPath2.setAttribute("d","M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z");
        svgPlay.appendChild(playSvgPath1);
        svgPlay.appendChild(playSvgPath2);
        elPlayButton.appendChild(svgPlay);
        elRightControls.appendChild(elDownloadButton);
        elRightControls.appendChild(elFsButton); 
        
        elCustomMediaControls.appendChild(elProgressBar);
        elCustomMediaControls.appendChild(elCustomContainer);
            
        elCustomContainer.appendChild(elLeftControls);
        elCustomContainer.appendChild(elRightControls);
        
        wrapper.appendChild(elCustomMediaControls);
        wrapper.appendChild(elPlayButton);
    }
    
    var mediaDownloadButtons = doc.querySelectorAll(".media-download-button");
    var mediaFullscreenButtons = doc.querySelectorAll(".media-fullscreen-button");
    var mdc = window.mdc;
    var muteButtons = doc.querySelectorAll(".custom-mute-button");
    var playpauseButtons = doc.querySelectorAll(".htt-mvp-custom-playpause-button");
    var playIcons = doc.querySelectorAll(".play-icon");
    var mediaProgressBars = doc.querySelectorAll(".htt-mvp-media-progress-bar");
    var sliderElements = doc.querySelectorAll(".vol-slider");
    var stopButtons = doc.querySelectorAll(".htt-mvp-custom-stop");
    var supportsVideo = !!doc.createElement("video").canPlayType;
    var mediaContainers = doc.querySelectorAll(".htt-mvp-media-container");
    var customMediaControls = doc.querySelectorAll(".htt-mvp-custom-media-controls");
    if (supportsVideo) {
        for (var i = 0; i < multimediaElements.length; i++) {
            multimediaElements[i].controls = false;
        }
        hideControls();
        
        for (var i = 0; i < customMediaControls.length; i++) {
            customMediaControls[i].classList.remove("htt-mvp-hidden");
        }                
        
        for (var i = 0; i < sliderElements.length; i++) {
            sliderObj = new mdc.slider.MDCSlider(sliderElements[i]);
            sliderObj.listen('MDCSlider:change', sliderChanged);
        }
        
        for (var i = 0; i < muteButtons.length; i++) {
            muteButtons[i].addEventListener("click", muteButtonClickHandler);
        }
        
        for (var i = 0; i < playpauseButtons.length; i++) {
            playpauseButtons[i].addEventListener("click", playpauseButtonClickHandler);
        }
        
        for (var i = 0; i < stopButtons.length; i++) {
            stopButtons[i].addEventListener("click", stopButtonClickHandler);
        }
        
        for (var i = 0; i < mediaProgressBars.length; i++) {
            linearProgressObjects[i] = new mdc.linearProgress.MDCLinearProgress(mediaProgressBars[i]);
            linearProgressObjects[i].foundation_.progress_ = 0;
            mediaProgressBars[i].addEventListener("click", progressBarClickHandler);
        }
        
        if (!fullScreenEnabled) {
            for (var i = 0; i < mediaFullscreenButtons.length; i++) {
                mediaFullscreenButtons[i].style.display = 'none';
            }
        }
        
        for (var i = 0; i < mediaFullscreenButtons.length; i++) {
            mediaFullscreenButtons[i].addEventListener("click", fullScreenButtonClickHandler);
        }
        
        for (var i = 0; i < playIcons.length; i++) {
            playIcons[i].addEventListener("click", playIconClickHandler);
        }
        
        if(multimediaElements.length > 0){
            for (var i = 0; i < multimediaElements.length; i++) {
                multimediaElements[i].addEventListener("ended", multimediaEndedHandler);
            }
            for (var i = 0; i < multimediaElements.length; i++) {
                multimediaElements[i].addEventListener("timeupdate", multimediaTimeupdateHandler);
            }
            for (var i = 0; i < multimediaElements.length; i++) {
                multimediaElements[i].addEventListener("progress", multimediaProgressHandler);
            }
            for (var i = 0; i < mediaContainers.length; i++) {
                mediaContainers[i].addEventListener("mouseenter", showControls);
            }
            for (var i = 0; i < mediaContainers.length; i++) {
                mediaContainers[i].addEventListener("mouseleave", hideControls);
            }
            for (var i = 0; i < mediaDownloadButtons.length; i++) {
                mediaDownloadButtons[i].addEventListener("click", downloadClickHandler);
            }
        }
    }
    
    function showControls(e) {
        e.target.querySelector(".htt-mvp-custom-media-controls").classList.add("htt-mvp-visible");
        e.target.querySelector(".htt-mvp-custom-media-controls").classList.remove("htt-mvp-invisible");
    }
    function hideControls(e){
        if(e){
            e.target.querySelector(".htt-mvp-custom-media-controls").classList.remove("htt-mvp-visible");
            e.target.querySelector(".htt-mvp-custom-media-controls").classList.add("htt-mvp-invisible");
        } else {
            for (var i = 0; i < customMediaControls.length; i++) {
                customMediaControls[i].classList.remove("htt-mvp-visible");
                customMediaControls[i].classList.add("htt-mvp-invisible");
            }
        }
    }
    function readBuffer(media){
        var percent = media.buffered.end(media.buffered.length - 1) / media.duration;
        var x = (getIndex(media));
        if (percent >= .9) {
            linearProgressObjects[x].buffer = 1;
            clearInterval(bufferLengthDetector);
        }
        else {
            linearProgressObjects[x].buffer = percent;
            
        }
    }
    function hhmmss(totalSeconds) {
        totalSeconds = Math.floor(totalSeconds);
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
        seconds = Math.round(seconds * 100) / 100;
        var result = (hours < 10 ? "0" + hours : hours);
        result += ":" + (minutes < 10 ? "0" + minutes : minutes);
        result += ":" + (seconds < 10 ? "0" + seconds : seconds);
        if(result.length === 8 && result.substring(0,3) === "00:"){
            return result.substr(3);
        } else {
            return result;
        }
    }
    function playIconClickHandler(e){
        var mediaContainer = container(e.target);
        var media = mediaContainer.querySelector(".htt-mvp");
        media.play();
        mediaContainer.querySelector(".htt-mvp-custom-play").classList.add("htt-mvp-hidden");
        mediaContainer.querySelector(".htt-mvp-custom-pause").classList.remove("htt-mvp-hidden");                
        mediaContainer.querySelector(".play-icon").classList.add("htt-mvp-hidden");
    }
    
    function sliderChanged(e){
        var mediaContainer = container(e.target);
        var media = mediaContainer.querySelector(".htt-mvp");
        if(!isNaN(e.detail.value)){
            media.volume = e.detail.value / 10;
        }
    }
    function muteButtonClickHandler(e){
        var mediaContainer = container(e.target);
        var media = mediaContainer.querySelector(".htt-mvp");
        media.muted = !media.muted;
        if (media.muted) {
            mediaContainer.querySelector(".volume-on").classList.add("htt-mvp-hidden");
            mediaContainer.querySelector(".volume-off").classList.remove("htt-mvp-hidden");
            mediaContainer.querySelector(".vol-slider").classList.add("htt-mvp-hidden");
        }
        else {
            mediaContainer.querySelector(".volume-on").classList.remove("htt-mvp-hidden");
            mediaContainer.querySelector(".volume-off").classList.add("htt-mvp-hidden");
            mediaContainer.querySelector(".vol-slider").classList.remove("htt-mvp-hidden");
        }
    }
    function playpauseButtonClickHandler(e){
        var mediaContainer = container(e.target);
        var media = mediaContainer.querySelector(".htt-mvp");
        if (media.paused || media.ended) {
            mediaContainer.querySelector(".htt-mvp-custom-play").classList.add("htt-mvp-hidden");
            mediaContainer.querySelector(".htt-mvp-custom-pause").classList.remove("htt-mvp-hidden");
            media.play();
        }
        else {
            mediaContainer.querySelector(".htt-mvp-custom-play").classList.remove("htt-mvp-hidden");
            mediaContainer.querySelector(".htt-mvp-custom-pause").classList.add("htt-mvp-hidden");
            media.pause();
        }                
    }
    function stopButtonClickHandler(e){
        var mediaContainer = container(e.target);
        var media = mediaContainer.querySelector(".htt-mvp");
        media.pause();
        media.currentTime = 0;
        media.value = 0;
    }
    
    
    function progressBarClickHandler(e){
        var mediaContainer = container(e.target);
        var media = mediaContainer.querySelector(".htt-mvp");
        var pos = (e.pageX  - mediaContainer.offsetLeft) / mediaContainer.offsetWidth;
        media.currentTime = pos * media.duration;
    }
    
    function fullScreenButtonClickHandler(e){
        var mediaContainer = container(e.target);
        var media = mediaContainer.querySelector(".htt-mvp");
      if (isFullScreen()) {
          if (doc.exitFullscreen) doc.exitFullscreen();
          else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
          else if (doc.webkitCancelFullScreen) doc.webkitCancelFullScreen();
          else if (doc.msExitFullscreen) doc.msExitFullscreen();
          setFullscreenData(false,media);
      }
      else {
          if (media.requestFullscreen) media.requestFullscreen();
          else if (media.mozRequestFullScreen) media.mozRequestFullScreen();
          else if (media.webkitRequestFullScreen) media.webkitRequestFullScreen();
          else if (media.msRequestFullscreen) media.msRequestFullscreen();
          setFullscreenData(true,media);
      }
    }
    function multimediaEndedHandler(e){
        var media = e.target;
        container(media).querySelector(".htt-mvp-custom-stop").classList.add("htt-mvp-hidden");
        container(media).querySelector(".htt-mvp-custom-pause").classList.add("htt-mvp-hidden");
        container(media).querySelector(".htt-mvp-custom-play").classList.remove("htt-mvp-hidden");
        container(media).querySelector(".htt-mvp-custom-playpause-button").classList.remove("htt-mvp-hidden");
    }
    function multimediaTimeupdateHandler(e){
        var mediaContainer = container(e.target);
        var media = e.target;
        var x = (getIndex(media));
        
        videoPercent = Math.floor((100 / media.duration) * media.currentTime);
        videoPercent = (100 / media.duration) * media.currentTime;
        linearProgressObjects[x].progress = videoPercent/100;
        mediaContainer.querySelector(".current-time").innerHTML = hhmmss(media.currentTime);
        mediaContainer.querySelector(".total-time").innerHTML = hhmmss(media.duration);
    }
    
    function multimediaProgressHandler(e){
        var media = e.target;
        var duration = media.duration;
        if (duration > 0) {
            bufferLengthDetector = setInterval(readBuffer, 1000, media);
        }
    }
    function downloadClickHandler(e){
        var mediaContainer = container(e.target);
        var sources = mediaContainer.querySelector(".htt-mvp").querySelectorAll("source");
        var url;
        var string;
        var substring = ".mp";
        for (var i = 0; i < sources.length; i++) {
            string = sources[i].getAttribute("src");
            if(string.indexOf(substring) !== -1){
                url = string;
            }
        }
        window.location.replace(url);
    }
    function findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }
    function container (el){
        return findAncestor (el, "htt-mvp-media-container");
    }
    function getIndex(media){
        var allMedia = doc.querySelectorAll(".htt-mvp");
        for (var i = 0; i < allMedia.length; i++) {
            if(media === allMedia[i]){
                return i;
            }
        }
    }
}());