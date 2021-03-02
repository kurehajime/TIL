import {
    Suit, Color, State
    , MAX_ROW_COUNT, MAX_COLUMN_COUNT, PROGRESS_SPAN, STEP_SPAN, FRAME_TOP, FRAME_LEFT, END_OF_TIME
} from "./params";
import { Cell } from "./cell";
import { Frame } from "./frame";
import { Shadow } from "./shadow";
import { Cover } from "./cover";
import { Score } from "./score";
import { Utils } from "./utils";
import { EventManager } from "./eventManager";

export class Game {
    private stage: createjs.Stage
    private hold: Cell = null
    private eventManager: EventManager = new EventManager()
    private progress = 0
    private progressBySpeed = 0
    private step = 0
    private stepIncrement: boolean = false
    private stopTime = 0
    private field: createjs.Container
    private shadow: Shadow
    private cover: Cover
    private score: Score
    private point: number = 0
    private isGameOver: boolean = false
    private startTime: number = 0
    private bonusSuit: Suit = null
    private bonusColor: Color = null


    private soundSource = [
        { src: "./bgm.m4a", id: "bgm" },
        { src: "./swap.mp3", id: "swap" },
        { src: "./break.mp3", id: "break" },
    ];
    private sounds: { [name: string]: createjs.AbstractSoundInstance } = {}

    constructor() {
        this.stage = new createjs.Stage("canvas")
    }

    public Start() {
        this.initDraw()

        // 音声読み込み
        createjs.Sound.addEventListener("fileload", (event: any) => {
            this.sounds[event.id] = createjs.Sound.createInstance(event.id);
        });
        createjs.Sound.registerSounds(this.soundSource);

        // 最初のマウスクリックでTickを起動
        this.cover.addEventListener("mousedown", (e: MouseEvent) => {
            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", (e: createjs.TickerEvent) => { this.handleTick(e) });
            this.sounds["bgm"]?.setLoop(-1)
            this.sounds["bgm"]?.setVolume(0.3)
            this.sounds["bgm"]?.play()
            this.cover.UnDraw()
            this.cover.removeAllEventListeners()
        });

    }

    //#region Tick

    private handleTick(e: createjs.TickerEvent) {
        this.update(e)
        this.eventManager.Tick(e.time)
        this.draw(e)
    }

    private update(e: createjs.TickerEvent) {

        // ゲーム開始からの時間
        if (this.startTime === 0) {
            this.startTime = e.time
        }
        let time = e.time - this.startTime
        let progressPer = time / END_OF_TIME

        // ゲームオーバー判定
        if (progressPer > 1) {
            this.gameOver()
        }


        if (!this.isGameOver) {
            let delta = Math.max(e.delta - this.stopTime, 0)
            let progress_span = PROGRESS_SPAN - (200 * progressPer)
            this.stopTime = Math.max(this.stopTime - e.delta, 0)
            this.progress = this.progress + Math.round(delta)
            this.progressBySpeed = Math.round(this.progress / progress_span)
            this.stepIncrement = (this.step !== Math.floor(this.progressBySpeed / STEP_SPAN))
            this.step = Math.floor(this.progressBySpeed / STEP_SPAN)
            if (this.stepIncrement) {
                this.up()
            }

            // ゲームオーバー判定
            if (Utils.GetTopRowNumber(this.getCells()) === 0) {
                this.gameOver()
            }
        }
    }

    private draw(e: createjs.TickerEvent) {
        // せり上げる
        this.field.y = FRAME_TOP - (this.progressBySpeed % STEP_SPAN)
        if (this.shadow.IsLive) {
            this.shadow.Hue = this.progress
        }
        this.stage.update()
    }

    //#endregion

    //#region GameControl

