import {ShipAssembler} from "./ShipAssembler.ts";
import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {StarDestroyer} from "../../../ships/StarDestroyer.ts";

export class StarDestroyerAssembler extends ShipAssembler {

    create(timeOfAppearance: number, horizontalPosition: number, time: number) {
        if (Event.shouldAppear(time, timeOfAppearance, EventTimes.lastStarDestroyerTime)) {
            EventTimes.lastStarDestroyerTime = Math.round(time / 100);
            const starDestroyer: StarDestroyer = new StarDestroyer(ShipCreator.createStarDestroyer(horizontalPosition));
            this.shipManager.addShip(starDestroyer);
        }
    }
}