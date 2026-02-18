import {Utility} from "../utility/Utility.ts";
import {Ship} from "./Ship.ts"
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";

export class Deathstar extends Ship {
    private readonly static HEIGHT: number = 200;
    private readonly static WIDTH: number = -20;
    private readonly static HP: number = 50;
    private readonly static INITIAL_SPEED: number = 2;
    private laser: HTMLElement;
    private _isLaserActive: boolean;
    private _isDead: boolean;

    constructor(element: HTMLElement) {
        super(element, Deathstar.WIDTH, Deathstar.HEIGHT, Deathstar.HP, Deathstar.INITIAL_SPEED, true);
        this.laser = EffectFactory.createDeathLaserHtml();
        this._isLaserActive = false;
        this._isDead = false;
    }

    private moveDown () {
        if (this.isDown) {
            this.style.top = Utility.positionToNumber(this.style.top) + this.verticalSpeed + 'px';
            if (Utility.positionToNumber(this.style.top) > window.innerHeight - 200) {
                this.isDown = false;
                this.verticalSpeed = Utility.rng(1, 3)
            }
        }
    }

    private moveUp () {
        if (!this.isDown) {
            this.style.top = Utility.positionToNumber(this.style.top) - this.verticalSpeed + 'px';
            if (Utility.positionToNumber(this.style.top) < 0) {
                this.isDown = true;
                this.verticalSpeed = Utility.rng(1, 3)
            }
        }
    }

    public move() {
        if (this._isDead) return;
        this.moveDown();
        this.moveUp();
    }

    public shoot(time: number) {
        this.laser.style.top = Utility.positionToNumber(this.element.style.top) - 105 + 'px';
        if (Utility.isTimeTo(time, 30)) {
            this.laser.style.display = 'block';
            this._isLaserActive = true;
        }
        if (Utility.isTimeTo(time, 60)) {
            this.laser.style.display = 'none';
            this._isLaserActive = false;
        }
    }

    public die() {
        this._shipManager.removeShip(this);
        this._isDead = true;
        this.laser.remove();
        const img: HTMLImageElement = this.element as HTMLImageElement;
        img.src = './images/deathstar-ruin.png';
        const bigBang = EffectFactory.createDeathstarBang(this.element);
        this.element.classList.add('active')
        setTimeout(() => {
            bigBang.remove();
            this.element.remove();
        }, 5000)
    }


    get isLaserActive(): boolean {
        return this._isLaserActive;
    }

    public getLaserTop() : number {
        return Utility.positionToNumber(this.laser.style.top);
    }
}
