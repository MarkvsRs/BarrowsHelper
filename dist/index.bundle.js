(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["testpackage"] = factory();
	else
		root["TEST"] = factory();
})((typeof self!='undefined'?self:this), function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/@alt1/base/dist/alt1api.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/alt1api.js ***!
  \**************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/declarations.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/declarations.js ***!
  \*******************************************************/
/***/ (() => {

"use strict";



/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedata-extensions.js":
/*!***************************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedata-extensions.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageData": () => (/* binding */ ImageData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");


//export this so node.js can also use it
var ImageData;
// //TODO revamp this madness a bit?
// (function () {
// 	var globalvar = (typeof self != "undefined" ? self : (typeof (global as any) != "undefined" ? (global as any) : null)) as any;
// 	//use the node-canvas version when on node
// 	if (typeof globalvar.ImageData == "undefined") {
// 		let nodecnv = requireNodeCanvas();
// 		globalvar.ImageData = nodecnv.ImageData;
// 	}
// 	var fill = typeof globalvar.ImageData == "undefined";
// 	//should never be reach anymore
// 	var constr = function (this: any) {
// 		var i = 0;
// 		var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
// 		var width = arguments[i++];
// 		var height = arguments[i++];
// 		if (fill) {
// 			if (!data) { data = new Uint8ClampedArray(width * height * 4); }
// 			this.width = width;
// 			this.height = height;
// 			this.data = data;
// 		}
// 		else if (oldconstr) {
// 			return (data ? new oldconstr(data, width, height) : new oldconstr(width, height));
// 		} else {
// 			var canvas = document.createElement('canvas');
// 			canvas.width = width;
// 			canvas.height = height;
// 			var ctx = canvas.getContext("2d")!;
// 			var imageData = ctx.createImageData(width, height);
// 			if (data) { imageData.data.set(data); }
// 			return imageData;
// 		}
// 	}
// 	var oldconstr = globalvar.ImageData;
// 	if (typeof document != "undefined") {
// 		try {
// 			new oldconstr(1, 1);
// 		} catch (e) {
// 			//direct constructor call not allowed in ie
// 			oldconstr = null;
// 		}
// 	}
// 	if (!fill) { constr.prototype = globalvar.ImageData.prototype; }
// 	globalvar.ImageData = constr;
// 	ImageData = constr as any;
// })();
(function () {
    var globalvar = (typeof self != "undefined" ? self : (typeof global != "undefined" ? global : null));
    var filltype = typeof globalvar.ImageData == "undefined" || typeof globalvar.document == "undefined";
    var fillconstr = filltype;
    if (!filltype) {
        var oldconstr = globalvar.ImageData;
        try {
            let data = new Uint8ClampedArray(4);
            data[0] = 1;
            let a = new globalvar.ImageData(data, 1, 1);
            fillconstr = a.data[0] != 1;
        }
        catch (e) {
            fillconstr = true;
        }
    }
    if (fillconstr) {
        var constr = function ImageDataShim() {
            var i = 0;
            var data = (arguments[i] instanceof Uint8ClampedArray ? arguments[i++] : null);
            var width = arguments[i++];
            var height = arguments[i++];
            if (filltype) {
                if (!data) {
                    data = new Uint8ClampedArray(width * height * 4);
                }
                this.width = width;
                this.height = height;
                this.data = data;
            }
            else if (fillconstr) {
                //WARNING This branch of code does not use the same pixel data backing store
                //(problem with wasm, however all wasm browser have a native constructor (unless asm.js is used))
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                var imageData = ctx.createImageData(width, height);
                if (data) {
                    imageData.data.set(data);
                }
                return imageData;
            }
            // else {
            // 	//oh no...
            // 	//we need this monstrocity in order to call the native constructor with variable number of args
            // 	//when es5 transpile is enable (that strips the spread operator)
            // 	return new (Function.prototype.bind.apply(oldconstr, [null,...arguments]));
            // }
        };
        if (!filltype) {
            constr.prototype = globalvar.ImageData.prototype;
        }
        globalvar.ImageData = constr;
        ImageData = constr;
    }
    else {
        ImageData = globalvar.ImageData;
    }
})();
//Recast into a drawable imagedata class on all platforms, into a normal browser ImageData on browsers or a node-canvas imagedata on nodejs
ImageData.prototype.toDrawableData = function () {
    if (typeof document == "undefined") {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToDrawable(this);
    }
    else {
        return this;
    }
};
ImageData.prototype.putImageData = function (buf, cx, cy) {
    for (var dx = 0; dx < buf.width; dx++) {
        for (var dy = 0; dy < buf.height; dy++) {
            var i1 = (dx + cx) * 4 + (dy + cy) * 4 * this.width;
            var i2 = dx * 4 + dy * 4 * buf.width;
            this.data[i1] = buf.data[i2];
            this.data[i1 + 1] = buf.data[i2 + 1];
            this.data[i1 + 2] = buf.data[i2 + 2];
            this.data[i1 + 3] = buf.data[i2 + 3];
        }
    }
};
ImageData.prototype.pixelOffset = function (x, y) {
    return x * 4 + y * this.width * 4;
};
//creates a hash of a portion of the buffer used to check for changes
ImageData.prototype.getPixelHash = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    var hash = 0;
    for (var x = rect.x; x < rect.x + rect.width; x++) {
        for (var y = rect.y; y < rect.y + rect.height; y++) {
            var i = x * 4 + y * 4 * this.width;
            hash = (((hash << 5) - hash) + this.data[i]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 1]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 2]) | 0;
            hash = (((hash << 5) - hash) + this.data[i + 3]) | 0;
        }
    }
    return hash;
};
ImageData.prototype.clone = function (rect) {
    return this.toImage(rect).getContext("2d").getImageData(0, 0, rect.width, rect.height);
};
ImageData.prototype.show = function (x = 5, y = 5, zoom = 1) {
    if (typeof document == "undefined") {
        console.error("need a document to show an imagedata object");
        return;
    }
    var imgs = document.getElementsByClassName("debugimage");
    while (imgs.length > ImageData.prototype.show.maxImages) {
        imgs[0].remove();
    }
    var el = this.toImage();
    el.classList.add("debugimage");
    el.style.position = "absolute";
    el.style.zIndex = "1000";
    el.style.left = x / zoom + "px";
    el.style.top = y / zoom + "px";
    el.style.background = "purple";
    el.style.cursor = "pointer";
    el.style.imageRendering = "pixelated";
    el.style.outline = "1px solid #0f0";
    el.style.width = (this.width == 1 ? 100 : this.width) * zoom + "px";
    el.style.height = (this.height == 1 ? 100 : this.height) * zoom + "px";
    el.onclick = function () { el.remove(); };
    document.body.appendChild(el);
    return el;
};
ImageData.prototype.show.maxImages = 10;
ImageData.prototype.toImage = function (rect) {
    if (!rect) {
        rect = new _index_js__WEBPACK_IMPORTED_MODULE_0__.Rect(0, 0, this.width, this.height);
    }
    if (typeof document != "undefined") {
        var el = document.createElement("canvas");
        el.width = rect.width;
        el.height = rect.height;
    }
    else {
        el = _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.createCanvas(rect.width, rect.height);
    }
    var ctx = el.getContext("2d");
    ctx.putImageData(this.toDrawableData(), -rect.x, -rect.y);
    return el;
};
ImageData.prototype.getPixel = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return [this.data[i], this.data[i + 1], this.data[i + 2], this.data[i + 3]];
};
ImageData.prototype.getPixelValueSum = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return this.data[i] + this.data[i + 1] + this.data[i + 2];
};
ImageData.prototype.getPixelInt = function (x, y) {
    var i = x * 4 + y * 4 * this.width;
    return (this.data[i + 3] << 24) + (this.data[i + 0] << 16) + (this.data[i + 1] << 8) + (this.data[i + 2] << 0);
};
ImageData.prototype.getColorDifference = function (x, y, r, g, b, a = 255) {
    var i = x * 4 + y * 4 * this.width;
    return Math.abs(this.data[i] - r) + Math.abs(this.data[i + 1] - g) + Math.abs(this.data[i + 2] - b) * a / 255;
};
ImageData.prototype.setPixel = function (x, y, ...color) {
    var r, g, b, a;
    var [r, g, b, a] = (Array.isArray(color[0]) ? color[0] : color);
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = r;
    this.data[i + 1] = g;
    this.data[i + 2] = b;
    this.data[i + 3] = a == undefined ? 255 : a;
};
ImageData.prototype.setPixelInt = function (x, y, color) {
    var i = x * 4 + y * 4 * this.width;
    this.data[i] = (color >> 24) & 0xff;
    this.data[i + 1] = (color >> 16) & 0xff;
    this.data[i + 2] = (color >> 8) & 0xff;
    this.data[i + 3] = (color >> 0) & 0xff;
};
ImageData.prototype.toFileBytes = function (format, quality) {
    if (typeof HTMLCanvasElement != "undefined") {
        return new Promise(d => this.toImage().toBlob(b => {
            var r = new FileReader();
            r.readAsArrayBuffer(b);
            r.onload = () => d(new Uint8Array(r.result));
        }, format, quality));
    }
    else {
        return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_1__.imageDataToFileBytes(this, format, quality);
    }
};
ImageData.prototype.toPngBase64 = function () {
    if (typeof HTMLCanvasElement != "undefined") {
        var str = this.toImage().toDataURL("image/png");
        return str.slice(str.indexOf(",") + 1);
    }
    else {
        throw new Error("synchronous image conversion not supported in nodejs, try using ImageData.prototype.toFileBytes");
    }
};
ImageData.prototype.pixelCompare = function (buf, x = 0, y = 0, max) {
    return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.simpleCompare(this, buf, x, y, max);
};
ImageData.prototype.copyTo = function (target, sourcex, sourcey, width, height, targetx, targety) {
    //convince v8 that these are 31bit uints
    const targetwidth = target.width | 0;
    const thiswidth = this.width | 0;
    const copywidth = width | 0;
    const fastwidth = Math.floor(width / 4) * 4;
    const thisdata = new Int32Array(this.data.buffer, this.data.byteOffset, this.data.byteLength / 4);
    const targetdata = new Int32Array(target.data.buffer, target.data.byteOffset, target.data.byteLength / 4);
    for (let cy = 0; cy < height; cy++) {
        let cx = 0;
        let it = (cx + targetx) + (cy + targety) * targetwidth;
        let is = (cx + sourcex) + (cy + sourcey) * thiswidth;
        //copy 4 pixels per iter (xmm)
        for (; cx < fastwidth; cx += 4) {
            targetdata[it] = thisdata[is];
            targetdata[it + 1] = thisdata[is + 1];
            targetdata[it + 2] = thisdata[is + 2];
            targetdata[it + 3] = thisdata[is + 3];
            it += 4;
            is += 4;
        }
        //copy remainder per pixel
        for (; cx < copywidth; cx++) {
            targetdata[it] = thisdata[is];
            it += 1;
            is += 1;
        }
    }
};
if (typeof HTMLImageElement != "undefined") {
    HTMLImageElement.prototype.toBuffer = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return ctx.getImageData(0, 0, w, h);
    };
    HTMLImageElement.prototype.toCanvas = function (x = 0, y = 0, w = this.width, h = this.height) {
        var cnv = document.createElement("canvas");
        cnv.width = w;
        cnv.height = h;
        var ctx = cnv.getContext("2d");
        ctx.drawImage(this, -x, -y);
        return cnv;
    };
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imagedetect.js":
/*!******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imagedetect.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "imageDataFromUrl": () => (/* binding */ imageDataFromUrl),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromFileBuffer": () => (/* binding */ imageDataFromFileBuffer),
/* harmony export */   "isPngBuffer": () => (/* binding */ isPngBuffer),
/* harmony export */   "clearPngColorspace": () => (/* binding */ clearPngColorspace),
/* harmony export */   "findSubimage": () => (/* binding */ findSubimage),
/* harmony export */   "findSubbuffer": () => (/* binding */ findSubbuffer),
/* harmony export */   "simpleCompare": () => (/* binding */ simpleCompare),
/* harmony export */   "coldif": () => (/* binding */ coldif),
/* harmony export */   "asyncMap": () => (/* binding */ asyncMap),
/* harmony export */   "webpackImages": () => (/* binding */ webpackImages),
/* harmony export */   "ImageDataSet": () => (/* binding */ ImageDataSet)
/* harmony export */ });
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
* Downloads an image and returns the ImageData
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param url http(s) or data url to the image
*/
function imageDataFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            var img = new Image();
            img.crossOrigin = "crossorigin";
            return yield new Promise((done, fail) => {
                img.onload = function () { done(img.toBuffer()); };
                img.onerror = fail;
                img.src = url;
            });
        }
        else {
            var hdr = "data:image/png;base64,";
            if (url.startsWith(hdr)) {
                return imageDataFromBase64(url.slice(hdr.length));
            }
            throw new Error("loading remote images in nodejs has been disabled, load the raw bytes and use imageDataFromNodeBuffer instead");
        }
    });
}
/**
* Loads an ImageData object from a base64 encoded png image
* Make sure the png image does not have a sRGB chunk or the resulting pixels will differ for different users!!!
* @param data a base64 encoded png image
*/
function imageDataFromBase64(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof Image != "undefined") {
            return imageDataFromUrl("data:image/png;base64," + data);
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBase64(data);
        }
    });
}
/**
 * Loads an ImageData object directly from a png encoded file buffer
 * This method ensures that png color space headers are taken care off
 * @param data The bytes of a png file
 */
