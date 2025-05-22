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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Apis: () => (/* binding */ Apis),\n/* harmony export */   apis: () => (/* binding */ apis)\n/* harmony export */ });\n/* harmony import */ var _Modules_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Modules/constants */ \"./wwwroot/js/Modules/constants.js\");\n\r\n\r\nclass Apis{\r\n    \r\n    constructor()\r\n    {\r\n        this.baseUrl = _Modules_constants__WEBPACK_IMPORTED_MODULE_0__.constants.baseUrl;\r\n        this.loginUrl = '/Home/userLogin';\r\n        this.searchUrl = _Modules_constants__WEBPACK_IMPORTED_MODULE_0__.constants.serachUrl;\r\n        this.getAllContent = _Modules_constants__WEBPACK_IMPORTED_MODULE_0__.constants.allContent;\r\n    }\r\n\r\n    async login(login, password)\r\n    {\r\n        try {\r\n            const response = await fetch(this.loginUrl, {\r\n                method: \"POST\",\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\",\r\n                },\r\n                body: JSON.stringify({ login: login, password: password })\r\n            });\r\n\r\n            const result = await response.json();\r\n\r\n            if (response.ok && result.success === true)\r\n            {\r\n                return { userId: result.userId, token: result.token };\r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please check console output\");\r\n            return { userId: null, token: null };\r\n        }\r\n    }\r\n\r\n    async searchContent(keyword, withHidden = false)\r\n    {\r\n        try {\r\n            let hiddenParam = withHidden == true ? \"&withHidden=true\" : \"\";\r\n            const response = await fetch(`${this.searchUrl}${keyword}` + hiddenParam,\r\n                {\r\n                    method: \"POST\",\r\n                    body: JSON.stringify({ keyword: keyword ?? ' ' })\r\n                });\r\n\r\n            const result = await response.json();\r\n\r\n            if (response.ok && result != null)\r\n            {\r\n                return result;\r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please see console output\");\r\n        }\r\n\r\n        return [];\r\n    }\r\n\r\n    async getAllContent(withBlocked)\r\n    {\r\n        console.log(`${getAllContent}${withBlocked}`);\r\n        try {\r\n            //const response = await fetch(`${getAllContent}${withBlocked}`, { method: \"GET\" });\r\n            const response = await fetch(\"/Home/images?showHidden=false\", { method: \"GET\" });\r\n            const resut = await response.json();\r\n\r\n            if (response.ok && resut != null)\r\n            {\r\n                return resut;\r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please see console output\");\r\n        }\r\n\r\n    }\r\n    \r\n}\r\n\r\nlet apis = new Apis();\n\n//# sourceURL=webpack://myapp/./wwwroot/js/Modules/apiRequests.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Modules_apiRequests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/apiRequests */ \"./wwwroot/js/Modules/apiRequests.js\");\n\r\n\r\n\r\n\r\nconst apis = new _Modules_apiRequests__WEBPACK_IMPORTED_MODULE_0__.Apis();\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\r\n    const feedWrapper = document.getElementById(\"feed-wrapper\");\r\n    const getPostsUrl = '/Home/images?showHidden=false';\r\n\r\n    const jumpToStartBtn = document.getElementById('jumpToStartBtn');\r\n    const searchInput = document.getElementById(\"search-input\");\r\n\r\n    window.addEventListener('scroll', () => {\r\n        if (window.scrollY > 300) {\r\n            jumpToStartBtn.classList.add('visible');\r\n        } else {\r\n            jumpToStartBtn.classList.remove('visible');\r\n        }\r\n    });\r\n\r\n    jumpToStartBtn.addEventListener('click', () => {\r\n        window.scrollTo({\r\n            top: 0,\r\n            behavior: 'smooth'\r\n        });\r\n    });\r\n\r\n    async function onLikeClicked(event)\r\n    {\r\n\r\n        event.preventDefault();\r\n\r\n        const parent = event.target.parentElement.parentElement;\r\n\r\n        const publicationId = +parent.dataset.id;\r\n        console.log(\"pub id: \" + publicationId);\r\n\r\n        try {\r\n            console.log(\"Sending request\");\r\n            const response = await fetch(`/Content/like?postId=${publicationId}`, { method: \"GET\" });\r\n\r\n            if (response.ok) {\r\n                const data = await response.json();\r\n                event.target.parentElement.querySelector('span').textContent = data.likes;\r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please see console\");\r\n        }\r\n    }\r\n\r\n    async function getPublisherInfo(userId)\r\n    {\r\n        try {\r\n            const response = await fetch(`/userById?id=${userId}`,\r\n                {\r\n                    method: \"GET\"\r\n                });\r\n\r\n\r\n            const result = await response.json();\r\n\r\n                  \r\n            return {\r\n                id: result.id,\r\n                login: result.login,\r\n                password: result.password,\r\n                role: result.role\r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please see console\");\r\n        }\r\n    }\r\n\r\n    async function fillFeed(data)\r\n    {\r\n        data.forEach(item => {\r\n\r\n            let postDiv = document.createElement('div');\r\n            postDiv.classList.add('post');\r\n           \r\n            postDiv.innerHTML =\r\n                `<div class=\"post-image-container\" data-id=\"${item.id}\">\r\n                <img src=\"${item.source}\" alt=\"${item.alt}\" class=\"post-image\">\r\n                    <div class=\"username-overlay\">${item.username}</div>\r\n                    <div class=\"like-overlay\">\r\n                        <button class=\"like-icon\" id=\"like\"></button>\r\n                        <span>${item.likes}</span>\r\n                    </div>\r\n                </div>\r\n                <div class=\"post-description\">\r\n                    ${item.description}\r\n                </div>`;\r\n            postDiv.querySelector('#like').addEventListener('click', event => onLikeClicked(event));\r\n\r\n            feedWrapper.append(postDiv);\r\n        });\r\n    }\r\n\r\n    async function refreshFeed()\r\n    {\r\n        try {\r\n            const posts = feedWrapper.querySelectorAll('.post');\r\n\r\n            posts.forEach((post) => {\r\n                post.remove();\r\n            });\r\n\r\n            const userId = +localStorage.getItem(\"user\");\r\n            \r\n            const response = await fetch(getPostsUrl + `&userid=${userId}`, { method: \"GET\" });\r\n            const resut = await response.json();\r\n\r\n            if (response.ok && resut != null)\r\n            {\r\n                await fillFeed(resut);\r\n            }            \r\n        }\r\n        catch (error) {\r\n            console.log(error);\r\n            alert(\"An error occured, plase see console log\");\r\n        }\r\n    }\r\n    \r\n\r\n    async function searchContent(event) {\r\n        if (event != null && event.target != null && event.target.value == null || event.target.value == \"\") {\r\n            return;\r\n        }\r\n\r\n        const data = await apis.searchContent(event.target.value);\r\n\r\n        if (data != null)\r\n        {\r\n            const posts = feedWrapper.querySelectorAll('.post');\r\n\r\n            posts.forEach((post) => {\r\n                post.remove();\r\n            });\r\n\r\n            await fillFeed(data);  \r\n        }\r\n\r\n                                    \r\n    }\r\n\r\n    searchInput.addEventListener('input', (event) => searchContent(event));\r\n\r\n    \r\n\r\n    (async function () {\r\n        await refreshFeed();\r\n    }());\r\n});\r\n\n\n//# sourceURL=webpack://myapp/./wwwroot/js/feed.js?");

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