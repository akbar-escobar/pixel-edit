import { Canvas } from "./components/Canvas"
import { HoriBar } from "./components/HoriBar"
import { State } from "./scripts/State"

export class Main {
    state: State
    canvas: Canvas
    horiBar: HoriBar
    constructor() {
        this.state = new State()
        this.canvas = new Canvas(this.state)
        this.horiBar = new HoriBar(this.state)
    }
}

new Main()
document.body.style.margin = 0 + "px"
document.body.style.padding = 0 + "px"
document.body.style.overflowX = "hidden"
document.body.style.backgroundColor = "#333333"
