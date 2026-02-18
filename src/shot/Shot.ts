import {Utility} from "../utility/Utility.ts";

export abstract class Shot {
    private _element: HTMLElement;
    protected lastTime: number;
    private explosionSize: number;

    protected constructor(element: HTMLElement, explosionSize: number = 30) {
        this._element = element;
        this.lastTime = 0;
        this.explosionSize = explosionSize;
    }

    abstract fly(time: number);


    get element(): HTMLElement {
        return this._element;
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
        setTimeout(() => {
            this._element.style.top = Utility.positionToNumber(this._element.style.top) - 10 + 'px';
            this._element.style.left = Utility.positionToNumber(this._element.style.left) - 10 + 'px';
            this._element.style.width = this.explosionSize + 'px';
            this._element.style.height = this.explosionSize + 'px';
        }, 10)
        setTimeout(() => {
            this._element.remove();
        }, 500)
    }
}