function imageDataFromFileBuffer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        clearPngColorspace(data);
        if (typeof Image != "undefined") {
            let blob = new Blob([data], { type: "image/png" });
            let url = URL.createObjectURL(blob);
            let r = yield imageDataFromUrl(url);
            URL.revokeObjectURL(url);
            return r;
        }
        else {
            return _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_2__.imageDataFromBuffer(data);
        }
    });
}
/**
* Checks if a given byte array is a png file (by checking for ?PNG as first 4 bytes)
* @param bytes Raw bytes of the png file
*/
function isPngBuffer(bytes) {
    return bytes[0] == 137 && bytes[1] == 80 && bytes[2] == 78 && bytes[3] == 71;
}
/**
* Resets the colorspace data in the png file.
* This makes sure the browser renders the exact colors in the file instead of filtering it in order to obtain the best real life representation of
* what it looked like on the authors screen. (this feature is often broken and not supported)
* For example a round trip printscreen -> open in browser results in different colors than the original
* @param data Raw bytes of the png file
*/
function clearPngColorspace(data) {
    if (!isPngBuffer(data)) {
        throw new Error("non-png image received");
    }
    var i = 8;
    while (i < data.length) {
        var length = data[i++] * 0x1000000 + data[i++] * 0x10000 + data[i++] * 0x100 + data[i++];
        var ancillary = !!((data[i] >> 5) & 1);
        var chunkname = String.fromCharCode(data[i], data[i + 1], data[i + 2], data[i + 3]);
        var chunkid = chunkname.toLowerCase();
        if (chunkid != "trns" && ancillary) {
            data[i + 0] = "n".charCodeAt(0);
            data[i + 1] = "o".charCodeAt(0);
            data[i + 2] = "P".charCodeAt(0);
            data[i + 3] = "E".charCodeAt(0);
            //calculate new chunk checksum
            //http://www.libpng.org/pub/png/spec/1.2/PNG-CRCAppendix.html
            var end = i + 4 + length;
            var crc = 0xffffffff;
            //should be fast enough like this
            var bitcrc = function (bit) {
                for (var k = 0; k < 8; k++) {
                    if (bit & 1) {
                        bit = 0xedb88320 ^ (bit >>> 1);
                    }
                    else {
                        bit = bit >>> 1;
                    }
                }
                return bit;
            };
            for (var a = i; a < end; a++) {
                if (a >= i + 4) {
                    data[a] = 0;
                }
                var bit = data[a];
                crc = bitcrc((crc ^ bit) & 0xff) ^ (crc >>> 8);
            }
            crc = crc ^ 0xffffffff;
            //new chunk checksum
            data[i + 4 + length + 0] = (crc >> 24) & 0xff;
            data[i + 4 + length + 1] = (crc >> 16) & 0xff;
            data[i + 4 + length + 2] = (crc >> 8) & 0xff;
            data[i + 4 + length + 3] = (crc >> 0) & 0xff;
        }
        if (chunkname == "IEND") {
            break;
        }
        i += 4; //type
        i += length; //data
        i += 4; //crc
    }
}
/**
* finds the given needle ImageBuffer in the given haystack ImgRef this function uses the best optimized available
* code depending on the type of the haystack. It will use fast c# searching if the haystack is an ImgRefBind, js searching
* is used otherwise.
* the checklist argument is no longer used and should ignored or null/undefined
* The optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search the needle. The rectangle should be bigger than the needle
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubimage(haystackImgref, needleBuffer, sx = 0, sy = 0, sw = haystackImgref.width, sh = haystackImgref.height) {
    if (!haystackImgref) {
        throw new TypeError();
    }
    if (!needleBuffer) {
        throw new TypeError();
    }
    var max = 30;
    //check if we can do this in alt1
    if (haystackImgref instanceof _imgref_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefBind && _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.hasAlt1 && alt1.bindFindSubImg) {
        var needlestr = _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.encodeImageString(needleBuffer);
        var r = alt1.bindFindSubImg(haystackImgref.handle, needlestr, needleBuffer.width, sx, sy, sw, sh);
        if (!r) {
            throw new _wrapper_js__WEBPACK_IMPORTED_MODULE_1__.Alt1Error();
        }
        return JSON.parse(r);
    }
    return findSubbuffer(haystackImgref.read(), needleBuffer, sx, sy, sw, sh);
}
/**
* Uses js to find the given needle ImageBuffer in the given haystack ImageBuffer. It is better to use the alt1.bind- functions in
* combination with a1nxt.findsubimg.
* the optional sx,sy,sw,sh arguments indicate a bounding rectangle in which to search.
* @returns An array of points where the needle is found. The array is empty if none are found
*/
function findSubbuffer(haystack, needle, sx = 0, sy = 0, sw = haystack.width, sh = haystack.height) {
    var r = [];
    var maxdif = 30;
    var maxresults = 50;
    var needlestride = needle.width * 4;
    var heystackstride = haystack.width * 4;
    //built list of non trans pixel to check
    var checkList = [];
    for (var y = 0; y < needle.height; y++) {
        for (var x = 0; x < needle.width; x++) {
            var i = x * 4 + y * needlestride;
            if (needle.data[i + 3] == 255) {
                checkList.push({ x: x, y: y });
            }
            if (checkList.length == 10) {
                break;
            }
        }
        if (checkList.length == 10) {
            break;
        }
    }
    var cw = (sx + sw) - needle.width;
    var ch = (sy + sh) - needle.height;
    var checklength = checkList.length;
    for (var y = sy; y <= ch; y++) {
        outer: for (var x = sx; x <= cw; x++) {
            for (var a = 0; a < checklength; a++) {
                var i1 = (x + checkList[a].x) * 4 + (y + checkList[a].y) * heystackstride;
                var i2 = checkList[a].x * 4 + checkList[a].y * needlestride;
                var d = 0;
                d = d + Math.abs(haystack.data[i1 + 0] - needle.data[i2 + 0]) | 0;
                d = d + Math.abs(haystack.data[i1 + 1] - needle.data[i2 + 1]) | 0;
                d = d + Math.abs(haystack.data[i1 + 2] - needle.data[i2 + 2]) | 0;
                d *= 255 / needle.data[i2 + 3];
                if (d > maxdif) {
                    continue outer;
                }
            }
            if (simpleCompare(haystack, needle, x, y, maxdif) != Infinity) {
                r.push({ x, y });
                if (r.length > maxresults) {
                    return r;
                }
            }
        }
    }
    return r;
}
/**
* Compares two images and returns the average color difference per pixel between them
* @param max The max color difference at any point in the image before short circuiting the function and returning Infinity. set to -1 to always continue.
* @returns The average color difference per pixel or Infinity if the difference is more than max at any point in the image
*/
function simpleCompare(bigbuf, checkbuf, x, y, max = 30) {
    if (x < 0 || y < 0) {
        throw new RangeError();
    }
    if (x + checkbuf.width > bigbuf.width || y + checkbuf.height > bigbuf.height) {
        throw new RangeError();
    }
    if (max == -1) {
        max = 255 * 4;
    }
    var dif = 0;
    for (var step = 8; step >= 1; step /= 2) {
        for (var cx = 0; cx < checkbuf.width; cx += step) {
            for (var cy = 0; cy < checkbuf.height; cy += step) {
                var i1 = (x + cx) * 4 + (y + cy) * bigbuf.width * 4;
                var i2 = cx * 4 + cy * checkbuf.width * 4;
                var d = 0;
                d = d + Math.abs(bigbuf.data[i1 + 0] - checkbuf.data[i2 + 0]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 1] - checkbuf.data[i2 + 1]) | 0;
                d = d + Math.abs(bigbuf.data[i1 + 2] - checkbuf.data[i2 + 2]) | 0;
                d *= checkbuf.data[i2 + 3] / 255;
                if (step == 1) {
                    dif += d;
                }
                if (d > max) {
                    return Infinity;
                }
            }
        }
    }
    return dif / checkbuf.width / checkbuf.height;
}
/**
* Returns the difference between two colors (scaled to the alpha of the second color)
*/
function coldif(r1, g1, b1, r2, g2, b2, a2) {
    return (Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2)) * a2 / 255; //only applies alpha for 2nd buffer!
}
/**
 * Turns map of promises into a map that contains the resolved values after loading.
 * @param input
 */
function asyncMap(input) {
    var raw = {};
    var promises = [];
    for (var a in input) {
        if (input.hasOwnProperty(a)) {
            raw[a] = null;
            promises.push(input[a].then(function (a, i) { raw[a] = i; r[a] = i; }.bind(null, a)));
        }
    }
    var r = {};
    var promise = Promise.all(promises).then(() => { r.loaded = true; return r; });
    Object.defineProperty(r, "loaded", { enumerable: false, value: false, writable: true });
    Object.defineProperty(r, "promise", { enumerable: false, value: promise });
    Object.defineProperty(r, "raw", { enumerable: false, value: raw });
    return Object.assign(r, raw);
}
/**
* Same as asyncMap, but casts the properties to ImageData in typescript
*/
function webpackImages(input) {
    return asyncMap(input);
}
class ImageDataSet {
    constructor() {
        this.buffers = [];
    }
    matchBest(img, x, y, max) {
        let best = null;
        let bestscore = max;
        for (let a = 0; a < this.buffers.length; a++) {
            let score = img.pixelCompare(this.buffers[a], x, y, bestscore);
            if (isFinite(score) && (bestscore == undefined || score < bestscore)) {
                bestscore = score;
                best = a;
            }
        }
        if (best == null) {
            return null;
        }
        return { index: best, score: bestscore };
    }
    static fromFilmStrip(baseimg, width) {
        if ((baseimg.width % width) != 0) {
            throw new Error("slice size does not fit in base img");
        }
        let r = new ImageDataSet();
        for (let x = 0; x < baseimg.width; x += width) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, width, baseimg.height)));
        }
        return r;
    }
    static fromFilmStripUneven(baseimg, widths) {
        let r = new ImageDataSet();
        let x = 0;
        for (let w of widths) {
            r.buffers.push(baseimg.clone(new _index_js__WEBPACK_IMPORTED_MODULE_3__.Rect(x, 0, w, baseimg.height)));
            x += w;
            if (x > baseimg.width) {
                throw new Error("sampling filmstrip outside bounds");
            }
        }
        if (x != baseimg.width) {
            throw new Error("unconsumed pixels left in film strip imagedata");
        }
        return r;
    }
    static fromAtlas(baseimg, slices) {
        let r = new ImageDataSet();
        for (let slice of slices) {
            r.buffers.push(baseimg.clone(slice));
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/imgref.js":
/*!*************************************************!*\
  !*** ../node_modules/@alt1/base/dist/imgref.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImgRef": () => (/* binding */ ImgRef),
/* harmony export */   "ImgRefCtx": () => (/* binding */ ImgRefCtx),
/* harmony export */   "ImgRefBind": () => (/* binding */ ImgRefBind),
/* harmony export */   "ImgRefData": () => (/* binding */ ImgRefData)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");

/**
 * Represents an image that might be in different types of memory
 * This is mostly used to represent images still in Alt1 memory that have
 * not been transfered to js yet. Various a1lib api's use this type and
 * choose the most efficient approach based on the memory type
 */
class ImgRef {
    constructor(x, y, w, h) {
        this.t = "none";
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        throw new Error("This imgref (" + this.t + ") does not support toData");
    }
    findSubimage(needle, sx = 0, sy = 0, w = this.width, h = this.height) {
        return _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.findSubimage(this, needle, sx, sy, w, h);
    }
    toData(x = this.x, y = this.y, w = this.width, h = this.height) {
        return this.read(x - this.x, y - this.y, w, h);
    }
    ;
    containsArea(rect) {
        return this.x <= rect.x && this.y <= rect.y && this.x + this.width >= rect.x + rect.width && this.y + this.height >= rect.y + rect.height;
    }
}
/**
 * Represents an image in js render memory (canvas/image tag)
 */
class ImgRefCtx extends ImgRef {
    constructor(img, x = 0, y = 0) {
        if (img instanceof CanvasRenderingContext2D) {
            super(x, y, img.canvas.width, img.canvas.height);
            this.ctx = img;
        }
        else {
            super(x, y, img.width, img.height);
            var cnv = (img instanceof HTMLCanvasElement ? img : img.toCanvas());
            this.ctx = cnv.getContext("2d");
        }
        this.t = "ctx";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return this.ctx.getImageData(x, y, w, h);
    }
}
/**
 * Represents in image in Alt1 memory, This type of image can be searched for subimages
 * very efficiently and transfering the full image to js can be avoided this way
 */
class ImgRefBind extends ImgRef {
    constructor(handle, x = 0, y = 0, w = 0, h = 0) {
        super(x, y, w, h);
        this.handle = handle;
        this.t = "bind";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        return (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.transferImageData)(this.handle, x, y, w, h);
    }
}
/**
 * Represents an image in js memory
 */
class ImgRefData extends ImgRef {
    constructor(buf, x = 0, y = 0) {
        super(x, y, buf.width, buf.height);
        this.buf = buf;
        this.t = "data";
    }
    read(x = 0, y = 0, w = this.width, h = this.height) {
        if (x == 0 && y == 0 && w == this.width && h == this.height) {
            return this.buf;
        }
        var r = new ImageData(w, h);
        for (var b = y; b < y + h; b++) {
            for (var a = x; a < x + w; a++) {
                var i1 = (a - x) * 4 + (b - y) * w * 4;
                var i2 = a * 4 + b * 4 * this.buf.width;
                r.data[i1] = this.buf.data[i2];
                r.data[i1 + 1] = this.buf.data[i2 + 1];
                r.data[i1 + 2] = this.buf.data[i2 + 2];
                r.data[i1 + 3] = this.buf.data[i2 + 3];
            }
        }
        return r;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/index.js":
/*!************************************************!*\
  !*** ../node_modules/@alt1/base/dist/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageDetect": () => (/* reexport module object */ _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "PasteInput": () => (/* reexport module object */ _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "Rect": () => (/* reexport safe */ _rect_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "ImageData": () => (/* reexport safe */ _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__.ImageData),
/* harmony export */   "NodePolyfill": () => (/* reexport module object */ _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   "ImgRef": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRef),
/* harmony export */   "ImgRefBind": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefBind),
/* harmony export */   "ImgRefCtx": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefCtx),
/* harmony export */   "ImgRefData": () => (/* reexport safe */ _imgref_js__WEBPACK_IMPORTED_MODULE_6__.ImgRefData),
/* harmony export */   "Alt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.Alt1Error),
/* harmony export */   "ImageStreamReader": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.ImageStreamReader),
/* harmony export */   "NoAlt1Error": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.NoAlt1Error),
/* harmony export */   "addResizeElement": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.addResizeElement),
/* harmony export */   "capture": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.capture),
/* harmony export */   "captureAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureAsync),
/* harmony export */   "captureHold": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHold),
/* harmony export */   "captureHoldFullRs": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldFullRs),
/* harmony export */   "captureHoldScreen": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureHoldScreen),
/* harmony export */   "captureMultiAsync": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureMultiAsync),
/* harmony export */   "captureStream": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.captureStream),
/* harmony export */   "decodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.decodeImageString),
/* harmony export */   "encodeImageString": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.encodeImageString),
/* harmony export */   "getMousePosition": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getMousePosition),
/* harmony export */   "getdisplaybounds": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.getdisplaybounds),
/* harmony export */   "hasAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1),
/* harmony export */   "hasAlt1Version": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.hasAlt1Version),
/* harmony export */   "identifyApp": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.identifyApp),
/* harmony export */   "mixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.mixColor),
/* harmony export */   "newestversion": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.newestversion),
/* harmony export */   "on": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.on),
/* harmony export */   "once": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.once),
/* harmony export */   "openbrowser": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.openbrowser),
/* harmony export */   "removeListener": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.removeListener),
/* harmony export */   "requireAlt1": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.requireAlt1),
/* harmony export */   "resetEnvironment": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.resetEnvironment),
/* harmony export */   "skinName": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.skinName),
/* harmony export */   "transferImageData": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.transferImageData),
/* harmony export */   "unmixColor": () => (/* reexport safe */ _wrapper_js__WEBPACK_IMPORTED_MODULE_7__.unmixColor)
/* harmony export */ });
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./declarations.js */ "../node_modules/@alt1/base/dist/declarations.js");
/* harmony import */ var _declarations_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_declarations_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
/* harmony import */ var _pasteinput_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pasteinput.js */ "../node_modules/@alt1/base/dist/pasteinput.js");
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _nodepolyfill_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nodepolyfill.js */ "../node_modules/@alt1/base/dist/nodepolyfill.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _wrapper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./wrapper.js */ "../node_modules/@alt1/base/dist/wrapper.js");










/***/ }),

/***/ "../node_modules/@alt1/base/dist/nodepolyfill.js":
/*!*******************************************************!*\
  !*** ../node_modules/@alt1/base/dist/nodepolyfill.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "polyfillRequire": () => (/* binding */ polyfillRequire),
/* harmony export */   "requireSharp": () => (/* binding */ requireSharp),
/* harmony export */   "requireNodeCanvas": () => (/* binding */ requireNodeCanvas),
/* harmony export */   "requireElectronCommon": () => (/* binding */ requireElectronCommon),
/* harmony export */   "imageDataToDrawable": () => (/* binding */ imageDataToDrawable),
/* harmony export */   "createCanvas": () => (/* binding */ createCanvas),
/* harmony export */   "imageDataToFileBytes": () => (/* binding */ imageDataToFileBytes),
/* harmony export */   "imageDataFromBase64": () => (/* binding */ imageDataFromBase64),
/* harmony export */   "imageDataFromBuffer": () => (/* binding */ imageDataFromBuffer)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");
//nodejs and electron polyfills for web api's
//commented out type info as that breaks webpack with optional dependencies
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


var requirefunction = null;
/**
 * Call this function to let the libs require extra dependencies on nodejs in order
 * to polyfill some browser api's (mostly image compression/decompression)
 * `NodePolifill.polyfillRequire(require);` should solve most cases
 */
function polyfillRequire(requirefn) {
    requirefunction = requirefn;
}
function requireSharp() {
    try {
        if (requirefunction) {
            return requirefunction("sharp");
        }
        else {
            return require(/* webpackIgnore: true */ "sharp"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireNodeCanvas() {
    //attempt to require sharp first, after loading canvas the module sharp fails to load
    requireSharp();
    try {
        if (requirefunction) {
            return requirefunction("canvas");
        }
        else {
            return require(/* webpackIgnore: true */ "canvas"); // as typeof import("sharp");
        }
    }
    catch (e) { }
    return null;
}
function requireElectronCommon() {
    try {
        if (requirefunction) {
            return requirefunction("electron/common");
        }
        else {
            return require(/* webpackIgnore: true */ "electron/common");
        }
    }
    catch (e) { }
    return null;
}
function imageDataToDrawable(buf) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return new nodecnv.ImageData(buf.data, buf.width, buf.height);
}
function createCanvas(w, h) {
    let nodecnv = requireNodeCanvas();
    if (!nodecnv) {
        throw new Error("couldn't find built-in canvas or the module 'canvas'");
    }
    return nodecnv.createCanvas(w, h);
}
function flipBGRAtoRGBA(data) {
    for (let i = 0; i < data.length; i += 4) {
        let tmp = data[i + 2];
        data[i + 2] = data[i + 0];
        data[i + 0] = tmp;
    }
}
function imageDataToFileBytes(buf, format, quality) {
    return __awaiter(this, void 0, void 0, function* () {
        //use the electron API if we're in electron
        var electronCommon;
        var sharp;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            //need to copy the buffer in order to flip it without destroying the original
            let bufcpy = Buffer.from(buf.data.slice(buf.data.byteOffset, buf.data.byteLength));
            flipBGRAtoRGBA(bufcpy);
            let nativeimg = nativeImage.createFromBitmap(bufcpy, { width: buf.width, height: buf.height });
            return nativeimg.toPNG();
        }
        else if (sharp = requireSharp()) {
            let img = sharp(Buffer.from(buf.data.buffer), { raw: { width: buf.width, height: buf.height, channels: 4 } });
            if (format == "image/png") {
                img.png();
            }
            else if (format == "image/webp") {
                var opts = { quality: 80 };
                if (typeof quality == "number") {
                    opts.quality = quality * 100;
                }
                img.webp(opts);
            }
            else {
                throw new Error("unknown image format: " + format);
            }
            return yield img.toBuffer({ resolveWithObject: false }).buffer;
        }
        throw new Error("coulnd't find build-in image compression methods or the module 'electron/common' or 'sharp'");
    });
}
function imageDataFromBase64(base64) {
    return imageDataFromBuffer(Buffer.from(base64, "base64"));
}
function imageDataFromBuffer(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        (0,_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace)(buffer);
        //use the electron API if we're in electron
        var electronCommon;
        var nodecnv;
        if (electronCommon = requireElectronCommon()) {
            let nativeImage = electronCommon.nativeImage;
            let img = nativeImage.createFromBuffer(buffer);
            let pixels = img.toBitmap();
            let size = img.getSize();
            let pixbuf = new Uint8ClampedArray(pixels.buffer, pixels.byteOffset, pixels.byteLength);
            flipBGRAtoRGBA(pixbuf);
            return new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(pixbuf, size.width, size.height);
        }
        else if (nodecnv = requireNodeCanvas()) {
            return new Promise((done, err) => {
                let img = new nodecnv.Image();
                img.onerror = err;
                img.onload = () => {
                    var cnv = nodecnv.createCanvas(img.naturalWidth, img.naturalHeight);
                    var ctx = cnv.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    var data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                    //use our own class
                    done(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImageData(data.data, data.width, data.height));
                };
                img.src = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
            });
        }
        throw new Error("couldn't find built-in canvas, module 'electron/common' or the module 'canvas'");
    });
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/pasteinput.js":
/*!*****************************************************!*\
  !*** ../node_modules/@alt1/base/dist/pasteinput.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lastref": () => (/* binding */ lastref),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "unlisten": () => (/* binding */ unlisten),
