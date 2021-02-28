import {
    Suit, Color, State
    , MAX_ROW_COUNT, MAX_COLUMN_COUNT, PROGRESS_SPAN, STEP_SPAN
} from "./params";
import { Cell } from "./cell";

export class Game {
    private stage: createjs.Stage
    private hold: Cell = null
    private progress = 0
    private step = 0
    private stepIncrement: boolean = false
    private field: createjs.Container

    constructor() {
        this.stage = new createjs.Stage("canvas")
    }
    public Start() {
        this.initDraw()

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", (e: createjs.TickerEvent) => { this.handleTick(e) });
    }

    //#region Tick

    private handleTick(e: createjs.TickerEvent) {
        this.update(e)
        this.draw()
    }

    private update(e: createjs.TickerEvent) {
        this.progress = Math.round(e.time / PROGRESS_SPAN)
        this.stepIncrement = (this.step !== Math.floor(this.progress / STEP_SPAN))
        this.step = Math.floor(this.progress / STEP_SPAN)
        if (this.stepIncrement) {
            this.up()
        }
        this.decrementLife()
    }

    private draw() {
        this.field.y = - (this.progress % STEP_SPAN)
        this.stage.update()
    }

    //#endregion

    //#region GameControl

    private check() {
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            let suitBool = cells[r].every(x => { return x.Suit === cells[r][0].Suit })
            let colorBool = cells[r].every(x => { return x.Color === cells[r][0].Color })
            if (suitBool || colorBool) {
                if (cells[r][0].State === State.Live) {
                    cells[r].forEach(x => {
                        x.State = State.Flash
                        x.Life = 20
                    })
                }
            }
        }
        this.drawAll()
    }

    private defrag() {
        let cells = this.getCells()
        for (let r1 = this.getTopRowNumber(); r1 < MAX_ROW_COUNT; r1++) {
            if (cells[r1][0].State === State.Delete) {
                for (let r2 = r1; r2 > 0; r2--) {
                    for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                        cells[r2][c].Override(cells[r2 - 1][c])
                    }
                }

                for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                    cells[0][c].State = State.Delete
                }
            }
        }
        this.drawAll()
        this.shake()
    }

    private up() {
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT - 1; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                cells[r][c].Override(cells[r + 1][c])
            }
        }
        this.shuffleLine(cells[MAX_ROW_COUNT - 1])
        if (this.hold) {
            if (this.hold.Row === 0) {
                this.hold = null
            } else {
                this.hold = cells[this.hold.Row - 1][this.hold.Column]
            }
        }
        this.drawAll()
    }

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

                    this.check()
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

    private shake() {
        createjs.Tween.get(this.stage)
            .to({ x: 2, y: 1, }, 50)
            .to({ x: -1, y: -2, }, 50)
            .to({ x: -3, y: 0, }, 50)
            .to({ x: 0, y: 3, }, 50)
            .to({ x: 1, y: -1, }, 50)
            .to({ x: 0, y: 0, }, 50)
    }

    //#endregion

    //#region Util

    private getTopRowNumber() {
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            if (cells[r][0].State !== State.Delete) {
                return r
            }
        }
        return MAX_ROW_COUNT - 1
    }

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

    private shuffleLine(line: Cell[]) {
        for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
            let color: Color = Math.floor(Math.random() * 3)
            let suit: Suit = Math.floor(Math.random() * 4)
            line[c].Color = color
            line[c].Suit = suit
        }
    }
    private getCellArray(): Cell[] {
        let cells = this.getCells()
        let cellArray: Cell[] = []
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                cellArray.push(cells[r][c])
            }
        }
        return cellArray
    }
    private decrementLife() {
        let def = false
        this.getCellArray().forEach(cell => {
            if (cell.State === State.Flash) {
                cell.Life--;
                if (cell.Life <= 0) {
                    cell.State = State.Delete
                    def = true
                }
            }
        });
        if (def) {
            this.defrag()
        }
    }
    //#endregion

    //#region Draw

    private initDraw() {
        let field = new createjs.Container()
        field.name = "field"
        this.field = field
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
        this.stage.addChild(field)
        this.drawAll()
        this.stage.update()
    }

    private drawAll() {
        this.getCellArray().forEach(cell => {
            cell.Draw()
        });
    }

    //#endregion

    //#region Events

    private onClick(e: MouseEvent) {
        let target = e.currentTarget as Cell
        this.swap(target)
    }

    //#endregion

}
