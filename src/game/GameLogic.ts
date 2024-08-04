import {Deathstar} from "../ships/Deathstar.ts";
import {ShipFactory} from "../factory/ShipFactory.ts";
import {Ship} from "../ships/Ship.ts";
import {XWing} from "../ships/XWing.ts";
import {EventHandler} from "../event_handler/EventHandler.ts";
import {Utility} from "../utility/Utility.ts";


export class GameLogic {
  private lastTime: number;
  private cycle: number;
  private deltaTime: number;
  private ships: [Ship];
  private xWing: XWing;
  private eventHandler: EventHandler;
  private playerShots: [HTMLElement];

  constructor() {
    this.lastTime = 0;
    this.cycle = 0;
    this.deltaTime = 0;
    this.ships = [];
    this.eventHandler = new EventHandler();
    this.xWing = new XWing(ShipFactory.createXWingHtml(), 10, this.eventHandler);
    this.playerShots = [];
  }

  public run() {
    requestAnimationFrame(this.gameLoop);
  }

  private countCycle(timeStamp: number) {
    if (!this.lastTime) {
      this.lastTime = timeStamp;
    }
    this.cycle++;
    this.deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
  }

  private collectShots() {
    this.playerShots = Array.from(document.querySelectorAll('.shot'));
  }

  private checkForHits() {
    this.playerShots.forEach((shot: HTMLImageElement) => {
      this.ships.forEach((ship: Ship) => {
        if (Utility.isHit(ship, shot)) {
          console.log('HIT');
          shot.src = './images/explosion.gif';
          shot.style.width = '30px';
          ship.decrementHp();
          setTimeout(() => {
            shot.remove();
          }, 500)
        }
      })
    })
  }

  private gameLoop = (timeStamp: number) => {
    this.countCycle(timeStamp);
    this.collectShots();
    this.checkForHits();

    this.xWing.handleXWing(this.cycle);

    this.addDeathStar(100);



    requestAnimationFrame(this.gameLoop);
  }

  private addDeathStar(cycleOfAppearance: number) {
    if (this.cycle === cycleOfAppearance) {
      let ds: Deathstar = new Deathstar(ShipFactory.createDeathStarHtml());
      this.ships.push(ds);
    }
    if (this.cycle > cycleOfAppearance) {
      this.ships.filter(ship => ship instanceof Deathstar).forEach(ship => {
        const ds = ship as Deathstar
        ds.move(this.cycle);
        ds.shoot(this.cycle);
      })
    }
  }
}