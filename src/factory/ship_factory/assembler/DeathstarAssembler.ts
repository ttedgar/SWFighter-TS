import {ShipAssembler} from "./ShipAssembler.ts";
import {Deathstar} from "../../../ships/Deathstar.ts";
import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";

export class DeathstarAssembler extends ShipAssembler {

    public handle(timeOfAppearance: number, time: number) {
        this.create(timeOfAppearance, time);
        this.act(timeOfAppearance, time);
    }

    private act(timeOfAppearance: number, time: number) {
        if (time > timeOfAppearance) {
            this.shipManager.getShips().filter(ship => ship instanceof Deathstar).forEach(ship => {
                const ds = ship as Deathstar
                ds.move();
                ds.shoot(time);
            })
        }
    }

    private create(timeOfAppearance: number, time: number) {
        if (Event.shouldAppear(time, timeOfAppearance, EventTimes.lastDeathstarTime)) {
            EventTimes.lastDeathstarTime = Math.round(time / 100);
            const ds: Deathstar = new Deathstar(ShipCreator.createDeathStarHtml());
            this.shipManager.addShip(ds);
        }
    }
}