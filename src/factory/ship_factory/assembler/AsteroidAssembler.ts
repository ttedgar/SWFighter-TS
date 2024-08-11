import {Event} from "../../../events/Event.ts";
import {EventTimes} from "../../../events/EventTimes.ts";
import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {ShipAssembler} from "./ShipAssembler.ts";
import {Asteroid} from "../../../ships/Asteroid.ts";
import {Utility} from "../../../utility/Utility.ts";

export class AsteroidAssembler extends ShipAssembler {
    create(timeOfAppearance: number, verticalPosition: number, time: number, hp: number) {
        if (Event.shouldAppear(time, timeOfAppearance, EventTimes.lastAsteroidTime)) {
            EventTimes.lastAsteroidTime = Math.round(time / 100);
            const asteroidHtml = ShipCreator.createAsteroid(verticalPosition, hp * Asteroid.HEIGHT_TO_HP_RATIO);
            const asteroid: Asteroid = new Asteroid(asteroidHtml, Utility.rng(2, 5), Utility.rng(-1, 1), hp);
            this.shipManager.addShip(asteroid);
        }
    }
}