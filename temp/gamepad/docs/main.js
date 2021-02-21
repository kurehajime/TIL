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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (() => {

eval("var lastRender = 0;\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        this.isRunning = false;\r\n        this.press = [];\r\n        this.pressing = [];\r\n        this.pressed = [];\r\n    }\r\n    Game.prototype.Start = function () {\r\n        var _this = this;\r\n        this.isRunning = true;\r\n        window.requestAnimationFrame(function (t) { _this.loop(t); });\r\n    };\r\n    Game.prototype.loop = function (timestamp) {\r\n        var _this = this;\r\n        var progress = timestamp - lastRender;\r\n        this.update(progress);\r\n        this.draw();\r\n        lastRender = timestamp;\r\n        if (this.isRunning) {\r\n            window.requestAnimationFrame(function (t) { _this.loop(t); });\r\n        }\r\n    };\r\n    Game.prototype.update = function (progress) {\r\n        var gamepads = navigator.getGamepads();\r\n        var now_press = [];\r\n        var now_pressing = [];\r\n        var now_pressed = [];\r\n        for (var _i = 0, gamepads_1 = gamepads; _i < gamepads_1.length; _i++) {\r\n            var gp = gamepads_1[_i];\r\n            if (gp) {\r\n                for (var i = 0; i < gp.buttons.length; i++) {\r\n                    var prev = (this.pressing.indexOf(i) !== -1);\r\n                    if (gp.buttons[i].pressed) {\r\n                        now_pressing.push(i);\r\n                    }\r\n                    if (gp.buttons[i].pressed && !prev) {\r\n                        now_press.push(i);\r\n                    }\r\n                    if (!gp.buttons[i].pressed && prev) {\r\n                        now_pressed.push(i);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        this.press = now_press;\r\n        this.pressing = now_pressing;\r\n        this.pressed = now_pressed;\r\n    };\r\n    Game.prototype.draw = function () {\r\n        var _this = this;\r\n        if (this.press.length > 0) {\r\n            console.log(\"puress: \" + this.press.map(function (n) { return _this.numToKey(n); }).join(\" , \"));\r\n        }\r\n        if (this.pressed.length > 0) {\r\n            console.log(\"             puressed: \" + this.pressed.map(function (n) { return _this.numToKey(n); }).join(\" , \"));\r\n        }\r\n    };\r\n    Game.prototype.numToKey = function (num) {\r\n        switch (num) {\r\n            case 0:\r\n                return 'A';\r\n            case 1:\r\n                return 'B';\r\n            case 2:\r\n                return 'X';\r\n            case 3:\r\n                return 'Y';\r\n            case 4:\r\n                return 'L1';\r\n            case 5:\r\n                return 'R1';\r\n            case 6:\r\n                return 'L2';\r\n            case 7:\r\n                return 'R2';\r\n            case 8:\r\n                return 'SELECT';\r\n            case 9:\r\n                return 'START';\r\n            case 10:\r\n                return 'L3';\r\n            case 11:\r\n                return 'R3';\r\n            case 12:\r\n                return 'Top';\r\n            case 13:\r\n                return 'Bottom';\r\n            case 14:\r\n                return 'Left';\r\n            case 15:\r\n                return 'Right';\r\n            case 16:\r\n                return 'Center';\r\n            default:\r\n                break;\r\n        }\r\n        return '';\r\n    };\r\n    return Game;\r\n}());\r\nfunction main() {\r\n    var stage = new Game();\r\n    stage.Start();\r\n}\r\nmain();\r\n\n\n//# sourceURL=webpack://gamepad/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.ts"]();
/******/ 	
/******/ })()
;