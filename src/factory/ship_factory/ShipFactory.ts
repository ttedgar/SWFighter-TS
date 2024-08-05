import {ShipManager} from "../../game/ShipManager.ts";
import {TieFighterAssembler} from "./assembler/TieFighterAssembler.ts";
import {DeathstarAssembler} from "./assembler/DeathstarAssembler.ts";

export class ShipFactory{
    private shipManager: ShipManager;
    private tieAssembler: TieFighterAssembler;
    private deathstarAssembler: DeathstarAssembler;

    public setShipManager(shipManager: ShipManager) {
        this.shipManager = shipManager;
        this.tieAssembler = new TieFighterAssembler(shipManager);
        this.deathstarAssembler = new DeathstarAssembler(shipManager);
    }

    public handleTieFighter(timeOfAppearance: number, time: number, verticalPosition: number) {
        this.tieAssembler.handle(timeOfAppearance, time, verticalPosition);
    }

    public handleDeathStar(timeOfAppearance: number, time: number) {
        this.deathstarAssembler.handle(timeOfAppearance, time);
    }
}