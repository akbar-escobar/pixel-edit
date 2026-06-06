import type { State } from "../scripts/State"
import { Redo } from "../scripts/tools/Redo"
import { Undo } from "../scripts/tools/Undo"
import { SaveImg } from "../scripts/tools/SaveImg"
import type { Canvas } from "./Canvas"
import "../Styles.css"

export class ToolsBar {
    parent: HTMLElement
    state: State
    ctx: CanvasRenderingContext2D | null
    brushOrEraserIcon: HTMLElement | null
    constructor(state: State, canvas: Canvas) {
        this.parent = document.createElement("div")
        this.state = state
        this.ctx = canvas.ctx
        this.brushOrEraserIcon = null
    }

   create() {
        this.parent.classList.add("toolsBar-parent")
        this.parent.style.height = this.state.barSize + "px"

        // if (this.state.barPos.colorPallet === "left") this.parent.style.left = this.state.barSize + "px"
        // else this.parent.style.left = 0 + "px"

        if (this.state.barPos.toolsBar === "bottom") this.parent.style.bottom = 0 + "px"
        else this.parent.style.top = 0 + "px"

        document.body.appendChild(this.parent)

        this.icons()
    }

    icons() {
        const bckg = [this.state.brushCol, "green", "yellow", "purple"] // ex color
        const tools = ["brush/eraser", "undo", "redo", "saveImg"]
        if (!this.ctx) return
        const ctx = this.ctx

        let isBrush = false
        for (let i = 0; i < tools.length; i++) {
            const icon = document.createElement("div")
            icon.classList.add("toolsBar-icon")
            icon.style.backgroundColor = bckg[i]
            if (tools[i] === "brush/eraser") this.brushOrEraserIcon = icon
            this.parent.appendChild(icon)

            icon.addEventListener("click", () => {
                if (tools[i] === "brush/eraser") {
                    if (isBrush) {
                        this.state.setToolCond("brush")
                        this.brushOrEraserIcon!.style.backgroundColor = this.state.brushCol
                    }
                    else {
                        this.state.setToolCond("eraser")
                        icon.style.backgroundColor = "white"
                    }
                    isBrush = !isBrush
                }
                if (tools[i] === "undo") new Undo(this.state, ctx)
                if (tools[i] === "redo") new Redo(this.state, ctx)
                if (tools[i] === "saveImg") new SaveImg(this.state)
            })
        }
    }
}
