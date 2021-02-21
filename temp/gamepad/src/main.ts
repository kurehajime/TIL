let lastRender = 0
class Game{
    private isRunning:boolean = false;
    private press:number[]=[];
    private pressing:number[]=[];
    private pressed:number[]=[];
    constructor(){

    }
    public Start(){
        this.isRunning = true;
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
        let gamepads = navigator.getGamepads();
        let now_press =[];
        let now_pressing =[];
        let now_pressed =[];

        for (const gp of gamepads) {
            if(gp){
                for (let i = 0; i < gp.buttons.length; i++) {
                    let prev = (this.pressing.indexOf(i) !== -1);
                    if(gp.buttons[i].pressed){
                        now_pressing.push(i);
                    }
                    if(gp.buttons[i].pressed && !prev){
                        now_press.push(i);
                    }
                    if(!gp.buttons[i].pressed && prev){
                        now_pressed.push(i);
                    }
                }
            }
        }
        this.press = now_press;
        this.pressing = now_pressing;
        this.pressed = now_pressed;
    }
      
    private draw() {
        if(this.press.length > 0){
            console.log("puress: " + this.press.map((n)=>{return this.numToKey(n)}).join(" , "))
        }
        if(this.pressed.length > 0){
            console.log("             puressed: " + this.pressed.map((n)=>{return this.numToKey(n)}).join(" , "))
        }
    }

    private numToKey(num:number):string{
        switch (num) {
            case 0:
                return 'A'
            case 1:
                return 'B'
            case 2:
                return 'X'
            case 3:
                return 'Y'
            case 4:
                return 'L1'
            case 5:
                return 'R1'
            case 6:
                return 'L2'
            case 7:
                return 'R2'
            case 8:
                return 'SELECT'
            case 9:
                return 'START'
            case 10:
                return 'L3'
            case 11:
                return 'R3'
            case 12:
                return 'Top'
            case 13:
                return 'Bottom'
            case 14:
                return 'Left'
            case 15:
                return 'Right'
            case 16:
                return 'Center'
            default:
                break;
        }
        return '';
    }
    
}

  


function main(){
    let stage = new Game();
    stage.Start();
}

main();