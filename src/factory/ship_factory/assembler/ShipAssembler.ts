import {ShipManager} from "../../../game/ShipManager.ts";

export abstract class ShipAssembler{
    protected shipManager: ShipManager;

    constructor(shipManager: ShipManager) {
        this.shipManager = shipManager;
    }
}









