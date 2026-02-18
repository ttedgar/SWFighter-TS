import {Shot} from "./Shot.ts";
import {Utility} from "../utility/Utility.ts";

export class PlayerShot extends Shot {
    private static readonly SPEED: number = 10;

    constructor(element: HTMLElement) {
        super(element);
    }

    public override fly(time: number): void {
        if (Utility.isTimeTo(time, 1, this.lastTime, 1)) {
            this.lastTime = Utility.convertTime(time, 1);
            this.element.style.left = Utility.positionToNumber(this.element.style.left) + PlayerShot.SPEED + 'px';
            Utility.positionToNumber(this.element.style.left) > window.innerWidth - 10 ?
                this.element.remove() : null;
        }
    }
}