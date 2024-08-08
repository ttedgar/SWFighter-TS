import {ShipAssembler} from "./ShipAssembler.ts";
import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {JuditCruiser} from "../../../ships/JuditCruiser.ts";

export class JuditCruiserAssembler extends ShipAssembler {
    create(timeOfAppearance: number, horizontalPosition: number, time: number) {
        if (Event.shouldAppear(time, timeOfAppearance, EventTimes.lastTeleporterTime)) {
            EventTimes.lastTeleporterTime = Math.round(time / 100);
            const teleporter: JuditCruiser = new JuditCruiser(ShipCreator.createTeleporter(horizontalPosition));
            this.shipManager.addShip(teleporter);
        }
    }
}