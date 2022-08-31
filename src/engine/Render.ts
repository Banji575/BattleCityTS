import { Container } from "./Container"

export interface IRendererConfig {
    width: number,
    height: number,
    background: string,
    update?: (timestamp: number) => void
}

export class Renderer {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    background?: string
    stage: Container

    update: (timestamp: number) => void = () => { }


    constructor(config: IRendererConfig) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.background = config.background
        this.canvas.width = config.width
        this.canvas.height = config.height


        this.stage = new Container()
        requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    tick(timestamp: number) {
        this.clear()
        this.update(timestamp)
        this.render()
        this.createTestShape()
        requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    createTestShape() {
        this.context.beginPath()
        this.context.arc(32, 36, 2, 0, 2 * Math.PI)

        this.context.fillStyle = 'red'
        this.context.fill()
        this.context.stroke()
    }

    getDisplayObject() {

    }

    render() {
        this.stage.draw(this.canvas, this.context)
    }

    clear() {
        if (this.background)
            this.context.fillStyle = this.background
        this.context.beginPath()
        this.context.rect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fill()
    }
}