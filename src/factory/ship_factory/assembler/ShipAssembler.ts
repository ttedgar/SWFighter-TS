import {ShipManager} from "../../../game/ShipManager.ts";
import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {TieFighter} from "../../../ships/TieFighter.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";

export abstract class ShipAssembler{
    protected shipManager: ShipManager;

    constructor(shipManager: ShipManager) {
        this.shipManager = shipManager;
    }

    abstract create(timeOfAppearance: number, horizontalPosition: number, time: number, angleModifier: number, hp?: number);

}









