import { Container } from "./engine/Container";
import { Sprite } from "./engine/GameObjects/Sprite";
import { Loader } from "./engine/Loader";
import { Renderer } from "./engine/Render";
import json from './static/persons.json'
const fileUrl = new URL('./static/firstImg.png', import.meta.url)
const jsonUrl = new URL('./static/persons.json', import.meta.url)




const loader = new Loader()
const renderer = new Renderer({
    width: 800,
    height: 600,
    background: 'grey',
    update: (timestamp: number) => {

    }
})

document.body.append(renderer.canvas)
loader.addImage('build', fileUrl.href)
loader.addImage('build2', fileUrl.href)

loader.addJson('person', json)

loader.load(() => {
    const build = new Sprite(loader.getImage('build'), { x: 50, y: 50, width: 136, height: 128, anchorX: -1, anchorY: -1 })
    build.absoluteX = 5
    build.absoluteY = 0

    const container = new Container()
    container.add(build)
    renderer.stage.add(container)

    console.log(renderer)

    renderer.update = (timestamp: number) => {

    }
})


console.log(loader)


// Loader.loadImage(fileUrl.href)
//     .then(img => document.body.append(img))
