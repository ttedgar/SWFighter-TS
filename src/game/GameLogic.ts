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

  constructor() {
    this.lastTime = 0;
    this.time = 0;
    this.ships = [];
    this.playerShots = [];
    this.enemyShots = [];
    this.score = 0;
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
    requestAnimationFrame(this.gameLoop);
  }

  private gameLoop = (timeStamp: number) => {
    this.giveShipsManager();
    this.countTime(timeStamp);
    this.hitDetector.checkForHits();
    this.shotHandler.moveShots(this.time);
    this.xWing.handleXWing(this.time);
    this.createShips();
    requestAnimationFrame(this.gameLoop);
  }

  private createShips() {
    // this.shipFactory.createDeathStar(10, this.time);
    // this.shipFactory.createTieSwarm(20, 0, this.time, 10, 5)
    // this.shipFactory.createTieSwarm(40, window.innerHeight, this.time, 10, 5)
    // this.shipFactory.createShuttle(21, 500, this.time, 1);
    // this.shipFactory.createShuttle(20, 300, this.time, -1);
    // this.shipFactory.createStarDestroyer(5, window.innerHeight/2, this.time);
    this.shipFactory.createSithFighter(5, window.innerHeight/5, this.time);
    // this.shipFactory.generateAsteroids(10, 10, this.time);
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
}