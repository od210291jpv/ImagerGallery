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

/***/ "./wwwroot/js/parser.js":
/*!******************************!*\
  !*** ./wwwroot/js/parser.js ***!
  \******************************/
/***/ (() => {

eval("\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\r\n    let urlInput = document.getElementById(\"urlInput\");\r\n    let parseBtn = document.getElementById(\"submitParse\");\r\n\r\n\r\n    parseBtn.addEventListener(\"click\", (event) =>\r\n    {\r\n        event.preventDefault();\r\n        let result = [];\r\n        const url = urlInput.value.trim();\r\n        if (!url)\r\n        {\r\n            alert(\"Please enter a URL\");\r\n        }\r\n\r\n        try {\r\n            let initialUrl = document.location.href;\r\n            document.location.href = url;\r\n            let figures = document.getElementsByTagName(\"figure\");\r\n\r\n            Array.from(figures).forEach(p => {\r\n                result.push({\r\n                    link: p.getElementsByClassName(\"image\")[0],\r\n                    imagePreviewLink: p.getElementsByTagName(\"img\")[0].src\r\n                });\r\n            });\r\n\r\n            document.location.href = initialUrl;\r\n            console.log(result);\r\n        }\r\n        catch (error)\r\n        {\r\n            console.log(error);\r\n            alert(\"An error occured, please check console log\");\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://myapp/./wwwroot/js/parser.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./wwwroot/js/parser.js"]();
/******/ 	
/******/ })()
;