class Cell {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}
class Board {
    /**
     * constructor
     */
    constructor(size) {
        this.Map = new Array();
        this.SIZE = size;
        this.Clear();
    }
    /**
     * Iterator
     */
    [Symbol.iterator]() {
        var indexes = [];
        var index = 0;
        for (var x = 0; x < this.SIZE; x++) {
            for (var y = 0; y < this.SIZE; y++) {
                indexes.push({ X: x, Y: y });
            }
        }
        return {
            next: () => {
                if (index >= indexes.length) {
                    return { value: null,
                        done: !(index < indexes.length) };
                }
                var cell = this.Map[indexes[index].X][indexes[index].Y];
                index++;
                return { value: cell,
                    done: false };
            }
        };
    }
    get(x, y) {
        return this.Map[x][y];
    }
    set(x, y, cell) {
        cell.X = x;
        cell.Y = y;
        this.Map[x][y] = cell;
    }
    Clear() {
        this.Map = new Array();
        for (var x = 0; x < this.SIZE; x++) {
            var cells = new Array();
            for (var y = 0; y < this.SIZE; y++) {
                cells.push(new Cell(x, y));
            }
            this.Map.push(cells);
        }
    }
}
class BoardView {
    constructor(canv) {
        this.lineColor = 'rgba(0, 0, 0, 1)';
        this.ctx = canv.getContext('2d');
    }
    draw(board) {
        this.cell_size = this.ctx.canvas.width / board.SIZE;
        this.size = board.SIZE;
        this.drawMesh();
        for (var cell of board) {
            this.drawCell(this.cell_size * cell.X, this.cell_size * cell.Y + 10, cell);
        }
    }
    drawMesh() {
        this.ctx.fillStyle = this.lineColor;
        for (var i = 0; i <= this.size; i++) {
            //よこ
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.cell_size, 0);
            this.ctx.lineTo(i * this.cell_size, this.ctx.canvas.width);
            this.ctx.closePath();
            this.ctx.stroke();
            //たて
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.cell_size);
            this.ctx.lineTo(this.ctx.canvas.height, i * this.cell_size);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    }
    drawCell(base_x, base_y, cell) {
        this.ctx.beginPath();
        this.ctx.fillText(cell.X + ":" + cell.Y, base_x, base_y);
    }
}
function main() {
    var board = new Board(10);
    var canv = document.getElementById("canv");
    var view = new BoardView(canv);
    view.draw(board);
}
main();
//# sourceMappingURL=index.js.map