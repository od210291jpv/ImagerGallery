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

/***/ "./wwwroot/js/register.js":
/*!********************************!*\
  !*** ./wwwroot/js/register.js ***!
  \********************************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", () => {\r\n    \r\n    const loginInput = document.getElementById(\"registerLogin\");\r\n    const passwordinput = document.getElementById(\"registerPassword\");\r\n    const repeatPasswordInput = document.getElementById(\"repeatPassword\");\r\n    const loginError = document.getElementById(\"loginError\");\r\n    const passwordError = document.getElementById(\"repeatPasswordError\");\r\n\r\n    const regForm = document.getElementById(\"registrationForm\");\r\n\r\n    console.log(regForm);\r\n\r\n    function hideErrors()\r\n    {\r\n        loginError.style.display = \"none\";\r\n        loginError.style.display = \"none\";\r\n    }\r\n\r\n    async function registerUser(login, password, repeatPassword)\r\n    {\r\n        hideErrors();\r\n        if (login.length < 6)\r\n        {\r\n            loginError.style.display = \"block\";\r\n            return;\r\n        }\r\n\r\n        if (password != repeatPassword)\r\n        {\r\n            passwordError.style.display = \"block\";\r\n            return;\r\n        }\r\n\r\n        try {\r\n            const response = await fetch(regForm.action, {\r\n                method: \"POST\",\r\n                headers: {\r\n                    'Content-Type': 'application/json'\r\n                },\r\n                body: JSON.stringify({\r\n                    Login: loginInput.value,\r\n                    Password: passwordinput.value,\r\n                    Role: 0\r\n                })\r\n            });\r\n\r\n            const result = await response.json();\r\n\r\n            if (response.ok) {\r\n                regForm.reset();\r\n                localStorage.setItem(result.userId, result.token);\r\n                window.location.href = result.redirectUrl || '/login';\r\n            }\r\n            else {\r\n                loginError.style.display = \"block\";\r\n            }\r\n        }\r\n        catch (error) {\r\n            console.log(error);\r\n            alert(\"An error occured, please see console for details\");\r\n        }\r\n    }\r\n\r\n    regForm.addEventListener(\"submit\", async (event) =>\r\n    {\r\n        event.preventDefault();\r\n        registerUser(loginInput.value, passwordinput.value, repeatPasswordInput.value);\r\n    })\r\n});\n\n//# sourceURL=webpack://myapp/./wwwroot/js/register.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./wwwroot/js/register.js"]();
/******/ 	
/******/ })()
;