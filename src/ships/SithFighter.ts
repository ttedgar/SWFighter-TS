import {Ship} from "./Ship.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";
import {Utility} from "../utility/Utility.ts";
import {VectorMath} from "../utility/VectorMath.ts";
import {TieShot} from "../shot/TieShot.ts";
import {BlasterShot} from "../shot/BlasterShot.ts";

export class SithFighter extends Ship {
    private static readonly HP: number = 40;
    private static readonly WIDTH: number = -15;
    private static readonly HEIGHT: number = 35;
    private static readonly VERTICAL_SPEED: number = 3;
    private static readonly HORIZONTAL_SPEED: number = 3;
    private static readonly AIM_VERTICAL_OFFSET: number = 0.15;
    private lastShotTime: number;
    private isVortexOn: boolean;
    private isTeleportOn: boolean;
    private vortex1: HTMLElement;
    private vortex2: HTMLElement;

    constructor(element: HTMLElement, isDown: boolean = true, _speedLeft: number = SithFighter.HORIZONTAL_SPEED) {
        super(element, SithFighter.WIDTH, SithFighter.HEIGHT, SithFighter.HP, SithFighter.VERTICAL_SPEED, isDown);
        this.lastShotTime = 0;
        this.isVortexOn = false;
        this.isTeleportOn = true;
        this.vortex1 = EffectFactory.createVortex1(this.element);
        this.vortex2 = EffectFactory.createVortex2(this.element);
    }

    private rotateShip(): void {
        if (this._shipManager) {
            const [verticalVel, horizontalVel] = VectorMath.aimVector(
                this.getVerticalPosition(),
                this.getHorizontalPosition(),
                this._shipManager.getXWing().getVerticalPosition(),
                this._shipManager.getXWing().getHorizontalPosition()
            );
            const rotation: number = Math.atan2(verticalVel, horizontalVel) * 180 / Math.PI;
            this.element.style.transform = `rotate(${rotation}deg)`;
        }
    }

    public die() {
        this._shipManager.removeShip(this);
        const shotImg: HTMLImageElement = this.element as HTMLImageElement;
        shotImg.src = './images/explosion.gif';
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        setTimeout(() => {
            this.element.remove();
            if ('triggerVictory' in this._shipManager) {
                (this._shipManager as any).triggerVictory();
            }
        }, 500)
    }

    private vortexAppear() {
        this.isVortexOn = true;
        this.vortex1.classList.add('fade-in');
        this.vortex1.style.display = 'block';
    }

    private vortexCollapse() {
        this.vortex1.classList.add('collapse');
        this.element.classList.add('collapse-ship');
        this.vortex1.classList.remove('fade-in');
    }

    private shipReappear() {
        this.vortex1.style.display = 'none';
        this.vortex1.classList.remove('collapse');
        this.element.classList.remove('collapse-ship');
        this.vortex1.classList.add('fade-in');
        this.element.classList.add('fade-in-again');
        this.vortex2.style.display = 'block';
        setTimeout(() => {
            this.vortex2.style.display = 'none';
        }, 650)
    }

    private endTeleportSequence() {
        this.vortex1.classList.remove('fade-in');
        this.element.classList.remove('fade-in-again');
        this.isVortexOn = false;
    }

    private setNewPositionForShip() {
        let newVerticalPosition = Utility.rng(100, window.innerHeight - 100);
        while (newVerticalPosition < Utility.positionToNumber(this.element.style.top) + 200 && newVerticalPosition > Utility.positionToNumber(this.element.style.top) - 200) {
            newVerticalPosition = Utility.rng(100, window.innerHeight - 100);
        }
        this.element.style.top = newVerticalPosition + 'px';
        this.vortex1.style.top = Utility.positionToNumber(this.element.style.top) - 85 + 'px';
        this.vortex1.style.left = Utility.positionToNumber(this.element.style.left) - 50 + 'px';
        this.vortex2.style.top = Utility.positionToNumber(this.element.style.top) - 60 + 'px';
        this.vortex2.style.left = Utility.positionToNumber(this.element.style.left) + 'px';
    }

    private teleport() {
        if (this._shipManager && this._shipManager.getXWing().getVerticalPosition() > this.getVerticalPosition() - 50 && this._shipManager.getXWing().getVerticalPosition() < this.getVerticalPosition() + 50 && !this.isVortexOn) {
            this.vortexAppear();
            setTimeout(() => {
                this.vortexCollapse();
                setTimeout(() => {
                    this.setNewPositionForShip();
                    this.shipReappear();
                    setTimeout(() => {
                        this.endTeleportSequence();
                        this.isTeleportOn = true;
                    }, 1000)
                }, 1000)
            }, 3000)

            setTimeout(() => {
                this.isTeleportOn = false;
            }, 2500)
        }
    }

    move() {
        this.rotateShip();
        this.teleport();
    }

    shoot(time: number) {
        if (Utility.isTimeTo(time, 1, this.lastShotTime) && this._shipManager && this._shotManager && this.isTeleportOn) {
            this.lastShotTime = Utility.convertTime(time);
            const shotHtml: HTMLElement = EffectFactory.createSithFighterShot(this.element);
            const [verticalVel, horizontalVel] = VectorMath.aimVector(
                this.getVerticalPosition(),
                this.getHorizontalPosition(),
                this._shipManager.getXWing().getVerticalPosition(),
                this._shipManager.getXWing().getHorizontalPosition()
            );
            const rotation: number = Math.atan2(verticalVel, horizontalVel) * 180 / Math.PI;
            shotHtml.style.transform = `rotate(${rotation}deg)`;
            const shot: TieShot = new BlasterShot(shotHtml, verticalVel - SithFighter.AIM_VERTICAL_OFFSET, horizontalVel);
            this._shotManager.registerShot(shot);
        }
    }

    public getHit() {
        if (!this.isTeleportOn) {
            super.getHit();
        }
    }
}