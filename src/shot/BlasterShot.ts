import {Shot} from "./Shot.ts";
import {Utility} from "../utility/Utility.ts";

export class BlasterShot extends Shot {
    private static readonly TOP: number = 50;
    private static readonly BOTTOM: number = -20;
    private verticalVelocity: number;
    private horizontalVelocity: number;


    constructor(element: HTMLElement, verticalVelocity: number = 0, horizontalVelocity: number = 10) {
        super(element, BlasterShot.TOP, BlasterShot.BOTTOM);
        this.verticalVelocity = verticalVelocity;
        this.horizontalVelocity = horizontalVelocity;
    }

    fly(time: number) {
        if (Utility.isTimeTo(time, 1, this.lastTime, 1)) {
            this.lastTime = Utility.convertTime(time, 1);
            this.element.style.left = Utility.positionToNumber(this.element.style.left) - this.horizontalVelocity + 'px';
            this.element.style.top = Utility.positionToNumber(this.element.style.top) - this.verticalVelocity + 'px';
            Utility.positionToNumber(this.element.style.left) < -10 ?
                this.element.remove() : null;
        }
    }
}