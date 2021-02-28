import {  Suit,Color ,MAX_ROW_COUNT,MAX_COLUMN_COUNT } from "./params";

export class Cell extends createjs.Container {
    public Row: number
    public Column: number
    public Suit: Suit
    public Color: Color
    public IsLive :boolean = true
    public IsHold : boolean = false

    public constructor(suit: Suit, color: Color) {
        super()
        this.Suit = suit
        this.Color = color
        this.Draw()
    }

    public Draw() {
        let suit: string
        let color: string
        this.removeAllChildren()
        if(!this.IsLive){
            return
        }

        switch (this.Suit) {
            case Suit.North:
                suit = "北"
                break;
            case Suit.East:
                suit = "東"
                break;
            case Suit.West:
                suit = "西"
                break;
            case Suit.South:
                suit = "南"
                break;
            default:
                break;
        }
        switch (this.Color) {
            case Color.Red:
                color = "DarkRed"
                break;
            case Color.Green:
                color = "DarkGreen"
                break;
            case Color.Blue:
                color = "DarkBlue"
                break;
            default:
                break;
        }
        let shape1 = new createjs.Shape()
        shape1.graphics.beginFill(color)
        shape1.graphics.drawRoundRect(5, 5, 45, 45, 5)
        if(this.IsHold){
            var shadow = new createjs.Shadow("#ffff00",0,0,15);
            shape1.shadow=shadow;
        }

        let word = new createjs.Text(suit, "24px serif", "White");
        word.textAlign = "center";
        word.x = 27
        word.y = 15

        this.addChild(shape1)
        this.addChild(word)
    }
    public Override(cell :Cell){
        this.Suit = cell.Suit
        this.Color = cell.Color
        this.IsLive  = cell.IsLive
        this.IsHold  = cell.IsHold
    }
}
