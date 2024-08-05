import {ShipCreator} from "../factory/html_creator/ShipCreator.ts";
import {Ship} from "../ships/Ship.ts";
import {XWing} from "../ships/XWing.ts";
import {EventHandler} from "../event_handler/EventHandler.ts";
import {PlayerShot} from "../shot/PlayerShot.ts";
import {ShotManager} from "./ShotManager.ts";
import {ShipManager} from "./ShipManager.ts";
import {Event} from "../events/Event.ts";
import {InfoBar} from "../infobar/InfoBar.ts";
import {ShipFactory} from "../factory/ship_factory/ShipFactory.ts";
import {HitDetector} from "./HitDetector.ts";
import {Shot} from "../shot/Shot.ts";


export class GameLogic implements ShotManager, ShipManager{
  private lastTime: number;
  private time: number;
  private deltaTime: number;
  private ships: [Ship];
  private xWing: XWing;
  private eventHandler: EventHandler;
  private playerShots: [PlayerShot];
  private enemyShots: [Shot];
  private events: Event;
  private shipFactory: ShipFactory;
  private hitDetector: HitDetector;

  constructor() {
    this.lastTime = 0;
    this.time = 0;
    this.deltaTime = 0;
    this.events = new Event();
    this.ships = [];
    this.playerShots = [];
    this.eventHandler = new EventHandler();
    this.xWing = new XWing(ShipCreator.createXWingHtml(), 10, this.eventHandler);
    this.shipFactory = new ShipFactory();
    this.hitDetector = new HitDetector();
    this.registerPlayerShot = this.registerPlayerShot.bind(this);
  }

  public run() {
    this.xWing.setShotManager(this);
    this.shipFactory.setShipManager(this);
    this.hitDetector.setUpHitDetector(this, this)
    InfoBar.createInfoBar(this.xWing.hp);
    requestAnimationFrame(this.gameLoop);
  }

  private gameLoop = (timeStamp: number) => {
    this.giveShipsShipManager();
    this.countTime(timeStamp);
    this.hitDetector.checkForHits();
    this.xWing.handleXWing(this.time);
    this.shipFactory.handleDeathStar(10, this.time);
    this.shipFactory.handleTieFighter(20, this.time, 0);
    requestAnimationFrame(this.gameLoop);
  }

  private giveShipsShipManager() {
    this.ships.forEach(ship => ship.setShipManager(this));
  }

  private countTime(timeStamp: number) {
    if (!this.lastTime) {
      this.lastTime = timeStamp;
    }
    this.time = Math.round(timeStamp);
    this.deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
  }

  //ShipManager methods:
  public removeShip(shipToRemove: Ship) {
    this.ships = this.ships.filter(ship => shipToRemove !== ship);
  }

  public addShip(ship: Ship) {
    this.ships.push(ship);
  }

  public getShips(): [Ship] {
    return this.ships;
  }

  public setShips(ships:[Ship]) {
    this.ships = ships;
  }

  public getXWing(): XWing {
    return this.xWing;
  }

  //ShotManager methods:
  public registerPlayerShot(shot: PlayerShot) {
    this.playerShots.push(shot);
  }

  public getPlayerShots(): [Shot] {
    return this.playerShots;
  }

  public setPlayerShots(shots: [Shot]) {
    this.playerShots = shots;
  }

  getShots() {
    return this.enemyShots;
  }

  registerShot(shot: Shot) {
    this.enemyShots.push(shot);
  }

  setShots(shots: [Shot]) {
    this.enemyShots = shots;
  }
}