import {ShotManager} from "../game/ShotManager.ts";
import {ShipManager} from "../game/ShipManager.ts";
import {Homing} from "./Homing.ts";

export class ShotHandler{
    private _shotManager: ShotManager;
    private _shipManager: ShipManager;

    public setUp(shotManager: ShotManager, shipManager: ShipManager) {
        this._shotManager = shotManager;
        this._shipManager = shipManager;
    }

    public moveShots(time: number) {
        this._shotManager.getShots().forEach(shot => shot.fly(time));
        this._shotManager.getPlayerShots().forEach(shot => shot.fly(time))
        this._shotManager.getShots().filter(shot => shot.isHoming()).forEach(shot => {
            const smartAmmo = shot as Homing;
            smartAmmo.homing(this._shipManager.getXWing().getVerticalPosition(), this._shipManager.getXWing().getHorizontalPosition())
        })
    }
}