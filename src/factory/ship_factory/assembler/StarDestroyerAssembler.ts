import {ShipAssembler} from "./ShipAssembler.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {StarDestroyer} from "../../../ships/StarDestroyer.ts";
import {Scheduler} from "../../../events/Scheduler.ts";

export class StarDestroyerAssembler extends ShipAssembler {
    private scheduler = new Scheduler();

    create(timeOfAppearance: number, horizontalPosition: number, time: number) {
        if (this.scheduler.shouldFire(time, timeOfAppearance)) {
            const starDestroyer: StarDestroyer = new StarDestroyer(ShipCreator.createStarDestroyer(horizontalPosition));
            this.shipManager.addShip(starDestroyer);
        }
    }
}