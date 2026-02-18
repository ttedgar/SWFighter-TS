import {ShipAssembler} from "./ShipAssembler.ts";
import {TieFighter} from "../../../ships/TieFighter.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {Scheduler} from "../../../events/Scheduler.ts";

export class TieFighterAssembler extends ShipAssembler {
    private scheduler = new Scheduler();

    public create(timeOfAppearance: number, horizontalPosition: number, time: number) {
        if (this.scheduler.shouldFire(time, timeOfAppearance)) {
            const tie: TieFighter = new TieFighter(ShipCreator.createTieFighter(horizontalPosition));
            this.shipManager.addShip(tie);
        }
    }
}