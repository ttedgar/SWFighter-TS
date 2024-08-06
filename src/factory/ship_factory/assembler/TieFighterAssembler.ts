import {ShipAssembler} from "./ShipAssembler.ts";
import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {TieFighter} from "../../../ships/TieFighter.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";

export class TieFighterAssembler extends ShipAssembler {
    public create(timeOfAppearance: number, verticalPosition: number, time: number) {
        if (Event.shouldAppear(time, timeOfAppearance, EventTimes.lastTieTime)) {
            EventTimes.lastTieTime = Math.round(time / 100);
            const tie: TieFighter = new TieFighter(ShipCreator.createTieFighter(verticalPosition));
            this.shipManager.addShip(tie);
        }
    }
}