/* harmony export */   "triggerPaste": () => (/* binding */ triggerPaste),
/* harmony export */   "startDragNDrop": () => (/* binding */ startDragNDrop),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "fileDialog": () => (/* binding */ fileDialog)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imagedetect.js */ "../node_modules/@alt1/base/dist/imagedetect.js");


var listeners = [];
var started = false;
var dndStarted = false;
var pasting = false;
var lastref = null;
function listen(func, errorfunc, dragndrop) {
    listeners.push({ cb: func, error: errorfunc });
    if (!started) {
        start();
    }
    if (dragndrop && !dndStarted) {
        startDragNDrop();
    }
}
function unlisten(func) {
    let i = listeners.findIndex(c => c.cb == func);
    if (i != -1) {
        listeners.splice(i, 1);
    }
}
/**
 * currently used in multiple document situations (iframe), might be removed in the future
 */
function triggerPaste(img) {
    lastref = img;
    for (var a in listeners) {
        listeners[a].cb(lastref);
    }
}
function pasted(img) {
    pasting = false;
    let cnv = img instanceof HTMLCanvasElement ? img : img.toCanvas();
    triggerPaste(new _index_js__WEBPACK_IMPORTED_MODULE_0__.ImgRefCtx(cnv));
}
function error(error, mes) {
    var _a, _b;
    pasting = false;
    for (var a in listeners) {
        (_b = (_a = listeners[a]).error) === null || _b === void 0 ? void 0 : _b.call(_a, mes, error);
    }
}
function startDragNDrop() {
    var getitem = function (items) {
        var foundimage = "";
        for (var a = 0; a < items.length; a++) {
            var item = items[a];
            var m = item.type.match(/^image\/(\w+)$/);
            if (m) {
                if (m[1] == "png") {
                    return item;
                }
                else {
                    foundimage = m[1];
                }
            }
        }
        if (foundimage) {
            error("notpng", "The image you uploaded is not a .png image. Other image type have compression noise and can't be used for image detection.");
        }
        return null;
    };
    window.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    window.addEventListener("drop", function (e) {
        if (!e.dataTransfer) {
            return;
        }
        var item = getitem(e.dataTransfer.items);
        e.preventDefault();
        if (!item) {
            return;
        }
        fromFile(item.getAsFile());
    });
}
function start() {
    if (started) {
        return;
    }
    started = true;
    //determine if we have a clipboard api
    //try{a=new Event("clipboard"); a="clipboardData" in a;}
    //catch(e){a=false;}
    var ischrome = !!navigator.userAgent.match(/Chrome/) && !navigator.userAgent.match(/Edge/);
    //old method breaks after chrome 41, revert to good old user agent sniffing
    //nvm, internet explorer (edge) decided that it wants to be chrome, however fails at delivering
    //turns out this one is interesting, edge is a hybrid between the paste api's
    var apipasted = function (e) {
        if (!e.clipboardData) {
            return;
        }
        for (var a = 0; a < e.clipboardData.items.length; a++) { //loop all data types
            if (e.clipboardData.items[a].type.indexOf("image") != -1) {
                var file = e.clipboardData.items[a].getAsFile();
                var img = new Image();
                img.src = (window.URL || window.webkitURL).createObjectURL(file);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
            }
        }
    };
    if (ischrome) {
        document.addEventListener("paste", apipasted);
    }
    else {
        var catcher = document.createElement("div");
        catcher.setAttribute("contenteditable", "");
        catcher.className = "forcehidden"; //retarded ie safety/bug, cant apply styles using js//TODO i don't even know what's going on
        catcher.onpaste = function (e) {
            if (e.clipboardData && e.clipboardData.items) {
                apipasted(e);
                return;
            }
            setTimeout(function () {
                var b = catcher.children[0];
                if (!b || b.tagName != "IMG") {
                    return;
                }
                var img = new Image();
                img.src = b.src;
                var a = img.src.match(/^data:([\w\/]+);/);
                if (img.width > 0) {
                    pasted(img);
                }
                else {
                    img.onload = function () { pasted(img); };
                }
                catcher.innerHTML = "";
            }, 1);
        };
        document.body.appendChild(catcher);
    }
    //detect if ctrl-v is pressed and focus catcher if needed
    document.addEventListener("keydown", function (e) {
        if (e.target.tagName == "INPUT") {
            return;
        }
        if (e.keyCode != "V".charCodeAt(0) || !e.ctrlKey) {
            return;
        }
        pasting = true;
        setTimeout(function () {
            if (pasting) {
                error("noimg", "You pressed Ctrl+V, but no image was pasted by your browser, make sure your clipboard contains an image, and not a link to an image.");
            }
        }, 1000);
        if (catcher) {
            catcher.focus();
        }
    });
}
function fileDialog() {
    var fileinput = document.createElement("input");
    fileinput.type = "file";
    fileinput.accept = "image/png";
    fileinput.onchange = function () { if (fileinput.files && fileinput.files[0]) {
        fromFile(fileinput.files[0]);
    } };
    fileinput.click();
    return fileinput;
}
function fromFile(file) {
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        var bytearray = new Uint8Array(reader.result);
        if (_imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.isPngBuffer(bytearray)) {
            _imagedetect_js__WEBPACK_IMPORTED_MODULE_1__.clearPngColorspace(bytearray);
        }
        var blob = new Blob([bytearray], { type: "image/png" });
        var img = new Image();
        img.onerror = () => error("invalidfile", "The file you uploaded could not be opened as an image.");
        var bloburl = URL.createObjectURL(blob);
        img.src = bloburl;
        if (img.width > 0) {
            pasted(img);
            URL.revokeObjectURL(bloburl);
        }
        else {
            img.onload = function () { pasted(img); URL.revokeObjectURL(bloburl); };
        }
    };
    reader.readAsArrayBuffer(file);
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/rect.js":
/*!***********************************************!*\
  !*** ../node_modules/@alt1/base/dist/rect.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rect)
/* harmony export */ });
//util class for rectangle maths
//TODO shit this sucks can we remove it again?
//more of a shorthand to get {x,y,width,height} than a class
//kinda starting to like it again
//TODO remove rant
;
/**
 * Simple rectangle class with some util functions
 */
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    static fromArgs(...args) {
        if (typeof args[0] == "object") {
            return new Rect(args[0].x, args[0].y, args[0].width, args[0].height);
        }
        else if (typeof args[0] == "number" && args.length >= 4) {
            return new Rect(args[0], args[1], args[2], args[3]);
        }
        else {
            throw new Error("invalid rect args");
        }
    }
    /**
     * Resizes this Rect to include the full size of a given second rectangle
     */
    union(r2) {
        var x = Math.min(this.x, r2.x);
        var y = Math.min(this.y, r2.y);
        this.width = Math.max(this.x + this.width, r2.x + r2.width) - x;
        this.height = Math.max(this.y + this.height, r2.y + r2.height) - y;
        this.x = x;
        this.y = y;
        return this;
    }
    /**
     * Resizes this Rect to include a given point
     */
    includePoint(x, y) {
        this.union(new Rect(x, y, 0, 0));
    }
    /**
     * Grows the rectangle with the given dimensions
     */
    inflate(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += 2 * w;
        this.height += 2 * h;
    }
    /**
     * Resizes this Rect to the area that overlaps a given Rect
     * width and height will be set to 0 if the intersection does not exist
     */
    intersect(r2) {
        if (this.x < r2.x) {
            this.width -= r2.x - this.x;
            this.x = r2.x;
        }
        if (this.y < r2.y) {
            this.height -= r2.y - this.y;
            this.y = r2.y;
        }
        this.width = Math.min(this.x + this.width, r2.x + r2.width) - this.x;
        this.height = Math.min(this.y + this.height, r2.y + r2.height) - this.y;
        if (this.width <= 0 || this.height <= 0) {
            this.width = 0;
            this.height = 0;
        }
    }
    /**
     * Returns wether this Rect has at least one pixel overlap with a given Rect
     */
    overlaps(r2) {
        return this.x < r2.x + r2.width && this.x + this.width > r2.x && this.y < r2.y + r2.height && this.y + this.height > r2.y;
    }
    /**
     * Returns wether a given Rect fits completely inside this Rect
     * @param r2
     */
    contains(r2) {
        return this.x <= r2.x && this.x + this.width >= r2.x + r2.width && this.y <= r2.y && this.y + this.height >= r2.y + r2.height;
    }
    /**
     * Returns wether a given point lies inside this Rect
     */
    containsPoint(x, y) {
        return this.x <= x && this.x + this.width > x && this.y <= y && this.y + this.height > y;
    }
}


/***/ }),

/***/ "../node_modules/@alt1/base/dist/wrapper.js":
/*!**************************************************!*\
  !*** ../node_modules/@alt1/base/dist/wrapper.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoAlt1Error": () => (/* binding */ NoAlt1Error),
/* harmony export */   "Alt1Error": () => (/* binding */ Alt1Error),
/* harmony export */   "newestversion": () => (/* binding */ newestversion),
/* harmony export */   "hasAlt1": () => (/* binding */ hasAlt1),
/* harmony export */   "skinName": () => (/* binding */ skinName),
/* harmony export */   "openbrowser": () => (/* binding */ openbrowser),
/* harmony export */   "requireAlt1": () => (/* binding */ requireAlt1),
/* harmony export */   "getdisplaybounds": () => (/* binding */ getdisplaybounds),
/* harmony export */   "capture": () => (/* binding */ capture),
/* harmony export */   "captureHold": () => (/* binding */ captureHold),
/* harmony export */   "captureHoldScreen": () => (/* binding */ captureHoldScreen),
/* harmony export */   "captureHoldFullRs": () => (/* binding */ captureHoldFullRs),
/* harmony export */   "transferImageData": () => (/* binding */ transferImageData),
/* harmony export */   "decodeImageString": () => (/* binding */ decodeImageString),
/* harmony export */   "encodeImageString": () => (/* binding */ encodeImageString),
/* harmony export */   "mixColor": () => (/* binding */ mixColor),
/* harmony export */   "unmixColor": () => (/* binding */ unmixColor),
/* harmony export */   "identifyApp": () => (/* binding */ identifyApp),
/* harmony export */   "resetEnvironment": () => (/* binding */ resetEnvironment),
/* harmony export */   "hasAlt1Version": () => (/* binding */ hasAlt1Version),
/* harmony export */   "getMousePosition": () => (/* binding */ getMousePosition),
/* harmony export */   "addResizeElement": () => (/* binding */ addResizeElement),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "removeListener": () => (/* binding */ removeListener),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "ImageStreamReader": () => (/* binding */ ImageStreamReader),
/* harmony export */   "captureAsync": () => (/* binding */ captureAsync),
/* harmony export */   "captureMultiAsync": () => (/* binding */ captureMultiAsync),
/* harmony export */   "captureStream": () => (/* binding */ captureStream)
/* harmony export */ });
/* harmony import */ var _rect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rect.js */ "../node_modules/@alt1/base/dist/rect.js");
/* harmony import */ var _imgref_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./imgref.js */ "../node_modules/@alt1/base/dist/imgref.js");
/* harmony import */ var _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imagedata-extensions.js */ "../node_modules/@alt1/base/dist/imagedata-extensions.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./alt1api.js */ "../node_modules/@alt1/base/dist/alt1api.js");
/* harmony import */ var _alt1api_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_alt1api_js__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
 * Thrown when a method is called that can not be used outside of Alt1
 */
class NoAlt1Error extends Error {
    constructor() {
        super();
        this.message = "This method can not be ran outside of Alt1";
    }
}
;
/**
 * Thrown when the Alt1 API returns an invalid result
 * Errors of a different type are throw when internal Alt1 errors occur
 */
class Alt1Error extends Error {
}
/**
 * The latest Alt1 version
 */
var newestversion = "1.5.5";
/**
 * Whether the Alt1 API is available
 */
var hasAlt1 = (typeof alt1 != "undefined");
/**
 * The name of the Alt1 interface skin. (Always "default" if running in a browser)
 */
var skinName = hasAlt1 ? alt1.skinName : "default";
/**
 * Max number of bytes that can be sent by alt1 in one function
 * Not completely sure why this number is different than window.alt1.maxtranfer
 */
var maxtransfer = 4000000;
/**
 * Open a link in the default browser
 * @deprecated use window.open instead
 */
function openbrowser(url) {
    if (hasAlt1) {
        alt1.openBrowser(url);
    }
    else {
        window.open(url, '_blank');
    }
}
/**
 * Throw if Alt1 API is not available
 */
function requireAlt1() {
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
}
/**
 * Returns an object with a rectangle that spans all screens
 */
function getdisplaybounds() {
    if (!hasAlt1) {
        return false;
    }
    return new _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"](alt1.screenX, alt1.screenY, alt1.screenWidth, alt1.screenHeight);
}
/**
 * gets an imagebuffer with pixel data about the requested region
 */
function capture(...args) {
    //TODO change null return on error into throw instead (x3)
    if (!hasAlt1) {
        throw new NoAlt1Error();
    }
    var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
    if (alt1.capture) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.capture(rect.x, rect.y, rect.width, rect.height), rect.width, rect.height);
    }
    var buf = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(rect.width, rect.height);
    if (rect.width * rect.height * 4 <= maxtransfer) {
        var data = alt1.getRegion(rect.x, rect.y, rect.width, rect.height);
        if (!data) {
            return null;
        }
        decodeImageString(data, buf, 0, 0, rect.width, rect.height);
    }
    else {
        //split up the request to to exceed the single transfer limit (for now)
        var x1 = rect.x;
        var ref = alt1.bindRegion(rect.x, rect.y, rect.width, rect.height);
        if (ref <= 0) {
            return null;
        }
        while (x1 < rect.x + rect.width) {
            var x2 = Math.min(rect.x + rect.width, Math.floor(x1 + (maxtransfer / 4 / rect.height)));
            var data = alt1.bindGetRegion(ref, x1, rect.y, x2 - x1, rect.height);
            if (!data) {
                return null;
            }
            decodeImageString(data, buf, x1 - rect.x, 0, x2 - x1, rect.height);
            x1 = x2;
        }
    }
    return buf;
}
/**
 * Makes alt1 bind an area of the rs client in memory without sending it to the js client
 * returns an imgref object which can be used to get pixel data using the imgreftobuf function
 * currently only one bind can exist per app and the ref in (v) will always be 1
 */
