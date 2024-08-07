import {Ship} from "./Ship.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";
import {Utility} from "../utility/Utility.ts";
import {TractorBeam} from "../shot/TractorBeam.ts";
import {TieShot} from "../shot/TieShot.ts";
import {KamikazeDrone} from "../shot/KamikazeDrone.ts";
import {BlasterShot} from "../shot/BlasterShot.ts";

export class StarDestroyer extends Ship {
    private static readonly HP: number = 50;
    private static readonly WIDTH: number = -200;
    private static readonly HEIGHT: number = 90;
    private static readonly VERTICAL_SPEED: number = 1;
    private static readonly HORIZONTAL_SPEED: number = 30;
    private static readonly LEFT_POSITION_OF_DISAPPEARANCE: number = -50;
    private speedLeft: number;
    private lastDroneTime: number;
    private lastShotTime: number;
    private beam: TractorBeam;
    private isBeamOn: boolean;
    private isDroneUp: boolean;

    constructor(element: HTMLElement, isDown: boolean = true, speedLeft: number = StarDestroyer.HORIZONTAL_SPEED) {
        super(element, StarDestroyer.WIDTH, StarDestroyer.HEIGHT, StarDestroyer.HP, StarDestroyer.VERTICAL_SPEED, isDown);
        this.speedLeft = speedLeft;
        this.lastDroneTime = 0;
        this.lastShotTime = 0;
        this.beam = new TractorBeam(EffectFactory.createTractorBeam(this.element));
        this.isBeamOn = false;
        this.isDroneUp = true;
    }

    public die() {
        this._shipManager.removeShip(this);
        const shotImg: HTMLImageElement = this.element as HTMLImageElement;
        shotImg.src = './images/explosion.gif';
        this.element.style.width = '200px';
        this.element.style.height = '200px';
        setTimeout(() => {
            this.element.remove();
            this.beam.element.remove();
        }, 500)
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
        if (Utility.positionToNumber(this.style.left) > window.innerWidth / 1.5) {
            this.style.left = Utility.positionToNumber(this.style.left) - this.speedLeft + 'px';
            this.disappear();
        }
    }

    private disappear() {
        if (Utility.positionToNumber(this.style.left) < StarDestroyer.LEFT_POSITION_OF_DISAPPEARANCE) {
            this.element.remove();
            this._shipManager.removeShip(this);
        }
    }

    public move() {
        // this.moveDown();
        // this.moveUp();
        this.moveLeft();
        this.beam.updatePosition(Utility.positionToNumber(this.element.style.top), Utility.positionToNumber(this.element.style.left))
    }

    private deployDrones(time: number) {
        if (Utility.isTimeTo(time, 10, this.lastDroneTime) && this._shotManager) {
            this.isDroneUp ? this.isDroneUp = false : this.isDroneUp = true;
            const droneHtml: HTMLElement = EffectFactory.createKamikazeDrone(this.element);
            this.lastDroneTime = Utility.convertTime(time);
            const drone: KamikazeDrone = new KamikazeDrone(droneHtml, this._shipManager.getXWing(), this.isDroneUp);
            this._shotManager.registerShot(drone);
        }
    }

    private useTractorBeam(time: number) {
        if (this._shipManager) {
            this.beam.handle(time, 20,40, this._shipManager.getXWing())
        }
    }

    private calculateBlasterVerticalVelocity(): number {
        const verticalDistance: number = this.getTop() - this._shipManager.getXWing().getTop();
        const horizontalDistance: number = this.getLeft() - this._shipManager.getXWing().getLeft();
        const sumOfLegs: number = Math.abs(verticalDistance) + Math.abs(horizontalDistance);
        const ratioOfVertical: number = Math.abs(verticalDistance) / sumOfLegs;
        return verticalDistance < 0 ? ratioOfVertical * -10 : ratioOfVertical * 10;
    }

    private calculateBlasterHorizontalVelocity(): number {
        return this.calculateBlasterVerticalVelocity() < 0 ? 10 + this.calculateBlasterVerticalVelocity() : 10 - this.calculateBlasterVerticalVelocity();
    }

    private shootSniperBlaster(time: number) {
        if (Utility.isTimeTo(time, 10, this.lastShotTime) && this._shipManager && this._shotManager) {
            const shotHtml: HTMLElement = EffectFactory.createBlasterShot(this.element);
            this.lastShotTime = Utility.convertTime(time);
            const shot: TieShot = new BlasterShot(shotHtml, this.calculateBlasterVerticalVelocity(), this.calculateBlasterHorizontalVelocity())
            this._shotManager.registerShot(shot);
        }
    }

    public shoot(time: number) {
        this.useTractorBeam(time);
        this.deployDrones(time);
        this.shootSniperBlaster(time);
    }
}