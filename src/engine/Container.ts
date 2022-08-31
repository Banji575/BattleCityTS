import { Entity, IGameObjects } from "./GameObjects/Entity"
export interface IContainer {
    remove: (Entity: IGameObjects) => void
    add: (obj: IGameObjects) => void
}

export class Container extends Entity implements IContainer {
    displayObjects: IGameObjects[]
    constructor() {
        super()
        this.displayObjects = []
    }

    add(obj: IGameObjects | IGameObjects[]) {
        if (Array.isArray(obj)) {
            for (let elem of obj) {
                if (!this.displayObjects.includes(elem)) {
                    this.displayObjects.push(elem)
                }
            }
        } else {
            if (!this.displayObjects.includes(obj)) {
                this.displayObjects.push(obj)
            }
        }

    }

    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        super.drawing(() => {
            context.save()

            context.translate(this.x, this.y)
            context.rotate(this.rotation)
            context.scale(this.scaleX, this.scaleY)
            context.rotate(this.rotation)
            for (const obj of this.displayObjects) {
                if (typeof obj['draw'] === 'function') {
                    
                    (obj as any).draw(canvas, context)
                }

            }

            context.restore()
        })

    }

    getElement(elem:IGameObjects){
        return this.displayObjects.includes(elem)
    }

    getElements() : IGameObjects[]{
        return this.displayObjects
    }

    remove(child: IGameObjects) {
        if (this.displayObjects.includes(child)) {
            const index = this.displayObjects.indexOf(child)
            this.displayObjects.splice(index, 1)
        }
        child.parent = null
    }

}