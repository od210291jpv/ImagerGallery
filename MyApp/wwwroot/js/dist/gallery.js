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

/***/ "./wwwroot/js/gallery.js":
/*!*******************************!*\
  !*** ./wwwroot/js/gallery.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Modules_apiRequests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modules/apiRequests */ \"./wwwroot/js/Modules/apiRequests.js\");\n\n\n\nconst apis = new _Modules_apiRequests__WEBPACK_IMPORTED_MODULE_0__.Apis();\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const galleryContainer = document.getElementById('gallery');\n    const paginationContainer = document.getElementById('pagination');\n    let searchInput = document.getElementById(\"search-input\");\n\n    const imagesPerPage = 12; \n\n    class ImagePost\n    {\n        constructor(url, description, alt)\n        {\n            this.url = url;\n            this.description = description;\n            this.alt = alt;\n        }\n    }\n\n    async function getAllContent()\n    {\n        let response = await axios.get(\"/Home/images?showHidden=true\");\n        let count = 0;\n        return response.data.map((i) =>\n        {\n            count++;\n            return new ImagePost(i.source, i.description, i.alt);\n        });\n    }\n\n    (async () => {\n\n        let allImages = await getAllContent();\n\n        function refreshImagesFeed(newImages) {\n            allImages = [];\n            console.log(newImages);\n            allImages = newImages.map((item) => {\n                return new ImagePost(item.source, item.description, item.alt);\n            });\n\n            displayImages(currentPage);\n        }\n        \n        async function searchContent(event) {\n            if (event != null && event.target != null && event.target.value == null || event.target.value == \"\") {\n                return;\n            }\n\n            const data = await apis.searchContent(event.target.value, true);\n            refreshImagesFeed(data);\n        }\n\n        let currentPage = 1;\n        const totalPages = Math.ceil(allImages.length / imagesPerPage);\n\n        function displayImages(page) {\n            galleryContainer.innerHTML = '';\n            currentPage = page;\n\n            const startIndex = (page - 1) * imagesPerPage;\n            const endIndex = startIndex + imagesPerPage;\n\n            const itemsToShow = allImages.slice(startIndex, endIndex);\n\n            itemsToShow.forEach((itemData) => {\n              \n                const galleryItem = document.createElement('figure');\n                galleryItem.classList.add('gallery-item'); \n\n\n                const img = document.createElement('img');\n                img.src = itemData.url;\n\n                img.alt = itemData.alt || itemData.description;\n                img.loading = 'lazy';\n\n\n                const figcaption = document.createElement('figcaption');\n                figcaption.classList.add('image-description'); \n                figcaption.textContent = itemData.description;\n\n                galleryItem.appendChild(img);\n                galleryItem.appendChild(figcaption);\n                galleryItem.addEventListener(\"click\", (event) =>\n                {\n                    event.target.parentElement.classList.toggle(\"zoom-in\");\n                });\n\n\n                galleryContainer.appendChild(galleryItem);\n            });\n\n            updatePaginationButtons();\n        }\n\n        function setupPagination() {\n            paginationContainer.style.padding = \"15px\";\n            paginationContainer.innerHTML = '';\n\n            const prevButton = document.createElement('button');\n            prevButton.classList.add('page-btn', 'prev-btn');\n            prevButton.textContent = '<';\n            prevButton.disabled = currentPage === 1;\n            prevButton.addEventListener('click', () => {\n                if (currentPage > 1) {\n                    displayImages(currentPage - 1);\n                }\n            });\n            paginationContainer.appendChild(prevButton);\n\n            for (let i = 1; i <= totalPages; i++) {\n                const pageButton = document.createElement('button');\n                pageButton.classList.add('page-btn', 'page-number');\n                pageButton.textContent = i;\n                if (i === currentPage) {\n                    pageButton.classList.add('active');\n                }\n                pageButton.addEventListener('click', () => {\n                    displayImages(i);\n                });\n                paginationContainer.appendChild(pageButton);\n            }\n\n            const nextButton = document.createElement('button');\n            nextButton.classList.add('page-btn', 'next-btn');\n            nextButton.textContent = '>';\n            nextButton.disabled = currentPage === totalPages;\n            nextButton.addEventListener('click', () => {\n                if (currentPage < totalPages) {\n                    displayImages(currentPage + 1);\n                }\n            });\n            paginationContainer.appendChild(nextButton);\n        }\n\n        function updatePaginationButtons() {\n            const pageButtons = paginationContainer.querySelectorAll('.page-number');\n            const prevButton = paginationContainer.querySelector('.prev-btn');\n            const nextButton = paginationContainer.querySelector('.next-btn');\n\n            if (prevButton) prevButton.disabled = currentPage === 1;\n            if (nextButton) nextButton.disabled = currentPage === totalPages;\n\n            pageButtons.forEach(button => {\n                if (parseInt(button.textContent) === currentPage) {\n                    button.classList.add('active');\n                } else {\n                    button.classList.remove('active');\n                }\n            });\n        }\n        \n        searchInput?.addEventListener(\"input\", (event) => searchContent(event));\n\n        if (allImages.length > 0) {\n            displayImages(currentPage);\n            if (totalPages > 1) {\n                setupPagination();\n            }\n        } else {\n            galleryContainer.innerHTML = '<p>Нет изображений для отображения.</p>';\n        }\n    })();\n});\n\n//# sourceURL=webpack://myapp/./wwwroot/js/gallery.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/js/gallery.js");
/******/ 	
/******/ })()
;