import { Container } from "./Container"
import { Game } from "./Game"
import { Loader } from "./Loader"

export enum sceneStatus {
    wainting = 'waiting',
    loadind = 'loading',
    ready = "ready"
}

interface ISceneConfig {
    autoStart?: boolean,
    loading?: () => void,
    init?: () => void,
    update?: () => void
}


export class Scene extends Container {
    autoStart: boolean
    game: Game
    status: sceneStatus
    constructor(sceneConfig: ISceneConfig) {
        super()
        this.status = sceneStatus.wainting
        
        this.autoStart = sceneConfig.autoStart || false
        if (sceneConfig.loading)
            this.loading = sceneConfig.loading
        if (sceneConfig.init)
            this.init = sceneConfig.init
        if (sceneConfig.update)
            this.update = sceneConfig.update

    }

    loading(loader: Loader) { }
    init() { }
    update() { }
}