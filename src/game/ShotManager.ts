import {PlayerShot} from "../shot/PlayerShot.ts";
import {Shot} from "../shot/Shot.ts";

export interface ShotManager{
    registerPlayerShot(shot: PlayerShot): void;
    getPlayerShots(): PlayerShot[];
    setPlayerShots(shots: PlayerShot[]): void;
    registerShot(shot: Shot): void;
    getShots(): Shot[];
    setShots(shots: Shot[]): void;
    removeShot(shot: Shot): void;
}