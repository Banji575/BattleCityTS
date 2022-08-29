import { Entity } from "./Entity"
import { IGameObjects } from "./IGameObjects"

interface IFrame {
    x?: number,
    y?: number,
    width?: number,
    heigth?: number
}
export interface ISpriteConfig {
    x: number,
    y: number,
    width: number,
    height: number,
    frame?: IFrame,
    anchorX?: number,
    anchorY?: number
}

export class Sprite extends Entity implements IGameObjects {
    texture: any
    frame: any
    x: number
    y: number
    width: number
    height: number
    anchorX: number
    anchorY: number

    constructor(texture: any, public spriteConfig: ISpriteConfig) {
        super()
        this.texture = texture

        this.frame = {
            x: spriteConfig.frame?.x || 0,
            y: spriteConfig.frame?.y || 0,
            width: spriteConfig.frame?.width || spriteConfig.width,
            height: spriteConfig.frame?.heigth || spriteConfig.height
        }

        console.log(this.frame)

        this.x = spriteConfig.x
        this.y = spriteConfig.y
        this.anchorX = spriteConfig.anchorX || 0
        this.anchorY = spriteConfig.anchorY || 0
        this.width = spriteConfig.width
        this.height = spriteConfig.height
    }

    setScale(x: number, y?: number) {
        this.scaleX = x
        y ? this.scaleY = y : this.scaleY = x
    }

    set absoluteY(value: number) {
        console.log(this.anchorY * this.height)
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

    get scaleX() {
        return this.width / this.frame.width
    }
    set scaleY(value: number) {
        this.height = this.height * value
    }

    get scaleY() {
        return this.height / this.frame.height
    }
    set scaleX(value: number) {
        this.width = this.width * value
    }

    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D):void {
        context.drawImage(
            this.texture,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            this.absoluteX,
            this.absoluteY,
            this.width,
            this.height
        )
    }
}