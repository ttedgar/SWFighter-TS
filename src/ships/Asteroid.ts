import {Ship} from "./Ship.ts";
import {Utility} from "../utility/Utility.ts";
import {ShipCreator} from "../factory/html_creator/ShipCreator.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";

export class Asteroid extends Ship {
    private static readonly WIDTH: number = -2;
    private static readonly _HEIGHT_TO_HP_RATIO: number = 20;
    private static readonly LEFT_POSITION_OF_DISAPPEARANCE: number = -400;
    private static readonly TOP_POSITION_OF_DISAPPEARANCE: number = -400;
    private horizontalSpeed: number;
    private startingHp: number;

    constructor(element: HTMLElement, horizontalSpeed: number, verticalSpeed: number, hp: number) {
        super(element, Asteroid.WIDTH * hp, Asteroid._HEIGHT_TO_HP_RATIO * hp, hp, verticalSpeed, true);
        this.horizontalSpeed = horizontalSpeed;
        this.startingHp = hp;
    }

    static get HEIGHT_TO_HP_RATIO(): number {
        return this._HEIGHT_TO_HP_RATIO;
    }

    die() {
        this.createFragments();
        EffectFactory.createBang(this.element);
        this._shipManager.removeShip(this);
        this.element.remove();
    }

    private createFragments() {
        if (this.startingHp > 1) {
            for (let i = 0; i < Utility.rng(3, 6); i++) {
                const fragmentHp: number = Math.round(Utility.rng(0, this.startingHp / 2));
                const fragmentVerticalPosition: number = Utility.positionToNumber(this.element.style.top);
                const fragmentHtml = ShipCreator.createAsteroid(fragmentVerticalPosition, fragmentHp * Asteroid._HEIGHT_TO_HP_RATIO);
                fragmentHtml.style.left = this.element.style.left;
                const fragmentSpeed: number = 1;
                const fragmentHorizontalSpeed: number = Utility.rng(-1, 2 * fragmentSpeed + this.horizontalSpeed);
                const fragmentVerticalSpeed: number = Utility.rng(-1 * fragmentSpeed, fragmentSpeed);
                const fragment: Asteroid = new Asteroid(fragmentHtml, fragmentHorizontalSpeed, fragmentVerticalSpeed, fragmentHp);
                this._shipManager.addShip(fragment);
            }
        }
    }

    private moveVertical () {
        this.style.top = Utility.positionToNumber(this.style.top) + (this.verticalSpeed ?? 0) + 'px';
        if (Utility.positionToNumber(this.style.top) > window.innerHeight - 50) {
            this.isDown = false;
        }
    }

    private moveLeft() {
        this.style.left = Utility.positionToNumber(this.style.left) - this.horizontalSpeed + 'px';
    }

    private disappear() {
        if (Utility.positionToNumber(this.style.left) < Asteroid.LEFT_POSITION_OF_DISAPPEARANCE) {
            this.element.remove();
            this._shipManager.removeShip(this);
        }
        if (Utility.positionToNumber(this.style.top) < Asteroid.TOP_POSITION_OF_DISAPPEARANCE || Utility.positionToNumber(this.style.top) > window.innerHeight - Asteroid.TOP_POSITION_OF_DISAPPEARANCE ) {
            this.element.remove();
            this._shipManager.removeShip(this);
        }
    }

    public move() {
        this.moveVertical();
        this.moveLeft();
        this.disappear();
    }

    shoot() {
    }

}