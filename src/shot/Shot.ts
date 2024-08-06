import {Utility} from "../utility/Utility.ts";

export abstract class Shot{
    private _element: HTMLElement;
    protected lastTime: number;

    protected constructor(element: HTMLElement) {
        this._element = element;
        this.lastTime = 0;
    }

    abstract fly(time: number);


    get element(): HTMLElement {
        return this._element;
    }

    public getTop() : number {
        return Utility.positionToNumber(this.element.style.top);
    }

    public modifyTop(value: number) {
        this.element.style.top = Utility.positionToNumber(this.element.style.top) + value + 'px';
    }

    public getLeft() : number {
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
}



