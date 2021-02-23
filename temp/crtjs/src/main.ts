let lastRender = 0

class Game{
    private isRunning:boolean = false
    private press:number[]=[]
    private pressing:number[]=[]
    private pressed:number[]=[]
    private Pad = {
        A: 0,
        B: 1,
        X: 2,
        Y: 3,
        L1: 4,
        L2: 5,
        R1: 6,
        R2: 7,
        SELECT: 8,
        START: 9,
        L3: 10,
        R3: 11,
        Top: 12,
        Bottom: 13,
        Left: 14,
        Right: 15,
        Center: 16
      } as const;
    private stage :createjs.Stage

    constructor(){
        this.stage =  new createjs.Stage("canvas")
    }
    public Start(){
        this.isRunning = true    
        this.initDraw()
        window.requestAnimationFrame((t)=>{this.loop(t)})
    }

    private loop(timestamp:number) {
        let progress = timestamp - lastRender
        this.update(progress)
        this.draw()
      
        lastRender = timestamp
        if(this.isRunning){
            window.requestAnimationFrame((t)=>{this.loop(t)})
        }
    }

    private update(progress:number) {
        this.getPad()
        this.move(progress)
    }

      
    private draw() {
        if(this.press.length > 0){
            console.log("puress: " + this.press.map((n)=>{return this.numToKey(n)}).join(" , "))
        }
        if(this.pressed.length > 0){
            console.log("             puressed: " + this.pressed.map((n)=>{return this.numToKey(n)}).join(" , "))
        }
        this.stage.update()
    }

    private move(progress:number){
        let player = this.stage.getChildByName("player") as Player

        let plusX = 0
        if(this.pressing.indexOf(this.Pad.Left) !== -1){
            plusX = -10
        }
        if(this.pressing.indexOf(this.Pad.Right) !== -1){
            plusX =  10
        }
        player.prevX = player.x
        player.x += plusX


        let isGround = (player.y >= 100)
        let jp = 0
        let plusY = 0 
        if(isGround){
            if(this.pressing.indexOf(this.Pad.A) !== -1){
                jp = -10
                plusY =(player.y - (player.prevY ?? 100)) + jp
            }
        }else{
            jp = 1
            plusY =(player.y - (player.prevY ?? 100)) + jp
        }
        player.prevY = player.y
        player.y += plusY
    }

    private getPad(){
        let gamepads = navigator.getGamepads()
        let now_press =[]
        let now_pressing =[]
        let now_pressed =[]

        for (const gp of gamepads) {
            if(gp){
                for (let i = 0 ; i < gp.buttons.length; i++) {
                    let prev = (this.pressing.indexOf(i) !== -1)
                    if(gp.buttons[i].pressed){
                        now_pressing.push(i)
                    }
                    if(gp.buttons[i].pressed && !prev){
                        now_press.push(i)
                    }
                    if(!gp.buttons[i].pressed && prev){
                        now_pressed.push(i)
                    }
                }
            }
        }
        this.press = now_press
        this.pressing = now_pressing
        this.pressed = now_pressed
    }

    private numToKey(num:number):string{
        switch (num) {
            case this.Pad.A:
                return 'A'
            case this.Pad.B:
                return 'B'
            case this.Pad.X:
                return 'X'
            case this.Pad.Y:
                return 'Y'
            case this.Pad.L1:
                return 'L1'
            case this.Pad.R1:
                return 'R1'
            case this.Pad.L2:
                return 'L2'
            case this.Pad.R2:
                return 'R2'
            case this.Pad.SELECT:
                return 'SELECT'
            case this.Pad.START:
                return 'START'
            case this.Pad.L3:
                return 'L3'
            case this.Pad.R3:
                return 'R3'
            case this.Pad.Top:
                return 'Top'
            case this.Pad.Bottom:
                return 'Bottom'
            case this.Pad.Left:
                return 'Left'
            case this.Pad.Right:
                return 'Right'
            case this.Pad.Center:
                return 'Center'
            default:
                break
        }
        return ''
    }

    private initDraw(){
    
        // 円を作成します
        var shape1 = new createjs.Shape()
        shape1.graphics.beginFill("DarkRed") // 赤色で描画するように設定
        shape1.graphics.drawCircle(0, 0, 5) //半径 100px の円を描画
        shape1.x = 5 // X 座標 200px の位置に配置
        shape1.y = 5 // Y 座標 200px の位置に配置
    
        // 円を作成します
        var shape2 = new createjs.Shape()
        shape2.graphics.beginFill("Blue") // 赤色で描画するように設定
        shape2.graphics.drawCircle(0, 0, 5) //半径 100px の円を描画
        shape2.x = 5 // X 座標 200px の位置に配置
        shape2.y = 15 // Y 座標 200px の位置に配置
    
        // コンテナー(グループの親)を作成
        var container = new Player()
        container.name ="player";
        container.addChild(shape1)
        container.addChild(shape2)
        container.y = 100
    
        this.stage.addChild(container)
    
        // Stageの描画を更新します
        this.stage.update()
    }
    
}

class Player extends createjs.Container {
    public prevY :number
    public prevX :number
}  


function main(){
    let game = new Game()
    game.Start()
}


main()