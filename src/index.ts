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
    const build = new Sprite(loader.getImage('build'), { x: 0, y: 0, width: 136, height: 128,anchorX:.5, anchorY:.5 })
    renderer.stage.add(build)
    build.anchorX = 100
    build.anchorY = 1
    console.log(build)

    renderer.update = (timestamp: number) => {

    }
})


console.log(loader)


// Loader.loadImage(fileUrl.href)
//     .then(img => document.body.append(img))