function captureHold(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindRegion(x, y, w, h);
    if (r <= 0) {
        throw new Alt1Error("capturehold failed");
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * Same as captureHoldRegion, but captures the screen instead of the rs client. it also uses screen coordinates instead and can capture outside of the rs client
 */
function captureHoldScreen(x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    var r = alt1.bindScreenRegion(x, y, w, h);
    if (r <= 0) {
        return false;
    }
    return new _imgref_js__WEBPACK_IMPORTED_MODULE_1__.ImgRefBind(r, x, y, w, h);
}
/**
 * bind the full rs window if the rs window can be detected by alt1, otherwise return the full screen
 */
function captureHoldFullRs() {
    return captureHold(0, 0, alt1.rsWidth, alt1.rsHeight);
}
/**
 * returns a subregion from a bound image
 * used internally in imgreftobuf if imgref is a bound image
 * @deprecated This should be handled internall by the imgrefbind.toData method
 */
function transferImageData(handle, x, y, w, h) {
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);
    requireAlt1();
    if (alt1.bindGetRegionBuffer) {
        return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(alt1.bindGetRegionBuffer(handle, x, y, w, h), w, h);
    }
    var r = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(w, h);
    var x1 = x;
    while (true) { //split up the request to to exceed the single transfer limit (for now)
        var x2 = Math.min(x + w, Math.floor(x1 + (maxtransfer / 4 / h)));
        var a = alt1.bindGetRegion(handle, x1, y, x2 - x1, h);
        if (!a) {
            throw new Alt1Error();
        }
        decodeImageString(a, r, x1 - x, 0, x2 - x1, h);
        x1 = x2;
        if (x1 == x + w) {
            break;
        }
        ;
    }
    return r;
}
/**
 * decodes a returned string from alt1 to an imagebuffer
 */
function decodeImageString(imagestring, target, x, y, w, h) {
    var bin = atob(imagestring);
    var bytes = target.data;
    w |= 0;
    h |= 0;
    var offset = 4 * x + 4 * y * target.width;
    var target_width = target.width | 0;
    for (var a = 0; a < w; a++) {
        for (var b = 0; b < h; b++) {
            var i1 = (offset + (a * 4 | 0) + (b * target_width * 4 | 0)) | 0;
            var i2 = ((a * 4 | 0) + (b * 4 * w | 0)) | 0;
            bytes[i1 + 0 | 0] = bin.charCodeAt(i2 + 2 | 0); //fix weird red/blue swap in c#
            bytes[i1 + 1 | 0] = bin.charCodeAt(i2 + 1 | 0);
            bytes[i1 + 2 | 0] = bin.charCodeAt(i2 + 0 | 0);
            bytes[i1 + 3 | 0] = bin.charCodeAt(i2 + 3 | 0);
        }
    }
    return target;
}
/**
 * encodes an imagebuffer to a string
 */
function encodeImageString(buf, sx = 0, sy = 0, sw = buf.width, sh = buf.height) {
    var raw = "";
    for (var y = sy; y < sy + sh; y++) {
        for (var x = sx; x < sx + sw; x++) {
            var i = 4 * x + 4 * buf.width * y | 0;
            raw += String.fromCharCode(buf.data[i + 2 | 0]);
            raw += String.fromCharCode(buf.data[i + 1 | 0]);
            raw += String.fromCharCode(buf.data[i + 0 | 0]);
            raw += String.fromCharCode(buf.data[i + 3 | 0]);
        }
    }
    return btoa(raw);
}
/**
 * mixes the given color into a single int. This format is used by alt1
 */
function mixColor(r, g, b, a = 255) {
    return (b << 0) + (g << 8) + (r << 16) + (a << 24);
}
function unmixColor(col) {
    var r = (col >> 16) & 0xff;
    var g = (col >> 8) & 0xff;
    var b = (col >> 0) & 0xff;
    return [r, g, b];
}
function identifyApp(url) {
    if (hasAlt1) {
        alt1.identifyAppUrl(url);
    }
}
function resetEnvironment() {
    hasAlt1 = (typeof alt1 != "undefined");
    skinName = hasAlt1 ? alt1.skinName : "default";
}
function convertAlt1Version(str) {
    var a = str.match(/^(\d+)\.(\d+)\.(\d+)$/);
    if (!a) {
        throw new RangeError("Invalid version string");
    }
    return (+a[1]) * 1000 * 1000 + (+a[2]) * 1000 + (+a[3]) * 1;
}
var cachedVersionInt = -1;
/**
 * checks if alt1 is running and at least the given version. versionstr should be a string with the version eg: 1.3.2
 * @param versionstr
 */
function hasAlt1Version(versionstr) {
    if (!hasAlt1) {
        return false;
    }
    if (cachedVersionInt == -1) {
        cachedVersionInt = alt1.versionint;
    }
    return cachedVersionInt >= convertAlt1Version(versionstr);
}
/**
 * Gets the current cursor position in the game, returns null if the rs window is not active (alt1.rsActive)
 */
function getMousePosition() {
    var pos = alt1.mousePosition;
    if (pos == -1) {
        return null;
    }
    return { x: pos >>> 16, y: pos & 0xFFFF };
}
/**
 * Registers a given HTML element as a frame border, when this element is dragged by the user the Alt1 frame will resize accordingly
 * Use the direction arguements to make a given direction stick to the mouse. eg. Only set left to true to make the element behave as the left border
 * Or set all to true to move the whole window. Not all combinations are permitted
 */
function addResizeElement(el, left, top, right, bot) {
    if (!hasAlt1 || !alt1.userResize) {
        return;
    }
    el.addEventListener("mousedown", function (e) {
        alt1.userResize(left, top, right, bot);
        e.preventDefault();
    });
}
/**
 * Add an event listener
 */
function on(type, listener) {
    if (!hasAlt1) {
        return;
    }
    if (!alt1.events) {
        alt1.events = {};
    }
    if (!alt1.events[type]) {
        alt1.events[type] = [];
    }
    alt1.events[type].push(listener);
}
/**
 * Removes an event listener
 */
function removeListener(type, listener) {
    var elist = hasAlt1 && alt1.events && alt1.events[type];
    if (!elist) {
        return;
    }
    var i = elist.indexOf(listener);
    if (i == -1) {
        return;
    }
    elist.splice(i, 1);
}
/**
 * Listens for the event to fire once and then stops listening
 * @param event
 * @param cb
 */
function once(type, listener) {
    var fn = (e) => {
        removeListener(type, fn);
        listener(e);
    };
    on(type, fn);
}
;
/**
 * Used to read a set of images from a binary stream returned by the Alt1 API
 */
class ImageStreamReader {
    constructor(reader, ...args) {
        this.framebuffer = null;
        this.pos = 0;
        this.reading = false;
        this.closed = false;
        //paused state
        this.pausedindex = -1;
        this.pausedbuffer = null;
        this.streamreader = reader;
        if (args[0] instanceof _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData) {
            this.setFrameBuffer(args[0]);
        }
        else if (typeof args[0] == "number") {
            this.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(args[0], args[1]));
        }
    }
    /**
     *
     */
    setFrameBuffer(buffer) {
        if (this.reading) {
            throw new Error("can't change framebuffer while reading");
        }
        this.framebuffer = buffer;
    }
    /**
     * Closes the underlying stream and ends reading
     */
    close() {
        this.streamreader.cancel();
    }
    /**
     * Reads a single image from the stream
     */
    nextImage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.reading) {
                throw new Error("already reading from this stream");
            }
            if (!this.framebuffer) {
                throw new Error("framebuffer not set");
            }
            this.reading = true;
            var synctime = -Date.now();
            var starttime = Date.now();
            var r = false;
            while (!r) {
                if (this.pausedindex != -1 && this.pausedbuffer) {
                    r = this.readChunk(this.pausedindex, this.framebuffer.data, this.pausedbuffer);
                }
                else {
                    synctime += Date.now();
                    var res = yield this.streamreader.read();
                    synctime -= Date.now();
                    if (res.done) {
                        throw new Error("Stream closed while reading");
                    }
                    var data = res.value;
                    r = this.readChunk(0, this.framebuffer.data, data);
                }
            }
            synctime += Date.now();
            //console.log("Decoded async image, " + this.framebuffer.width + "x" + this.framebuffer.height + " time: " + (Date.now() - starttime) + "ms (" + synctime + "ms main thread)");
            this.reading = false;
            return this.framebuffer;
        });
    }
    readChunk(i, framedata, buffer) {
        //very hot code, explicit int32 casting with |0 speeds it up by ~ x2
        i = i | 0;
        var framesize = framedata.length | 0;
        var pos = this.pos;
        var datalen = buffer.length | 0;
        //var data32 = new Float64Array(buffer.buffer);
        //var framedata32 = new Float64Array(framedata.buffer);
        //fix possible buffer misalignment
        //align to 16 for extra loop unrolling
        while (i < datalen) {
            //slow loop, fix alignment and other issues
            while (i < datalen && pos < framesize && (pos % 16 != 0 || !((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize))) {
                var rel = pos;
                if (pos % 4 == 0) {
                    rel = rel + 2 | 0;
                }
                if (pos % 4 == 2) {
                    rel = rel - 2 | 0;
                }
                framedata[rel | 0] = buffer[i | 0];
                i = i + 1 | 0;
                pos = pos + 1 | 0;
            }
            //fast unrolled loop for large chunks i wish js had some sort of memcpy
            if (pos % 16 == 0) {
                while ((i + 16 | 0) <= datalen && (pos + 16 | 0) <= framesize) {
                    framedata[pos + 0 | 0] = buffer[i + 2 | 0];
                    framedata[pos + 1 | 0] = buffer[i + 1 | 0];
                    framedata[pos + 2 | 0] = buffer[i + 0 | 0];
                    framedata[pos + 3 | 0] = buffer[i + 3 | 0];
                    framedata[pos + 4 | 0] = buffer[i + 6 | 0];
                    framedata[pos + 5 | 0] = buffer[i + 5 | 0];
                    framedata[pos + 6 | 0] = buffer[i + 4 | 0];
                    framedata[pos + 7 | 0] = buffer[i + 7 | 0];
                    framedata[pos + 8 | 0] = buffer[i + 10 | 0];
                    framedata[pos + 9 | 0] = buffer[i + 9 | 0];
                    framedata[pos + 10 | 0] = buffer[i + 8 | 0];
                    framedata[pos + 11 | 0] = buffer[i + 11 | 0];
                    framedata[pos + 12 | 0] = buffer[i + 14 | 0];
                    framedata[pos + 13 | 0] = buffer[i + 13 | 0];
                    framedata[pos + 14 | 0] = buffer[i + 12 | 0];
                    framedata[pos + 15 | 0] = buffer[i + 15 | 0];
                    //could speed it up another x2 but wouldn't be able to swap r/b swap and possible alignment issues
                    //framedata32[pos / 8 + 0 | 0] = data32[i / 8 + 0 | 0];
                    //framedata32[pos / 8 + 1 | 0] = data32[i / 8 + 1 | 0];
                    //framedata32[pos / 4 + 2 | 0] = data32[i / 4 + 2 | 0];
                    //framedata32[pos / 4 + 3 | 0] = data32[i / 4 + 3 | 0];
                    pos = pos + 16 | 0;
                    i = i + 16 | 0;
                }
            }
            if (pos >= framesize) {
                this.pausedbuffer = null;
                this.pausedindex = -1;
                this.pos = 0;
                if (i != buffer.length - 1) {
                    this.pausedbuffer = buffer;
                    this.pausedindex = i;
                }
                return true;
            }
        }
        this.pos = pos;
        this.pausedbuffer = null;
        this.pausedindex = -1;
        return false;
    }
}
/**
 * Asynchronously captures a section of the game screen
 */
function captureAsync(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var rect = _rect_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromArgs(...args);
        if (alt1.captureAsync) {
            let img = yield alt1.captureAsync(rect.x, rect.y, rect.width, rect.height);
            return new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(img, rect.width, rect.height);
        }
        if (!hasAlt1Version("1.4.6")) {
            return capture(rect.x, rect.y, rect.width, rect.height);
        }
        var url = "https://alt1api/pixel/getregion/" + encodeURIComponent(JSON.stringify(Object.assign(Object.assign({}, rect), { format: "raw", quality: 1 })));
        var res = yield fetch(url);
        var imgreader = new ImageStreamReader(res.body.getReader(), rect.width, rect.height);
        return imgreader.nextImage();
    });
}
/**
 * Asynchronously captures multple area's. This method captures the images in the same render frame if possible
 * @param areas
 */
function captureMultiAsync(areas) {
    return __awaiter(this, void 0, void 0, function* () {
        requireAlt1();
        var r = {};
        if (alt1.captureMultiAsync) {
            let bufs = yield alt1.captureMultiAsync(areas);
            for (let a in areas) {
                if (!bufs[a]) {
                    r[a] = null;
                }
                r[a] = new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(bufs[a], areas[a].width, areas[a].height);
            }
            return r;
        }
        var capts = [];
        var captids = [];
        for (var id in areas) {
            if (areas[id]) {
                capts.push(areas[id]);
                captids.push(id);
            }
            else {
                r[id] = null;
            }
        }
        if (capts.length == 0) {
            return r;
        }
        if (!hasAlt1Version("1.5.1")) {
            var proms = [];
            for (var a = 0; a < capts.length; a++) {
                proms.push(captureAsync(capts[a]));
            }
            var results = yield Promise.all(proms);
            for (var a = 0; a < capts.length; a++) {
                r[captids[a]] = results[a];
            }
        }
        else {
            var res = yield fetch("https://alt1api/pixel/getregionmulti/" + encodeURIComponent(JSON.stringify({ areas: capts, format: "raw", quality: 1 })));
            var imgreader = new ImageStreamReader(res.body.getReader());
            for (var a = 0; a < capts.length; a++) {
                var capt = capts[a];
                imgreader.setFrameBuffer(new _imagedata_extensions_js__WEBPACK_IMPORTED_MODULE_2__.ImageData(capt.width, capt.height));
                r[captids[a]] = yield imgreader.nextImage();
            }
        }
        return r;
    });
}
/**
 * Starts capturing a realtime stream of the game. Make sure you keep reading the stream and close it when you're done or Alt1 WILL crash
 * @param framecb Called whenever a new frame is decoded
 * @param errorcb Called whenever an error occurs, the error is rethrown if not defined
 * @param fps Maximum fps of the stream
 */
function captureStream(x, y, width, height, fps, framecb, errorcb) {
    requireAlt1();
    if (!hasAlt1Version("1.4.6")) {
        throw new Alt1Error("This function is not supported in this version of Alt1");
    }
    var url = "https://alt1api/pixel/streamregion/" + encodeURIComponent(JSON.stringify({ x, y, width, height, fps, format: "raw" }));
    var res = fetch(url).then((res) => __awaiter(this, void 0, void 0, function* () {
        var reader = new ImageStreamReader(res.body.getReader(), width, height);
        try {
            while (!reader.closed && !state.closed) {
                var img = yield reader.nextImage();
                if (!state.closed) {
                    framecb(img);
                    state.framenr++;
                }
            }
        }
        catch (e) {
            if (!state.closed) {
                reader.close();
                if (errorcb) {
                    errorcb(e);
                }
                else {
                    throw e;
                }
            }
        }
        if (!reader.closed && state.closed) {
            reader.close();
        }
    }));
    var state = {
        x, y, width, height,
        framenr: 0,
        close: () => { state.closed = true; },
        closed: false,
    };
    return state;
}


/***/ }),

/***/ "./Brothers/Ahrim.data.PNG":
/*!*********************************!*\
  !*** ./Brothers/Ahrim.data.PNG ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAACAAAAAJCAYAAABT2S4KAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAJDSURBVDhPnZRdSBRRFMf/O82u7iqOJhlFHzRQYFJUlBFKVC4ZVCCRRUEEYrtpRCBhZT74opjhU7AQYS+VkBYE9VBEH6CVPSgksb3ttmtpVK6z1fqxu85tznFmMxdB/MHlnPM/596599zL2FxrCwVMYp/9ON/QhNudXaYC9D7uxqlzdQiGh0xlfr5+6EPp4coF1VpIpsXe0l1sb7Q0IflHY5/IVXIw9X0IIpkwlfkp2r0f/jcvFlSbgjpA4+GTp6L24mURiUSEqqqs0QiEwqKr+4GwoDorNzD4Ubzsecv6ys07Od5YUpbKtftuiTEtyvmOe/dFY2s7+6SVHDrKdakOHDlYjps+HzrudMLj9f53ClVdBzlLgc1mw5bC9XAlYqxTd3JcmZCd2RgefM9x/OcwzyW/4kAZCtaokJbIqDp5DHuKt8GxdDk8Z6px4fRx6PHJmSuoq6nGq953mB7/hUfPX+NSfT2Sv8f4I8SVhqvGonHqFmyyHUpWJoQ+zbm2623sU46wdOJsTS2SxprO1Rv4XbS2NEOfiMH/LYrtO4qRiI7ObKDqRCW/AaM7/OiIivJ9bIlAIAB7XoEZmeg6m/7+AdiVfPbnQvMc+SvMCAiGwpCtWqObenwC0tZNRchTFEh2B7eYhte4Ao/Hwx2xkGSH6aUjOZyml87ceWkxnb6x+RqfiNpI4+6zHrjdbuMaNGjRf5sgZseLzRGaFmXL/4H46AikDCfk7FwWLcZDn3hDkyNBZCxbxfdPzI4Xm6OHOvXjC/4CHWwg4z60s1EAAAAASUVORK5CYII=")

/***/ }),

