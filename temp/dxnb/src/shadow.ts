import { Suit, Color, State, MAX_ROW_COUNT, MAX_COLUMN_COUNT } from "./params";
export class Shadow extends createjs.Container {
    private _isLive = false
    private shape: createjs.Shape
    private _hue = 0
    private _life = 0
    public set Life(value: number) {
        this._life = value;
        if (this._life <= 0) {
            this.IsLive = false
        }
    }
    public get Life() {
        return this._life
    }

    public set IsLive(value: boolean) {
        this._isLive = value;
        this.Draw()
    }
    public get IsLive() {
        return this._isLive
    }

    public set Hue(value: number) {
        this._hue = value;
        if (this._isLive) {
            this.shape.graphics.beginFill(createjs.Graphics.getHSL(this._hue, 50, 50))
        }
    }
    public constructor() {
        super()
        this.Draw()
    }

    public Draw() {
        this.removeAllChildren()
        if (this._isLive) {
            let shape1 = new createjs.Shape()
            shape1.graphics.beginFill(createjs.Graphics.getHSL(this._hue, 50, 50))
            shape1.graphics.drawRoundRect(5, 5, 45, 45, 5)
            shape1.alpha = 0.3
            this.shape = shape1
            this.children.push(shape1)
        }
    }
}