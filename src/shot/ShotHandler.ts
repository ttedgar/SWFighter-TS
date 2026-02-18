import {ShotManager} from "../game/ShotManager.ts";
import {ShipManager} from "../game/ShipManager.ts";
import {Missile} from "./Missile.ts";
import {KamikazeDrone} from "./KamikazeDrone.ts";

export class ShotHandler{
    private _shotManager!: ShotManager;
    private _shipManager!: ShipManager;

    public setUp(shotManager: ShotManager, shipManager: ShipManager) {
        this._shotManager = shotManager;
        this._shipManager = shipManager;
    }

    public moveShots(time: number) {
        this._shotManager.getShots().forEach(shot => shot.fly(time));
        this._shotManager.getPlayerShots().forEach(shot => shot.fly(time));
        this._shotManager.setPlayerShots(
            this._shotManager.getPlayerShots().filter(shot => shot.element.isConnected)
        );
        this._shotManager.getShots()
            .filter((shot): shot is Missile | KamikazeDrone => shot instanceof Missile || shot instanceof KamikazeDrone)
            .forEach(shot => shot.homing(this._shipManager.getXWing().getVerticalPosition(), this._shipManager.getXWing().getHorizontalPosition()))
    }
}