/***/ "./Brothers/Akrisae.data.PNG":
/*!***********************************!*\
  !*** ./Brothers/Akrisae.data.PNG ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAACkAAAAJCAYAAACvzAXAAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAMHSURBVDhPlVRbSFRRFN1zZ8aZMXEcIsF8hK8xU1OZwEYtGgnFLJBIUdQfCyU1MB9NapAklJp+VEJf+mVJ6kdQH/VhkWkKNfZA7G9MJQRB7zilmK/T2XvuvT4QxAWbc87aj7P32ftelT72NBP+LIKMpV8TcKO+Ebqe90oMwNCrPigqr4LJ6RmJ2Ru/v49C6qWcfe0OCoGpBGkLYEu10vrkfiOs/3XRHuFn9IV/czPA1tckZm/EnE2HieGBfe0Oiq0MOYrzc6G8tg5EUYQgo0FiPWCbG7Tiq17OylD2r7s76fWxENxHW8+BSqOFxLgY4mWRfUJDgmF88K3CN9mriJdRdf2aosN4BH2slXkfiyZBqL192cNHHay5pYUZAiOId05Ns/BIM+vs7mF3mtuZ4KVnuiOBxH9xjDG1/hDjoegcERVNfu8+fmIXcguJRzGZTOSD8U5YbYwXQvzCwgLzDwknvrCskvy0Jn/S2e121tLWzkAXl0wGeDkaoDLl4hVKWOt7WElShsbHj4LIfG5eHiUtn7EYTDKroJgtiCJraHrAjp5MIr0h2ExrRd1dNjA4LEVkLDwiknR4/244vn5jSruL83NoJjlPbURkZ6TRiogwR4HT6YT4qHDgyUssgMMxBlrj1lnG+6ERCDgeDxtLbhj/8AZsyUmgEtTUTluKFRoa74HG4MP9HZ5R2twEcdENeQVFoFKpFLEkJnhmEufHZDSCoPVSlKWlpVBSUgIby266FFFUUQ29fX2wuboiMR4IXjvnF4EF8zGAxz0voexmLVReLYSNlSVI4wn29ffD59ERMCecAovFwu/VkU9XTy/cqqkGPhbAXxxizqST8HZbWeezF6y8tp5/6GpqhywInLexH+NKG9s6nrLm1lbSb+d3n3F8tsN6PpNiyaOEwPEQXS4WFhamxCiruS1pPfrkzGzG/5NW/p90wer8LAg6A/CZo6pkLE/9pKpWZid5hUH05a6Jc6Tjs7mDR+ywc88rtgh9QCh/dT11Au0Q5MdbjTo5Bv7+MB+ESqOF/1qG22ueus+qAAAAAElFTkSuQmCC")

/***/ }),

/***/ "./Brothers/Dharok.data.PNG":
/*!**********************************!*\
  !*** ./Brothers/Dharok.data.PNG ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAACkAAAAJCAYAAACvzAXAAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAALoSURBVDhPtVRtSFNhFH7u3femmyMswiz81kIyFoQWkhIGFUGJZoZ9WARWUE0oSipxIamVfzLsw0K0JGdGH4ZCmIikUUtSC8zQyEwQwrnS1M3d3ve91zml/fSByz3Pec7Ze95zzh2nik0Q2h/cxrrYNZhFZ/cnZB03Y+D7IONtz63z+GLB1zk8J7gRYNAjIno1OI5jzxnzKTyrLIfgcrIgqk+NDHr4YsHXObzA8cwQ3DPQBIVDuyoGb/qGUN/QiJP705lGUXjZgokffRj/9hlVZaWSFwhZGYye1ibmp4/lrFlSxM68qK5gfloARXZmOoY+djAffVPuDVoHBc3dvX0rs8UK/4OWjvfYkpICp+MX46GhIZDrDKzTcTER0DrHmZ+OZkfGAfAKJdMOZaTCT5hmGi1Mr1VDrvHDz663SErYgOy9aVgWFg1eJocxwICDqTuRaIpl8bO4UWRB/csmPLxbjpkJhzhuX+B4Gdx/xWLOnc8jY5hmnebkChh0as+tkzcn4lVzCwRBgNFohL+S92jFJcXMpnm5x44iz1II1+9RaIIjme9SaRkOZ+7BzKR4ztcvvcjel4ErZHIynR4yrX5u3AuRvDEeza1tEgP6+/uhMC6VmAS3G+acI0gisXn5BaxjNptNLJBoFDbbBygMS5g9OuaAXsHP+x0j6TanVJHC7YyHR0axs9ZGhUGhF/P+W2HSpnjsIvtQXHIVvEYneUmwXClZc6CXsdbV4V1HOyLj1sNkMpHRqyRVBK/UsPe9mlq225C6TFFAdriislpiIrJO5KLWaoV7epJxVqSd3JC2efbDoMu/LS0TLrIP9DZU94Y3v1B0HTX378A1PoaGR1VEG4PbOcW0hXmv29px7eYtDPd2ez60iyS/8eljyP0DPPGdXT14QnYy/3QO4+R/Ml6QOeyYHB7wVE7BK9VQBa5g+0dBdV+c5lFOwXQyavXyEGYvzKNw/bHDOTri2VtVYBDbPQrveBoDAP8AbTdKymxapfQAAAAASUVORK5CYII=")

/***/ }),

/***/ "./Brothers/Guthan.data.PNG":
/*!**********************************!*\
  !*** ./Brothers/Guthan.data.PNG ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAACoAAAAICAYAAACPp21mAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAK1SURBVDhPrZNdSBRRFMf/M7s766rtukiCSElahqhgapJJ5UdkkQ+VRRKURBZEQSRSqH1IVFDQ9hCmoBIlUqb2UkJBWA+FQqzRly/B2mpRBIs7xpru6tzuvXtndit9qh/cmXvO/5zLzDnnStbsImL64Qejq+U6dm2v4HvGg4En2H/spLAWZ01OFl6/+yAs4MXDXppXh7HxCeH5d2Tx5oc/ezkEc5wDkiTxde92J2JDARGxOF0tLqQmJwkLSHDYMft9AmQuJDz/AWvOenK84Tzp7O4hshJDlMRkEpuaaSzr0hRiW5ZBRt6+J1kbthh+3Wa5OmcuXeWaxztO7vf2CS8h/Y8eG3ksh+k61262/3Ymsyf9KtfYu7hyN9dkiWgoLS5Cb38/6IfCHJ8gfiGMKdYOSTb9VSXd7rzTjTGvF+np6bjYdAqhKR/X09JWGN3JzVxldIaNQ2V1DWSLwrWD1VWIJ0GusTN3bC1H0vI0yCYzjhyuxYmavdCCM5AJDXbSAG12BqY4O09g1B2tReDTKG5cbhYegGjzYhfGsCUZEj3YlrISFnsidzU0NtGfCoJWA5LZAkdcjBFfVrIRTwefgxYNTqcTSxTZ0BoaGzE3PQXaRYx+U1GwthAh1cdmVMIgnc3y0k08UMfV2oHVeYUoWVeAoO+r8Ebwq1NitzAejwcWZ2RuOZrGC8A62NR8AWZbPNxud/gjqcZwu0egROfRQmrBn+HLxD5qT1UVdlZs5prO6fp6Xo35mQC91aPIz8/jfnbL2WIjwYjWopHNithFKGNj1teHV8NDyMgtoHn5dAysQg0jKzaxi2Dc+uySbTh0YB9vN1tf3gzTmXFg0heeOVdbB9paWzH9+SMfhzHvOLTQLNfOXXFxTR+TP6sdbZ+lsXdvtWMuoGKgp4tqqnHOQl3y+1X6BH4BIn9LnzTmbOMAAAAASUVORK5CYII=")

/***/ }),

/***/ "./Brothers/Karil.data.PNG":
/*!*********************************!*\
  !*** ./Brothers/Karil.data.PNG ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAABkAAAAJCAYAAADHP4f4AAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAIDSURBVDhPjZNdSFNhGMf/52w7m8OmQxKELCQxpBJl3kzDphddpTcm6IX0gbBC82IgQhlUXqXgtaAVMs1iohc5QygRUTTiFJUNikBJVJBkbjKZ+zhv5322sw6R4A8OPB/n+T/P+yWYLzrZ8tgQWts9WPu1Ac7iax8GBocx6Z8l/7hsfl7Bpfom0uEamqYICMjNseFwZwMsEYfnThs+ff2GF8ODSB6E0+XH43zNFQSW3pGOXlNtkoIpSVSUXcCtlibc7rgLUbLAYLWh6HQhVhdmEVkP0Nfb7UlXpFY8PfqU4lyU26VOFwSjifJck5Np8vPHdyzNTKGj6x4S+0FIeQUU58u92nwdokmCIAi42dyIbBajHBe2WS0wZmVj68t78mO/t2h6PaLAFDKKS87B7XbjxrWGTAONOlcN3s7NgzEGu92OE5KYmbKvv49s65lS8rW4HpGp02l4/XM4qza7XFmejoDOqLbaifsPH9PEsiynhJTUcLL8EaacPLKPgg5eT2dPL156R5CMRsivUxv4JibwYWUZJeWVcDgc6taZKachSllp6//Qdu2F/t4ifrMm/W/wyNNO/oMnAxh/PoREJAT/K6/6bwhK/JBy+jqO3n827qNz5qjvpIoZwkFEt9dgPnkqczNiu9sQRANM9nwosSjlOZRXt8pSUET2v3V6Px7eRTy4gz/ZRdyQ3uYu+QAAAABJRU5ErkJggg==")

/***/ }),

/***/ "./Brothers/Linza.data.PNG":
/*!*********************************!*\
  !*** ./Brothers/Linza.data.PNG ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAB0AAAAJCAYAAADO1CeCAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAINSURBVDhPpZPfS1NhGMe/52znHCe6OojGMheumpQpwezHnEkqSJBBYNEgTAoLIiLYTWt1MQqii7wS6kK69CLmn1DRTWjEBlp4qaamYcU2L1I3O0/v+7StlQsKP3A43/M853ne87zn+ypGk5/GRobRdz2Embl5FPNxYhxtp89tim8VFVCwfZsT68vzoI1sLvyTxvZuTL1+sSm+ZYymVpr+MEd79nnJUbuXynfvL1yJyfd0INBV0IOPhymZSpNE3gM9Zzn3dOQZx4rZ2XyUGo93c+88sl6+Lyb9O3IHMl8WeVKpz5zsQo3bA9Vmx9UrA7jZfx5WZg03IlFolSYURUEsFkM4HMbi5BtMz86iJ9gPVdM5dynYiwrKQFXIyi1RGrK+5xRwOxLBxrcVOOq8mPqURsvhI8imv3JOr3Lh7sNB2MqdeDT0BJpZA0W1ofNEO56/fAUxKEzTRKWuQiXxBf9KPJ6ALpoVELVWZpVlR5sf92+FEOy7yM+aswqhawPoCPhxJ3oPdkeFqI/zEGyk/0HVHTn1i3p3HYYeROFqaEY2uQyjupbjnWLB2Ogo3o6PwXuoBT6fT2y1AZQdPMYm+ZO8efIGK9YyJ02SmHhHil0rWX/qwmU2Wh5pqGQqRR6Ph8Q5bSXbShJrSzNsimJEc44b1bsgmv+mJdJg658XUOaqL1lv7HDzf5U5CddZFn4AFk8rMWDxsTkAAAAASUVORK5CYII=")

/***/ }),

/***/ "./Brothers/Torag.data.PNG":
/*!*********************************!*\
  !*** ./Brothers/Torag.data.PNG ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAACIAAAAMCAYAAAAH4W+EAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAKmSURBVDhPvZRfSNNRFMe/v9/+uambIyxCLXQh9RAE60UKSV+CiB6SOedLpQb1ag89jP6pCBnq0wpJjVCUnEVhWcuoKEklFpVR1ENNMI1C3LTJdHPrnvP7TSmivaQfuPvdc79n957fOef+pIQAf+HMxRa0XGlXrbVHMm3dkViY+ICCggIMDQ3BZrOpEqCzboTOvEG11haZfkQwMOZsg6TV8SCbRjKIqspyfH0zinDgPT/JTjI84MXd7g7Wsixm5G/Jw7tnPrZp1J+uVT0VujytKxr50f8JDuRflOwtQpXLgU227ZA1WlizLDhadgjF9p2s0+FmUxq0xgxMvR3D50AAByuOQNbpIUkSjlWUISOxxL61J2sQDIWgTbew1tfbA0uGCZHpL6kDOXWiBu76RsTmZ2HMK+RMnWv1oLrSieVImH2aLjUhEV9mTZI1KN1XjEePn4Laz2q1IlMvs166pwher1f4yOz7fPyTCEjRUgYyG5qDWSdzvySxiixIeoMILsi23/8KOotSRnrrEnGg+3wdZ8nv9/NBiMdZjy9FoEk385wRmSFSBtLZ24fGhnqxg9hMpU7UveN6t2opyHojP/mt+/vxcnQEhbt2w263izIZWLs16MPx6iqeE4cP7FdnfwQSDIbU2SpPhkfQfLkN0x/HV5rsrLjaD+7chDYzS9R8TvVUoGvfe+0qYuEQ7t3o4p6IRxdZ6+zpQ2ByCpFvE7wP9Z9IF2t8fXkmSMSiWPwxibTN+erKKrGfQURnvytpFhiyc6AxKSmmZjNk5/KNIyj9tEbwmigL7ZnUaZ/o3AwcDgcc5U44Xa7fA1kPqIfoQ0nXvMvTAveFBjy8P5i6R/43+Xm5mHz9AgPd7Wj2tME3cJtLvO4ZIZZmprG8MC86VIZe3EaNyYxf3GgHh4tNoSoAAAAASUVORK5CYII=")

/***/ }),

/***/ "./Brothers/Verac.data.PNG":
/*!*********************************!*\
  !*** ./Brothers/Verac.data.PNG ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAB8AAAAJCAYAAADKIfe/AAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAAJgSURBVDhPrVNdSJNhFD7fftymMpXhQpar/casoOhmTiLsIhG7iGhjqUGYEI4uSoIVBoURFCRddekI+pGM7CITB2lgWjf7Zoh02d+NELjN4WQ4t9N7zr7vQ7r2gfNx3uc87znve877SaajISyuLEHdwTbYjedPn8C7mVmY+pBUmL2Hjj6fFr9CyOdgQsX5ni6YeJaA8lZeYfYeXDwxMQmR6EUoFwtMDvRGIPFqkgvra60wPDQIhV/f2aZfjLOGsPj+Da+Jb2ywgsvZCqsLSU17Pz6sKKugvGqMdEBtrz0QQIKhvpH99MoqBk938bo/dh3nP39BY5MdxX6Mx+P46PEY6378/oMpOY16cx3HLK1+bGvvRMlg5HUmk0G708Panr4BzlNja+GY2+1GMB8JcnD85WsMh8PsZ3MbqKsxo7nFxRv+h7z8DY1WGxePRKOspX1k127fxbmFJUWJ6PH6+FBvp2exO9zLB1W1OpS48zA1k4SrQzG4caWfW447JRBJIbuRh2jfJZAkSbMTx49pI5LlNBgbbOzTeDo72mHk3igYLPUiJgNWygCVCjSJsZS3NsGgaBlq28kyuRyf1u7y882Io3bJ6WU0NTt4ffjkGTby6eYenx8tDi+vqUvRy4Mo3gkGgqc4l/dQgOM0vo9z82ja59TyaG0nu/NwDFMpWZufysdu3uJEBCoY6j7HCelt7C7ecfaCoqrqsuIyNFs1PjL6QIlW4/yf6/PZahsESvl1KBfyIOatMFXsbOZge32NffGgwNS8n8dSXPvJPnGEynaROQJzouWUS41T/lL2r/AA/gEaMI43x/qR5wAAAABJRU5ErkJggg==")

/***/ }),

