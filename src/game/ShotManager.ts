import {PlayerShot} from "../shot/PlayerShot.ts";
import {Shot} from "../shot/Shot.ts";

export interface ShotManager{
    registerPlayerShot(shot: PlayerShot);
    getPlayerShots();
    setPlayerShots(shots: [PlayerShot]);
    registerShot(shot: Shot);
    getShots();
    setShots(shots: [Shot]);
}