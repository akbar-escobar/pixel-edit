import { Canvas } from "./components/Canvas"
import { State } from "./scripts/State"

export class Main {
    state: State
    canvas: Canvas
    constructor() {
        this.state = new State()
        this.canvas = new Canvas(this.state)
    }
}

new Main()
document.body.style.margin = 0 + "px"
document.body.style.padding = 0 + "px"
document.body.style.overflowX = "hidden"
document.body.style.backgroundColor = "#333333"
