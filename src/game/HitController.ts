import {ShotManager} from "./ShotManager.ts";
import {ShipManager} from "./ShipManager.ts";
import {ScoringManager} from "./ScoringManager.ts";
import {PlayerShot} from "../shot/PlayerShot.ts";
import {Ship} from "../ships/Ship.ts";
import {ShootingMechanics} from "../utility/ShootingMechanics.ts";
import {Deathstar} from "../ships/Deathstar.ts";
import {TieFighter} from "../ships/TieFighter.ts";
import {Shuttle} from "../ships/Shuttle.ts";
import {StarDestroyer} from "../ships/StarDestroyer.ts";
import {SithFighter} from "../ships/SithFighter.ts";
import {KamikazeDrone} from "../shot/KamikazeDrone.ts";
import {Asteroid} from "../ships/Asteroid.ts";
import {EffectFactory} from "../factory/html_creator/EffectCreator.ts";

export class HitController {
    private shotManager!: ShotManager;
    private shipManager!: ShipManager;
    private scoringManager!: ScoringManager;

    public setUp(shotManager: ShotManager, shipManager: ShipManager, scoringManager: ScoringManager) {
        this.shotManager = shotManager;
        this.shipManager = shipManager;
        this.scoringManager = scoringManager;
    }

    private getShipDestructionPoints(ship: Ship): number {
        if (ship instanceof TieFighter) return 10;
        if (ship instanceof Shuttle) return 50;
        if (ship instanceof StarDestroyer) return 200;
        if (ship instanceof Deathstar) return 1000;
        if (ship instanceof SithFighter) return 2000;
        if (ship instanceof Asteroid) return 0;
        return 0;
    }

    private checkHitsOnEnemy() {
        this.shotManager.getPlayerShots().forEach((shot: PlayerShot) => {
            this.shipManager.getShips().forEach((ship: Ship) => {
                if (ShootingMechanics.isEnemyHit(ship, shot)) {
                    shot.hit();
                    this.scoringManager.addScore(10);
                    const wasAlive = ship.hp > 0;
                    ship.getHit();
                    if (wasAlive && ship.hp === 0) {
                        this.scoringManager.addScore(this.getShipDestructionPoints(ship));
                    }
                    this.shotManager.setPlayerShots(this.shotManager.getPlayerShots().filter(playerShot => playerShot !== shot));
                }
            })

            this.shotManager.getShots().filter(enemyShot => enemyShot instanceof KamikazeDrone).forEach(enemyShot => {
                const drone = enemyShot as KamikazeDrone;
                if (ShootingMechanics.isKamikazeDroneHit(drone, shot)) {
                    shot.hit();
                    drone.hit();
                    this.scoringManager.addScore(10);
                    this.shotManager.setPlayerShots(this.shotManager.getPlayerShots().filter(playerShot => playerShot !== shot));
                    drone.element.remove();
                    this.shotManager.removeShot(drone);
                }
            })
        })
    }

    private checkDeathLaserHit() {
        const xwing = this.shipManager.getXWing();
        if (xwing.dead) return;

        const deathstar: Deathstar = this.shipManager.getShips().filter(ship => ship instanceof Deathstar)[0] as Deathstar;
        if (ShootingMechanics.isPlayerHitByLaser(deathstar, xwing)) {
            const bang: HTMLElement = EffectFactory.createBang(xwing.element);
            bang.style.top = deathstar.getLaserTop() + 150 + 'px';
            xwing.getHit();
        }
    }

    private checkEnemyShotHits() {
        const xwing = this.shipManager.getXWing();
        if (xwing.dead) return;

        this.shotManager.getShots().forEach(shot => {
            if (ShootingMechanics.isPlayerHitByShot(shot, xwing)) {
                xwing.getHit();
                shot.hit();
                this.shotManager.removeShot(shot);
            }
        })
    }

    private checkCrashes() {
        const xwing = this.shipManager.getXWing();
        if (xwing.dead) return;

        this.shipManager.getShips().forEach((ship: Ship) => {
            if (ShootingMechanics.isCrashed(ship, xwing)) {
                xwing.getHit();
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