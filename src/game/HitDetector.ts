import {ShotManager} from "./ShotManager.ts";
import {ShipManager} from "./ShipManager.ts";
import {PlayerShot} from "../shot/PlayerShot.ts";
import {Ship} from "../ships/Ship.ts";
import {ShootingMechanics} from "../utility/ShootingMechanics.ts";
import {Deathstar} from "../ships/Deathstar.ts";

export class HitDetector{
    private shotManager: ShotManager;
    private shipManager: ShipManager;

    public setUpHitDetector(shotManager: ShotManager, shipManager: ShipManager) {
        this.shotManager = shotManager;
        this.shipManager = shipManager;
    }

    private checkEnemyHits() {
        this.shotManager.getPlayerShots().forEach((shot: PlayerShot) => {
            this.shipManager.getShips().forEach((ship: Ship) => {
                if (ShootingMechanics.isEnemyHit(ship, shot)) {
                    shot.hit();
                    ship.getHit();
                    this.shotManager.setPlayerShots(this.shotManager.getPlayerShots().filter(playerShot => playerShot !== shot));
                }
            })
        })
    }

    private checkDeathLaserHit() {
        const deathstar: Deathstar = this.shipManager.getShips().filter(ship => ship instanceof Deathstar)[0] as Deathstar;
        if (ShootingMechanics.isPlayerHitByLaser(deathstar, this.shipManager.getXWing())) {
            this.shipManager.getXWing().getHit();
        }
    }

    private checkPlayerHits() {
        this.checkDeathLaserHit();
    }

    public checkForHits() {
        this.checkEnemyHits();
        this.checkPlayerHits();
    }
}