import { Container } from "./engine/Container";
import { Sprite } from "./engine/GameObjects/Sprite";
import { Loader } from "./engine/Loader";
import { Renderer } from "./engine/Render";
import json from './static/persons.json'
const fileUrl = new URL('./static/firstImg.png', import.meta.url)
const fileBuild2 = new URL('./static/house.png', import.meta.url)
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
loader.addImage('house', fileBuild2.href)

loader.addJson('person', json)

loader.load(() => {
    const build = new Sprite(loader.getImage('build'), { x: 100, y: 100, width: 136, height: 128, anchorX:.5, anchorY:.5 })
    const house = new Sprite(loader.getImage('house'), { x: 100, y: 50, width: 167, height: 144 })

console.log(build)
    const container = new Container()

    // container.add(build)
    container.add(build)

    // renderer.stage.add(container)
    // container.x = renderer.canvas.width / 2
    // container.y = renderer.canvas.height / 2

    renderer.stage.add(container)



    // build.rotation= Math.PI
renderer.createTestShape()

    renderer.update = (timestamp: number) => {
         container.rotation = timestamp / 10000
        //  house.rotation = timestamp / 1000
        // build.rotation = timestamp / 1000

    }
})


console.log(loader)


// Loader.loadImage(fileUrl.href)
//     .then(img => document.body.append(img))
