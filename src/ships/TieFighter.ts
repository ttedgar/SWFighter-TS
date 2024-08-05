import {Ship} from "./Ship.ts";
import {Utility} from "../utility/Utility.ts";

export class TieFighter extends Ship {
    private static readonly HP: number = 1;
    private static readonly WIDTH: number = 5;
    private static readonly HEIGHT: number = 5;
    private static readonly VERTICAL_SPEED: number = 3;
    private static readonly HORIZONTAL_SPEED: number = 3;
    private speedLeft: number;

    constructor(element: HTMLElement, isDown: boolean = true, speedLeft: number = TieFighter.HORIZONTAL_SPEED) {
        super(element, TieFighter.WIDTH, TieFighter.HEIGHT, TieFighter.HP, TieFighter.VERTICAL_SPEED, isDown);
        this.speedLeft = speedLeft;
    }

    die() {
    }

    private moveDown () {
        if (this.isDown) {
            this.style.top = Utility.positionToNumber(this.style.top) + this.verticalSpeed + 'px';
            if (Utility.positionToNumber(this.style.top) > window.innerHeight - 50) {
                this.isDown = false;
            }
        }
    }

    private moveUp () {
        if (!this.isDown) {
            this.style.top = Utility.positionToNumber(this.style.top) - this.verticalSpeed + 'px';
            if (Utility.positionToNumber(this.style.top) < 0) {
                this.isDown = true;
            }
        }
    }

    private moveLeft() {
        this.style.left = Utility.positionToNumber(this.style.left) - this.speedLeft + 'px';
    }

    public move() {
        this.moveDown();
        this.moveUp();
        this.moveLeft();
    }

    shoot(cycle: number) {
    }
}