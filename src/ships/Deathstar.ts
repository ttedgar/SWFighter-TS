import {Utility} from "../utility/Utility.ts";
import {Ship} from "./Ship.ts"
import {EffectFactory} from "../factory/EffectFactory.ts";

export class Deathstar extends Ship {
    private cyclesPerMovement: number;
    private readonly static INITIAL_CYCLES_PER_MOVEMENT: number = 3;
    private readonly static HEIGHT: number = 200;
    private readonly static WIDTH: number = 130;
    private dsDown: boolean;
    private hp: number;
    private laser: HTMLElement;
    private isLaserActive: boolean;

    constructor(element: HTMLElement) {
        super(element, Deathstar.WIDTH, Deathstar.HEIGHT);
        this.cyclesPerMovement = Deathstar.INITIAL_CYCLES_PER_MOVEMENT;
        this.dsDown = true;
        this.hp = 50;
        this.laser = EffectFactory.createDeathLaserHtml();
        this.isLaserActive = false;
    }

    private moveDown = (cycle: number) => {
        if (cycle % this.cyclesPerMovement === 0 && this.dsDown) {
            this.style.top = Utility.positionToNumber(this.style.top) + 2 + 'px';
            if (Utility.positionToNumber(this.style.top) > window.innerHeight - 200) {
                this.dsDown = false;
                this.cyclesPerMovement = Utility.rng(2, 4);
            }
        }
    }

    private moveUp = (cycle: number) => {
        if (cycle % this.cyclesPerMovement === 0 && !this.dsDown) {
            this.style.top = Utility.positionToNumber(this.style.top) - 2 + 'px';
            if (Utility.positionToNumber(this.style.top) < 0) {
                this.dsDown = true;
                this.cyclesPerMovement = Utility.rng(2, 4);
            }
        }
    }

    public move(cycle: number) {
        this.moveDown(cycle);
        this.moveUp(cycle);
    }

    public shoot(cycle: number) {
        this.laser.style.top = Utility.positionToNumber(this.element.style.top) - 105 + 'px';
        if (cycle % 300 === 0) {
            this.laser.style.display = 'block';
            this.isLaserActive = true;
        }
        if (cycle % 600 === 0) {
            this.laser.style.display = 'none';
            this.isLaserActive = false;
        }
    }
}