    // 消去判定
    private check() {
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            let [suitBool, suit] = Utils.CheckSuit(cells[r])
            let [colorBool, color] = Utils.CheckColor(cells[r])
            if (suitBool || colorBool) {
                if (cells[r][0].State === State.Live) {
                    cells[r].forEach(x => {
                        x.State = State.Flash
                    })
                    this.stopTime += 4000
                    let row = cells[r]
                    this.eventManager.SetEvent(500, () => {
                        row.forEach(x => {
                            x.State = State.Delete
                        })
                        this.defrag()
                    })

                    //ボーナスブロックに変える 
                    if (suitBool && this.bonusSuit === suit) {
                        Utils.ChangeBlock(this.getCells(), this.bonusSuit, null)
                        this.eventManager.SetEvent(500, () => {
                            this.check()
                        })
                    }
                    if (colorBool && this.bonusColor === color) {
                        this.eventManager.SetEvent(500, () => {
                            this.check()
                        })
                    }
                }

            }
        }
        this.drawAll()
    }

    // 削除可能ブロックを消して詰める
    private defrag() {
        let point = Utils.Defrag(this.getCells())
        if (point > 0) {
            this.point += point
            this.sounds["break"]?.play()
            Utils.Shake(this.field)
            this.drawAll()
        }
    }

    // ブロックの繰り上げ
    private up() {
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT - 1; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                cells[r][c].Override(cells[r + 1][c])
            }
        }
        Utils.ShuffleLine(cells[MAX_ROW_COUNT - 1])
        if (this.hold) {
            if (this.hold.Row === 0) {
                this.hold = null
            } else {
                this.hold = cells[this.hold.Row - 1][this.hold.Column]
            }
        }
        this.drawAll()
    }

    // ブロックの入れ替え
    private swap(target: Cell) {
        this.field.children.forEach(x => {
            if (x instanceof Cell) {
                x.IsHold = false
                x.Draw()
            }
        })
        if (target.State !== State.Live) {
            return
        }
        if (this.hold) {
            if (this.hold !== target) {
                if (this.hold.Color === target.Color || this.hold.Suit === target.Suit) {
                    let color = target.Color
                    let suit = target.Suit
                    target.Color = this.hold.Color
                    target.Suit = this.hold.Suit
                    this.hold.Color = color
                    this.hold.Suit = suit

                    // 影
                    this.shadow.IsLive = true
                    this.shadow.x = this.hold.x
                    this.shadow.y = this.hold.y
                    this.shadow.Hue = 0
                    this.eventManager.SetEvent(300, () => {
                        this.shadow.IsLive = false
                    })
                    createjs.Tween.get(this.shadow)
                        .to({ x: target.x, y: target.y }, 100)


                    this.check()
                    this.sounds["swap"]?.play()
                }
            }
            this.hold.IsHold = false
            this.hold = null
        } else {
            this.hold = target
            this.hold.IsHold = true
        }
        this.drawAll()
    }

    // ゲームオーバー
    private gameOver() {
        this.isGameOver = true
        this.sounds["bgm"]?.stop()
        this.score.Draw(this.point)
    }

    //#endregion

    //#region Util

    private getCells(): Cell[][] {
        let cells: Cell[][] = []
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                let cell = this.field.children.find(x => x instanceof Cell && x.Row === r && x.Column === c) as Cell
                if (!cells[r]) {
                    cells[r] = []
                }
                cells[r][c] = cell
            }
        }
        return cells
    }

    //#endregion

    //#region Draw

    // 初期描画
    private initDraw() {
        let field = new createjs.Container()
        field.name = "field"
        this.field = field
        this.field.x = FRAME_LEFT
        this.field.y = FRAME_TOP
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                let color: Color = Math.floor(Math.random() * 3)
                let suit: Suit = Math.floor(Math.random() * 4)
                let cell = new Cell(suit, color)
                cell.Row = r
                cell.Column = c
                cell.x = c * 50
                cell.y = r * 50
                if (r < 5) {
                    cell.State = State.Delete
                }
                cell.addEventListener("mousedown", (e: MouseEvent) => {
                    this.onClick(e)
                });
                field.addChild(cell)
            }
        }
        this.shadow = new Shadow()
        field.addChild(this.shadow)

        this.cover = new Cover()
        this.score = new Score()
        this.stage.addChild(field)
        this.stage.addChild(new Frame())
        this.stage.addChild(this.cover)
        this.stage.addChild(this.score)
        this.drawAll()
        this.stage.update()
    }

    private drawAll() {
        Utils.GetCellArray(this.getCells()).forEach(cell => {
            cell.Draw()
        });
    }

    //#endregion

    //#region Events

    private onClick(e: MouseEvent) {
        let target = e.currentTarget as Cell
        if (!this.isGameOver) {
            if (this.sounds["bgm"]?.getPosition() === 0) {
                this.sounds["bgm"]?.setVolume(0.3)
                this.sounds["bgm"]?.setLoop(-1)
                this.sounds["bgm"]?.play()
            }
            this.swap(target)
        }
    }

    //#endregion

}
