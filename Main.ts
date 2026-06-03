import { Canvas } from "./components/Canvas"
import { ColorPallet } from "./components/ColorPallet"
import { State } from "./scripts/State"
import { ColorPicker } from "./components/ColorPicker"
import { ToolsBar } from "./components/ToolsBar"
import { PalletManager } from "./components/PalletManager"

export class Main {
    state: State
    canvas: Canvas
    toolsBar: ToolsBar
    colorPallet: ColorPallet
    colorPicker: ColorPicker
    palletManager: PalletManager
    constructor() {
        this.state = new State()
        this.canvas = new Canvas(this.state)
        this.toolsBar = new ToolsBar(this.state, this.canvas)
        this.colorPallet = new ColorPallet(this.state, this.toolsBar)
        // this.colorPicker = new ColorPicker(this.state, this.colorPallet)
        // this.palletManager = new PalletManager(this.state)
    }
}

// let isClick = false
// if (!isClick) window.addEventListener("click", () => {
//     document.documentElement.requestFullscreen()
//     isClick = true
// })

new Main()


