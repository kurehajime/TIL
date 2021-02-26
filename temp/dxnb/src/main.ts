let lastRender = 0
const MAX_ROW_COUNT = 10
const MAX_COLUMN_COUNT = 5

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
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
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

        this.stage.update()
    }

    private getCells():Cell[][]{
        let cells : Cell[][] =[]
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            for (let c = 0; c < MAX_COLUMN_COUNT; c++) {
                let cell = this.stage.children.find(x=>  x instanceof Cell && x.Row === r && x.Column === c) as Cell
                if (!cells[r]){
                    cells[r] = []
                }
                cells[r][c] = cell
            }       
        }
        return cells
    }

    private check(){
        let cells = this.getCells()
        for (let r = 0; r < MAX_ROW_COUNT; r++) {
            let suitBool =  cells[r].every(x=>{ return x.Suit === cells[r][0].Suit })
            let colorBool =  cells[r].every(x=>{return x.Color === cells[r][0].Color })
            if(suitBool || colorBool){
                cells[r].forEach(x => {
                    x.IsLive = false
                    x.Draw()
                })
            }
        }
    }

    private onClick(e:MouseEvent){
        let target = e.currentTarget as Cell
        this.stage.children.forEach(x => { 
            if(x instanceof Cell){
                x.IsHold = false
                x.Draw()
            }
        } )
        if(this.hold){
            if(this.hold !== target){
                if(this.hold.Color === target.Color ||this.hold.Suit === target.Suit ){
                    let color = target.Color
                    let suit = target.Suit
                    target.Color =  this.hold.Color
                    target.Suit =  this.hold.Suit
                    this.hold.Color = color
                    this.hold.Suit = suit
                    
                    this.check()
                    
                    this.hold.Draw()
                    target.Draw()
                }
            }
            this.hold.IsHold = false
            this.hold.Draw()
            this.hold = null
        }else{
            this.hold = target
            this.hold.IsHold = true
            this.hold.Draw()
        }
    }

}

class Cell extends createjs.Container {
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