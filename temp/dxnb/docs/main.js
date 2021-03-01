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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cell\": () => (/* binding */ Cell)\n/* harmony export */ });\n/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params */ \"./src/params.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Cell = /** @class */ (function (_super) {\r\n    __extends(Cell, _super);\r\n    function Cell(suit, color) {\r\n        var _this = _super.call(this) || this;\r\n        _this.State = _params__WEBPACK_IMPORTED_MODULE_0__.State.Live;\r\n        _this.IsHold = false;\r\n        _this.Life = 0;\r\n        _this.Suit = suit;\r\n        _this.Color = color;\r\n        _this.Draw();\r\n        return _this;\r\n    }\r\n    Cell.prototype.Draw = function () {\r\n        var suit;\r\n        var color;\r\n        this.removeAllChildren();\r\n        if (this.State === _params__WEBPACK_IMPORTED_MODULE_0__.State.Delete) {\r\n            return;\r\n        }\r\n        switch (this.Suit) {\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Suit.North:\r\n                suit = \"北\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Suit.East:\r\n                suit = \"東\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Suit.West:\r\n                suit = \"西\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Suit.South:\r\n                suit = \"南\";\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n        switch (this.Color) {\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Color.Red:\r\n                color = \"DarkRed\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Color.Green:\r\n                color = \"DarkGreen\";\r\n                break;\r\n            case _params__WEBPACK_IMPORTED_MODULE_0__.Color.Blue:\r\n                color = \"DarkBlue\";\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n        var shape1 = new createjs.Shape();\r\n        shape1.graphics.beginFill(color);\r\n        shape1.graphics.drawRoundRect(5, 5, 45, 45, 5);\r\n        if (this.IsHold) {\r\n            var shadow = new createjs.Shadow(\"#ffff00\", 0, 0, 15);\r\n            shape1.shadow = shadow;\r\n        }\r\n        var word = new createjs.Text(suit, \"24px serif\", \"White\");\r\n        word.textAlign = \"center\";\r\n        word.x = 27;\r\n        word.y = 15;\r\n        if (this.State === _params__WEBPACK_IMPORTED_MODULE_0__.State.Flash) {\r\n            this.alpha = 0.7;\r\n        }\r\n        else {\r\n            this.alpha = 1;\r\n        }\r\n        this.addChild(shape1);\r\n        this.addChild(word);\r\n    };\r\n    Cell.prototype.Override = function (cell) {\r\n        this.Suit = cell.Suit;\r\n        this.Color = cell.Color;\r\n        this.State = cell.State;\r\n        this.IsHold = cell.IsHold;\r\n    };\r\n    return Cell;\r\n}(createjs.Container));\r\n\r\n\n\n//# sourceURL=webpack://dxnb/./src/cell.ts?");

/***/ }),

/***/ "./src/cover.ts":
/*!**********************!*\
  !*** ./src/cover.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cover\": () => (/* binding */ Cover)\n/* harmony export */ });\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar Cover = /** @class */ (function (_super) {\r\n    __extends(Cover, _super);\r\n    function Cover() {\r\n        var _this = _super.call(this) || this;\r\n        _this.Draw();\r\n        return _this;\r\n    }\r\n    Cover.prototype.Draw = function () {\r\n        this.removeAllChildren();\r\n        var color = \"black\";\r\n        var cover = new createjs.Shape();\r\n        cover.graphics.beginFill(color);\r\n        cover.graphics.drawRect(0, 0, 300, 535);\r\n        cover.alpha = 0.5;\r\n        this.addChild(cover);\r\n    };\r\n    Cover.prototype.UnDraw = function () {\r\n        this.removeAllChildren();\r\n    };\r\n    return Cover;\r\n}(createjs.Container));\r\n\r\n\n\n//# sourceURL=webpack://dxnb/./src/cover.ts?");

/***/ }),

