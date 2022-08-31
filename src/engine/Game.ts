import { IGameConfig } from ".."
import { IRendererConfig, Renderer } from "./Render"


export class Game {
    renderer: Renderer

    constructor(config: IGameConfig) {
        this.renderer = new Renderer({width:config.width, height:config.height, background:config.background|| 'white'})
        if (config.root)
            config.root.append(this.renderer.canvas)
    }
}