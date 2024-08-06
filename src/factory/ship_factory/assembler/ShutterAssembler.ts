import {ShipAssembler} from "./ShipAssembler.ts";
import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {Shuttle} from "../../../ships/Shuttle.ts";

export class ShutterAssembler extends ShipAssembler {

    public create(timeOfAppearance: number, verticalPosition: number, time: number, angleModifier: number) {
        if (Event.shouldAppear(time, timeOfAppearance, EventTimes.lastShuttleTime)) {
            EventTimes.lastShuttleTime = Math.round(time / 100);
            const shuttle: Shuttle = new Shuttle(ShipCreator.createShuttle(verticalPosition), true, angleModifier);
            this.shipManager.addShip(shuttle);
        }
    }
}