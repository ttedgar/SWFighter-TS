import {Shot} from "./Shot.ts";
import {Utility} from "../utility/Utility.ts";

export class TieShot extends Shot {
    private static readonly SPEED: number = 10;

    fly(time: number) {
        if (Utility.isTimeTo(time, 1, this.lastTime, 1)) {
            this.lastTime = Utility.convertTime(time, 1);
            this.element.style.left = Utility.positionToNumber(this.element.style.left) - TieShot.SPEED + 'px';
            Utility.positionToNumber(this.element.style.left) < -10 ?
                this.element.remove() : null;
        }
    }
}