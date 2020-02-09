import { expect } from "chai";
import { Breakout } from "../Breakout";

describe("Given a Breakout class", () => {
  let context: IContextPath2D = {
  } as IContextPath2D;
  let canvas: HTMLCanvasElement = {
    width: 200,
    height: 300
  } as HTMLCanvasElement;
  let breakout: IBreakout;

  describe("When I call getScore", () => {  
    let breakoutVars:IBreakoutVariables = {
      ctx: context,
      canvas: canvas
    }
    before(() => {
      
    });

    it("should return 0 when all bricks are visible", () => {
      breakout = new Breakout(breakoutVars);
      const score = breakout.getScore();
      expect(score).to.eq(0);
    });
    
    it("should return 1 when a brick is not visible", () => {
      breakoutVars.bricks = [];
      breakoutVars.bricks[0]=[
        { x: 0, y: 0, visible: true}, 
        { x: 1, y: 1, visible: true},
        { x: 2, y: 2, visible: false}];
      
      breakout = new Breakout(breakoutVars);
      const score = breakout.getScore();
      expect(score).to.eq(1);
    });

    it("should return 2 when a 2 bricks are not visible", () => {
      breakoutVars.bricks = [];
      breakoutVars.bricks[0]=[
        { x: 0, y: 0, visible: true}, 
        { x: 1, y: 1, visible: false},
        { x: 2, y: 2, visible: false}];
      
      breakout = new Breakout(breakoutVars);
      const score = breakout.getScore();
      expect(score).to.eq(2);
    });

    it("should return 3 when all bricks are not visible", () => {
      breakoutVars.bricks = [];
      breakoutVars.bricks[0]=[
        { x: 0, y: 0, visible: false}, 
        { x: 1, y: 1, visible: false},
        { x: 2, y: 2, visible: false}];
      
      breakout = new Breakout(breakoutVars);
      const score = breakout.getScore();
      expect(score).to.eq(3);
    });
  });
});