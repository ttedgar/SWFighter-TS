import {ShipAssembler} from "./ShipAssembler.ts";
import {Deathstar} from "../../../ships/Deathstar.ts";
import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";

export class DeathstarAssembler extends ShipAssembler {

    public create(timeOfAppearance: number, time: number) {
        if (Event.shouldAppear(time, timeOfAppearance, EventTimes.lastDeathstarTime)) {
            EventTimes.lastDeathstarTime = Math.round(time / 100);
            const ds: Deathstar = new Deathstar(ShipCreator.createDeathStarHtml());
            this.shipManager.addShip(ds);
        }
    }
}