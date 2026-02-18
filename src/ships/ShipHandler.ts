import {ShipManager} from "../game/ShipManager.ts";

export class ShipHandler{
    private _shipManager!: ShipManager;


    public setShipManager(value: ShipManager) {
        this._shipManager = value;
    }

    public act(time: number) {
        this._shipManager.getShips().forEach(ship => {
            ship.move();
            ship.shoot(time);
        });
    }
}