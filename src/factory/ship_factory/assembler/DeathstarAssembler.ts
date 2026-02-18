import {ShipAssembler} from "./ShipAssembler.ts";
import {Deathstar} from "../../../ships/Deathstar.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {Scheduler} from "../../../events/Scheduler.ts";

export class DeathstarAssembler extends ShipAssembler {
    private scheduler = new Scheduler();

    public create(timeOfAppearance: number, time: number) {
        if (this.scheduler.shouldFire(time, timeOfAppearance)) {
            const ds: Deathstar = new Deathstar(ShipCreator.createDeathStarHtml());
            this.shipManager.addShip(ds);
        }
    }
}