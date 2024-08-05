import {Utility} from "../utility/Utility.ts";

export abstract class Shot{
    private _element: HTMLElement;
    protected interval: number;

    protected constructor(element: HTMLElement) {
        this._element = element;
        this.fly();
    }

    abstract fly();
    abstract stop();


    get element(): HTMLElement {
        return this._element;
    }

    public getTop() : number {
        return Utility.positionToNumber(this.element.style.top);
    }

    public getLeft() : number {
        return Utility.positionToNumber(this.element.style.left);
    }

    public hit() {
        const shotImg: HTMLImageElement = this._element as HTMLImageElement;
        shotImg.src = './images/explosion.gif';
        this._element.style.width = '30px';
        this.stop();
        setTimeout(() => {
            this._element.remove();
        }, 500)
    }
}