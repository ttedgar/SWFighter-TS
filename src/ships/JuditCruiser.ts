import {Ship} from "./Ship.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";
import {Utility} from "../utility/Utility.ts";
import {TieShot} from "../shot/TieShot.ts";
import {BlasterShot} from "../shot/BlasterShot.ts";

export class JuditCruiser extends Ship {
    private static readonly HP: number = 1;
    private static readonly WIDTH: number = -10;
    private static readonly HEIGHT: number = 25;
    private static readonly VERTICAL_SPEED: number = 3;
    private static readonly HORIZONTAL_SPEED: number = 3;
    private static readonly LEFT_POSITION_OF_DISAPPEARANCE: number = -50;
    private speedLeft: number;
    private lastShotTime: number;
    private isVortexOn: boolean;
    private isTeleportOn: boolean;
    private vortex1: HTMLElement;
    private vortex2: HTMLElement;

    constructor(element: HTMLElement, isDown: boolean = true, speedLeft: number = JuditCruiser.HORIZONTAL_SPEED) {
        super(element, JuditCruiser.WIDTH, JuditCruiser.HEIGHT, JuditCruiser.HP, JuditCruiser.VERTICAL_SPEED, isDown);
        this.speedLeft = speedLeft;
        this.lastShotTime = 0;
        this.isVortexOn = false;
        this.isTeleportOn = true;
        this.vortex1 = EffectFactory.createVortex1(this.element);
        this.vortex2 = EffectFactory.createVortex2(this.element);
    }

    private calculateVerticalDistance(): number {
        return this.getVerticalPosition() - this._shipManager.getXWing().getVerticalPosition();
    }
    private calculateHorizontalDistance(): number {
        return this.getHorizontalPosition() - this._shipManager.getXWing().getHorizontalPosition();
    }

    private calculateSumOfLegs(): number {
        return Math.abs(this.calculateVerticalDistance()) + Math.abs(this.calculateHorizontalDistance());
    }

    private calculateRatio(): number {
        const ratioOfVertical: number = Math.abs(this.calculateVerticalDistance()) / this.calculateSumOfLegs();
        return this.calculateVerticalDistance() < 0 ? ratioOfVertical * -10 : ratioOfVertical * 10;
    }

    private rotateShip(): void {
        if (this._shipManager) {
            let rotation: number = 0;
            if (this.calculateHorizontalDistance() > 0) {
                rotation = this.calculateRatio() * 9;
            } else if (this.calculateHorizontalDistance() < 0) {
                rotation = this.calculateRatio() * -9 + 180;
            }
            this.element.style.transform = `rotate(${rotation}deg)`
        }
    }

    die() {
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
        console.log(newVerticalPosition);
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

    private calculateVerticalDistance(): number {
        return this.getVerticalPosition() - this._shipManager.getXWing().getVerticalPosition() - this._shipManager.getXWing().height/3;
    }
    private calculateHorizontalDistance(): number {
        return this.getHorizontalPosition() - this._shipManager.getXWing().getHorizontalPosition() + this._shipManager.getXWing().width*3;
    }

    private calculateSumOfLegs(): number {
        return Math.abs(this.calculateVerticalDistance()) + Math.abs(this.calculateHorizontalDistance());
    }

    private calculateBlasterVerticalVelocity(): number {
        const ratioOfVertical: number = Math.abs(this.calculateVerticalDistance()) / this.calculateSumOfLegs();
        return this.calculateVerticalDistance() < 0 ? ratioOfVertical * -10 : ratioOfVertical * 10;
    }

    private calculateBlasterHorizontalVelocity(): number {
        const ratioOfHorizontal: number = Math.abs(this.calculateHorizontalDistance()) / this.calculateSumOfLegs();
        return this.calculateHorizontalDistance() < 0 ? ratioOfHorizontal * -10 : ratioOfHorizontal * 10;
    }

    private setRotationOfBlasterShot(shotHtml: HTMLElement): void {
        let rotation: number = 0;
        if (this.calculateHorizontalDistance() > 0) {
            rotation = this.calculateBlasterVerticalVelocity() * 9;
        } else if (this.calculateHorizontalDistance() < 0) {
            rotation = this.calculateBlasterVerticalVelocity() * -9 + 180;
        }
        shotHtml.style.transform = `rotate(${rotation}deg)`
    }

    shoot(time: number) {
        if (Utility.isTimeTo(time, 1, this.lastShotTime) && this._shipManager && this._shotManager && this.isTeleportOn) {
            this.lastShotTime = Utility.convertTime(time);
            const shotHtml: HTMLElement = EffectFactory.createJuditCruiserShot(this.element);
            this.setRotationOfBlasterShot(shotHtml);
            const shot: TieShot = new BlasterShot(shotHtml, this.calculateBlasterVerticalVelocity(), this.calculateBlasterHorizontalVelocity())
            this._shotManager.registerShot(shot);
        }
    }

    public getHit() {
        if (!this.isTeleportOn) {
            super.getHit();
        }
    }
}