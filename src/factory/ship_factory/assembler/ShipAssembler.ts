import {ShipManager} from "../../../game/ShipManager.ts";

export abstract class ShipAssembler{
    protected shipManager: ShipManager;

    constructor(shipManager: ShipManager) {
        this.shipManager = shipManager;
    }

    abstract create(timeOfAppearance: number, horizontalPosition: number, time: number);

    abstract act(timeOfAppearance: number, time: number);

    abstract handle(timeOfAppearance: number, time: number, horizontalPosition: number);

}



