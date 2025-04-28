/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/js/Modules/apiRequests.js":
/*!*******************************************!*\
  !*** ./wwwroot/js/Modules/apiRequests.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Apis: () => (/* binding */ Apis),\n/* harmony export */   apis: () => (/* binding */ apis)\n/* harmony export */ });\n/* harmony import */ var _Modules_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Modules/constants */ \"./wwwroot/js/Modules/constants.js\");\n\r\n\r\nclass Apis{\r\n    \r\n    constructor()\r\n    {\r\n        this.baseUrl = _Modules_constants__WEBPACK_IMPORTED_MODULE_0__.constants.baseUrl;\r\n        this.loginUrl = '/Home/userLogin';\r\n        this.searchUrl = _Modules_constants__WEBPACK_IMPORTED_MODULE_0__.constants.serachUrl;\r\n        this.getAllContent = _Modules_constants__WEBPACK_IMPORTED_MODULE_0__.constants.allContent;\r\n    }\r\n\r\n    async login(login, password)\r\n    {\r\n        try {\r\n            const response = await fetch(this.loginUrl, {\r\n                method: \"POST\",\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\",\r\n                },\r\n                body: JSON.stringify({ login: login, password: password })\r\n            });\r\n\r\n            const result = await response.json();\r\n\r\n            if (response.ok && result.success === true)\r\n            {\r\n                return { userId: result.userId, token: result.token };\r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please check console output\");\r\n            return { userId: null, token: null };\r\n        }\r\n    }\r\n\r\n    async searchContent(keyword)\r\n    {\r\n        try {\r\n            const response = await fetch(`${this.searchUrl}${keyword}`,\r\n                {\r\n                    method: \"POST\",\r\n                    body: JSON.stringify({ keyword: keyword ?? ' ' })\r\n                });\r\n\r\n            const result = await response.json();\r\n\r\n            if (response.ok && result != null)\r\n            {\r\n                return result;\r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please see console output\");\r\n        }\r\n\r\n        return [];\r\n    }\r\n\r\n    async getAllContent(withBlocked)\r\n    {\r\n        console.log(`${getAllContent}${withBlocked}`);\r\n        try {\r\n            //const response = await fetch(`${getAllContent}${withBlocked}`, { method: \"GET\" });\r\n            const response = await fetch(\"/Home/images?showHidden=false\", { method: \"GET\" });\r\n            const resut = await response.json();\r\n\r\n            if (response.ok && resut != null)\r\n            {\r\n                return resut;\r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please see console output\");\r\n        }\r\n\r\n    }\r\n    \r\n}\r\n\r\nlet apis = new Apis();\n\n//# sourceURL=webpack://myapp/./wwwroot/js/Modules/apiRequests.js?");

/***/ }),

/***/ "./wwwroot/js/Modules/constants.js":
/*!*****************************************!*\
  !*** ./wwwroot/js/Modules/constants.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Constants: () => (/* binding */ Constants),\n/* harmony export */   constants: () => (/* binding */ constants)\n/* harmony export */ });\nclass Constants {\r\n    constructor() {};\r\n\r\n    #baseUrl = \"http://192.168.88.33:5198\";\r\n    #searchurl = \"/Home/search?keyword=\";\r\n    #getallContent = \"/Home/images?showHidden=\";\r\n\r\n    get baseUrl() {\r\n        return this.#baseUrl;\r\n    }\r\n\r\n    get serachUrl()\r\n    {\r\n        return this.#searchurl;\r\n    }\r\n\r\n    get allContent()\r\n    {\r\n        return this.#getallContent;\r\n    }\r\n    \r\n}\r\n\r\nconst constants = new Constants();\n\n//# sourceURL=webpack://myapp/./wwwroot/js/Modules/constants.js?");

/***/ }),

/***/ "./wwwroot/js/feed.js":
/*!****************************!*\
  !*** ./wwwroot/js/feed.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Modules_apiRequests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/apiRequests */ \"./wwwroot/js/Modules/apiRequests.js\");\n\n\n\r\n\r\nconst apis = new _Modules_apiRequests__WEBPACK_IMPORTED_MODULE_0__.Apis();\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n    const feedWrapper = document.getElementById(\"feed-wrapper\");\n    const getPostsUrl = '/Home/images?showHidden=false';\n\n    const jumpToStartBtn = document.getElementById('jumpToStartBtn');\n    const searchInput = document.getElementById(\"search-input\");\n\n    window.addEventListener('scroll', () => {\n        if (window.scrollY > 300) {\n            jumpToStartBtn.classList.add('visible');\n        } else {\n            jumpToStartBtn.classList.remove('visible');\n        }\n    });\n\n    jumpToStartBtn.addEventListener('click', () => {\n        window.scrollTo({\n            top: 0,\n            behavior: 'smooth'\n        });\n    });\n\n    async function onLikeClicked(event)\n    {\n        console.log(\"Liked this\");\n    }\n\n    function fillFeed(data)\n    {\n        data.forEach(item => {\n\n            let postDiv = document.createElement('div');\n            postDiv.classList.add('post');\n\n            postDiv.innerHTML =\r\n                `<div class=\"post-image-container\">\r\n                <img src=\"${item.source}\" alt=\"${item.alt}\" class=\"post-image\">\r\n                    <div class=\"username-overlay\">${item.userId}</div>\r\n                    <div class=\"like-overlay\">\r\n                        <button class=\"like-icon\" id=\"like\"></button>\r\n                        <span>${item.likes}</span>\r\n                    </div>\r\n                </div>\r\n                <div class=\"post-description\">\r\n                    ${item.description}\r\n                </div>`;\n            postDiv.querySelector('#like').addEventListener('click', event => onLikeClicked(event));\n\n            feedWrapper.append(postDiv);\n        });\n    }\n\n    async function refreshFeed()\n    {\n        try {\n            const posts = feedWrapper.querySelectorAll('.post');\n\n            posts.forEach((post) => {\n                post.remove();\n            });\n\n            const response = await fetch(getPostsUrl, { method: \"GET\" });\r\n            const resut = await response.json();\n\n            if (response.ok && resut != null)\n            {\n                fillFeed(resut);\n            }            \n        }\n        catch (error) {\n            console.log(error);\n            alert(\"An error occured, plase see console log\");\n        }\n    }\n    \n\r\n    async function searchContent(event) {\r\n        if (event != null && event.target != null && event.target.value == null || event.target.value == \"\") {\r\n            return;\r\n        }\r\n\r\n        const data = await apis.searchContent(event.target.value);\r\n\r\n        if (data != null)\r\n        {\r\n            const posts = feedWrapper.querySelectorAll('.post');\n\n            posts.forEach((post) => {\n                post.remove();\n            });\r\n\r\n            fillFeed(data);  \r\n        }\r\n\r\n                                    \r\n    }\r\n\r\n    searchInput.addEventListener('input', (event) => searchContent(event));\n\n    \n\n    (async function () {\r\n        await refreshFeed();\r\n    }());\n});\n\n\n//# sourceURL=webpack://myapp/./wwwroot/js/feed.js?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/js/feed.js");
/******/ 	
/******/ })()
;