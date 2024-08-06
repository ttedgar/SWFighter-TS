import {ShipManager} from "../../../game/ShipManager.ts";

export abstract class ShipAssembler{
    protected shipManager: ShipManager;

    constructor(shipManager: ShipManager) {
        this.shipManager = shipManager;
    }

    abstract create(timeOfAppearance: number, horizontalPosition: number, time: number, angleModifier: number);

}




