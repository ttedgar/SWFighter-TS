import {ShipManager} from "../../game/ShipManager.ts";
import {TieFighterAssembler} from "./assembler/TieFighterAssembler.ts";
import {DeathstarAssembler} from "./assembler/DeathstarAssembler.ts";
import {ShutterAssembler} from "./assembler/ShutterAssembler.ts";
import {StarDestroyerAssembler} from "./assembler/StarDestroyerAssembler.ts";
import {SithFighterAssembler} from "./assembler/SithFighterAssembler.ts";
import {AsteroidAssembler} from "./assembler/AsteroidAssembler.ts";
import {Utility} from "../../utility/Utility.ts";

export class ShipFactory{
    private tieAssembler!: TieFighterAssembler;
    private deathstarAssembler!: DeathstarAssembler;
    private shuttleAssembler!: ShutterAssembler;
    private starDestroyerAssembler!: StarDestroyerAssembler;
    private sithFighterAssembler!: SithFighterAssembler;
    private asteroidAssembler!: AsteroidAssembler;

    public setShipManager(shipManager: ShipManager) {
        this.tieAssembler = new TieFighterAssembler(shipManager);
        this.deathstarAssembler = new DeathstarAssembler(shipManager);
        this.shuttleAssembler = new ShutterAssembler(shipManager);
        this.starDestroyerAssembler = new StarDestroyerAssembler(shipManager);
        this.sithFighterAssembler = new SithFighterAssembler(shipManager);
        this.asteroidAssembler = new AsteroidAssembler(shipManager);
    }

    public createTieFighter(timeOfAppearance: number, verticalPosition: number, time: number) {
        this.tieAssembler.create(timeOfAppearance, verticalPosition, time);
    }

    public createTieSwarm(startOfAppearance: number, verticalPosition: number, time: number, numberOfTies: number, timeBetweenTies: number) {
        for (let i = 0; i < numberOfTies; i++) {
            this.tieAssembler.create(startOfAppearance + (timeBetweenTies * i), verticalPosition, time);
        }
    }

    public createDeathStar(timeOfAppearance: number, time: number) {
        this.deathstarAssembler.create(timeOfAppearance, time);
    }

    public createShuttle(timeOfAppearance: number, verticalPosition: number, time: number, angleModifier: number) {
        this.shuttleAssembler.create(timeOfAppearance, verticalPosition, time, angleModifier);
    }
    
    public createStarDestroyer(timeOfAppearance: number, verticalPosition: number, time: number) {
        this.starDestroyerAssembler.create(timeOfAppearance, verticalPosition, time);
    }

    public createSithFighter(timeOfAppearance: number, verticalPosition: number, time: number) {
        this.sithFighterAssembler.create(timeOfAppearance, verticalPosition, time);
    }

    public createAsteroid(timeOfAppearance: number, verticalPosition: number, time: number, hp: number) {
        this.asteroidAssembler.create(timeOfAppearance, verticalPosition, time, hp);
    }


    public generateAsteroids(startOfAppearance: number, amount: number, timeBetweenAsteroids: number, time: number) {
        for (let i = 0; i < amount; i++) {
            const hp: number = Math.round(Utility.rng(1, 8));
            const verticalPosition: number = window.innerHeight/8 * Utility.rng(1, 7);
            this.createAsteroid(startOfAppearance + (i * timeBetweenAsteroids), verticalPosition, time, hp);
        }
    }
}