
interface IResources {
    image: string[],
    jsons: string[]
}

interface ILoadedResources {
    image: IResource[],
    jsons: IResource[]
}

interface IResource {
    name: string,
    src: string
}

export class Loader {
    resourses: IResources
    loadOrder: ILoadedResources

    constructor() {
        this.loadOrder = {
            image: [],
            jsons: []
        }
        this.resourses = {
            image: [],
            jsons: []
        }
    }

    addImage(name, src) {
        this.loadOrder.image.push({ name, src })
    }

    addJson(name, json) {
        this.resourses.jsons[name] = json

    }

    getImage(imageName: string): HTMLImageElement | undefined {
        let img;
        Object.keys(this.resourses.image).forEach((name) => {
            if (name === imageName) {
                console.log('find image', this.resourses.image[name])
                img = this.resourses.image[name]
            }
        })
        return img
    }

    getJson(jsonName: string): {} | undefined {
        console.log('get json')
        Object.keys(this.resourses.jsons).forEach(name => {
            if (name === jsonName)
                return this.resourses.jsons[name]
        })
        return
    }

    load(callback) {
        const promises: Promise<any>[] = []

        for (let loadDate of this.loadOrder.image) {
            const { name, src } = loadDate
            const prom = Loader.loadImage(src)
                .then(image => {
                    this.resourses.image[name] = image
                    if (this.loadOrder.image.includes(loadDate)) {
                        const index = this.loadOrder.image.indexOf(loadDate)
                        this.loadOrder.image.splice(index, 1)
                    }
                    // console.log('resource image', this.resourses.image, loadDate)
                })
            promises.push(prom)
        }

        for (let loadDate of this.loadOrder.jsons) {
            const { name, src } = loadDate

            const prom = Loader.loadJson(src)
                .then(json => {

                    this.resourses.jsons[name] = json

                })

            promises.push(prom)
        }

        Promise.all(promises)
            .then(callback)
    }

    static loadJson(address: string): Promise<JSON> {
        return new Promise((res, rej) => {
            fetch(address)
                .then(data => console.log(data))
            // .then(json => res(json))
            // .catch(err => rej(err))
        })
    }

    static loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((res, rej) => {
            try {
                const img = new Image()
                img.onload = () => res(img)
                img.src = src
            } catch (err) {
                rej(err)
            }
        })
    }
}
