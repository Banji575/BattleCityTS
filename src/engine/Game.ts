import { IGameConfig } from ".."
import { Container } from "./Container"
import { Loader } from "./Loader"
import { IRendererConfig, Renderer } from "./Render"
import { Scene, sceneStatus } from "./Scene"


export class Game {
    renderer: Renderer
    scenes: Container
    loader: Loader

    constructor(config: IGameConfig) {
        this.renderer = new Renderer({ width: config.width, height: config.height, background: config.background || 'white' })
        this.scenes = new Container()
        this.loader = new Loader()

        if (config.scenes && config.scenes.length !== 0) {
            this.initScene(config.scenes)


        }

        if (config.root)
            config.root.append(this.renderer.canvas)

        const autostartScenes = this.scenes.displayObjects.filter(scene => (scene as Scene).autoStart)
        for (let _scene of autostartScenes) {
            const scene = (_scene as Scene)
            if (scene.autoStart) {
                scene.status = sceneStatus.loadind;
                scene.loading(this.loader)
            }
        }

        this.loader.load(() => {
            for (let _scene of autostartScenes) {
                const scene = (_scene as Scene)
                scene.status = sceneStatus.ready

                scene.init()
            }
        })

        requestAnimationFrame(timestamp => this.tick(timestamp))
    }
    tick(timestamp: number) {
        this.renderer.clear()
        for (let _scene of this.scenes.getElements()) {
            const scene = (_scene as Scene)
            if (scene.status === sceneStatus.ready) {
                scene.update(timestamp)
                scene.draw(this.renderer.canvas, this.renderer.context)
            }
        }


        this.renderer.render()

        requestAnimationFrame(timestamp => this.tick(timestamp))
    }



    initScene(scenes: Scene[]) {
        this.scenes.add(scenes)
        for (let scene of scenes) {
            scene.game = this
        }
    }

    addScene(...scenes: Scene[]) {
        for (let scene of scenes) {
            if (!this.scenes.getElement(scene)) {
                this.scenes.add(scene)
            }
        }
    }
}