import {Ship} from "./Ship.ts";
import {EventHandler} from "../event_handler/EventHandler.ts";
import {Utility} from "../utility/Utility.ts";
import {Border} from "../utility/Border.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";
import {PlayerShot} from "../shot/PlayerShot.ts";
import {InfoBar} from "../infobar/InfoBar.ts";
import {ShootingMechanics} from "../utility/ShootingMechanics.ts";

export class XWing extends Ship {
    static readonly TIME_DIVIDER: number = 25;
    static SHOOT_INTERVAL: number = 4;
    private static readonly _HEIGHT: number = 75;
    private static readonly _WIDTH: number = 10;
    private eventHandler: EventHandler;
    private isInvincible: boolean;
    private lastTime: number;
    private static readonly SPEED: number = 10;


    constructor(element: HTMLElement, hp: number, eventHandler: EventHandler) {
        super(element, XWing._WIDTH, XWing._HEIGHT, hp);
        this.eventHandler = eventHandler;
        this.isInvincible = false;
        this.lastTime = 0;
        eventHandler.handleKeys();
    }

    public handleXWing(time: number) {
        this.move();
        this.shoot(time);
    }

    private shoot(time: number) {
        if (ShootingMechanics.isTimeToShoot(this.eventHandler.shoot, time, this.lastTime)) {
            this.lastTime = time;
            this.createShot(time);
        }
    }

    private move() {
        if (this.eventHandler.up && Border.topBorder(this.style)) {
            this.style.top = Utility.positionToNumber(this.style.top) - XWing.SPEED + 'px';
        }
        if (this.eventHandler.down && Border.bottomBorder(this.style)) {
            this.style.top = Utility.positionToNumber(this.style.top) + XWing.SPEED + 'px';
        }
        if (this.eventHandler.left && Border.leftBorder(this.style)) {
            this.style.left = Utility.positionToNumber(this.style.left) - XWing.SPEED + 'px';
        }
        if (this.eventHandler.right && Border.rightBorder(this.style)) {
            this.style.left = Utility.positionToNumber(this.style.left) + XWing.SPEED + 'px';
        }
    }

    public createShot(time: number): PlayerShot {
        const shotHtml: HTMLElement = EffectFactory.createXWingShot(this.style, time);
        const shot: PlayerShot = new PlayerShot(shotHtml);
        this._shotManager.registerPlayerShot(shot);
        return shot;
    }

    public die() {
        // Utility.gameOver();
    }

    public getVerticalPosition(): number {
        return Utility.positionToNumber(this.element.style.top);
    }
    public getHorizontalPosition(): number {
        return Utility.positionToNumber(this.element.style.left);
    }

    public getHit() {
        if (!this.isInvincible) {
            super.getHit();
            this.hitPulse();
            InfoBar.refreshLives(this.hp);
            this.handleInvincibility(500);
        }
    }

    private hitPulse() {
        this.element.classList.add('active');
        setTimeout(() => {
            this.element.classList.remove('active');
        }, 1000)
    }

    private handleInvincibility(duration: number) {
        // this.isInvincible = true;
        this.element.classList.add('active');
        InfoBar.startHitPulse();
        setTimeout(() => {
            // this.isInvincible = false;
            this.element.classList.remove('active');
            InfoBar.stopHitPulse();
        }, duration)
    }

    public getPulled(vertical: number, horizontal: number) {
        this.element.style.top = Utility.positionToNumber(this.element.style.top) + vertical + 'px';
        this.element.style.left = Utility.positionToNumber(this.element.style.left) + horizontal + 'px';
    }
}