import type { State } from "../scripts/State"
import { Redo } from "../scripts/tools/Redo"
import { Undo } from "../scripts/tools/Undo"
import type { Canvas } from "./Canvas"
import { ColorPicker } from "./ColorPicker"

export class ToolsBar {
    parent: HTMLElement | null
    state: State
    icon: HTMLElement | null
    ctx: CanvasRenderingContext2D | null
    colorPicker: ColorPicker
    constructor(state: State, canvas: Canvas, colorPicker: ColorPicker) {
        this.parent = null
        this.icon = null
        this.state = state
        this.ctx = canvas.ctx
        this.colorPicker = colorPicker

        this.parentStyle()
        this.icons()
    }

    parentStyle() {
        this.parent = document.createElement("div")
        this.parent.style.display = "flex"
        this.parent.style.alignItems = "center"
        this.parent.style.backgroundColor = "blue"
        this.parent.style.height = this.state.barSize + "px"
        this.parent.style.width = (window.innerWidth - this.state.barSize) + "px"
        this.parent.style.position = "absolute"

        if (this.state.barPos.colorPallet === "left") this.parent.style.left = this.state.barSize + "px"
        else this.parent.style.left = 0 + "px"

        if (this.state.barPos.toolsBar === "bottom") this.parent.style.bottom = 0 + "px"
        else this.parent.style.top = 0 + "px"

        document.body.appendChild(this.parent)
    }

    icons() {
        const bckg = ["black", "green", "yellow", "red"] // ex color
        const tools = ["brush/eraser", "undo", "redo", "colorPicker"]
        if (!this.ctx) return
        const ctx = this.ctx

        let isBrushOrEraser = false
        let isColorPicker = false
        for (let i = 0; i < tools.length; i++) {
            this.iconStyle(bckg[i])
            if (!this.icon) return
            const icon = this.icon

            this.icon?.addEventListener("click", () => {
                if (tools[i] === "brush/eraser") {
                    if (isBrushOrEraser) {
                        this.state.setToolCond("brush")
                        icon.style.backgroundColor = "black"
                    }
                    else {
                        this.state.setToolCond("eraser")
                        icon.style.backgroundColor = "white"
                    }
                    isBrushOrEraser = !isBrushOrEraser
                }
                if (tools[i] === "undo") new Undo(this.state, ctx)
                if (tools[i] === "redo") new Redo(this.state, ctx)
                if (tools[i] === "colorPicker") {
                    isColorPicker ?
                        this.colorPicker.add("none") :
                        this.colorPicker.add("block")
                    isColorPicker = !isColorPicker
                }
            })
        }
    }

    iconStyle(bckg: string) {
        this.icon = document.createElement("div")
        this.icon.style.backgroundColor = bckg
        this.icon.style.height = 100 + "%"
        // this.icon.style.width = this.state.horiBarW + "px"
        this.icon.style.width = "100%"

        this.parent?.appendChild(this.icon)

    }
}
