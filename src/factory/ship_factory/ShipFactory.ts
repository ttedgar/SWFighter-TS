import {ShipManager} from "../../game/ShipManager.ts";
import {TieFighterAssembler} from "./assembler/TieFighterAssembler.ts";
import {DeathstarAssembler} from "./assembler/DeathstarAssembler.ts";
import {ShutterAssembler} from "./assembler/ShutterAssembler.ts";
import {StarDestroyerAssembler} from "./assembler/StarDestroyerAssembler.ts";

export class ShipFactory{
    private shipManager: ShipManager;
    private tieAssembler: TieFighterAssembler;
    private deathstarAssembler: DeathstarAssembler;
    private shuttleAssembler: ShutterAssembler;
    private starDestroyer: StarDestroyerAssembler;

    public setShipManager(shipManager: ShipManager) {
        this.shipManager = shipManager;
        this.tieAssembler = new TieFighterAssembler(shipManager);
        this.deathstarAssembler = new DeathstarAssembler(shipManager);
        this.shuttleAssembler = new ShutterAssembler(shipManager);
        this.starDestroyer = new StarDestroyerAssembler(shipManager);
    }

    public createTieFighter(timeOfAppearance: number, horizontalPosition: number, time: number) {
        this.tieAssembler.create(timeOfAppearance, horizontalPosition, time);
    }

    public createTieSwarm(startOfAppearance: number, horizontalPosition: number, time: number, numberOfTies: number, timeBetweenTies: number) {
        for (let i = 0; i < numberOfTies; i++) {
            this.tieAssembler.create(startOfAppearance + (timeBetweenTies * i), horizontalPosition, time);
        }
    }

    public createDeathStar(timeOfAppearance: number, time: number) {
        this.deathstarAssembler.create(timeOfAppearance, time);
    }

    public createShuttle(timeOfAppearance: number, horizontalPosition: number, time: number, angleModifier: number) {
        this.shuttleAssembler.create(timeOfAppearance, horizontalPosition, time, angleModifier);
    }
    
    public createStarDestroyer(timeOfAppearance: number, horizontalPosition: number, time: number) {
        this.starDestroyer.create(timeOfAppearance, horizontalPosition, time);
    }
}