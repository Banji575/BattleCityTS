import { Container } from "./Container"

export interface IRendererConfig {
    width: number,
    height: number,
    background: string,
    update: (timestamp: number) => void
}

export class Renderer {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    background: string
    stage: Container

    update: (timestamp: number) => void

    
    constructor(config: IRendererConfig) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.background = config.background
        this.canvas.width = config.width
        this.canvas.height = config.height
        this.update = config.update


        this.stage = new Container()
        requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    tick(timestamp: number) {
        this.clear()
        this.update(timestamp)
        this.render()
        requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    render() {
        this.stage.draw(this.canvas, this.context)
    }

    clear() {
        this.context.fillStyle = this.background
        this.context.beginPath()
        this.context.rect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fill()
    }
}