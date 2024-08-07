import {Utility} from "../utility/Utility.ts";

export abstract class Shot {
    private _element: HTMLElement;
    protected lastTime: number;
    private _top: number;
    private _bottom: number;

    protected constructor(element: HTMLElement, top: number = 50, bottom: number = 10) {
        this._element = element;
        this.lastTime = 0;
        this._top = top;
        this._bottom = bottom;
    }

    abstract fly(time: number);


    get element(): HTMLElement {
        return this._element;
    }

    get bottom(): number {
        return this._bottom;
    }

    get top(): number {
        return this._top;
    }

    public getVerticalPosition() : number {
        return Utility.positionToNumber(this.element.style.top);
    }

    public modifyTop(value: number) {
        this.element.style.top = Utility.positionToNumber(this.element.style.top) + value + 'px';
    }
    public modifyLeft(value: number) {
        this.element.style.left = Utility.positionToNumber(this.element.style.left) + value + 'px';
    }

    public getHorizontalPosition() : number {
        return Utility.positionToNumber(this.element.style.left);
    }

    public hit() {
        const shotImg: HTMLImageElement = this._element as HTMLImageElement;
        shotImg.src = './images/explosion.gif';
        this._element.style.width = '30px';
        setTimeout(() => {
            this._element.remove();
        }, 500)
    }

    public isHoming(): boolean {
        return false;
}
}





