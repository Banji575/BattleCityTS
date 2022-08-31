import { IContainer } from "../Container"

export interface IFrame {
    x: number,
    y: number,
    width: number,
    height: number
}

export interface IGameObjects {
    x: number,
    y: number,
    width: number,
    height: number
    anchorX?: number
    anchorY?: number
    rotation?: number
    frame?: IFrame
    scaleX?: number
    scaleY?: number
    scale?: number
    parent?: IContainer | null
}


export class Entity implements IGameObjects {
    width: number
    height: number
    anchorX: number
    anchorY: number
    x: number
    y: number
    rotation: number
    frame?: IFrame
    scaleX: number
    scaleY: number
    scale: number
    parent?: IContainer | null
    visible: boolean

    constructor({ width, height, anchorX, anchorY, x, y, rotation, frame, scaleX, scaleY, scale }: IGameObjects = {
        width: 0,
        height: 0,
        anchorX: 0,
        anchorY: 0,
        x: 0,
        y: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        scale: 1
    }) {
        this.width = width || 0
        this.height = height || 0
        this.anchorX = anchorX || 0
        this.anchorY = anchorY || 0
        this.x = x || 0
        this.y = y || 0
        this.rotation = rotation || 0
        this.frame = frame
        this.scaleX = scaleX || 1
        this.scaleY = scaleY || 1
        this.scale = scale || 1
        this.visible = true
    }

    set absoluteY(value: number) {
        this.y = value + this.anchorY * this.height
    }
    set absoluteX(value: number) {
        this.x = value + this.anchorX * this.width
    }

    get absoluteX() {
        return this.x - this.anchorX * this.width
    }

    get absoluteY() {
        return this.y - this.anchorY * this.height
    }


    setScale(x: number, y?: number) {
        this.scaleX = x
        y ? this.scaleY = y : this.scaleY = x
    }

    setParent(parent: IContainer) {
        if (this.parent) {
            this.parent.remove(this)

        }
        parent.add(this)
        this.parent = parent
    }

    drawing(callback: () => void) {
        if (this.visible) {
            callback()
        }
    }

}