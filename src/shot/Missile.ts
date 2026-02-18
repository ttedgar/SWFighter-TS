import {Shot} from "./Shot.ts";
import {Utility} from "../utility/Utility.ts";
import {Homing} from "./Homing.ts";

export class Missile extends Shot implements Homing{
    private static readonly INITIAL_SPEED: number = 3;
    private speed: number;
    private speedModifier1: number;
    private speedModifier2: number;


    constructor(element: HTMLElement) {
        super(element);
        this.speed = Missile.INITIAL_SPEED;
        this.speedModifier1 = 1.00000000000001;
        this.speedModifier2 = 1.01;
    }

    public fly(time: number) {
        if (Utility.isTimeTo(time, 1, this.lastTime, 1)) {
            this.speedModifier1 = this.speedModifier1 * this.speedModifier2;
            this.lastTime = Utility.convertTime(time, 1);
            this.element.style.left = Utility.positionToNumber(this.element.style.left) - this.speed * this.speedModifier1 + 'px';
            Utility.positionToNumber(this.element.style.left) < -10 ? this.element.remove() : null;
        }
    }

    public homing(xWingVerticalPosition: number) {
        if (this.getVerticalPosition() > xWingVerticalPosition + 40) {
            this.modifyTop(-1.5);
        } else {
            this.modifyTop(1.5);
        }
    }
}