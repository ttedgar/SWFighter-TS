import {Utility} from "../utility/Utility.ts";
import {ShotManager} from "../game/ShotManager.ts";
import {ShipManager} from "../game/ShipManager.ts";

export abstract class Ship {
    private _element: HTMLElement;
    protected style: CSSStyleDeclaration;
    private _width: number;
    private _height: number;
    protected _hp: number;
    protected _shotManager!: ShotManager;
    protected _shipManager!: ShipManager;
    protected verticalSpeed?: number;
    protected isDown?: boolean;

    constructor(element: HTMLElement, width: number, height: number, hp: number, verticalSpeed?: number, isDown?: boolean) {
        this._element = element;
        this.style = element.style;
        this._width = width;
        this._height = height;
        this._hp = hp;
        this.verticalSpeed = verticalSpeed ?? 0;
        this.isDown = isDown ?? false;
    }

    public abstract move(): void;
    public abstract shoot(time: number): void;

    public getVerticalPosition() : number {
        return Utility.positionToNumber(this.style.top);
    }

    public getHorizontalPosition() : number {
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

    public abstract die(): void;

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

    get element(): HTMLElement {
        return this._element;
    }

    protected bounceVertically(): void {
        if (this.isDown) {
            this.style.top = Utility.positionToNumber(this.style.top) + (this.verticalSpeed ?? 0) + 'px';
            if (Utility.positionToNumber(this.style.top) > window.innerHeight - 50) {
                this.isDown = false;
            }
        }
        if (!this.isDown) {
            this.style.top = Utility.positionToNumber(this.style.top) - (this.verticalSpeed ?? 0) + 'px';
            if (Utility.positionToNumber(this.style.top) < 0) {
                this.isDown = true;
            }
        }
    }
}





