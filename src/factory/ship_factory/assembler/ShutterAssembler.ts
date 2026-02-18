import {ShipAssembler} from "./ShipAssembler.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {Shuttle} from "../../../ships/Shuttle.ts";
import {Scheduler} from "../../../events/Scheduler.ts";

export class ShutterAssembler extends ShipAssembler {
    private scheduler = new Scheduler();

    public create(timeOfAppearance: number, verticalPosition: number, time: number, angleModifier: number) {
        if (this.scheduler.shouldFire(time, timeOfAppearance)) {
            const shuttle: Shuttle = new Shuttle(ShipCreator.createShuttle(verticalPosition), true, angleModifier);
            this.shipManager.addShip(shuttle);
        }
    }
}