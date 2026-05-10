import { Body } from "./components/Body"
import { Canvas } from "./components/Canvas"
import { ColorPallet } from "./components/ColorPallet"
import { State } from "./scripts/State"
import { ColorPicker } from "./components/ColorPicker"
import { ToolsBar } from "./components/ToolsBar"
import { PalletManager } from "./components/PalletManager"

export class Main {
    state: State
    body:Body 
    canvas: Canvas
    toolsBar: ToolsBar
    colorPallet: ColorPallet
    colorPicker: ColorPicker
    palletManager: PalletManager
    constructor() {
        this.state = new State()
        this.body = new Body()
        this.canvas = new Canvas(this.state, this.body)
        this.palletManager = new PalletManager(this.state, this.body)
        this.colorPallet = new ColorPallet(this.state, this.palletManager)
        this.colorPicker = new ColorPicker(this.state, this.colorPallet)
        this.toolsBar = new ToolsBar(this.state, this.canvas, this.colorPicker)
    }
}

// let isClick = false
// if (!isClick) window.addEventListener("click", () => {
//     document.documentElement.requestFullscreen()
//     isClick = true
// })

new Main()

document.body.style.margin = 0 + "px"
document.body.style.padding = 0 + "px"
document.body.style.overflow = "hidden"
document.body.style.backgroundColor = "#333333"
