import { Parent } from "./components/Parent"
import { Canvas } from "./components/Canvas"
import { VertiBar } from "./components/VertiBar"
import { HoriBar } from "./components/HoriBar"
import { State } from "./scripts/State"

export class Main {
    state: State
    parent: Parent
    canvas: Canvas
    horiBar: HoriBar
    vertiBar: VertiBar
    constructor() {
        this.state = new State()
        this.parent = new Parent()
        this.canvas = new Canvas(this.state, this.parent)
        this.horiBar = new HoriBar(this.state, this.canvas)
        this.vertiBar = new VertiBar(this.state)
    }
}

new Main()
document.body.style.margin = 0 + "px"
document.body.style.padding = 0 + "px"
document.body.style.overflowX = "hidden"
document.body.style.backgroundColor = "#333333"