/***/ "./src/frame.ts":
/*!**********************!*\
  !*** ./src/frame.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Frame\": () => (/* binding */ Frame)\n/* harmony export */ });\n/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params */ \"./src/params.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Frame = /** @class */ (function (_super) {\r\n    __extends(Frame, _super);\r\n    function Frame() {\r\n        var _this = _super.call(this) || this;\r\n        _this.Draw();\r\n        return _this;\r\n    }\r\n    Frame.prototype.Draw = function () {\r\n        this.removeAllChildren();\r\n        var color = \"black\";\r\n        var top = new createjs.Shape();\r\n        top.graphics.beginFill(color);\r\n        top.graphics.drawRect(0, 0, 50 * (_params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT + 1), _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP);\r\n        this.addChild(top);\r\n        var toge = new createjs.Shape();\r\n        toge.graphics.beginFill(\"red\");\r\n        toge.graphics.drawRect(0, _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP, 50 * (_params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT + 1), 10);\r\n        toge.alpha = 0.5;\r\n        this.addChild(toge);\r\n        var bottom = new createjs.Shape();\r\n        bottom.graphics.beginFill(color);\r\n        bottom.graphics.drawRect(0, 50 * (_params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT - 2) + 40, 50 * (_params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT + 1), 50);\r\n        this.addChild(bottom);\r\n        var left = new createjs.Shape();\r\n        left.graphics.beginFill(color);\r\n        left.graphics.drawRect(0, 0, _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT, 50 * _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT + 25);\r\n        this.addChild(left);\r\n        var right = new createjs.Shape();\r\n        right.graphics.beginFill(color);\r\n        right.graphics.drawRect(25 + 5 + (50 * _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT), 0, _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT, 50 * _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT + 25);\r\n        this.addChild(right);\r\n    };\r\n    return Frame;\r\n}(createjs.Container));\r\n\r\n\n\n//# sourceURL=webpack://dxnb/./src/frame.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./params */ \"./src/params.ts\");\n/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cell */ \"./src/cell.ts\");\n/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./frame */ \"./src/frame.ts\");\n/* harmony import */ var _shadow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shadow */ \"./src/shadow.ts\");\n/* harmony import */ var _cover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cover */ \"./src/cover.ts\");\n\r\n\r\n\r\n\r\n\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        this.hold = null;\r\n        this.progress = 0;\r\n        this.progressBySpeed = 0;\r\n        this.step = 0;\r\n        this.stepIncrement = false;\r\n        this.stopTime = 0;\r\n        this.stage = new createjs.Stage(\"canvas\");\r\n    }\r\n    Game.prototype.Start = function () {\r\n        var _this = this;\r\n        this.initDraw();\r\n        this.cover.addEventListener(\"mousedown\", function (e) {\r\n            createjs.Ticker.timingMode = createjs.Ticker.RAF;\r\n            createjs.Ticker.addEventListener(\"tick\", function (e) { _this.handleTick(e); });\r\n            _this.cover.UnDraw();\r\n            _this.cover.removeAllEventListeners();\r\n        });\r\n    };\r\n    //#region Tick\r\n    Game.prototype.handleTick = function (e) {\r\n        this.update(e);\r\n        this.draw(e);\r\n    };\r\n    Game.prototype.update = function (e) {\r\n        var delta = Math.max(e.delta - this.stopTime, 0);\r\n        this.stopTime = Math.max(this.stopTime - e.delta, 0);\r\n        this.progress = this.progress + Math.round(delta);\r\n        this.progressBySpeed = Math.round(this.progress / _params__WEBPACK_IMPORTED_MODULE_0__.PROGRESS_SPAN);\r\n        this.stepIncrement = (this.step !== Math.floor(this.progressBySpeed / _params__WEBPACK_IMPORTED_MODULE_0__.STEP_SPAN));\r\n        this.step = Math.floor(this.progressBySpeed / _params__WEBPACK_IMPORTED_MODULE_0__.STEP_SPAN);\r\n        if (this.stepIncrement) {\r\n            this.up();\r\n        }\r\n        this.decrementLife();\r\n        if (this.getTopRowNumber() === 0) {\r\n            console.log(\"Game Over\");\r\n        }\r\n    };\r\n    Game.prototype.draw = function (e) {\r\n        this.field.y = _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP - (this.progressBySpeed % _params__WEBPACK_IMPORTED_MODULE_0__.STEP_SPAN);\r\n        if (this.shadow.IsLive) {\r\n            this.shadow.Hue = this.progress;\r\n        }\r\n        this.stage.update();\r\n    };\r\n    //#endregion\r\n    //#region GameControl\r\n    Game.prototype.check = function () {\r\n        var _this = this;\r\n        var cells = this.getCells();\r\n        var _loop_1 = function (r) {\r\n            var suitBool = cells[r].every(function (x) { return x.Suit === cells[r][0].Suit; });\r\n            var colorBool = cells[r].every(function (x) { return x.Color === cells[r][0].Color; });\r\n            if (suitBool || colorBool) {\r\n                if (cells[r][0].State === _params__WEBPACK_IMPORTED_MODULE_0__.State.Live) {\r\n                    cells[r].forEach(function (x) {\r\n                        x.State = _params__WEBPACK_IMPORTED_MODULE_0__.State.Flash;\r\n                        x.Life = 20;\r\n                        _this.stopTime += 750;\r\n                    });\r\n                }\r\n            }\r\n        };\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            _loop_1(r);\r\n        }\r\n        this.drawAll();\r\n    };\r\n    Game.prototype.defrag = function () {\r\n        var cells = this.getCells();\r\n        for (var r1 = this.getTopRowNumber(); r1 < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r1++) {\r\n            if (cells[r1][0].State === _params__WEBPACK_IMPORTED_MODULE_0__.State.Delete) {\r\n                for (var r2 = r1; r2 > 0; r2--) {\r\n                    for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                        cells[r2][c].Override(cells[r2 - 1][c]);\r\n                    }\r\n                }\r\n                for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                    cells[0][c].State = _params__WEBPACK_IMPORTED_MODULE_0__.State.Delete;\r\n                }\r\n            }\r\n        }\r\n        this.shake();\r\n        this.check();\r\n    };\r\n    Game.prototype.up = function () {\r\n        var cells = this.getCells();\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT - 1; r++) {\r\n            for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                cells[r][c].Override(cells[r + 1][c]);\r\n            }\r\n        }\r\n        this.shuffleLine(cells[_params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT - 1]);\r\n        if (this.hold) {\r\n            if (this.hold.Row === 0) {\r\n                this.hold = null;\r\n            }\r\n            else {\r\n                this.hold = cells[this.hold.Row - 1][this.hold.Column];\r\n            }\r\n        }\r\n        this.drawAll();\r\n    };\r\n    Game.prototype.swap = function (target) {\r\n        this.field.children.forEach(function (x) {\r\n            if (x instanceof _cell__WEBPACK_IMPORTED_MODULE_1__.Cell) {\r\n                x.IsHold = false;\r\n                x.Draw();\r\n            }\r\n        });\r\n        if (target.State !== _params__WEBPACK_IMPORTED_MODULE_0__.State.Live) {\r\n            return;\r\n        }\r\n        if (this.hold) {\r\n            if (this.hold !== target) {\r\n                if (this.hold.Color === target.Color || this.hold.Suit === target.Suit) {\r\n                    var color = target.Color;\r\n                    var suit = target.Suit;\r\n                    target.Color = this.hold.Color;\r\n                    target.Suit = this.hold.Suit;\r\n                    this.hold.Color = color;\r\n                    this.hold.Suit = suit;\r\n                    // 影\r\n                    this.shadow.IsLive = true;\r\n                    this.shadow.x = this.hold.x;\r\n                    this.shadow.y = this.hold.y;\r\n                    this.shadow.Hue = 0;\r\n                    this.shadow.Life = 20;\r\n                    createjs.Tween.get(this.shadow)\r\n                        .to({ x: target.x, y: target.y }, 100);\r\n                    this.check();\r\n                }\r\n            }\r\n            this.hold.IsHold = false;\r\n            this.hold = null;\r\n        }\r\n        else {\r\n            this.hold = target;\r\n            this.hold.IsHold = true;\r\n        }\r\n        this.drawAll();\r\n    };\r\n    Game.prototype.shake = function () {\r\n        createjs.Tween.get(this.field)\r\n            .to({ x: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT + 1, y: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP + 1, }, 50)\r\n            .to({ x: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT - 1, y: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP - 1, }, 50)\r\n            .to({ x: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT + 1, y: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP + 0, }, 50)\r\n            .to({ x: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT + 0, y: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP + 1, }, 50)\r\n            .to({ x: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT - 1, y: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP - 1, }, 50)\r\n            .to({ x: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT + 0, y: _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP + 0, }, 50);\r\n    };\r\n    //#endregion\r\n    //#region Util\r\n    Game.prototype.getTopRowNumber = function () {\r\n        var cells = this.getCells();\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            if (cells[r][0].State !== _params__WEBPACK_IMPORTED_MODULE_0__.State.Delete) {\r\n                return r;\r\n            }\r\n        }\r\n        return _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT - 1;\r\n    };\r\n    Game.prototype.getCells = function () {\r\n        var cells = [];\r\n        var _loop_2 = function (r) {\r\n            var _loop_3 = function (c) {\r\n                var cell = this_1.field.children.find(function (x) { return x instanceof _cell__WEBPACK_IMPORTED_MODULE_1__.Cell && x.Row === r && x.Column === c; });\r\n                if (!cells[r]) {\r\n                    cells[r] = [];\r\n                }\r\n                cells[r][c] = cell;\r\n            };\r\n            for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                _loop_3(c);\r\n            }\r\n        };\r\n        var this_1 = this;\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            _loop_2(r);\r\n        }\r\n        return cells;\r\n    };\r\n    Game.prototype.shuffleLine = function (line) {\r\n        for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n            var color = Math.floor(Math.random() * 3);\r\n            var suit = Math.floor(Math.random() * 4);\r\n            line[c].Color = color;\r\n            line[c].Suit = suit;\r\n        }\r\n    };\r\n    Game.prototype.getCellArray = function () {\r\n        var cells = this.getCells();\r\n        var cellArray = [];\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                cellArray.push(cells[r][c]);\r\n            }\r\n        }\r\n        return cellArray;\r\n    };\r\n    Game.prototype.decrementLife = function () {\r\n        var def = false;\r\n        this.getCellArray().forEach(function (cell) {\r\n            if (cell.State === _params__WEBPACK_IMPORTED_MODULE_0__.State.Flash) {\r\n                cell.Life--;\r\n                if (cell.Life <= 0) {\r\n                    cell.State = _params__WEBPACK_IMPORTED_MODULE_0__.State.Delete;\r\n                    def = true;\r\n                }\r\n            }\r\n        });\r\n        if (this.shadow.IsLive) {\r\n            this.shadow.Life--;\r\n        }\r\n        if (def) {\r\n            this.defrag();\r\n        }\r\n    };\r\n    //#endregion\r\n    //#region Draw\r\n    Game.prototype.initDraw = function () {\r\n        var _this = this;\r\n        var field = new createjs.Container();\r\n        field.name = \"field\";\r\n        this.field = field;\r\n        this.field.x = _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_LEFT;\r\n        this.field.y = _params__WEBPACK_IMPORTED_MODULE_0__.FRAME_TOP;\r\n        for (var r = 0; r < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_ROW_COUNT; r++) {\r\n            for (var c = 0; c < _params__WEBPACK_IMPORTED_MODULE_0__.MAX_COLUMN_COUNT; c++) {\r\n                var color = Math.floor(Math.random() * 3);\r\n                var suit = Math.floor(Math.random() * 4);\r\n                var cell = new _cell__WEBPACK_IMPORTED_MODULE_1__.Cell(suit, color);\r\n                cell.Row = r;\r\n                cell.Column = c;\r\n                cell.x = c * 50;\r\n                cell.y = r * 50;\r\n                if (r < 5) {\r\n                    cell.State = _params__WEBPACK_IMPORTED_MODULE_0__.State.Delete;\r\n                }\r\n                cell.addEventListener(\"mousedown\", function (e) {\r\n                    _this.onClick(e);\r\n                });\r\n                field.addChild(cell);\r\n            }\r\n        }\r\n        this.shadow = new _shadow__WEBPACK_IMPORTED_MODULE_3__.Shadow();\r\n        field.addChild(this.shadow);\r\n        this.cover = new _cover__WEBPACK_IMPORTED_MODULE_4__.Cover();\r\n        this.stage.addChild(field);\r\n        this.stage.addChild(new _frame__WEBPACK_IMPORTED_MODULE_2__.Frame());\r\n        this.stage.addChild(this.cover);\r\n        this.drawAll();\r\n        this.stage.update();\r\n    };\r\n    Game.prototype.drawAll = function () {\r\n        this.getCellArray().forEach(function (cell) {\r\n            cell.Draw();\r\n        });\r\n    };\r\n    //#endregion\r\n    //#region Events\r\n    Game.prototype.onClick = function (e) {\r\n        var target = e.currentTarget;\r\n        this.swap(target);\r\n    };\r\n    return Game;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://dxnb/./src/game.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.ts\");\n\r\nvar sounds = [\r\n    { src: \"./swap.mp3\", id: \"swap\" },\r\n    { src: \"./break.mp3\", id: \"break\" },\r\n];\r\ncreatejs.Sound.addEventListener(\"fileload\", handleLoad);\r\ncreatejs.Sound.registerSounds(sounds);\r\nfunction handleLoad(event) {\r\n    main();\r\n}\r\nfunction main() {\r\n    var game = new _game__WEBPACK_IMPORTED_MODULE_0__.Game();\r\n    game.Start();\r\n}\r\n\n\n//# sourceURL=webpack://dxnb/./src/main.ts?");

