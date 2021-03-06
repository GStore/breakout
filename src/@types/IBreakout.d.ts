interface IPosition {
  x: number,
  y: number
}

interface IPaddle {
  height: number,
  width: number,
  x: number
}

interface IBrick extends IPosition {
  visible: boolean
}

interface IBreakoutVariables {
  ctx: IContextPath2D,
  canvas: HTMLCanvasElement,
  ballPosition?: IPosition,
  ballChange?: IPosition,
  ballRadius?: number,
  bricks?: IBrick[][],
  document: HTMLDocument
  
}

interface IBreakout {
    checkY(): void,
    checkX(): void,
    collisionDetection(): void;
    checkPaddle(): void;
    clearGameArea(): void;
    drawBall(): void;
    drawPaddle(): void;
    drawBricks(): void;
    createBricks(): void;
    drawGameObjects(): void;
    draw(): void;
    keyDown(event: KeyboardEvent): void;
    keyUp(event: KeyboardEvent): void;
    run(): void;
    getScore(): number;
    drawScore(): void;
    checkGameState(): void;
    mouseMoveHandler(event: MouseEvent): void;
}
