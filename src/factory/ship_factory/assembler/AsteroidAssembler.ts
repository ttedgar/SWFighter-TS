import {ShipCreator} from "../../html_creator/ShipCreator.ts";
import {ShipAssembler} from "./ShipAssembler.ts";
import {Asteroid} from "../../../ships/Asteroid.ts";
import {Utility} from "../../../utility/Utility.ts";
import {Scheduler} from "../../../events/Scheduler.ts";

export class AsteroidAssembler extends ShipAssembler {
    private scheduler = new Scheduler();

    create(timeOfAppearance: number, verticalPosition: number, time: number, hp: number) {
        if (this.scheduler.shouldFire(time, timeOfAppearance)) {
            const asteroidHtml = ShipCreator.createAsteroid(verticalPosition, hp * Asteroid.HEIGHT_TO_HP_RATIO);
            const asteroid: Asteroid = new Asteroid(asteroidHtml, Utility.rng(2, 5), Utility.rng(-1, 1), hp);
            this.shipManager.addShip(asteroid);
        }
    }
}