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

/***/ "./wwwroot/js/userlogin.js":
/*!*********************************!*\
  !*** ./wwwroot/js/userlogin.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Modules_apiRequests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/apiRequests */ \"./wwwroot/js/Modules/apiRequests.js\");\n\r\n\r\n\r\n\r\nconst apis = new _Modules_apiRequests__WEBPACK_IMPORTED_MODULE_0__.Apis();\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n    const loginForm = document.getElementById(\"loginForm\");\r\n    const loginInput = document.getElementById(\"login\");\r\n    const passwordInput = document.getElementById(\"password\");\r\n\r\n    loginForm.addEventListener(\"submit\", async (event) =>\r\n    {\r\n        event.preventDefault();\r\n\r\n        try {\r\n            const result = await apis.login(loginInput.value, passwordInput.value);\r\n\r\n            if (result.userId != null)\r\n            {\r\n                loginForm.reset();\r\n                localStorage.setItem(result.userId, result.token);\r\n                localStorage.setItem(\"user\", result.userId);\r\n                console.log(\"initial request passed \" + result.userId);\r\n                const loginResult = await fetch(`home/default?userid=${result.userId}`, {\r\n                    method: \"GET\", headers: {\r\n                        \"authToken\" : result.token\r\n                    }\r\n                });\r\n                console.log(loginResult)\r\n                window.location.href = result.redirectUrl || `/index?userid=${result.userId}`;                \r\n            }\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please check console log\");\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://myapp/./wwwroot/js/userlogin.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/js/userlogin.js");
/******/ 	
/******/ })()
;