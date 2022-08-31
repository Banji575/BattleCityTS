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
    loading?: (loader: Loader) => void,
    init?: () => void,
    update?: (timestamp: number) => void
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
            this.loading = sceneConfig.loading.bind(this)
        if (sceneConfig.init)
            this.init = sceneConfig.init.bind(this)
        if (sceneConfig.update)
            this.update = sceneConfig.update.bind(this)

    }

    loading(loader: Loader) { }
    init() { }
    update(timestamp: number) { }
}