import { Container } from "./engine/Container";
import { Game } from "./engine/Game";
import { Sprite } from "./engine/GameObjects/Sprite";
import { Loader } from "./engine/Loader";
import { IRendererConfig, Renderer } from "./engine/Render";
import { Scene } from "./engine/Scene";
import json from './static/persons.json'
const fileUrl = new URL('./static/firstImg.png', import.meta.url)
const fileBuild2 = new URL('./static/house.png', import.meta.url)
const jsonUrl = new URL('./static/persons.json', import.meta.url)

export interface IGameConfig {
    width: number,
    height: number,
    root: HTMLCanvasElement | null,
    background: string
    scenes?: Scene[]
}

const root: HTMLCanvasElement | null = document.querySelector('#root')
const gameConfig: IGameConfig = {
    width: 800,
    height: 600,
    background: 'grey',
    root
}


const loader = new Loader()
const game = new Game(gameConfig)

const renderer = game.renderer

loader.addImage('build', fileUrl.href)
loader.addImage('build2', fileUrl.href)
loader.addImage('house', fileBuild2.href)

loader.addJson('person', json)

loader.load(() => {
    const build = new Sprite(loader.getImage('build'), { x: 100, y: 100, width: 136, height: 128, anchorX: .5, anchorY: .5 })
    const house = new Sprite(loader.getImage('house'), { x: 100, y: 50, width: 167, height: 144 })

    console.log(build)
    const container = new Container()
    const secondContainer = new Container()
    // container.add(build)
    container.add(build)
    container.remove(build)

    secondContainer.add(build)

    renderer.stage.add(secondContainer)


    // build.rotation= Math.PI
    // renderer.createTestShape()

    renderer.update = (timestamp: number) => {


    }
})


console.log(loader)


// Loader.loadImage(fileUrl.href)
//     .then(img => document.body.append(img))
