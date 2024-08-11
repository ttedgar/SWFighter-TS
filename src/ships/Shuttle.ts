import {Ship} from "./Ship.ts";
import {Utility} from "../utility/Utility.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";
import {TieShot} from "../shot/TieShot.ts";
import {Missile} from "../shot/Missile.ts";

export class Shuttle extends Ship {
    private static readonly HP: number = 40;
    private static readonly WIDTH: number = 0;
    private static readonly HEIGHT: number = 60;
    private static readonly VERTICAL_SPEED: number = 3;
    private static readonly HORIZONTAL_SPEED: number = 3;
    private static readonly LEFT_POSITION_OF_DISAPPEARANCE: number = -100;
    private speedLeft: number;
    private lastShotTime: number;
    private angle: number;
    private angleModifier: number;
    private stepSize: number;

    constructor(element: HTMLElement, isDown: boolean = true, angleModifier: number = 1) {
        super(element, Shuttle.WIDTH, Shuttle.HEIGHT, Shuttle.HP, Shuttle.VERTICAL_SPEED, isDown);
        this.speedLeft = Shuttle.HORIZONTAL_SPEED;
        this.lastShotTime = 0;
        this.angle = 0;
        this.stepSize = 2;
        this.angleModifier = angleModifier;
    }

    public die() {
        this._shipManager.removeShip(this);
        const shotImg: HTMLImageElement = this.element as HTMLImageElement;
        shotImg.src = './images/explosion.gif';
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        setTimeout(() => {
            this.element.remove();
        }, 500)
    }

    private moveDown(distance: number) {
        if (Utility.positionToNumber(this.style.top) < window.innerHeight - 50) {
            this.style.top = Utility.positionToNumber(this.style.top) + distance + 'px';
        }
    }

    private moveUp(distance: number) {
        if (Utility.positionToNumber(this.style.top) > 30) {
            this.style.top = Utility.positionToNumber(this.style.top) - distance + 'px';
        }
    }

    private moveLeft(distance: number) {
        this.style.left = Utility.positionToNumber(this.style.left) - distance + 'px';
        this.disappear();
    }

    private moveRight(distance: number) {
        this.style.left = Utility.positionToNumber(this.style.left) + distance + 'px';
    }

    private disappear() {
        if (Utility.positionToNumber(this.style.left) < Shuttle.LEFT_POSITION_OF_DISAPPEARANCE) {
            this.element.remove();
            this._shipManager.removeShip(this);
        }
    }

    public move() {
        this.moveLeft(1);
        const radians: number = this.angle * (Math.PI / 180);

        const nextX: number = Math.cos(radians) * this.stepSize;
        const nextY: number = Math.sin(radians) * this.stepSize;

        if (nextX > 0) {
            this.moveRight(nextX);
        } else {
            this.moveLeft(-nextX);
        }

        if (nextY > 0) {
            this.moveDown(nextY);
        } else {
            this.moveUp(-nextY);
        }
        this.angle += this.angleModifier;
        if (this.angle >= 360) {
            this.angle = 0;
        }
    }

    public shoot(time: number) {
        if (Utility.isTimeTo(time, 30, this.lastShotTime) && this._shotManager) {
            const missileHtml: HTMLElement = EffectFactory.createMissile(this.element);
            this.lastShotTime = Utility.convertTime(time);
            const missile: TieShot = new Missile(missileHtml)
            this._shotManager.registerShot(missile);
        }
    }
}