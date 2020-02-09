interface IContextPath2D {
    beginPath: () => IContextPath2D;
    rect: (x: number, y: number, w: number, h: number) => IContextPath2D;
    fillStyle: (colour: string | CanvasGradient | CanvasPattern) => IContextPath2D;
    fill: () => IContextPath2D;
    closePath: () => IContextPath2D;
    arc: (x: number, y: number, radius: number, startAngle: number, endAngle: number, antiClockwise?: boolean) => IContextPath2D;
    clearRect: (x: number, y: number, w: number, h: number) => IContextPath2D;
    square: (x: number, y: number, w: number, h: number) => IContextPath2D;
    circle: (x: number, y: number, radius: number, startAngle: number, endAngle: number, antiClockwise?: boolean) => IContextPath2D;
    font: (fontStyle: string) => IContextPath2D;
    fillText: (text: string, x: number, y: number) => IContextPath2D;
}
