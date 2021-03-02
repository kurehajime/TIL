import { Suit, Color, State, MAX_ROW_COUNT, MAX_COLUMN_COUNT, COLOR_RED, COLOR_BLUE, FRAME_TOP } from "./params";
export class Shadow extends createjs.Container {
    public BonusColor: Color
    public BonusSuit: Suit

    public constructor() {
        super()
        this.Draw()
    }

    public Draw() {
        this.removeAllChildren()
        let color: string
        let suit: string
        switch (this.BonusColor) {
            case Color.Red:
                color = COLOR_RED
                break;
            case Color.Green:
                color = COLOR_RED
                break;
            case Color.Blue:
                color = COLOR_BLUE
                break;
            default:
                break;
        }
        let bg = new createjs.Shape()
        bg.graphics.beginFill(color)
        bg.graphics.drawRect(1, 1, 50 * (MAX_COLUMN_COUNT + 1) - 2, FRAME_TOP - 2)

        switch (this.BonusSuit) {
            case Suit.East:
                suit = "東"
                break;
            case Suit.West:
                suit = "西"
                break;
            case Suit.South:
                suit = "南"
                break;
            case Suit.North:
                suit = "北"
                break;
            default:
                break;
        }
        let word = new createjs.Text(suit, "12px serif", "White");
        word.textAlign = "center";
        word.x = (50 * (MAX_COLUMN_COUNT + 1)) / 2
        word.y = FRAME_TOP / 2

        this.addChild(bg)
        this.addChild(word)

    }
}