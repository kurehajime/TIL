import {
    Suit, Color, State
    , MAX_ROW_COUNT, MAX_COLUMN_COUNT, PROGRESS_SPAN, STEP_SPAN, FRAME_TOP, FRAME_LEFT, END_OF_TIME
} from "./params";
import { Cell } from "./cell";

export class Utils {

    // Suitの消去判定
    public static CheckSuit(row: Cell[]): [boolean, Suit] {
        let min = Math.min.apply(null, row.filter(x => x.Suit !== Suit.Wild).map(x => x.Suit)) as Suit
        let max = Math.max.apply(null, row.filter(x => x.Suit !== Suit.Wild).map(x => x.Suit)) as Suit
        return [min === max, min]
    }

    // Colorの消去判定
    public static CheckColor(row: Cell[]): [boolean, Color] {
        let min = Math.min.apply(null, row.filter(x => x.Suit !== Suit.Wild).map(x => x.Color)) as Color
        let max = Math.max.apply(null, row.filter(x => x.Color !== Color.Rainbow).map(x => x.Color)) as Color
        return [min === max, min]
    }

    // 列をシャッフル
    public static ShuffleLine(line: Cell[]) {
        for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
            let color: Color = Math.floor(Math.random() * 3)
            let suit: Suit = Math.floor(Math.random() * 4)
            line[c].Color = color
            line[c].Suit = suit
        }
    }

    // 一番上の行を返す
    public static GetTopRowNumber(cells: Cell[][]) {
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            if (cells[r][0].State !== State.Delete) {
                return r
            }
        }
        return MAX_ROW_COUNT - 1
    }

    // 二次元のCell配列を1次元に
    public static GetCellArray(cells: Cell[][]): Cell[] {
        let cellArray: Cell[] = []
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                cellArray.push(cells[r][c])
            }
        }
        return cellArray
    }

    // 要素を揺らす
    public static Shake(con: createjs.Container) {
        createjs.Tween.get(con)
            .to({ x: FRAME_LEFT + 1, y: FRAME_TOP + 1, }, 50)
            .to({ x: FRAME_LEFT - 1, y: FRAME_TOP - 1, }, 50)
            .to({ x: FRAME_LEFT + 1, y: FRAME_TOP + 0, }, 50)
            .to({ x: FRAME_LEFT + 0, y: FRAME_TOP + 1, }, 50)
            .to({ x: FRAME_LEFT - 1, y: FRAME_TOP - 1, }, 50)
            .to({ x: FRAME_LEFT + 0, y: FRAME_TOP + 0, }, 50)
    }
}