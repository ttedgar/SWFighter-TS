import {ShipCreator} from "../factory/html_creator/ShipCreator.ts";
import {Ship} from "../ships/Ship.ts";
import {XWing} from "../ships/XWing.ts";
import {EventHandler} from "../event_handler/EventHandler.ts";
import {PlayerShot} from "../shot/PlayerShot.ts";
import {ShotManager} from "./ShotManager.ts";
import {ShipManager} from "./ShipManager.ts";
import {InfoBar} from "../infobar/InfoBar.ts";
import {ShipFactory} from "../factory/ship_factory/ShipFactory.ts";
import {HitController} from "./HitController.ts";
import {Shot} from "../shot/Shot.ts";
import {ShipHandler} from "../ships/ShipHandler.ts";
import {ShotHandler} from "../shot/ShotHandler.ts";
import {ScoringManager} from "./ScoringManager.ts";
import {Utility} from "../utility/Utility.ts";
import {SithFighter} from "../ships/SithFighter.ts";
import {VictoryScreen} from "../infobar/VictoryScreen.ts";
import {StartScreen} from "../infobar/StartScreen.ts";


export class GameLogic implements ShotManager, ShipManager, ScoringManager {
  private lastTime: number;
  private time: number;
  private ships: Ship[];
  private xWing: XWing;
  private eventHandler: EventHandler;
  private playerShots: PlayerShot[];
  private enemyShots: Shot[];
  private shipFactory: ShipFactory;
  private hitDetector: HitController;
  private shipHandler: ShipHandler;
  private shotHandler: ShotHandler;
  private score: number;
  private sithFighterDefeated: boolean;
  private gameEnded: boolean;

  constructor() {
    this.lastTime = 0;
    this.time = 0;
    this.ships = [];
    this.playerShots = [];
    this.enemyShots = [];
    this.score = 0;
    this.sithFighterDefeated = false;
    this.gameEnded = false;
    this.eventHandler = new EventHandler();
    this.xWing = new XWing(ShipCreator.createXWingHtml(), 10, this.eventHandler);
    this.shipFactory = new ShipFactory();
    this.hitDetector = new HitController();
    this.shipHandler = new ShipHandler();
    this.shotHandler = new ShotHandler();
    this.registerPlayerShot = this.registerPlayerShot.bind(this);
    this.registerShot = this.registerShot.bind(this);
  }

  public run() {
    this.xWing.setShotManager(this);
    this.xWing.setScoringManager(this);
    this.shipFactory.setShipManager(this);
    this.hitDetector.setUp(this, this, this)
    this.shipHandler.setShipManager(this);
    this.shotHandler.setUp(this, this);
    InfoBar.createInfoBar(this.xWing.hp);
    StartScreen.show();
    requestAnimationFrame(this.gameLoop);
  }

  private gameLoop = (timeStamp: number) => {
    this.giveShipsManager();
    this.countTime(timeStamp);
    this.checkVictory();
    this.hitDetector.checkForHits();
    this.shotHandler.moveShots(this.time);
    if (!this.gameEnded) {
      this.xWing.handleXWing(this.time);
    }
    this.createShips();
    requestAnimationFrame(this.gameLoop);
  }

  private createShips() {
    this.shipFactory.generateAsteroids(50, 8, 15, this.time);

    this.shipFactory.createTieSwarm(100, window.innerHeight / 4, this.time, 10, 8);
    this.shipFactory.createTieSwarm(200, (window.innerHeight * 3) / 4, this.time, 10, 8);


    this.shipFactory.createShuttle(300, window.innerHeight / 4, this.time, Utility.rng(0.7, 3));
    this.shipFactory.createShuttle(301, (window.innerHeight * 3) / 4, this.time, Utility.rng(0.7, 3));
    this.shipFactory.createShuttle(400, window.innerHeight / 4, this.time, Utility.rng(0.7, 3));
    this.shipFactory.createShuttle(401, (window.innerHeight * 3) / 4, this.time, Utility.rng(0.7, 3));
    this.shipFactory.createShuttle(500, window.innerHeight / 4, this.time, Utility.rng(0.7, 3));
    this.shipFactory.createShuttle(501, (window.innerHeight * 3) / 4, this.time, Utility.rng(0.7, 3));

    this.shipFactory.createStarDestroyer(700, window.innerHeight / 2, this.time);

    this.shipFactory.createDeathStar(1000, this.time);
    this.shipFactory.createTieSwarm(900, window.innerHeight / 4, this.time, 8, 10);
    this.shipFactory.createTieSwarm(901, (window.innerHeight * 3) / 4, this.time, 8, 10);
    this.shipFactory.createShuttle(950, Utility.rng(window.innerHeight / 8, window.innerHeight * 7 / 8), this.time, Utility.rng(0.7, 3));
    this.shipFactory.createShuttle(951, Utility.rng(window.innerHeight / 8, window.innerHeight * 7 / 8), this.time, Utility.rng(0.7, 3));

    this.shipFactory.createSithFighter(1300, window.innerHeight / 2, this.time);

    this.shipHandler.act(this.time);
  }


  private giveShipsManager() {
    this.ships.forEach(ship => {
      ship.setShipManager(this);
      ship.setShotManager(this);
    });
  }

  private countTime(timeStamp: number) {
    if (!this.lastTime) {
      this.lastTime = timeStamp;
    }
    this.time = Math.round(timeStamp);
    this.lastTime = timeStamp;
  }

  //ShipManager methods:
  public removeShip(shipToRemove: Ship): void {
    this.ships = this.ships.filter(ship => shipToRemove !== ship);
  }

  public addShip(ship: Ship): void {
    this.ships.push(ship);
  }

  public getShips(): Ship[] {
    return this.ships;
  }

  public setShips(ships: Ship[]): void {
    this.ships = ships;
  }

  public getXWing(): XWing {
    return this.xWing;
  }

  //ShotManager methods:
  public registerPlayerShot(shot: PlayerShot): void {
    this.playerShots.push(shot);
  }

  public getPlayerShots(): PlayerShot[] {
    return this.playerShots;
  }

  public setPlayerShots(shots: PlayerShot[]): void {
    this.playerShots = shots;
  }

  public getShots(): Shot[] {
    return this.enemyShots;
  }

  public registerShot(shot: Shot): void {
    this.enemyShots.push(shot);
  }

  public setShots(shots: Shot[]): void {
    this.enemyShots = shots;
  }

  public removeShot(shotToRemove: Shot): void {
    this.enemyShots = this.enemyShots.filter(shot => shotToRemove !== shot);
  }

  //ScoringManager methods:
  public addScore(points: number): void {
    this.score += points;
    InfoBar.updateScore(this.score);
  }

  public getScore(): number {
    return this.score;
  }

  private checkVictory(): void {
    if (!this.sithFighterDefeated) {
      const hasSithFighter = this.ships.some(ship => ship instanceof SithFighter);
      const hadSithFighter = this.ships.length > 0 && this.ships.some(ship => ship instanceof SithFighter);

      if (!hasSithFighter && hadSithFighter) {
        this.sithFighterDefeated = true;
      }
    }
  }

  public triggerVictory(): void {
    this.sithFighterDefeated = true;
    this.endGame();
    VictoryScreen.show(this.score);
  }

  public endGame(): void {
    this.gameEnded = true;
    this.xWing.remove();
  }
}