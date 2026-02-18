import {ShipAssembler} from "./ShipAssembler.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {JuditCruiser} from "../../../ships/JuditCruiser.ts";
import {Scheduler} from "../../../events/Scheduler.ts";

export class JuditCruiserAssembler extends ShipAssembler {
    private scheduler = new Scheduler();

    create(timeOfAppearance: number, horizontalPosition: number, time: number) {
        if (this.scheduler.shouldFire(time, timeOfAppearance)) {
            const teleporter: JuditCruiser = new JuditCruiser(ShipCreator.createTeleporter(horizontalPosition));
            this.shipManager.addShip(teleporter);
        }
    }
}