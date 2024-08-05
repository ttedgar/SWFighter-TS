import {ShipAssembler} from "./ShipAssembler.ts";
import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {TieFighter} from "../../../ships/TieFighter.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {Deathstar} from "../../../ships/Deathstar.ts";

export class TieFighterAssembler extends ShipAssembler {
    private create(timeOfAppearance: number, horizontalPosition: number, time: number) {
        if (Event.shouldAppear(time, timeOfAppearance, EventTimes.lastTieTime)) {
            EventTimes.lastTieTime = Math.round(time / 100);
            const tie: TieFighter = new TieFighter(ShipCreator.createTieFighter(horizontalPosition));
            this.shipManager.addShip(tie);
        }
    }

    private act(timeOfAppearance: number, time: number) {
        if (time > timeOfAppearance) {
            this.shipManager.getShips().filter(ship => ship instanceof TieFighter).forEach(ship => {
                const tie = ship as Deathstar
                tie.move();
                tie.shoot(time);
            })
        }
    }

    public handle(timeOfAppearance: number, time: number, verticalPosition: number) {
        this.create(timeOfAppearance, verticalPosition, time);
        this.act(timeOfAppearance, time);
    }
}