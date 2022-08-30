import { Entity, IFrame } from "./Entity"
import { IGameObjects } from './Entity'

export class Sprite extends Entity {
    texture: any
    frame: IFrame

    constructor(texture: any, public spriteConfig: IGameObjects) {
        super(spriteConfig)
        this.texture = texture

        this.frame = {
            x: spriteConfig.frame?.x || 0,
            y: spriteConfig.frame?.y || 0,
            width: spriteConfig.frame?.width || spriteConfig.width,
            height: spriteConfig.frame?.height || spriteConfig.height
        }
    }


    draw(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D):void {
        context.save()

        context.translate(this.x, this.y)
        context.scale(this.scaleX, this.scaleY)
        context.rotate(-this.rotation)
        context.drawImage(
            this.texture,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            this.absoluteX - this.x,
            this.absoluteY - this.y,
            this.width,
            this.height
        )

        context.restore()
    }
}