import {Utility} from "../utility/Utility.ts";
import {ShotManager} from "../game/ShotManager.ts";
import {ShipManager} from "../game/ShipManager.ts";

export abstract class Ship {
    protected element: HTMLElement;
    protected style: CSSStyleDeclaration;
    private _width: number;
    private _height: number;
    protected _hp: number;
    protected _shotManager: ShotManager;
    protected _shipManager: ShipManager;
    protected verticalSpeed?: number;
    protected isDown?: boolean;

    constructor(element: HTMLElement, width: number, height: number, hp: number, verticalSpeed?: number, isDown?: boolean) {
        this.element = element;
        this.style = element.style;
        this._width = width;
        this._height = height;
        this._hp = hp;
        this.verticalSpeed = verticalSpeed ?? 0;
        this.isDown = isDown ?? false;
    }

    public abstract move();
    public abstract shoot(time: number);

    public getTop() : number {
        return Utility.positionToNumber(this.style.top);
    }

    public getLeft() : number {
        return Utility.positionToNumber(this.style.left);
    }


    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    public getHit() {
        this._hp--;
        if (this._hp === 0) {
            this.die();
        }
    }

    public abstract die();

    public setShotManager(shotManager: ShotManager) {
        if (!this._shotManager) {
            this._shotManager = shotManager;
        }
    }
    public setShipManager(shipManager: ShipManager) {
        if (!this._shipManager) {
            this._shipManager = shipManager;
        }
    }


    get hp(): number {
        return this._hp;
    }
}

