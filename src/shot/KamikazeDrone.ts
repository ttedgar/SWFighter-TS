import {Shot} from "./Shot.ts";
import {Utility} from "../utility/Utility.ts";
import {XWing} from "../ships/XWing.ts";
import {Homing} from "./Homing.ts";

export class KamikazeDrone extends Shot implements Homing {
    private distance: number;
    private isUp: boolean;
    constructor(element: HTMLElement, _xWing: XWing, isUp: boolean) {
        super(element);
        this.isUp = isUp;
        this.distance = isUp ? 10 : -10;
    }

    public fly(time: number) {
        if (Utility.isTimeTo(time, 1, this.lastTime, 1) && this.distance) {
            this.distance = this.distance * 0.96;
            this.distance < 0.05 && this.isUp ? this.distance = 0 : null;
            this.distance > -0.05 && !this.isUp ? this.distance = 0 : null;
            this.lastTime = Utility.convertTime(time, 1);
            this.element.style.top = Utility.positionToNumber(this.element.style.top) - this.distance + 'px';
        }
    }

    public homing(xWingVerticalPosition: number, xWingHorizontalPosition: number) {
        if (this.getVerticalPosition() > xWingVerticalPosition + 30) {
            this.modifyTop(-1);
        } else {
            this.modifyTop(1);
        }
        if (this.getHorizontalPosition() > xWingHorizontalPosition + 10) {
            this.modifyLeft(-1);
        } else {
            this.modifyLeft(1);
        }
    }
}