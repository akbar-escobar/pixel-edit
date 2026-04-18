import type { State } from "../scripts/State"
import { Redo } from "../scripts/tools/Redo"
import { Undo } from "../scripts/tools/Undo"
import type { Canvas } from "./Canvas"
import { ColorPicker } from "./ColorPicker"

export class HoriBar {
    parent: HTMLElement | null
    state: State
    icon: HTMLElement | null
    ctx: CanvasRenderingContext2D | null
    constructor(state: State, canvas: Canvas) {
        this.parent = null
        this.icon = null
        this.state = state
        this.ctx = canvas.ctx

        this.barParent()
        this.icons()
    }

    barParent() {
        this.parent = document.createElement("div")
        this.parent.style.display = "flex"
        this.parent.style.flexDirection = "row"
        this.parent.style.backgroundColor = "blue"
        this.parent.style.height = this.state.vertiBarH + "px"
        this.parent.style.width = (window.innerWidth - this.state.horiBarW) + "px"
        this.parent.style.position = "absolute"

        if (this.state.vertiBarPos === "left") this.parent.style.left = this.state.horiBarW + "px"
        else this.parent.style.left = 0 + "px"

        if (this.state.horiBarPos === "bottom") this.parent.style.bottom = 0 + "px"
        else this.parent.style.top = 0 + "px"

        document.body.appendChild(this.parent)

    }

    icons() {
        const bckg = ["green", "yellow", "red"] // ex color
        const tools = ["undo", "redo", "colorPicker"]
        if (!this.ctx) return
        const ctx = this.ctx
        for (let i = 0; i < tools.length; i++) {
            this.iconStyle(bckg[i])
            if (tools[i] === "colorPicker") {
                const pos = this.icon?.getBoundingClientRect()
                if (pos) new ColorPicker(this.state)
            }
            this.icon?.addEventListener("click", () => {
                if (tools[i] === "undo") new Undo(this.state, ctx)
                if (tools[i] === "redo") new Redo(this.state, ctx)
            })


        }
    }

    iconStyle(bckg: string) {
        this.icon = document.createElement("div")
        this.icon.style.backgroundColor = bckg
        this.icon.style.height = this.state.horiBarW + "px"
        this.icon.style.width = this.state.horiBarW + "px"

        this.parent?.appendChild(this.icon)

    }


}
