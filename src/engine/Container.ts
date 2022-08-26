import { IGameObjects } from "./GameObjects/IGameObjects"

export class Container {
    displayObjects: IGameObjects[]
    constructor() {
        this.displayObjects = []
    }

    add(obj: IGameObjects) {
        if (!this.displayObjects.includes(obj)) {
            this.displayObjects.push(obj)
        }
    }

    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        for (const obj of this.displayObjects) {
            obj.draw(canvas, context)
        }
    }

}