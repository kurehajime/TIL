import { Suit, Color, MAX_ROW_COUNT, MAX_COLUMN_COUNT } from "./params";
import { Cell } from "./cell";

export class Game {
    private stage: createjs.Stage
    private hold: Cell = null

    constructor() {
        this.stage = new createjs.Stage("canvas")
    }
    public Start() {
        this.initDraw()
        createjs.Ticker.addEventListener("tick", () => { this.handleTick() });
    }

    private handleTick() {
        this.update()
        this.draw()
    }

    private update() {

    }

    private draw() {
        this.stage.update()
    }

    private initDraw() {
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                let color: Color = Math.floor(Math.random() * 3)
                let suit: Suit = Math.floor(Math.random() * 4)
                let cell = new Cell(suit, color)
                cell.Row = r
                cell.Column = c
                cell.x = c * 50
                cell.y = r * 50
                cell.addEventListener("click", (e: MouseEvent) => {
                    this.onClick(e)
                });
                this.stage.addChild(cell)
            }
        }

        this.stage.update()
    }

    private getCells(): Cell[][] {
        let cells: Cell[][] = []
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                let cell = this.stage.children.find(x => x instanceof Cell && x.Row === r && x.Column === c) as Cell
                if (!cells[r]) {
                    cells[r] = []
                }
                cells[r][c] = cell
            }
        }
        return cells
    }

    private check() {
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            let suitBool = cells[r].every(x => { return x.Suit === cells[r][0].Suit })
            let colorBool = cells[r].every(x => { return x.Color === cells[r][0].Color })
            if (suitBool || colorBool) {
                cells[r].forEach(x => {
                    x.IsLive = false
                })
            }
        }
        this.gc()
        this.drawAll()
    }

    private gc() {
        let cells = this.getCells()
        for (let r1 = this.getTopRow(); r1 < MAX_ROW_COUNT; r1++) {
            if (!cells[r1][0].IsLive) {
                for (let r2 = r1; r2 > 0; r2--) {
                    for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                        cells[r2][c].Override(cells[r2 - 1][c])
                    }
                }

                for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                    cells[0][c].IsLive = false
                }
            }
        }
    }
    private getTopRow() {
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            if (cells[r][0].IsLive) {
                return r
            }
        }
        return MAX_ROW_COUNT - 1
    }
    private drawAll() {
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                cells[r][c].Draw()
            }
        }
    }
    private onClick(e: MouseEvent) {
        let target = e.currentTarget as Cell
        this.stage.children.forEach(x => {
            if (x instanceof Cell) {
                x.IsHold = false
                x.Draw()
            }
        })
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
}
