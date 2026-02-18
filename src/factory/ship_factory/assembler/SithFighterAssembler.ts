import {ShipAssembler} from "./ShipAssembler.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {SithFighter} from "../../../ships/SithFighter.ts";
import {Scheduler} from "../../../events/Scheduler.ts";

export class SithFighterAssembler extends ShipAssembler {
    private scheduler = new Scheduler();

    create(timeOfAppearance: number, horizontalPosition: number, time: number) {
        if (this.scheduler.shouldFire(time, timeOfAppearance)) {
            const sithFighter: SithFighter = new SithFighter(ShipCreator.createSithFighter(horizontalPosition));
            this.shipManager.addShip(sithFighter);
        }
    }
}