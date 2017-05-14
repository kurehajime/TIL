class Cell{
    public Items:object[];
    public X:number;
    public Y:number;
    public constructor(x:number,y:number) {
        this.X=x;
        this.Y=y;
    }
}

class Board{
    public readonly SIZE:number;
    private Map:Cell[][]=new Array();

    /**
     * Iterator
     */
    [Symbol.iterator](){
        var indexes:Array<any>=[];
        var index=0;
        for(var x=0;x<this.SIZE;x++){
            for(var y=0;y<this.SIZE;y++){
                indexes.push({X:x,Y:y});
            }
        }
        return {
            next: () => {
                if(index >=indexes.length){
                    return { value: null,
                     done: !(index <indexes.length) };
                }
                var cell=this.Map[indexes[index].X][indexes[index].Y];
                index++;
                return { value: cell,
                     done: false};
            }
        }
    }

    /**
     * constructor
     */
    public constructor(size:number) {
        this.SIZE=size;
        this.Clear();
    }

    public get(x:number,y:number):Cell{
        return this.Map[x][y];
    }
    public set(x:number,y:number,cell:Cell):void{
        cell.X=x;
        cell.Y=y;
        this.Map[x][y]=cell;
    }
    public Clear(){
        this.Map=new Array();
        for(var x=0;x<this.SIZE;x++){
            var cells:Cell[]=new Array();
            for(var y=0;y<this.SIZE;y++){
                cells.push(new Cell(x,y));
            }
            this.Map.push(cells);
        }
    }   
}
class BoardView{
    private ctx:CanvasRenderingContext2D;
    private cell_size:number;
    private size:number;
    private lineColor='rgba(0, 0, 0, 1)';
    
    public constructor(canv:HTMLCanvasElement) {
        this.ctx=canv.getContext('2d');
    }
    public draw(board:Board){
        this.cell_size=this.ctx.canvas.width/board.SIZE;
        this.size=board.SIZE;
        this.drawMesh();
        for(var cell of board){
            this.drawCell(this.cell_size*cell.X,
            this.cell_size*cell.Y+10,
            cell);
        }
    }
    private drawMesh(){
        this.ctx.fillStyle=this.lineColor;
        for(var i=0;i<=this.size;i++){
            //よこ
            this.ctx.beginPath();
            this.ctx.moveTo(i*this.cell_size, 0);
            this.ctx.lineTo(i*this.cell_size, this.ctx.canvas.width);
            this.ctx.closePath();
            this.ctx.stroke();
            //たて
            this.ctx.beginPath();
            this.ctx.moveTo(0, i*this.cell_size);
            this.ctx.lineTo(this.ctx.canvas.height,i*this.cell_size);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }
    private drawCell(base_x:number,base_y:number, cell:Cell){
        this.ctx.beginPath();
        this.ctx.fillText(cell.X+":"+cell.Y, base_x, base_y);
    }
}

function main() {
    var board=new Board(10);
    var canv=<HTMLCanvasElement>document.getElementById("canv");
    var view=new BoardView(canv);
    view.draw(board);
}

main();