/***/ "./Misc/DoorLock.data.PNG":
/*!********************************!*\
  !*** ./Misc/DoorLock.data.PNG ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./Misc/Slain.data.PNG":
/*!*****************************!*\
  !*** ./Misc/Slain.data.PNG ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("iVBORw0KGgoAAAANSUhEUgAAAFoAAAAQCAYAAACWa2gIAAAAAW5vUEUAYtdMlAAAAARub1BFAAAAAEEgjiIAAAAJbm9QRQAAAAAAAAAAAKGKctUAAARPSURBVFhH7ZhpS5VBFMdvq6YpmWXYJlJJli0SYlpEq2abJZUVWdA1ihahICqLiLo3qBdpVLTvSEG2v6qI3kX1Afo60/2dOsM84zya0ELgiz/PzNnmnP/MnLmayFmw0oDcmjqTV71CxjrXr4t+6Wvr4/UZXQ89MsfX14vMjd2X3tH10P/8RvQZ2W/Te+snsivmm5yS8gH8YQwQ/ZeQyJpVa7o+fYug8+VHs3JXW9Dhd4A1mg62B3X/AuSz5+yloM4HtidvPAnqeoMlui3VYZY2bhYcv3RHZHOXrQ469QclVYvNmBlVERmx125vNcMKiiLyfwXySR49bYaOHBXUu2BDyH1Idm5QHwdLtDjn5JvhhcWmoKTMyrLGTQ46/iqI07T/qBkxqSwi+1+JBtj9Su5S+8+bKz3aL5wT6MoYs5NcGdqKBsIO+a33XwWM3dNbvniNLWLukgYrR7Zl32Gz+9R58dP4qgfcBNZDd67rjZm3pjni7+eDnjE65PirvSLOhrlPNATF2TLXccuxtDl08XawDsYVVTXCYaR1rNialN5MIBxz8/It0aD9ygOzfON2M2joMAkEAZ0vPprG5AGzrmW36eh+Z9IPntvTq4kqJs6utglKvKsPzfLNO03y2BmZ165qsknie+L6YzN7wRIh4ebbz2b0lBlRfycf8j1xrcssa9oqteSPLTYjJky18UCcDbF8ouFg2+GTYtvR/da0X75vbWmttA6bB3Vs2hGsg5h0heBjCFrb02bQ4CFCGvPU3acmkUjIArSXRc1JkU+pqJRC2ZBpVQtFNr9urV2IOTcDX6DJ+vHULmvsBBubIiG6sq7xx3x9c2w+bEzqXrcpLi2TOW3QbVcgzoZ4odbBRkybV5u5eRfERsl1iWYcV4cbK9KjlYzqpfUim7Mo8wdMxogxV33w8GzryNVCjn12camV+wvpXNuSyvx4rp3G9oFei/H9aVPcKHR7znRYuYs4G+Y+0Vx75C6ola9LNDkxdmP59YII0T4ZyDj2Vp9faPX0O+Sl02damfZk7UtunFBsN55rR/tiXjR+kt18BfqQP2DDuQXoaUmurjcbxi7Ruj4HjTXZVOaM+fpEB2vLyNgsfVvsY+j2aJo7MkiMFOYEBOlHr6R3bth3xD4e5x69loT01wp9nB5HbH0o+0qQeefzD+JXv3O/xCaO+yD5/uix09vAz1ROv+p7s6F304qmVv74402JRl/Xstc+dP0lmjHvV2yPpsiahg0SmBOAzA8IIK71eErIvvnui/yKGFlQ2ONKp+4/kxj8Ltee2FuCzCG1Ld0pcmLzMOUVFtke7/tDHnmgIw9y94mOs4FY5NSibZC+jAwutEf3l2jm+DAWolXgggfObejqoHMFxHHleDgBY/8RInnIJ4ae9FA8XwapPFiSTyY2rUJjh/yZY4fOf9j6soFwzV9ltq4MF4zxQc5X+3Ioj6Bs4H8dfwf2RA/gT6LcfAe/KWxUtK7rUgAAAABJRU5ErkJggg==")

/***/ }),

/***/ "./Puzzles/CirTriMiddle.data.PNG":
/*!***************************************!*\
  !*** ./Puzzles/CirTriMiddle.data.PNG ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./Puzzles/CornMiddle.data.PNG":
/*!*************************************!*\
  !*** ./Puzzles/CornMiddle.data.PNG ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./Puzzles/SquareMiddle.data.PNG":
/*!***************************************!*\
  !*** ./Puzzles/SquareMiddle.data.PNG ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "./Puzzles/TopMiddle.data.PNG":
/*!************************************!*\
  !*** ./Puzzles/TopMiddle.data.PNG ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=(__webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js").ImageDetect.imageDataFromBase64)("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")

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json":
/*!**********************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "appconfig.json");

/***/ }),

/***/ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html":
/*!******************************************************************************!*\
  !*** ../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "index.html");

/***/ }),

/***/ "../../../../node_modules/canvas/browser.js":
/*!**************************************************!*\
  !*** ../../../../node_modules/canvas/browser.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* globals document, ImageData */

const parseFont = __webpack_require__(/*! ./lib/parse-font */ "../../../../node_modules/canvas/lib/parse-font.js")

exports.parseFont = parseFont

exports.createCanvas = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width: width, height: height })
}

exports.createImageData = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
}

exports.loadImage = function (src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement('img'), options)

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = function () { cleanup(); resolve(image) }
    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image "' + src + '"')) }

    image.src = src
  })
}


/***/ }),

/***/ "../../../../node_modules/canvas/lib/parse-font.js":
/*!*********************************************************!*\
  !*** ../../../../node_modules/canvas/lib/parse-font.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
  , styles = 'italic|oblique'
  , variants = 'small-caps'
  , stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
  , units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
  , string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+'

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp('(' + weights + ') +', 'i')
const styleRe = new RegExp('(' + styles + ') +', 'i')
const variantRe = new RegExp('(' + variants + ') +', 'i')
const stretchRe = new RegExp('(' + stretches + ') +', 'i')
const sizeFamilyRe = new RegExp(
  '([\\d\\.]+)(' + units + ') *'
  + '((?:' + string + ')( *, *(?:' + string + '))*)')

/**
 * Cache font parsing.
 */

const cache = {}

const defaultHeight = 16 // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = function (str) {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str)
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  }

  // Optional, unordered properties.
  let weight, style, variant, stretch
  // Stop search at `sizeFamily.index`
  let substr = str.substring(0, sizeFamily.index)
  if ((weight = weightRe.exec(substr))) font.weight = weight[1]
  if ((style = styleRe.exec(substr))) font.style = style[1]
  if ((variant = variantRe.exec(substr))) font.variant = variant[1]
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75
      break
    case 'pc':
      font.size *= 16
      break
    case 'in':
      font.size *= 96
      break
    case 'cm':
      font.size *= 96.0 / 2.54
      break
    case 'mm':
      font.size *= 96.0 / 25.4
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75
      break
    case 'q':
      font.size *= 96 / 25.4 / 4
      break
  }

  return (cache[str] = font)
}


/***/ }),

/***/ "../../../../node_modules/resemblejs/resemble.js":
/*!*******************************************************!*\
  !*** ../../../../node_modules/resemblejs/resemble.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
James Cryer / Huddle
URL: https://github.com/Huddle/Resemble.js
*/

var naiveFallback = function () {
    // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
    if (typeof self === "object" && self) {
        return self;
    }
    if (typeof window === "object" && window) {
        return window;
    }
    throw new Error("Unable to resolve global `this`");
};

var getGlobalThis = function () {
    // ISC (c) 2011-2019 https://github.com/medikoo/es5-ext/blob/master/global.js
    // Fallback to standard globalThis if available
    if (typeof globalThis === "object" && globalThis) {
        return globalThis;
    }

    try {
        Object.defineProperty(Object.prototype, "__global__", {
            get: function () {
                return this;
            },
            configurable: true
        });
    } catch (error) {
        return naiveFallback();
    }
    try {
        // eslint-disable-next-line no-undef
        if (!__global__) {
            return naiveFallback();
        }
        return __global__; // eslint-disable-line no-undef
    } finally {
        delete Object.prototype.__global__;
    }
};

var isNode = function () {
    const globalPolyfill = getGlobalThis();
    return typeof globalPolyfill.process !== "undefined" && globalPolyfill.process.versions && globalPolyfill.process.versions.node;
};

