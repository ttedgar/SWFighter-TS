import {ShotManager} from "./ShotManager.ts";
import {ShipManager} from "./ShipManager.ts";
import {PlayerShot} from "../shot/PlayerShot.ts";
import {Ship} from "../ships/Ship.ts";
import {ShootingMechanics} from "../utility/ShootingMechanics.ts";
import {Deathstar} from "../ships/Deathstar.ts";
import {KamikazeDrone} from "../shot/KamikazeDrone.ts";
import {Asteroid} from "../ships/Asteroid.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";

export class HitController {
    private shotManager: ShotManager;
    private shipManager: ShipManager;

    public setUp(shotManager: ShotManager, shipManager: ShipManager) {
        this.shotManager = shotManager;
        this.shipManager = shipManager;
    }

    private checkHitsOnEnemy() {
        this.shotManager.getPlayerShots().forEach((shot: PlayerShot) => {
            this.shipManager.getShips().forEach((ship: Ship) => {
                if (ShootingMechanics.isEnemyHit(ship, shot)) {
                    shot.hit();
                    ship.getHit();
                    this.shotManager.setPlayerShots(this.shotManager.getPlayerShots().filter(playerShot => playerShot !== shot));
                }
            })

            this.shotManager.getShots().filter(enemyShot => enemyShot instanceof KamikazeDrone).forEach(enemyShot => {
                const drone = enemyShot as KamikazeDrone;
                if (ShootingMechanics.isKamikazeDroneHit(drone, shot)) {
                    shot.hit();
                    drone.hit();
                    this.shotManager.setPlayerShots(this.shotManager.getPlayerShots().filter(playerShot => playerShot !== shot));
                    drone.element.remove();
                    this.shotManager.removeShot(drone);
                }
            })
        })
    }

    private checkDeathLaserHit() {
        const deathstar: Deathstar = this.shipManager.getShips().filter(ship => ship instanceof Deathstar)[0] as Deathstar;
        if (ShootingMechanics.isPlayerHitByLaser(deathstar, this.shipManager.getXWing())) {
            const bang: HTMLElement = EffectFactory.createBang(this.shipManager.getXWing().element);
            bang.style.top = deathstar.getLaserTop() + 150 + 'px';
            this.shipManager.getXWing().getHit();
        }
    }

    private checkEnemyShotHits() {
        this.shotManager.getShots().forEach(shot => {
            if (ShootingMechanics.isPlayerHitByShot(shot, this.shipManager.getXWing())) {
                this.shipManager.getXWing().getHit();
                shot.hit();
                this.shotManager.removeShot(shot);
            }
        })
    }

    private checkCrashes() {
        this.shipManager.getShips().forEach((ship: Ship) => {
            if (ShootingMechanics.isCrashed(ship, this.shipManager.getXWing())) {
                this.shipManager.getXWing().getHit();
                ship.getHit();
            }
        })
    }

    private checkAsteroidHitsOnEnemies() {
        this.shipManager.getShips().filter((ship: Ship) => ship instanceof Asteroid).forEach((ship: Ship) => {
            const asteroid: Asteroid = ship as Asteroid;
            this.shipManager.getShips().filter((ship: Ship) => !(ship instanceof Asteroid)).forEach((ship: Ship) => {
                if (ShootingMechanics.isCrashed(ship, asteroid)) {
                    asteroid.getHit();
                    ship.getHit();
                }
            })
        })
    }

    private checkHitsOnPlayer() {
        this.checkDeathLaserHit();
        this.checkEnemyShotHits();
    }

    public checkForHits() {
        this.checkAsteroidHitsOnEnemies()
        this.checkCrashes();
        this.checkHitsOnEnemy();
        this.checkHitsOnPlayer();
    }
}