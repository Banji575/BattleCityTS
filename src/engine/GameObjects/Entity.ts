export abstract class Entity {
    abstract draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void
}