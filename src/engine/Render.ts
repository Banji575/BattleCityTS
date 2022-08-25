export interface IRendererConfig {
    width: number,
    height: number,
    background:string,
    update: (timestamp:number) => void
}

export class Renderer {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    background:string

    update: (timestamp: number) => void
    constructor(config: IRendererConfig) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.background = config.background
        this.canvas.width = config.width
        this.canvas.height = config.height
        this.update = config.update
        requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    tick(timestamp: number) {
        this.clear()
        this.update(timestamp)
        requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    draw(callback: (context: CanvasRenderingContext2D) => void) {
        
        callback(this.context)
    }

    clear(){
        this.draw((context:CanvasRenderingContext2D)=>{
            context.fillStyle = this.background
            context.beginPath()
            context.rect(0,0, this.canvas.width, this.canvas.height)
            context.fill()
        })
    }
}