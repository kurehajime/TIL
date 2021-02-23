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
/***/ (function() {

eval("var __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar lastRender = 0;\r\nvar Game = /** @class */ (function () {\r\n    function Game() {\r\n        this.isRunning = false;\r\n        this.press = [];\r\n        this.pressing = [];\r\n        this.pressed = [];\r\n        this.Pad = {\r\n            A: 0,\r\n            B: 1,\r\n            X: 2,\r\n            Y: 3,\r\n            L1: 4,\r\n            L2: 5,\r\n            R1: 6,\r\n            R2: 7,\r\n            SELECT: 8,\r\n            START: 9,\r\n            L3: 10,\r\n            R3: 11,\r\n            Top: 12,\r\n            Bottom: 13,\r\n            Left: 14,\r\n            Right: 15,\r\n            Center: 16\r\n        };\r\n        this.stage = new createjs.Stage(\"canvas\");\r\n    }\r\n    Game.prototype.Start = function () {\r\n        var _this = this;\r\n        this.isRunning = true;\r\n        this.initDraw();\r\n        window.requestAnimationFrame(function (t) { _this.loop(t); });\r\n    };\r\n    Game.prototype.loop = function (timestamp) {\r\n        var _this = this;\r\n        var progress = timestamp - lastRender;\r\n        this.update(progress);\r\n        this.draw();\r\n        lastRender = timestamp;\r\n        if (this.isRunning) {\r\n            window.requestAnimationFrame(function (t) { _this.loop(t); });\r\n        }\r\n    };\r\n    Game.prototype.update = function (progress) {\r\n        this.getPad();\r\n        this.move(progress);\r\n    };\r\n    Game.prototype.draw = function () {\r\n        var _this = this;\r\n        if (this.press.length > 0) {\r\n            console.log(\"puress: \" + this.press.map(function (n) { return _this.numToKey(n); }).join(\" , \"));\r\n        }\r\n        if (this.pressed.length > 0) {\r\n            console.log(\"             puressed: \" + this.pressed.map(function (n) { return _this.numToKey(n); }).join(\" , \"));\r\n        }\r\n        this.stage.update();\r\n    };\r\n    Game.prototype.move = function (progress) {\r\n        var _a, _b;\r\n        var player = this.stage.getChildByName(\"player\");\r\n        var plusX = 0;\r\n        if (this.pressing.indexOf(this.Pad.Left) !== -1) {\r\n            plusX = -10;\r\n        }\r\n        if (this.pressing.indexOf(this.Pad.Right) !== -1) {\r\n            plusX = 10;\r\n        }\r\n        player.prevX = player.x;\r\n        player.x += plusX;\r\n        var isGround = (player.y >= 100);\r\n        var jp = 0;\r\n        var plusY = 0;\r\n        if (isGround) {\r\n            if (this.pressing.indexOf(this.Pad.A) !== -1) {\r\n                jp = -10;\r\n                plusY = (player.y - ((_a = player.prevY) !== null && _a !== void 0 ? _a : 100)) + jp;\r\n            }\r\n        }\r\n        else {\r\n            jp = 1;\r\n            plusY = (player.y - ((_b = player.prevY) !== null && _b !== void 0 ? _b : 100)) + jp;\r\n        }\r\n        player.prevY = player.y;\r\n        player.y += plusY;\r\n    };\r\n    Game.prototype.getPad = function () {\r\n        var gamepads = navigator.getGamepads();\r\n        var now_press = [];\r\n        var now_pressing = [];\r\n        var now_pressed = [];\r\n        for (var _i = 0, gamepads_1 = gamepads; _i < gamepads_1.length; _i++) {\r\n            var gp = gamepads_1[_i];\r\n            if (gp) {\r\n                for (var i = 0; i < gp.buttons.length; i++) {\r\n                    var prev = (this.pressing.indexOf(i) !== -1);\r\n                    if (gp.buttons[i].pressed) {\r\n                        now_pressing.push(i);\r\n                    }\r\n                    if (gp.buttons[i].pressed && !prev) {\r\n                        now_press.push(i);\r\n                    }\r\n                    if (!gp.buttons[i].pressed && prev) {\r\n                        now_pressed.push(i);\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        this.press = now_press;\r\n        this.pressing = now_pressing;\r\n        this.pressed = now_pressed;\r\n    };\r\n    Game.prototype.numToKey = function (num) {\r\n        switch (num) {\r\n            case this.Pad.A:\r\n                return 'A';\r\n            case this.Pad.B:\r\n                return 'B';\r\n            case this.Pad.X:\r\n                return 'X';\r\n            case this.Pad.Y:\r\n                return 'Y';\r\n            case this.Pad.L1:\r\n                return 'L1';\r\n            case this.Pad.R1:\r\n                return 'R1';\r\n            case this.Pad.L2:\r\n                return 'L2';\r\n            case this.Pad.R2:\r\n                return 'R2';\r\n            case this.Pad.SELECT:\r\n                return 'SELECT';\r\n            case this.Pad.START:\r\n                return 'START';\r\n            case this.Pad.L3:\r\n                return 'L3';\r\n            case this.Pad.R3:\r\n                return 'R3';\r\n            case this.Pad.Top:\r\n                return 'Top';\r\n            case this.Pad.Bottom:\r\n                return 'Bottom';\r\n            case this.Pad.Left:\r\n                return 'Left';\r\n            case this.Pad.Right:\r\n                return 'Right';\r\n            case this.Pad.Center:\r\n                return 'Center';\r\n            default:\r\n                break;\r\n        }\r\n        return '';\r\n    };\r\n    Game.prototype.initDraw = function () {\r\n        // 円を作成します\r\n        var shape1 = new createjs.Shape();\r\n        shape1.graphics.beginFill(\"DarkRed\"); // 赤色で描画するように設定\r\n        shape1.graphics.drawCircle(0, 0, 5); //半径 100px の円を描画\r\n        shape1.x = 5; // X 座標 200px の位置に配置\r\n        shape1.y = 5; // Y 座標 200px の位置に配置\r\n        // 円を作成します\r\n        var shape2 = new createjs.Shape();\r\n        shape2.graphics.beginFill(\"Blue\"); // 赤色で描画するように設定\r\n        shape2.graphics.drawCircle(0, 0, 5); //半径 100px の円を描画\r\n        shape2.x = 5; // X 座標 200px の位置に配置\r\n        shape2.y = 15; // Y 座標 200px の位置に配置\r\n        // コンテナー(グループの親)を作成\r\n        var container = new Player();\r\n        container.name = \"player\";\r\n        container.addChild(shape1);\r\n        container.addChild(shape2);\r\n        container.y = 100;\r\n        this.stage.addChild(container);\r\n        // Stageの描画を更新します\r\n        this.stage.update();\r\n    };\r\n    return Game;\r\n}());\r\nvar Player = /** @class */ (function (_super) {\r\n    __extends(Player, _super);\r\n    function Player() {\r\n        return _super !== null && _super.apply(this, arguments) || this;\r\n    }\r\n    return Player;\r\n}(createjs.Container));\r\nfunction main() {\r\n    var game = new Game();\r\n    game.Start();\r\n}\r\nmain();\r\n\n\n//# sourceURL=webpack://crtjs/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/main.ts"]();
/******/ 	
/******/ })()
;