/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/js/TestModule.js":
/*!**********************************!*\
  !*** ./wwwroot/js/TestModule.js ***!
  \**********************************/
/***/ ((module) => {

eval("function testModule()\r\n{\r\n    this.foo = () =>\r\n    {\r\n        return \"Foo\";\r\n    }\r\n\r\n    this.bar = () =>\r\n    {\r\n        return \"Bar\";\r\n    }\r\n}\r\n\r\nmodule.exports = testModule;\n\n//# sourceURL=webpack://myapp/./wwwroot/js/TestModule.js?");

/***/ }),

/***/ "./wwwroot/js/site.js":
/*!****************************!*\
  !*** ./wwwroot/js/site.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\r\n\r\nconst myModule = __webpack_require__(/*! ./TestModule */ \"./wwwroot/js/TestModule.js\");\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () =>\r\n{\r\n    let wrapper = document.getElementById('wrapper');\r\n\r\n\r\n    const ist = new myModule();\r\n\r\n    function postData(form)\r\n    {\r\n        form.addEventListener(\"submit\", (event) =>\r\n        {\r\n            event.preventDefault();\r\n\r\n            const request = new XMLHttpRequest();\r\n            request.open(\"POST\", \"\");\r\n            request.setRequestHeader(\"Content-type\", \"multipart/form-data\");\r\n\r\n            const formaData = new FormData(form);\r\n            request.send(formaData);\r\n\r\n            request.addEventListener(\"load\", () =>\r\n            {\r\n                if (request.status === 200) {\r\n                    console.log(request.response);\r\n                    alert(\"Done!\");\r\n                }                \r\n            });\r\n        });\r\n    }\r\n\r\n    function filterImageContent(imgs)\r\n    {\r\n        for (let i = 0; i < imgs.length; i++) {\r\n            imgs[i].style.borderRadius = '2%';\r\n\r\n            const img = new Image();\r\n            img.src = imgs[i].src;\r\n            img.onload = () => {\r\n                if (img.width < 100) {\r\n                    img.remove();\r\n                    imgs[i].remove();\r\n                }\r\n            };\r\n        }\r\n    }\r\n\r\n    function createimageElement(src)\r\n    {\r\n        let element = document.createElement('img');\r\n        element.src = \"/img/\" + src;\r\n        element.setAttribute('data-image', 1);\r\n        element.classList.add('imgContent');\r\n        return element;\r\n    }\r\n\r\n    function refreshImagesFeed(selector, newImages)\r\n    {\r\n        const allimages = document.querySelectorAll(selector);\r\n        allimages.forEach((item) =>\r\n        {\r\n            item.remove();\r\n        });\r\n        console.log(typeof (newImages));        \r\n        newImages.Content.forEach((item) =>\r\n        {\r\n            let img = createimageElement(item);\r\n            wrapper.append(img);\r\n        });\r\n    }\r\n\r\n    const lbl = document.getElementById('currentDate');\r\n\r\n    const modal = document.getElementById(\"addContentWrapper\");\r\n    const searchInput = document.getElementById(\"search-input\");\r\n\r\n    async function searchContent(event)\r\n    {\r\n        if (event != null && event.target != null && event.target.value == null || event.target.value == \"\")\r\n        {\r\n            return;\r\n        }\r\n\r\n        await fetch(\"http://192.168.88.33:5198/Home/search?keyword=\" + event.target.value,\r\n            {\r\n                method: \"POST\",\r\n                body: JSON.stringify({ keyword: event.target.value ?? ' ' })\r\n            })\r\n            .then(response => (response.json()))\r\n            .then(json => {\r\n                refreshImagesFeed('.imgContent', json);\r\n\r\n                const images = document.querySelectorAll('.imgContent');\r\n\r\n                filterImageContent(images);\r\n            });\r\n    }\r\n    \r\n    searchInput.addEventListener('input', (event) => searchContent(event));\r\n\r\n    const images = document.querySelectorAll('.imgContent');\r\n\r\n    filterImageContent(images);\r\n\r\n    function onMainMenuClick()\r\n    {\r\n        wrapper.classList.add('ShowWrapper');\r\n        wrapper.classList.remove('HideWrapper');\r\n    }\r\n\r\n    function onServiceMenuClick()\r\n    {\r\n        wrapper.classList.remove('ShowWrapper');\r\n        wrapper.classList.add('HideWrapper');\r\n\r\n        modalSearch.classList.add('ShowWrapper');\r\n        modalSearch.classList.remove('HideWrapper');\r\n    }\r\n\r\n    function onHover(e)\r\n    {\r\n        if (e.target && e.target.tagName == \"IMG\")\r\n        {\r\n            e.target.style.width = '850px';\r\n        }\r\n    }\r\n\r\n    function onLeave(e)\r\n    {\r\n        if (e.target && e.target.tagName == \"IMG\") {\r\n            e.target.style.width = '800px';\r\n        }\r\n    }\r\n\r\n    function onCLick(e)\r\n    {\r\n        if (e.target && e.target.tagName == \"IMG\") {\r\n            e.target.style.width = '1200px';\r\n        }\r\n    }\r\n\r\n    wrapper.addEventListener(\"mouseover\", onHover);\r\n    wrapper.addEventListener(\"mouseout\", onLeave);\r\n    wrapper.addEventListener(\"click\", onCLick);\r\n});\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://myapp/./wwwroot/js/site.js?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/js/site.js");
/******/ 	
/******/ })()
;