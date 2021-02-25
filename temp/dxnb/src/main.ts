let lastRender = 0

class Game {
    private isRunning: boolean = false
    private stage: createjs.Stage
    private hold :Cell = null

    constructor() {
        this.stage = new createjs.Stage("canvas")
    }
    public Start() {
        this.isRunning = true
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
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 5; c++) {
                let color: Color = Math.floor(Math.random() * 3)
                let suit: Suit = Math.floor(Math.random() * 4)
                let cell = new Cell(suit, color)
                cell.Row = r
                cell.Column = c
                cell.x = c * 50
                cell.y = r * 50
                cell.addEventListener("click", (e:MouseEvent)=>{
                    this.onClick(e)
                });
                this.stage.addChild(cell)
            }
        }



        // Stageの描画を更新します
        this.stage.update()
    }

    private onClick(e:MouseEvent){
        let target = e.currentTarget as Cell
        if(this.hold){
            if(this.hold !== target){
                let color = target.Color
                let suit = target.Suit
                target.Color =  this.hold.Color
                target.Suit =  this.hold.Suit
                this.hold.Color = color
                this.hold.Suit = suit
                
                this.hold.Draw()
                target.Draw()
            }
            this.hold = null
        }else{
            this.hold = target
        }
    }

}

class Cell extends createjs.Container {
    public Row: number
    public Column: number
    public Suit: Suit
    public Color: Color


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
        let word = new createjs.Text(suit, "24px serif", "White");
        word.textAlign = "center";
        word.x = 27
        word.y = 15
        this.addChild(shape1)
        this.addChild(word)
    }
}
enum Suit {
    North,
    East,
    West,
    South,
}
enum Color {
    Red,
    Green,
    Blue,
}

function main() {
    let game = new Game()
    game.Start()
}


main()