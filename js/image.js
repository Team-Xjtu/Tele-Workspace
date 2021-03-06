var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.setAttribute("src","imagejs/tele.js");
document.body.appendChild(script);


var hammertime = new Hammer(document.querySelector("#canvas"));
hammertime.get('pinch').set({ enable: true });
hammertime.get('rotate').set({ enable: true });
isrotate = '';

var CanvasDemo = function() {
    var YD = YAHOO.util.Dom;
    var YE = YAHOO.util.Event;
    var canvas1;
    var img = [];
    return {
        init: function() {
            canvas1 = new Canvas.Element();
            canvas1.init('canvid1',  { width: YD.getViewportWidth() - 5, height: YD.getViewportHeight() - 5 });
            img[img.length] = new Canvas.Img('img1', {});
            img[img.length] = new Canvas.Img('img2', {});
            img[img.length] = new Canvas.Img('img3', {});
            img[img.length] = new Canvas.Img('bg', {});
            img[img.length] = new Canvas.Img('img4', {});
            img[img.length] = new Canvas.Img('img5', {});


            // @param array of images ToDo: individual images

            canvas1.addImage(img[0]);
            canvas1.addImage(img[1]);
            canvas1.addImage(img[2]);
            canvas1.setCanvasBackground(img[3]);
            canvas1.addImage(img[4]);
            canvas1.addImage(img[5]);

            this.initEvents();
        },
        initEvents: function() {
            YE.on('togglebg','click', this.toggleBg, this, true);
            YE.on('showcorners','click', this.showCorners, this, true);
            YE.on('togglenone','click', this.toggleNone, this, true);
            YE.on('toggleborders','click', this.toggleBorders, this, true);
            YE.on('togglepolaroid','ready', this.togglePolaroid, this, true);
            YE.on('pngbutton','click', function() { this.convertTo('png') }, this, true);
            YE.on('jpegbutton','click', function() { this.convertTo('jpeg') }, this, true);
        },
        switchBg: function() {
            canvas1.fillBackground = (canvas1.fillBackground) ? false : true;
            canvas1.renderAll();
        },

        //! insert these functions to the library. No access to _aImages should be done from here
        showCorners: function() {
            this.cornersvisible = (this.cornersvisible) ? false : true;
            for (var i = 0, l = canvas1._aImages.length; i < l; i += 1) {
                canvas1._aImages[i].setCornersVisibility(this.cornersvisible);
            }
            canvas1.renderAll();
        },
        toggleNone: function() {
            for (var i = 0, l = canvas1._aImages.length; i < l; i += 1) {
                canvas1._aImages[i].setBorderVisibility(false);
            }
            canvas1.renderAll();
        },
        toggleBorders: function() {
            for (var i = 0, l = canvas1._aImages.length; i < l; i += 1) {
                canvas1._aImages[i].setBorderVisibility(true);
            }
            canvas1.renderAll();
        },
        togglePolaroid: function() {
            for (var i = 0, l = canvas1._aImages.length; i < l; i += 1) {
                canvas1._aImages[i].setPolaroidVisibility(true);
            }
            canvas1.renderAll();
        },
        convertTo: function(format) {
            var imgData = canvas1.canvasTo(format);
            window.open(imgData, "_blank");
        },
        whatever: function(e, o) {
            // console.log(e);
            // console.log(o);
        }
    }
}();
YAHOO.util.Event.on(window, 'load', CanvasDemo.init, CanvasDemo, true);/**
 * Created by XJTUSE-PC on 2017/6/11.
 */
