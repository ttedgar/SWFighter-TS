import {Ship} from "./Ship.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";
import {Utility} from "../utility/Utility.ts";
import {VectorMath} from "../utility/VectorMath.ts";
import {TractorBeam} from "../shot/TractorBeam.ts";
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
    private isDroneUp: boolean;

    constructor(element: HTMLElement, isDown: boolean = true, speedLeft: number = StarDestroyer.HORIZONTAL_SPEED) {
        super(element, StarDestroyer.WIDTH, StarDestroyer.HEIGHT, StarDestroyer.HP, StarDestroyer.VERTICAL_SPEED, isDown);
        this.speedLeft = speedLeft;
        this.lastDroneTime = 0;
        this.lastShotTime = 0;
        this.beam = new TractorBeam(EffectFactory.createTractorBeam(this.element));
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
        this.bounceVertically();
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

    private shootSniperBlaster(time: number) {
        if (Utility.isTimeTo(time, 10, this.lastShotTime) && this._shipManager && this._shotManager) {
            this.lastShotTime = Utility.convertTime(time);
            const shotHtml: HTMLElement = EffectFactory.createBlasterShot(this.element);
            const [verticalVel, horizontalVel] = VectorMath.aimVector(
                this.getVerticalPosition(),
                this.getHorizontalPosition(),
                this._shipManager.getXWing().getVerticalPosition(),
                this._shipManager.getXWing().getHorizontalPosition()
            );
            let rotation: number = 0;
            const hDist = this.getHorizontalPosition() - this._shipManager.getXWing().getHorizontalPosition();
            if (hDist > 0) {
                rotation = verticalVel * 9;
            } else if (hDist < 0) {
                rotation = verticalVel * -9 + 180;
            }
            shotHtml.style.transform = `rotate(${rotation}deg)`;
            const shot: BlasterShot = new BlasterShot(shotHtml, verticalVel, horizontalVel);
            this._shotManager.registerShot(shot);
        }
    }

    public shoot(time: number) {
        this.useTractorBeam(time);
        this.deployDrones(time);
        this.shootSniperBlaster(time);
    }
}