/***/ }),

/***/ "./src/params.ts":
/*!***********************!*\
  !*** ./src/params.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Suit\": () => (/* binding */ Suit),\n/* harmony export */   \"Color\": () => (/* binding */ Color),\n/* harmony export */   \"State\": () => (/* binding */ State),\n/* harmony export */   \"MAX_ROW_COUNT\": () => (/* binding */ MAX_ROW_COUNT),\n/* harmony export */   \"MAX_COLUMN_COUNT\": () => (/* binding */ MAX_COLUMN_COUNT),\n/* harmony export */   \"PROGRESS_SPAN\": () => (/* binding */ PROGRESS_SPAN),\n/* harmony export */   \"STEP_SPAN\": () => (/* binding */ STEP_SPAN),\n/* harmony export */   \"FRAME_TOP\": () => (/* binding */ FRAME_TOP),\n/* harmony export */   \"FRAME_LEFT\": () => (/* binding */ FRAME_LEFT)\n/* harmony export */ });\nvar Suit;\r\n(function (Suit) {\r\n    Suit[Suit[\"North\"] = 0] = \"North\";\r\n    Suit[Suit[\"East\"] = 1] = \"East\";\r\n    Suit[Suit[\"West\"] = 2] = \"West\";\r\n    Suit[Suit[\"South\"] = 3] = \"South\";\r\n})(Suit || (Suit = {}));\r\nvar Color;\r\n(function (Color) {\r\n    Color[Color[\"Red\"] = 0] = \"Red\";\r\n    Color[Color[\"Green\"] = 1] = \"Green\";\r\n    Color[Color[\"Blue\"] = 2] = \"Blue\";\r\n})(Color || (Color = {}));\r\nvar State;\r\n(function (State) {\r\n    State[State[\"Live\"] = 0] = \"Live\";\r\n    State[State[\"Flash\"] = 1] = \"Flash\";\r\n    State[State[\"Delete\"] = 2] = \"Delete\";\r\n})(State || (State = {}));\r\nvar MAX_ROW_COUNT = 11;\r\nvar MAX_COLUMN_COUNT = 5;\r\nvar PROGRESS_SPAN = 300;\r\nvar STEP_SPAN = 50;\r\nvar FRAME_TOP = 25;\r\nvar FRAME_LEFT = 25;\r\n\n\n//# sourceURL=webpack://dxnb/./src/params.ts?");

