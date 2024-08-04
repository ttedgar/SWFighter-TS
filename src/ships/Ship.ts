import {Utility} from "../utility/Utility.ts";

export abstract class Ship {
    protected element: HTMLElement;
    protected style: CSSStyleDeclaration;
    private _width: number;
    private _height: number;
    private hp: number;

    constructor(element: HTMLElement, width: number, height: number, hp: number) {
        this.element = element;
        this.style = element.style;
        this._width = length;
        this._height = height;
        this.hp = hp;
    }

    public abstract move(cycle: number);

    public getTop() : number {
        return Utility.positionToNumber(this.style.top);
    }

    public getLeft() : number {
        return Utility.positionToNumber(this.style.left);
    }


    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    public decrementHp() {
        this.hp--;
    }
}