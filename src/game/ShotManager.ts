import {PlayerShot} from "../shot/PlayerShot.ts";
import {Shot} from "../shot/Shot.ts";

export interface ShotManager{
    registerPlayerShot(shot: PlayerShot);
    getPlayerShots(): [PlayerShot];
    setPlayerShots(shots: [PlayerShot]);
    registerShot(shot: Shot);
    getShots() : [Shot];
    setShots(shots: [Shot]);
    removeShot(shot: Shot);
}