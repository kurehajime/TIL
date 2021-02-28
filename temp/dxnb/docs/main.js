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

/***/ "./src/cell.ts":
/*!*********************!*\
  !*** ./src/cell.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cell\": () => (/* binding */ Cell)\n/* harmony export */ });\n/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params */ \"./src/params.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Cell = /** @class */ (function (_super) {\r\n    __extends(Cell, _super);\r\n    function Cell(suit, color) {\r\n        var _this = _super.call(this) || this;\r\n        _this.IsLive = true;\r\n        _this.IsHold = false;\r\n        _this.Suit = suit;\r\n        _this.Color = color;\r\n        _this.Draw();\r\n        return _this;\r\n    }\r\n    Cell.prototype.Draw = function () {\r\n        var suit;\r\n        var color;\r\n        this.removeAllChildren();\r\n        if (!this.IsLive) {\r\n            return;\r\n        }\r\n        switch (this.Suit) {\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Suit.North:\r\n                suit = \"北\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Suit.East:\r\n                suit = \"東\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Suit.West:\r\n                suit = \"西\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Suit.South:\r\n                suit = \"南\";\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n        switch (this.Color) {\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Color.Red:\r\n                color = \"DarkRed\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Color.Green:\r\n                color = \"DarkGreen\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Color.Blue:\r\n                color = \"DarkBlue\";\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n        var shape1 = new createjs.Shape();\r\n        shape1.graphics.beginFill(color);\r\n        shape1.graphics.drawRoundRect(5, 5, 45, 45, 5);\r\n        if (this.IsHold) {\r\n            var shadow = new createjs.Shadow(\"#ffff00\", 0, 0, 15);\r\n            shape1.shadow = shadow;\r\n        }\r\n        var word = new createjs.Text(suit, \"24px serif\", \"White\");\r\n        word.textAlign = \"center\";\r\n        word.x = 27;\r\n        word.y = 15;\r\n        this.addChild(shape1);\r\n        this.addChild(word);\r\n    };\r\n    Cell.prototype.Override = function (cell) {\r\n        this.Suit = cell.Suit;\r\n        this.Color = cell.Color;\r\n        this.IsLive = cell.IsLive;\r\n        this.IsHold = cell.IsHold;\r\n    };\r\n    return Cell;\r\n}(createjs.Container));\r\n\r\n\n\n//# sourceURL=webpack://dxnb/./src/cell.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params */ \"./src/params.ts\");\n/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cell */ \"./src/cell.ts\");\n\r\n\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        this.hold = null;\r\n        this.stage = new createjs.Stage(\"canvas\");\r\n    }\r\n    Game.prototype.Start = function () {\r\n        var _this = this;\r\n        this.initDraw();\r\n        createjs.Ticker.addEventListener(\"tick\", function () { _this.handleTick(); });\r\n    };\r\n    Game.prototype.handleTick = function () {\r\n        this.update();\r\n        this.draw();\r\n    };\r\n    Game.prototype.update = function () {\r\n    };\r\n    Game.prototype.draw = function () {\r\n        this.stage.update();\r\n    };\r\n    Game.prototype.initDraw = function () {\r\n        var _this = this;\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                var color = Math.floor(Math.random() * 3);\r\n                var suit = Math.floor(Math.random() * 4);\r\n                var cell = new _cell__WEBPACK_IMPORTED_MODULE_1__.Cell(suit, color);\r\n                cell.Row = r;\r\n                cell.Column = c;\r\n                cell.x = c * 50;\r\n                cell.y = r * 50;\r\n                cell.addEventListener(\"click\", function (e) {\r\n                    _this.onClick(e);\r\n                });\r\n                this.stage.addChild(cell);\r\n            }\r\n        }\r\n        this.stage.update();\r\n    };\r\n    Game.prototype.getCells = function () {\r\n        var cells = [];\r\n        var _loop_1 = function (r) {\r\n            var _loop_2 = function (c) {\r\n                var cell = this_1.stage.children.find(function (x) { return x instanceof _cell__WEBPACK_IMPORTED_MODULE_1__.Cell && x.Row === r && x.Column === c; });\r\n                if (!cells[r]) {\r\n                    cells[r] = [];\r\n                }\r\n                cells[r][c] = cell;\r\n            };\r\n            for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                _loop_2(c);\r\n            }\r\n        };\r\n        var this_1 = this;\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            _loop_1(r);\r\n        }\r\n        return cells;\r\n    };\r\n    Game.prototype.check = function () {\r\n        var cells = this.getCells();\r\n        var _loop_3 = function (r) {\r\n            var suitBool = cells[r].every(function (x) { return x.Suit === cells[r][0].Suit; });\r\n            var colorBool = cells[r].every(function (x) { return x.Color === cells[r][0].Color; });\r\n            if (suitBool || colorBool) {\r\n                cells[r].forEach(function (x) {\r\n                    x.IsLive = false;\r\n                });\r\n            }\r\n        };\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            _loop_3(r);\r\n        }\r\n        this.gc();\r\n        this.drawAll();\r\n    };\r\n    Game.prototype.gc = function () {\r\n        var cells = this.getCells();\r\n        for (var r1 = this.getTopRow(); r1 < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r1++) {\r\n            if (!cells[r1][0].IsLive) {\r\n                for (var r2 = r1; r2 > 0; r2--) {\r\n                    for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                        cells[r2][c].Override(cells[r2 - 1][c]);\r\n                    }\r\n                }\r\n                for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                    cells[0][c].IsLive = false;\r\n                }\r\n            }\r\n        }\r\n    };\r\n    Game.prototype.getTopRow = function () {\r\n        var cells = this.getCells();\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            if (cells[r][0].IsLive) {\r\n                return r;\r\n            }\r\n        }\r\n        return _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT - 1;\r\n    };\r\n    Game.prototype.drawAll = function () {\r\n        var cells = this.getCells();\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                cells[r][c].Draw();\r\n            }\r\n        }\r\n    };\r\n    Game.prototype.onClick = function (e) {\r\n        var target = e.currentTarget;\r\n        this.stage.children.forEach(function (x) {\r\n            if (x instanceof _cell__WEBPACK_IMPORTED_MODULE_1__.Cell) {\r\n                x.IsHold = false;\r\n                x.Draw();\r\n            }\r\n        });\r\n        if (this.hold) {\r\n            if (this.hold !== target) {\r\n                if (this.hold.Color === target.Color || this.hold.Suit === target.Suit) {\r\n                    var color = target.Color;\r\n                    var suit = target.Suit;\r\n                    target.Color = this.hold.Color;\r\n                    target.Suit = this.hold.Suit;\r\n                    this.hold.Color = color;\r\n                    this.hold.Suit = suit;\r\n                    this.check();\r\n                }\r\n            }\r\n            this.hold.IsHold = false;\r\n            this.hold = null;\r\n        }\r\n        else {\r\n            this.hold = target;\r\n            this.hold.IsHold = true;\r\n        }\r\n        this.drawAll();\r\n    };\r\n    return Game;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://dxnb/./src/game.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.ts\");\n\r\nfunction main() {\r\n    var game = new _game__WEBPACK_IMPORTED_MODULE_0__.Game();\r\n    game.Start();\r\n}\r\nmain();\r\n\n\n//# sourceURL=webpack://dxnb/./src/main.ts?");

