export interface IGameObjects {
    texture?: any,
    frame?: any,
    x: number,
    y: number,
    width: number,
    height: number

    draw: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => void
}