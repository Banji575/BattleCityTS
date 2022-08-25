import { Loader } from "./engine/Loader";
import json from './static/persons.json'
const fileUrl = new URL('./static/firstImg.png', import.meta.url)
const jsonUrl = new URL('./static/persons.json', import.meta.url)
const loader = new Loader()

loader.addImage('build', fileUrl.href)
loader.addImage('build2', fileUrl.href)
// loader.addJson('persons', jsonUrl.href)
console.log(jsonUrl)
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(data => data.json())
    .catch(err => console.error("dkfjdflj", err))



loader.load(() => console.log('images loaded'))
console.log(loader)


// Loader.loadImage(fileUrl.href)
//     .then(img => document.body.append(img))