/***/ }),

/***/ "./src/params.ts":
/*!***********************!*\
  !*** ./src/params.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Suit\": () => (/* binding */ Suit),\n/* harmony export */   \"Color\": () => (/* binding */ Color),\n/* harmony export */   \"MAX_ROW_COUNT\": () => (/* binding */ MAX_ROW_COUNT),\n/* harmony export */   \"MAX_COLUMN_COUNT\": () => (/* binding */ MAX_COLUMN_COUNT)\n/* harmony export */ });\nvar Suit;\r\n(function (Suit) {\r\n    Suit[Suit[\"North\"] = 0] = \"North\";\r\n    Suit[Suit[\"East\"] = 1] = \"East\";\r\n    Suit[Suit[\"West\"] = 2] = \"West\";\r\n    Suit[Suit[\"South\"] = 3] = \"South\";\r\n})(Suit || (Suit = {}));\r\nvar Color;\r\n(function (Color) {\r\n    Color[Color[\"Red\"] = 0] = \"Red\";\r\n    Color[Color[\"Green\"] = 1] = \"Green\";\r\n    Color[Color[\"Blue\"] = 2] = \"Blue\";\r\n})(Color || (Color = {}));\r\nvar MAX_ROW_COUNT = 10;\r\nvar MAX_COLUMN_COUNT = 5;\r\n\n\n//# sourceURL=webpack://dxnb/./src/params.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;