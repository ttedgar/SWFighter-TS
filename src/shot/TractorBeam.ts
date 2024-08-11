import {XWing} from "../ships/XWing.ts";
import {Utility} from "../utility/Utility.ts";

export class TractorBeam {
    private lastTime: number;
    private _element: HTMLElement;
    private isBeamOn: boolean;

    constructor(element: HTMLElement) {
        this._element = element;
        this.lastTime = 0;
        this.isBeamOn = false;
    }

    public handle(time: number, onTime: number, offTime: number, xWing: XWing) {
        if (Utility.isTimeTo(time, onTime, this.lastTime)) {
            this._element.style.display = 'none';
            this.isBeamOn = false;
        }
        if (Utility.isTimeTo(time, offTime, this.lastTime)) {
            this._element.style.display = 'block';
            this.isBeamOn = true;
        }
        this.isBeamOn ? this.pullXWing(xWing) : null;
    }

    public pullXWing(xWing: XWing) {
        if (xWing.getVerticalPosition() > Utility.positionToNumber(this.element.style.top) + 400) {
            xWing.getPulled(-2, 0);
        }
        if (xWing.getVerticalPosition() < Utility.positionToNumber(this.element.style.top) + 400) {
            xWing.getPulled(2, 0);
        }
        if (xWing.getHorizontalPosition() > Utility.positionToNumber(this.element.style.left) + 800) {
            xWing.getPulled(0, -2);
        }
        if (xWing.getHorizontalPosition() < Utility.positionToNumber(this.element.style.left) + 800) {
            xWing.getPulled(0, 2);
        }
    }

    public updatePosition(vertical: number, horizontal: number) {
        this._element.style.left = horizontal - 700 + 'px';
        this._element.style.top = vertical - 400 + 'px';
    }


    get element(): HTMLElement {
        return this._element;
    }
}