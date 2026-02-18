import {Ship} from "./Ship.ts";
import {Utility} from "../utility/Utility.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";
import {TieShot} from "../shot/TieShot.ts";

export class TieFighter extends Ship {
    private static readonly HP: number = 1;
    private static readonly WIDTH: number = 20;
    private static readonly HEIGHT: number = 40;
    private static readonly VERTICAL_SPEED: number = 3;
    private static readonly HORIZONTAL_SPEED: number = 3;
    private static readonly LEFT_POSITION_OF_DISAPPEARANCE: number = -50;
    private speedLeft: number;
    private lastShotTime: number;

    constructor(element: HTMLElement, isDown: boolean = true, speedLeft: number = TieFighter.HORIZONTAL_SPEED) {
        super(element, TieFighter.WIDTH, TieFighter.HEIGHT, TieFighter.HP, TieFighter.VERTICAL_SPEED, isDown);
        this.speedLeft = speedLeft;
        this.lastShotTime = 0;
    }

    public die() {
        this._shipManager.removeShip(this);
        const shotImg: HTMLImageElement = this.element as HTMLImageElement;
        shotImg.src = './images/explosion.gif';
        this.element.style.width = '30px';
        setTimeout(() => {
            this.element.remove();
        }, 500)
    }

    private moveLeft() {
        this.style.left = Utility.positionToNumber(this.style.left) - this.speedLeft + 'px';
        this.disappear();
    }

    private disappear() {
        if (Utility.positionToNumber(this.style.left) < TieFighter.LEFT_POSITION_OF_DISAPPEARANCE) {
            this.element.remove();
            this._shipManager.removeShip(this);
        }
    }

    public move() {
        this.bounceVertically();
        this.moveLeft();
    }

    public shoot(time: number) {
        if (Utility.isTimeTo(time, 10, this.lastShotTime) && this._shotManager) {
            const shotHtml: HTMLElement = EffectFactory.createTieShot(this.element);
            this.lastShotTime = Utility.convertTime(time);
            const shot: TieShot = new TieShot(shotHtml)
            this._shotManager.registerShot(shot);
        }
    }
}