(function (root, factory) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(this /* eslint-disable-line no-invalid-this*/, function () {
    "use strict";

    var Img;
    var Canvas;
    var loadNodeCanvasImage;

    if (isNode()) {
        Canvas = __webpack_require__(/*! canvas */ "../../../../node_modules/canvas/browser.js"); // eslint-disable-line global-require
        Img = Canvas.Image;
        loadNodeCanvasImage = Canvas.loadImage;
    } else {
        Img = Image;
    }

    function createCanvas(width, height) {
        if (isNode()) {
            return Canvas.createCanvas(width, height);
        }

        var cnvs = document.createElement("canvas");
        cnvs.width = width;
        cnvs.height = height;
        return cnvs;
    }

    var oldGlobalSettings = {};
    var globalOutputSettings = oldGlobalSettings;

    var resemble = function (fileData) {
        var pixelTransparency = 1;

        var errorPixelColor = {
            // Color for Error Pixels. Between 0 and 255.
            red: 255,
            green: 0,
            blue: 255,
            alpha: 255
        };

        var targetPix = { r: 0, g: 0, b: 0, a: 0 }; // isAntialiased

        var errorPixelTransform = {
            flat: function (px, offset) {
                px[offset] = errorPixelColor.red;
                px[offset + 1] = errorPixelColor.green;
                px[offset + 2] = errorPixelColor.blue;
                px[offset + 3] = errorPixelColor.alpha;
            },
            movement: function (px, offset, d1, d2) {
                px[offset] = (d2.r * (errorPixelColor.red / 255) + errorPixelColor.red) / 2;
                px[offset + 1] = (d2.g * (errorPixelColor.green / 255) + errorPixelColor.green) / 2;
                px[offset + 2] = (d2.b * (errorPixelColor.blue / 255) + errorPixelColor.blue) / 2;
                px[offset + 3] = d2.a;
            },
            flatDifferenceIntensity: function (px, offset, d1, d2) {
                px[offset] = errorPixelColor.red;
                px[offset + 1] = errorPixelColor.green;
                px[offset + 2] = errorPixelColor.blue;
                px[offset + 3] = colorsDistance(d1, d2);
            },
            movementDifferenceIntensity: function (px, offset, d1, d2) {
                var ratio = (colorsDistance(d1, d2) / 255) * 0.8;

                px[offset] = (1 - ratio) * (d2.r * (errorPixelColor.red / 255)) + ratio * errorPixelColor.red;
                px[offset + 1] = (1 - ratio) * (d2.g * (errorPixelColor.green / 255)) + ratio * errorPixelColor.green;
                px[offset + 2] = (1 - ratio) * (d2.b * (errorPixelColor.blue / 255)) + ratio * errorPixelColor.blue;
                px[offset + 3] = d2.a;
            },
            diffOnly: function (px, offset, d1, d2) {
                px[offset] = d2.r;
                px[offset + 1] = d2.g;
                px[offset + 2] = d2.b;
                px[offset + 3] = d2.a;
            }
        };

        var errorPixel = errorPixelTransform.flat;
        var errorType;
        var boundingBoxes;
        var ignoredBoxes;
        var ignoreAreasColoredWith;
        var largeImageThreshold = 1200;
        var useCrossOrigin = true;
        var data = {};
        var images = [];
        var updateCallbackArray = [];

        var tolerance = {
            // between 0 and 255
            red: 16,
            green: 16,
            blue: 16,
            alpha: 16,
            minBrightness: 16,
            maxBrightness: 240
        };

        var ignoreAntialiasing = false;
        var ignoreColors = false;
        var scaleToSameSize = false;
        var compareOnly = false;
        var returnEarlyThreshold;

        function colorsDistance(c1, c2) {
            return (Math.abs(c1.r - c2.r) + Math.abs(c1.g - c2.g) + Math.abs(c1.b - c2.b)) / 3;
        }

        function withinBoundingBox(x, y, width, height, box) {
            return x > (box.left || 0) && x < (box.right || width) && y > (box.top || 0) && y < (box.bottom || height);
        }

        function withinComparedArea(x, y, width, height, pixel2) {
            var isIncluded = true;
            var i;
            var boundingBox;
            var ignoredBox;
            var selected;
            var ignored;

            if (boundingBoxes instanceof Array) {
                selected = false;
                for (i = 0; i < boundingBoxes.length; i++) {
                    boundingBox = boundingBoxes[i];
                    if (withinBoundingBox(x, y, width, height, boundingBox)) {
                        selected = true;
                        break;
                    }
                }
            }
            if (ignoredBoxes instanceof Array) {
                ignored = true;
                for (i = 0; i < ignoredBoxes.length; i++) {
                    ignoredBox = ignoredBoxes[i];
                    if (withinBoundingBox(x, y, width, height, ignoredBox)) {
                        ignored = false;
                        break;
                    }
                }
            }

            if (ignoreAreasColoredWith) {
                return colorsDistance(pixel2, ignoreAreasColoredWith) !== 0;
            }

            if (selected === undefined && ignored === undefined) {
                return true;
            }
            if (selected === false && ignored === true) {
                return false;
            }
            if (selected === true || ignored === true) {
                isIncluded = true;
            }
            if (selected === false || ignored === false) {
                isIncluded = false;
            }
            return isIncluded;
        }

        function triggerDataUpdate() {
            var len = updateCallbackArray.length;
            var i;
            for (i = 0; i < len; i++) {
                if (typeof updateCallbackArray[i] === "function") {
                    updateCallbackArray[i](data);
                }
            }
        }

        function loop(w, h, callback) {
            var x;
            var y;

            for (x = 0; x < w; x++) {
                for (y = 0; y < h; y++) {
                    callback(x, y);
                }
            }
        }

        function parseImage(sourceImageData, width, height) {
            var pixelCount = 0;
            var redTotal = 0;
            var greenTotal = 0;
            var blueTotal = 0;
            var alphaTotal = 0;
            var brightnessTotal = 0;
            var whiteTotal = 0;
            var blackTotal = 0;

            loop(width, height, function (horizontalPos, verticalPos) {
                var offset = (verticalPos * width + horizontalPos) * 4;
                var red = sourceImageData[offset];
                var green = sourceImageData[offset + 1];
                var blue = sourceImageData[offset + 2];
                var alpha = sourceImageData[offset + 3];
                var brightness = getBrightness(red, green, blue);

                if (red === green && red === blue && alpha) {
                    if (red === 0) {
                        blackTotal++;
                    } else if (red === 255) {
                        whiteTotal++;
                    }
                }

                pixelCount++;

                redTotal += (red / 255) * 100;
                greenTotal += (green / 255) * 100;
                blueTotal += (blue / 255) * 100;
                alphaTotal += ((255 - alpha) / 255) * 100;
                brightnessTotal += (brightness / 255) * 100;
            });

            data.red = Math.floor(redTotal / pixelCount);
            data.green = Math.floor(greenTotal / pixelCount);
            data.blue = Math.floor(blueTotal / pixelCount);
            data.alpha = Math.floor(alphaTotal / pixelCount);
            data.brightness = Math.floor(brightnessTotal / pixelCount);
            data.white = Math.floor((whiteTotal / pixelCount) * 100);
            data.black = Math.floor((blackTotal / pixelCount) * 100);

            triggerDataUpdate();
        }

        function onLoadImage(hiddenImage, callback) {
            // don't assign to hiddenImage, see https://github.com/Huddle/Resemble.js/pull/87/commits/300d43352a2845aad289b254bfbdc7cd6a37e2d7
            var width = hiddenImage.width;
            var height = hiddenImage.height;

            if (scaleToSameSize && images.length === 1) {
                width = images[0].width;
                height = images[0].height;
            }

            var hiddenCanvas = createCanvas(width, height);
            var imageData;

            hiddenCanvas.getContext("2d").drawImage(hiddenImage, 0, 0, width, height);
            imageData = hiddenCanvas.getContext("2d").getImageData(0, 0, width, height);

            images.push(imageData);

            callback(imageData, width, height);
        }

        function loadImageData(fileDataForImage, callback) {
            var fileReader;
            var hiddenImage = new Img();

            if (!hiddenImage.setAttribute) {
                hiddenImage.setAttribute = function setAttribute() {};
            }

            if (useCrossOrigin) {
                hiddenImage.setAttribute("crossorigin", "anonymous");
            }

            hiddenImage.onerror = function (err) {
                hiddenImage.onload = null;
                hiddenImage.onerror = null; // fixes pollution between calls
                images.push({ error: err ? err + "" : "Image load error." });
                callback();
            };

            hiddenImage.onload = function () {
                hiddenImage.onload = null; // fixes pollution between calls
                hiddenImage.onerror = null;
                onLoadImage(hiddenImage, callback);
            };

            if (typeof fileDataForImage === "string") {
                hiddenImage.src = fileDataForImage;
                if (!isNode() && hiddenImage.complete && hiddenImage.naturalWidth > 0) {
                    hiddenImage.onload();
                }
            } else if (
                typeof fileDataForImage.data !== "undefined" &&
                typeof fileDataForImage.width === "number" &&
                typeof fileDataForImage.height === "number"
            ) {
                images.push(fileDataForImage);

                callback(fileDataForImage, fileDataForImage.width, fileDataForImage.height);
            } else if (typeof Buffer !== "undefined" && fileDataForImage instanceof Buffer) {
                // If we have Buffer, assume we're on Node+Canvas and its supported
                // hiddenImage.src = fileDataForImage;

                loadNodeCanvasImage(fileDataForImage)
                    .then(function (image) {
                        hiddenImage.onload = null; // fixes pollution between calls
                        hiddenImage.onerror = null;
                        onLoadImage(image, callback);
                    })
                    .catch(function (err) {
                        images.push({
                            error: err ? err + "" : "Image load error."
                        });
                        callback();
                    });
            } else {
                fileReader = new FileReader();
                fileReader.onload = function (event) {
                    hiddenImage.src = event.target.result;
                };
                fileReader.readAsDataURL(fileDataForImage);
            }
        }

        function isColorSimilar(a, b, color) {
            var absDiff = Math.abs(a - b);

            if (typeof a === "undefined") {
                return false;
            }
            if (typeof b === "undefined") {
                return false;
            }

            if (a === b) {
                return true;
            } else if (absDiff < tolerance[color]) {
                return true;
            }
            return false;
        }

        function isPixelBrightnessSimilar(d1, d2) {
            var alpha = isColorSimilar(d1.a, d2.a, "alpha");
            var brightness = isColorSimilar(d1.brightness, d2.brightness, "minBrightness");
            return brightness && alpha;
        }

        function getBrightness(r, g, b) {
            return 0.3 * r + 0.59 * g + 0.11 * b;
        }

        function isRGBSame(d1, d2) {
            var red = d1.r === d2.r;
            var green = d1.g === d2.g;
            var blue = d1.b === d2.b;
            return red && green && blue;
        }

        function isRGBSimilar(d1, d2) {
            var red = isColorSimilar(d1.r, d2.r, "red");
            var green = isColorSimilar(d1.g, d2.g, "green");
            var blue = isColorSimilar(d1.b, d2.b, "blue");
            var alpha = isColorSimilar(d1.a, d2.a, "alpha");

            return red && green && blue && alpha;
        }

        function isContrasting(d1, d2) {
            return Math.abs(d1.brightness - d2.brightness) > tolerance.maxBrightness;
        }

        function getHue(red, green, blue) {
            var r = red / 255;
            var g = green / 255;
            var b = blue / 255;
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var h;
            var d;

            if (max === min) {
                h = 0; // achromatic
            } else {
                d = max - min;
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                    default:
                        h /= 6;
                }
            }

            return h;
        }

        function isAntialiased(sourcePix, pix, cacheSet, verticalPos, horizontalPos, width) {
            var offset;
            var distance = 1;
            var i;
            var j;
            var hasHighContrastSibling = 0;
            var hasSiblingWithDifferentHue = 0;
            var hasEquivalentSibling = 0;

            addHueInfo(sourcePix);

            for (i = distance * -1; i <= distance; i++) {
                for (j = distance * -1; j <= distance; j++) {
                    if (i === 0 && j === 0) {
                        // ignore source pixel
                    } else {
                        offset = ((verticalPos + j) * width + (horizontalPos + i)) * 4;

                        if (!getPixelInfo(targetPix, pix, offset, cacheSet)) {
                            continue;
                        }

                        addBrightnessInfo(targetPix);
                        addHueInfo(targetPix);

                        if (isContrasting(sourcePix, targetPix)) {
                            hasHighContrastSibling++;
                        }

                        if (isRGBSame(sourcePix, targetPix)) {
                            hasEquivalentSibling++;
                        }

                        if (Math.abs(targetPix.h - sourcePix.h) > 0.3) {
                            hasSiblingWithDifferentHue++;
                        }

                        if (hasSiblingWithDifferentHue > 1 || hasHighContrastSibling > 1) {
                            return true;
                        }
                    }
                }
            }

            if (hasEquivalentSibling < 2) {
                return true;
            }

            return false;
        }

        function copyPixel(px, offset, pix) {
            if (errorType === "diffOnly") {
                return;
            }

            px[offset] = pix.r; // r
            px[offset + 1] = pix.g; // g
            px[offset + 2] = pix.b; // b
            px[offset + 3] = pix.a * pixelTransparency; // a
        }

        function copyGrayScalePixel(px, offset, pix) {
            if (errorType === "diffOnly") {
                return;
            }

            px[offset] = pix.brightness; // r
            px[offset + 1] = pix.brightness; // g
            px[offset + 2] = pix.brightness; // b
            px[offset + 3] = pix.a * pixelTransparency; // a
        }

        function getPixelInfo(dst, pix, offset) {
            if (pix.length > offset) {
                dst.r = pix[offset];
                dst.g = pix[offset + 1];
                dst.b = pix[offset + 2];
                dst.a = pix[offset + 3];

                return true;
            }

            return false;
        }

        function addBrightnessInfo(pix) {
            pix.brightness = getBrightness(pix.r, pix.g, pix.b); // 'corrected' lightness
        }

        function addHueInfo(pix) {
            pix.h = getHue(pix.r, pix.g, pix.b);
        }

        function analyseImages(img1, img2, width, height) {
            var data1 = img1.data;
            var data2 = img2.data;
            var hiddenCanvas;
            var context;
            var imgd;
            var pix;

            if (!compareOnly) {
                hiddenCanvas = createCanvas(width, height);

                context = hiddenCanvas.getContext("2d");
                imgd = context.createImageData(width, height);
                pix = imgd.data;
            }

            var mismatchCount = 0;
            var diffBounds = {
                top: height,
                left: width,
                bottom: 0,
                right: 0
            };
            var updateBounds = function (x, y) {
                diffBounds.left = Math.min(x, diffBounds.left);
                diffBounds.right = Math.max(x, diffBounds.right);
                diffBounds.top = Math.min(y, diffBounds.top);
                diffBounds.bottom = Math.max(y, diffBounds.bottom);
            };

            var time = Date.now();

            var skip;

            if (!!largeImageThreshold && ignoreAntialiasing && (width > largeImageThreshold || height > largeImageThreshold)) {
                skip = 6;
            }

            var pixel1 = { r: 0, g: 0, b: 0, a: 0 };
            var pixel2 = { r: 0, g: 0, b: 0, a: 0 };

            var skipTheRest = false;

            loop(width, height, function (horizontalPos, verticalPos) {
                if (skipTheRest) {
                    return;
                }

                if (skip) {
                    // only skip if the image isn't small
                    if (verticalPos % skip === 0 || horizontalPos % skip === 0) {
                        return;
                    }
                }

                var offset = (verticalPos * width + horizontalPos) * 4;
                if (!getPixelInfo(pixel1, data1, offset, 1) || !getPixelInfo(pixel2, data2, offset, 2)) {
                    return;
                }

                var isWithinComparedArea = withinComparedArea(horizontalPos, verticalPos, width, height, pixel2);

                if (ignoreColors) {
                    addBrightnessInfo(pixel1);
                    addBrightnessInfo(pixel2);

                    if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                        if (!compareOnly) {
                            copyGrayScalePixel(pix, offset, pixel2);
                        }
                    } else {
                        if (!compareOnly) {
                            errorPixel(pix, offset, pixel1, pixel2);
                        }

                        mismatchCount++;
                        updateBounds(horizontalPos, verticalPos);
                    }
                    return;
                }

                if (isRGBSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                    if (!compareOnly) {
                        copyPixel(pix, offset, pixel1);
                    }
                } else if (
                    ignoreAntialiasing &&
                    (addBrightnessInfo(pixel1), // jit pixel info augmentation looks a little weird, sorry.
                    addBrightnessInfo(pixel2),
                    isAntialiased(pixel1, data1, 1, verticalPos, horizontalPos, width) || isAntialiased(pixel2, data2, 2, verticalPos, horizontalPos, width))
                ) {
                    if (isPixelBrightnessSimilar(pixel1, pixel2) || !isWithinComparedArea) {
                        if (!compareOnly) {
                            copyGrayScalePixel(pix, offset, pixel2);
                        }
                    } else {
                        if (!compareOnly) {
                            errorPixel(pix, offset, pixel1, pixel2);
                        }

                        mismatchCount++;
                        updateBounds(horizontalPos, verticalPos);
                    }
                } else {
                    if (!compareOnly) {
                        errorPixel(pix, offset, pixel1, pixel2);
                    }

                    mismatchCount++;
                    updateBounds(horizontalPos, verticalPos);
                }

                if (compareOnly) {
                    var currentMisMatchPercent = (mismatchCount / (height * width)) * 100;

                    if (currentMisMatchPercent > returnEarlyThreshold) {
                        skipTheRest = true;
                    }
                }
            });

            data.rawMisMatchPercentage = (mismatchCount / (height * width)) * 100;
            data.misMatchPercentage = data.rawMisMatchPercentage.toFixed(2);
            data.diffBounds = diffBounds;
            data.analysisTime = Date.now() - time;

            data.getImageDataUrl = function (text) {
                if (compareOnly) {
                    throw Error("No diff image available - ran in compareOnly mode");
                }

                var barHeight = 0;

                if (text) {
                    barHeight = addLabel(text, context, hiddenCanvas);
                }

                context.putImageData(imgd, 0, barHeight);

                return hiddenCanvas.toDataURL("image/png");
            };

            if (!compareOnly && hiddenCanvas.toBuffer) {
                data.getBuffer = function (includeOriginal) {
                    if (includeOriginal) {
                        var imageWidth = hiddenCanvas.width + 2;
                        hiddenCanvas.width = imageWidth * 3;
                        context.putImageData(img1, 0, 0);
                        context.putImageData(img2, imageWidth, 0);
                        context.putImageData(imgd, imageWidth * 2, 0);
                    } else {
                        context.putImageData(imgd, 0, 0);
                    }
                    return hiddenCanvas.toBuffer();
                };
            }
        }

        function addLabel(text, context, hiddenCanvas) {
            var textPadding = 2;

            context.font = "12px sans-serif";

            var textWidth = context.measureText(text).width + textPadding * 2;
            var barHeight = 22;

            if (textWidth > hiddenCanvas.width) {
                hiddenCanvas.width = textWidth;
            }

            hiddenCanvas.height += barHeight;

            context.fillStyle = "#666";
            context.fillRect(0, 0, hiddenCanvas.width, barHeight - 4);
            context.fillStyle = "#fff";
            context.fillRect(0, barHeight - 4, hiddenCanvas.width, 4);

            context.fillStyle = "#fff";
            context.textBaseline = "top";
            context.font = "12px sans-serif";
            context.fillText(text, textPadding, 1);

            return barHeight;
        }

        function normalise(img, w, h) {
            var c;
            var context;

            if (img.height < h || img.width < w) {
                c = createCanvas(w, h);
                context = c.getContext("2d");
                context.putImageData(img, 0, 0);
                return context.getImageData(0, 0, w, h);
            }

            return img;
        }

        function outputSettings(options) {
            var key;

            if (options.errorColor) {
                for (key in options.errorColor) {
                    if (options.errorColor.hasOwnProperty(key)) {
                        errorPixelColor[key] = options.errorColor[key] === void 0 ? errorPixelColor[key] : options.errorColor[key];
                    }
                }
            }

            if (options.errorType && errorPixelTransform[options.errorType]) {
                errorPixel = errorPixelTransform[options.errorType];
                errorType = options.errorType;
            }

            if (options.errorPixel && typeof options.errorPixel === "function") {
                errorPixel = options.errorPixel;
            }

            pixelTransparency = isNaN(Number(options.transparency)) ? pixelTransparency : options.transparency;

            if (options.largeImageThreshold !== undefined) {
                largeImageThreshold = options.largeImageThreshold;
            }

            if (options.useCrossOrigin !== undefined) {
                useCrossOrigin = options.useCrossOrigin;
            }

            if (options.boundingBox !== undefined) {
                boundingBoxes = [options.boundingBox];
            }

            if (options.ignoredBox !== undefined) {
                ignoredBoxes = [options.ignoredBox];
            }

            if (options.boundingBoxes !== undefined) {
                boundingBoxes = options.boundingBoxes;
            }

            if (options.ignoredBoxes !== undefined) {
                ignoredBoxes = options.ignoredBoxes;
            }

            if (options.ignoreAreasColoredWith !== undefined) {
                ignoreAreasColoredWith = options.ignoreAreasColoredWith;
            }
        }

        function compare(one, two) {
            if (globalOutputSettings !== oldGlobalSettings) {
                outputSettings(globalOutputSettings);
            }

            function onceWeHaveBoth() {
                var width;
                var height;
                if (images.length === 2) {
                    if (images[0].error || images[1].error) {
                        data = {};
                        data.error = images[0].error ? images[0].error : images[1].error;
                        triggerDataUpdate();
                        return;
                    }
                    width = images[0].width > images[1].width ? images[0].width : images[1].width;
                    height = images[0].height > images[1].height ? images[0].height : images[1].height;

                    if (images[0].width === images[1].width && images[0].height === images[1].height) {
                        data.isSameDimensions = true;
                    } else {
                        data.isSameDimensions = false;
                    }

                    data.dimensionDifference = {
                        width: images[0].width - images[1].width,
                        height: images[0].height - images[1].height
                    };

                    analyseImages(normalise(images[0], width, height), normalise(images[1], width, height), width, height);

                    triggerDataUpdate();
                }
            }

            images = [];
            loadImageData(one, onceWeHaveBoth);
            loadImageData(two, onceWeHaveBoth);
        }

        function getCompareApi(param) {
            var secondFileData;
            var hasMethod = typeof param === "function";

            if (!hasMethod) {
                // assume it's file data
                secondFileData = param;
            }

            var self = {
                setReturnEarlyThreshold: function (threshold) {
                    if (threshold) {
                        compareOnly = true;
                        returnEarlyThreshold = threshold;
                    }
                    return self;
                },
                scaleToSameSize: function () {
                    scaleToSameSize = true;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                useOriginalSize: function () {
                    scaleToSameSize = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreNothing: function () {
                    tolerance.red = 0;
                    tolerance.green = 0;
                    tolerance.blue = 0;
                    tolerance.alpha = 0;
                    tolerance.minBrightness = 0;
                    tolerance.maxBrightness = 255;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreLess: function () {
                    tolerance.red = 16;
                    tolerance.green = 16;
                    tolerance.blue = 16;
                    tolerance.alpha = 16;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreAntialiasing: function () {
                    tolerance.red = 32;
                    tolerance.green = 32;
                    tolerance.blue = 32;
                    tolerance.alpha = 32;
                    tolerance.minBrightness = 64;
                    tolerance.maxBrightness = 96;

                    ignoreAntialiasing = true;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreColors: function () {
                    tolerance.alpha = 16;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = true;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                ignoreAlpha: function () {
                    tolerance.red = 16;
                    tolerance.green = 16;
                    tolerance.blue = 16;
                    tolerance.alpha = 255;
                    tolerance.minBrightness = 16;
                    tolerance.maxBrightness = 240;

                    ignoreAntialiasing = false;
                    ignoreColors = false;

                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                repaint: function () {
                    if (hasMethod) {
                        param();
                    }
                    return self;
                },
                outputSettings: function (options) {
                    outputSettings(options);
                    return self;
                },
                onComplete: function (callback) {
                    updateCallbackArray.push(callback);

                    var wrapper = function () {
                        compare(fileData, secondFileData);
                    };

                    wrapper();

                    return getCompareApi(wrapper);
                },
                setupCustomTolerance: function (customSettings) {
                    for (var property in tolerance) {
                        if (!customSettings.hasOwnProperty(property)) {
                            continue;
                        }

                        tolerance[property] = customSettings[property];
                    }
                }
            };

            return self;
        }

        var rootSelf = {
            onComplete: function (callback) {
                updateCallbackArray.push(callback);
                loadImageData(fileData, function (imageData, width, height) {
                    parseImage(imageData.data, width, height);
                });
            },
            compareTo: function (secondFileData) {
                return getCompareApi(secondFileData);
            },
            outputSettings: function (options) {
                outputSettings(options);
                return rootSelf;
            }
        };

        return rootSelf;
    };

    function setGlobalOutputSettings(settings) {
        globalOutputSettings = settings;
        return resemble;
    }

    function applyIgnore(api, ignore, customTolerance) {
        switch (ignore) {
            case "nothing":
                api.ignoreNothing();
                break;
            case "less":
                api.ignoreLess();
                break;
            case "antialiasing":
                api.ignoreAntialiasing();
                break;
            case "colors":
                api.ignoreColors();
                break;
            case "alpha":
                api.ignoreAlpha();
                break;
            default:
                throw new Error("Invalid ignore: " + ignore);
        }

        api.setupCustomTolerance(customTolerance);
    }

    resemble.compare = function (image1, image2, options, cb) {
        var callback;
        var opt;

        if (typeof options === "function") {
            callback = options;
            opt = {};
        } else {
            callback = cb;
            opt = options || {};
        }

        var res = resemble(image1);
        var compare;

        if (opt.output) {
            res.outputSettings(opt.output);
        }

        compare = res.compareTo(image2);

        if (opt.returnEarlyThreshold) {
            compare.setReturnEarlyThreshold(opt.returnEarlyThreshold);
        }

        if (opt.scaleToSameSize) {
            compare.scaleToSameSize();
        }

        var toleranceSettings = opt.tolerance || {};
        if (typeof opt.ignore === "string") {
            applyIgnore(compare, opt.ignore, toleranceSettings);
        } else if (opt.ignore && opt.ignore.forEach) {
            opt.ignore.forEach(function (v) {
                applyIgnore(compare, v, toleranceSettings);
            });
        }

        compare.onComplete(function (data) {
            if (data.error) {
                callback(data.error);
            } else {
                callback(null, data);
            }
        });
    };

    resemble.outputSettings = setGlobalOutputSettings;
    return resemble;
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changesettings": () => (/* binding */ changesettings),
/* harmony export */   "changerefresh": () => (/* binding */ changerefresh),
/* harmony export */   "start": () => (/* binding */ start)
/* harmony export */ });
/* harmony import */ var _alt1_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @alt1/base */ "../node_modules/@alt1/base/dist/index.js");
/* harmony import */ var resemblejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resemblejs */ "../../../../node_modules/resemblejs/resemble.js");
/* harmony import */ var resemblejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(resemblejs__WEBPACK_IMPORTED_MODULE_1__);
//alt1 base libs, provides all the commonly used methods for image matching and capture
//also gives your editor info about the window.alt1 api

//import { lookup } from "dns";
//import { stringify } from "querystring";

//tell webpack to add index.html and appconfig.json to output
__webpack_require__(/*! !file-loader?name=[name].[ext]!./index.html */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./index.html");
__webpack_require__(/*! !file-loader?name=[name].[ext]!./appconfig.json */ "../node_modules/file-loader/dist/cjs.js?name=[name].[ext]!./appconfig.json");
var img;
var imgdoor;
var brocount = 0;
var toKill = 8;
var refreshrate = 100;
var storedrefreshrate = 100;
var interval;
var justleft = 0;
//loads all images as raw pixel data async, images have to be saved as *.data.PNG
//this also takes care of metadata headers in the image that make browser load the image
//with slightly wrong colors
//this function is async, so you cant acccess the images instantly but generally takes <20ms
//use `await imgs.promise` if you want to use the images as soon as they are loaded
var puzzleimgsSq = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    SqM: __webpack_require__(/*! ./Puzzles/SquareMiddle.data.PNG */ "./Puzzles/SquareMiddle.data.PNG")
});
var puzzleimgsCoTo = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    CoM: __webpack_require__(/*! ./Puzzles/CornMiddle.data.PNG */ "./Puzzles/CornMiddle.data.PNG"),
    ToM: __webpack_require__(/*! ./Puzzles/TopMiddle.data.PNG */ "./Puzzles/TopMiddle.data.PNG")
});
var puzzleimgsCT = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    CTM: __webpack_require__(/*! ./Puzzles/CirTriMiddle.data.PNG */ "./Puzzles/CirTriMiddle.data.PNG")
});
var doorimg = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    door: __webpack_require__(/*! ./Misc/DoorLock.data.PNG */ "./Misc/DoorLock.data.PNG")
});
var slainimg = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    slain: __webpack_require__(/*! ./Misc/Slain.data.PNG */ "./Misc/Slain.data.PNG")
});
var brotherimgs = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.ImageDetect.webpackImages({
    Ahrim: __webpack_require__(/*! ./Brothers/Ahrim.data.PNG */ "./Brothers/Ahrim.data.PNG"),
    Dharok: __webpack_require__(/*! ./Brothers/Dharok.data.PNG */ "./Brothers/Dharok.data.PNG"),
    Guthan: __webpack_require__(/*! ./Brothers/Guthan.data.PNG */ "./Brothers/Guthan.data.PNG"),
    Karil: __webpack_require__(/*! ./Brothers/Karil.data.PNG */ "./Brothers/Karil.data.PNG"),
    Torag: __webpack_require__(/*! ./Brothers/Torag.data.PNG */ "./Brothers/Torag.data.PNG"),
    Verac: __webpack_require__(/*! ./Brothers/Verac.data.PNG */ "./Brothers/Verac.data.PNG"),
    Akrisae: __webpack_require__(/*! ./Brothers/Akrisae.data.PNG */ "./Brothers/Akrisae.data.PNG"),
    Linza: __webpack_require__(/*! ./Brothers/Linza.data.PNG */ "./Brothers/Linza.data.PNG")
});
var fullbrotherList = {
    Ahrim: 'Ahrim',
    Dharok: 'Dharok',
    Guthan: 'Guthan',
    Karil: 'Karil',
    Torag: 'Torag',
    Verac: 'Verac',
    Akrisae: 'Akrisae',
    Linza: 'Linza'
};
var brotherList = {
    Ahrim: 'Ahrim',
    Dharok: 'Dharok',
    Guthan: 'Guthan',
    Karil: 'Karil',
    Torag: 'Torag',
    Verac: 'Verac',
    Akrisae: 'Akrisae',
    Linza: 'Linza'
};
var brotherListselect = {
    Ahrim: 'Ahrim',
    Dharok: 'Dharok',
    Guthan: 'Guthan',
    Karil: 'Karil',
    Torag: 'Torag',
    Verac: 'Verac',
    Akrisae: 'Akrisae',
    Linza: 'Linza'
};
var brotherListnonselect = {};
function ObjectLength(object) {
    var length = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            ++length;
        }
    }
    return length;
}
;
//only called when brother is selected.deselected.
function changesettings(toggle) {
    if (toggle.src.match("Deselect")) {
        //when a brother is selected
        //add to brother list
        brotherListselect[toggle.id] = [toggle.id];
        //remove from ignore list
        delete brotherListnonselect[toggle.id];
        toKill = ObjectLength(brotherListselect);
    }
    else {
        //remove relevant brother from list
        delete brotherListselect[toggle.id];
        //add relevant brother to ignore list
        brotherListnonselect[toggle.id] = [toggle.id];
        toKill = ObjectLength(brotherListselect);
    }
    return;
}
;
function changerefresh(refresh) {
    storedrefreshrate = refresh.value;
    refreshrate = storedrefreshrate;
    clearInterval(interval);
    start();
    return;
}
;
//Webpage calls this function here.
function start() {
    //Set effective refresh rate (todo, customise this rate)
    interval = setInterval(tick, refreshrate);
    tick();
}
function tick() {
    //grab the rs window capture
    console.log(refreshrate);
    img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
    //run at barrows check/reset brother list. 
    atbarrows(img);
}
function atbarrows(img) {
    //Check Brothers slain list header
    for (const [key] of Object.entries(slainimg)) {
        var loc = img.findSubimage(slainimg[key]);
        if (loc.length == 0) {
            //change status in alt1 browser to "Not at barrows"
            document.getElementById('Status').textContent = "Not at barrows";
            //reset brother list.
            var newObject = JSON.stringify(fullbrotherList);
            brotherList = JSON.parse(newObject);
            //brotherList = fullbrotherList
            //reset brocount (used so that the count doesn't go out of control after each run/tele out)	
            brocount = 0;
            //whilst not at barrows shove the refresh rate down a tonne to save on cpu and idel players
            if (refreshrate < 5000) {
                refreshrate = 5000;
                justleft = 1;
                clearInterval(interval);
                start();
                return;
            }
            for (const [key] of Object.entries(brotherimgs)) {
                //blank out brother images
                document.getElementById(`${key}HTMLimg`).src = `./TooltipHeads/${key}Dead.PNG`;
            }
        }
        if (loc.length != 0) {
            //whilst just returning to barrows restore the refresh rate to custom
            if (justleft == 1 && refreshrate == 5000) {
                refreshrate = storedrefreshrate;
                justleft = 0;
                clearInterval(interval);
                start();
                return;
            }
            //run brother finder
            findBrothers(img);
            //run puzzle
            doorLock(img);
        }
    }
    return;
}
function findBrothers(img) {
    //set this here so the count doesnt keep going up each loop round
    brocount = 0;
    //var text = document.getElementById('debug').textContent = ` test: ${brocount}`;
    for (const [key] of Object.entries(brotherimgs)) {
        var broloc = img.findSubimage(brotherimgs[key]);
        if (broloc.length == 0) {
            //Display coloured version of the brother image, as they are not dead yet
            document.getElementById(`${key}HTMLimg`).src = `./TooltipHeads/${key}.PNG`;
        }
    }
    //loop through Non dead bro's and overwirte iwth Red image if deselected	
    for (const [key] of Object.entries(brotherList)) {
        for (const [key2] of Object.entries(brotherListnonselect)) {
            document.getElementById(`${key2}HTMLimg`).src = `./TooltipHeads/${key2}Deselect.PNG`; //shove this before dead bu after alive. **************
        }
    }
    //loop through Non dead bro's and overwrite with dead image if dead (even if deselected)
    for (const [key] of Object.entries(brotherimgs)) {
        var broloc = img.findSubimage(brotherimgs[key]);
        //search for brother names in killcount list.
        if (broloc.length != 0) {
            //increase kill counter
            brocount += 1;
            //replace image with greyed out version if brother name found in list
            document.getElementById(`${key}HTMLimg`).src = `./TooltipHeads/${key}Dead.PNG`;
            //remove relevant brother from brother list - used to display which brother is left when showing tunnel location
            delete brotherList[key];
        }
    }
    /*
    // Some debug shit I'm leaving in as I cba to rrewrite it when i inevitably need it again
    var text = document.getElementById('debug').textContent = ` test: tokill ${toKill}`
    */ /*
    var text = document.getElementById('spare').textContent = ` broselectlist ${Object.keys(brotherListselect)}`
    
    var text = document.getElementById('canvastest').textContent = ` non bro select list ${Object.keys(brotherListnonselect)}`
    
    var text = document.getElementById('canvastest2').textContent = ` brolist ${Object.keys(brotherList)}`
    
    var text = document.getElementById('spare').textContent = `${Object.keys(brotherList).filter((key) => !key.includes('Torag'))}`*/
    //display brothers killed/tomb location/go loot the chest
    if (brocount == 1) {
        var text = document.getElementById('Status').textContent = brocount + " brothers slain, Keep going!";
    }
    if (brocount < toKill - 1 && brocount != 1) {
        var text = document.getElementById('Status').textContent = brocount + " brothers slain, Keep going!";
    }
    if (brocount >= toKill - 1 && toKill != 0) {
        if (ObjectLength(brotherList) == 1) { //only show tunnel if all 8 killed
            var text = document.getElementById('Status').textContent = brocount + " brothers slain, enter the tunnel at " + Object.keys(brotherList) + "'s tomb";
        }
        else {
            var text = document.getElementById('Status').textContent = brocount + " brothers slain, so tunnel location unknown. Possibilities: " + Object.keys(brotherList).filter((key) => !key.includes('Linza'));
        }
    }
    if (brocount == 8) {
        var text = document.getElementById('Status').textContent = "All brothers have been slain, go and loot the chest.";
    }
    return;
}
function doorLock(img) {
    var Doorloc = img.findSubimage(doorimg.door);
    //only run if door lock window is on screen, saves on performance
    if (window.alt1) {
        if (Doorloc.length != 0) {
            if (refreshrate != 50) {
                refreshrate = 50;
                clearInterval(interval);
                start();
                return;
            }
            img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
            getDiffCoTo(img); //remove when putting consisten check back in
            img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
            getDiffSq(img); //remove when putting consisten check back in
            img = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHoldFullRs();
            getDiffCT(img); //remove when putting consisten check back in
        }
        if (Doorloc.length == 0 && refreshrate == 50) {
            refreshrate = storedrefreshrate;
            clearInterval(interval);
            start();
            return;
        }
    }
    return;
}
function getDiffCoTo(img) {
    //finds door lock mech window from main image
    var Doorloc = img.findSubimage(doorimg.door);
    //for every image in puzzleimages
    for (const [key] of Object.entries(puzzleimgsCoTo)) {
        //document.getElementById('canvastest').textContent = `${Doorloc.length}`
        //only run if door lock window is on screen, saves on performance
        if (window.alt1) {
            //if door lock found
            if (Doorloc.length != 0) {
                //recapture just door lock window			
                //pull back the relevant size of the barrows window (500X320 pixels)
                //acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
                imgdoor = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHold((Doorloc[0].x + 46), (Doorloc[0].y + 214), 397, 278); // top left corner coords / bottom left
                //convert that area to data
                var buf1 = imgdoor.toData((Doorloc[0].x + 46), (Doorloc[0].y + 214), 63, 63);
                var buf2 = imgdoor.toData((Doorloc[0].x + 189), (Doorloc[0].y + 214), 63, 63);
                var buf3 = imgdoor.toData((Doorloc[0].x + 332), (Doorloc[0].y + 214), 63, 63);
                //buf1.show()
                //buf2.show()
                //buf3.show()
                //Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf1)
                    .compareTo(puzzleimgsCoTo[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        //display border
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (Doorloc[0].x + 46), (Doorloc[0].y + 214), (puzzleimgsCoTo[key]['width'] + 4), (puzzleimgsCoTo[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
                //Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf2)
                    .compareTo(puzzleimgsCoTo[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        //display border							
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (Doorloc[0].x + 189), (Doorloc[0].y + 214), (puzzleimgsCoTo[key]['width'] + 4), (puzzleimgsCoTo[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
                //Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf3)
                    .compareTo(puzzleimgsCoTo[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (Doorloc[0].x + 332), (Doorloc[0].y + 214), (puzzleimgsCoTo[key]['width'] + 4), (puzzleimgsCoTo[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
            }
        }
    }
    return;
}
function getDiffSq(img) {
    //finds door lock mech window from main image
    var DoorlocSq = img.findSubimage(doorimg.door);
    //for every image in puzzleimages
    for (const [key] of Object.entries(puzzleimgsSq)) {
        //only run if door lock window is on screen, saves on performance
        if (window.alt1) {
            //if door lock found
            //document.getElementById('canvastest2').textContent = `${DoorlocSq.length}`
            if (DoorlocSq.length != 0) {
                //recapture just door lock window			
                //pull back the relevant size of the barrows window (500X320 pixels)
                //acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
                imgdoor = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHold((DoorlocSq[0].x + 57), (DoorlocSq[0].y + 225), 386, 268); // top left corner coords / bottom left
                //convert that area to data
                var buf1 = imgdoor.toData((DoorlocSq[0].x + 57), (DoorlocSq[0].y + 225), 41, 41);
                var buf2 = imgdoor.toData((DoorlocSq[0].x + 200), (DoorlocSq[0].y + 225), 41, 41);
                var buf3 = imgdoor.toData((DoorlocSq[0].x + 343), (DoorlocSq[0].y + 225), 41, 41);
                //buf1.show()
                //buf2.show()
                //buf3.show()
                //Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf1)
                    .compareTo(puzzleimgsSq[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        //display border
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (DoorlocSq[0].x + 57), (DoorlocSq[0].y + 225), (puzzleimgsSq[key]['width'] + 4), (puzzleimgsSq[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
                //Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf2)
                    .compareTo(puzzleimgsSq[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        //display border							
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (DoorlocSq[0].x + 200), (DoorlocSq[0].y + 225), (puzzleimgsSq[key]['width'] + 4), (puzzleimgsSq[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
                //Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf3)
                    .compareTo(puzzleimgsSq[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (DoorlocSq[0].x + 343), (DoorlocSq[0].y + 225), (puzzleimgsSq[key]['width'] + 4), (puzzleimgsSq[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
            }
        }
    }
    return;
}
function getDiffCT(img) {
    //finds door lock mech window from main image
    var DoorlocSq = img.findSubimage(doorimg.door);
    //for every image in puzzleimages
    for (const [key] of Object.entries(puzzleimgsCT)) {
        //only run if door lock window is on screen, saves on performance
        if (window.alt1) {
            //if door lock found
            //document.getElementById('canvastest2').textContent = `${DoorlocSq.length}`
            if (DoorlocSq.length != 0) {
                //recapture just door lock window			
                //pull back the relevant size of the barrows window (500X320 pixels)
                //acount for size diff with 3 funcs, 1 for each puzz except 4sq pieces
                imgdoor = _alt1_base__WEBPACK_IMPORTED_MODULE_0__.captureHold((DoorlocSq[0].x + 41), (DoorlocSq[0].y + 227), 403, 270); // top left corner coords / bottom left
                //convert that area to data
                var buf1 = imgdoor.toData((DoorlocSq[0].x + 41), (DoorlocSq[0].y + 227), 78, 43);
                var buf2 = imgdoor.toData((DoorlocSq[0].x + 184), (DoorlocSq[0].y + 227), 78, 43);
                var buf3 = imgdoor.toData((DoorlocSq[0].x + 326), (DoorlocSq[0].y + 227), 78, 43);
                //buf1.show()
                //buf2.show()
                //buf3.show()
                //Compare data stream of left puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf1)
                    .compareTo(puzzleimgsCT[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        //display border
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (DoorlocSq[0].x + 41), (DoorlocSq[0].y + 227), (puzzleimgsCT[key]['width'] + 4), (puzzleimgsCT[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
                //Compare data stream of middle puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf2)
                    .compareTo(puzzleimgsCT[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        //display border							
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (DoorlocSq[0].x + 184), (DoorlocSq[0].y + 227), (puzzleimgsCT[key]['width'] + 4), (puzzleimgsCT[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
                //Compare data stream of right puzzle location with image from object, Less than 10% mismatch results in success
                resemblejs__WEBPACK_IMPORTED_MODULE_1__(buf3)
                    .compareTo(puzzleimgsCT[key])
                    .ignoreColors()
                    .ignoreAntialiasing()
                    .onComplete(function (data) {
                    if (parseInt(data.misMatchPercentage) < 10) {
                        alt1.overLayRect(_alt1_base__WEBPACK_IMPORTED_MODULE_0__.mixColor(0, 255, 0), (DoorlocSq[0].x + 326), (DoorlocSq[0].y + 227), (puzzleimgsCT[key]['width'] + 4), (puzzleimgsCT[key]['height'] + 4), 300, 3);
                    }
                    //compareimg(data)
                });
            }
        }
    }
    return;
}
if (window.alt1) {
    alt1.identifyAppUrl("./appconfig.json");
}

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});