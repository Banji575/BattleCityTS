import { Entity } from "./GameObjects/Entity"
import { IGameObjects } from "./GameObjects/IGameObjects"

export class Container extends Entity {
    displayObjects: Entity[]
    constructor() {
        super()
        this.displayObjects = []
    }

    add(obj: Entity) {
        if (!this.displayObjects.includes(obj)) {
            this.displayObjects.push(obj)
        }
    }

    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        for (const obj of this.displayObjects) {
            if (typeof obj['draw'] === 'function') {
                (obj as any).draw(canvas, context)
            }

        }
    }

}