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
    update: (timestamp:number) => {

        renderer.draw((context: CanvasRenderingContext2D) => {
            context.fillStyle = 'black'
            context.beginPath()
            context.arc(
                renderer.canvas.width/2 + 50 * Math.sin(timestamp/100),
                renderer.canvas.height / 2 + 50 * Math.cos(timestamp/100),
                5,
                0,
                Math.PI * 2)
            context.fill()
        })
    }
})

document.body.append(renderer.canvas)

loader.addImage('build', fileUrl.href)
loader.addImage('build2', fileUrl.href)

loader.addJson('person', json)

loader.load(() => {

})


console.log(loader)


// Loader.loadImage(fileUrl.href)
//     .then(img => document.body.append(img))