/***/ }),

/***/ "./src/shadow.ts":
/*!***********************!*\
  !*** ./src/shadow.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Shadow\": () => (/* binding */ Shadow)\n/* harmony export */ });\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar Shadow = /** @class */ (function (_super) {\r\n    __extends(Shadow, _super);\r\n    function Shadow() {\r\n        var _this = _super.call(this) || this;\r\n        _this._isLive = false;\r\n        _this._hue = 0;\r\n        _this._life = 0;\r\n        _this.Draw();\r\n        return _this;\r\n    }\r\n    Object.defineProperty(Shadow.prototype, \"Life\", {\r\n        get: function () {\r\n            return this._life;\r\n        },\r\n        set: function (value) {\r\n            this._life = value;\r\n            if (this._life <= 0) {\r\n                this.IsLive = false;\r\n            }\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Shadow.prototype, \"IsLive\", {\r\n        get: function () {\r\n            return this._isLive;\r\n        },\r\n        set: function (value) {\r\n            this._isLive = value;\r\n            this.Draw();\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(Shadow.prototype, \"Hue\", {\r\n        set: function (value) {\r\n            this._hue = value;\r\n            if (this._isLive) {\r\n                this.shape.graphics.beginFill(createjs.Graphics.getHSL(this._hue, 50, 50));\r\n            }\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Shadow.prototype.Draw = function () {\r\n        this.removeAllChildren();\r\n        if (this._isLive) {\r\n            var shape1 = new createjs.Shape();\r\n            shape1.graphics.beginFill(createjs.Graphics.getHSL(this._hue, 50, 50));\r\n            shape1.graphics.drawRoundRect(5, 5, 45, 45, 5);\r\n            shape1.alpha = 0.3;\r\n            this.shape = shape1;\r\n            this.children.push(shape1);\r\n        }\r\n    };\r\n    return Shadow;\r\n}(createjs.Container));\r\n\r\n\n\n//# sourceURL=webpack://dxnb/./src/shadow.ts?");

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