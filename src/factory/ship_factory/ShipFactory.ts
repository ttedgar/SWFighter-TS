import {ShipManager} from "../../game/ShipManager.ts";
import {TieFighterAssembler} from "./assembler/TieFighterAssembler.ts";
import {DeathstarAssembler} from "./assembler/DeathstarAssembler.ts";
import {ShutterAssembler} from "./assembler/ShutterAssembler.ts";

export class ShipFactory{
    private shipManager: ShipManager;
    private tieAssembler: TieFighterAssembler;
    private deathstarAssembler: DeathstarAssembler;
    private shuttleAssembler: ShutterAssembler;

    public setShipManager(shipManager: ShipManager) {
        this.shipManager = shipManager;
        this.tieAssembler = new TieFighterAssembler(shipManager);
        this.deathstarAssembler = new DeathstarAssembler(shipManager);
        this.shuttleAssembler = new ShutterAssembler(shipManager);
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
}