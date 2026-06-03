import type { State } from "../scripts/State";
import { PalletManager } from "./PalletManager";
import "../Styles.css"
import { ToolsBar } from "./ToolsBar";

export class ColorPallet {
    parent: HTMLDivElement
    state: State
    col: string
    isAddCol: boolean
    toolsBar: ToolsBar
    constructor(state: State, toolsBar: ToolsBar) {
        this.state = state
        this.parent = document.createElement("div")
        this.col = this.state.brushCol
        this.isAddCol = false
        this.toolsBar = toolsBar

        this.style()
        this.icons()
    }

    style() {
        this.parent.classList.add("colorPallet-parent")
        this.parent.style.width = this.state.barSize + "px"
        this.parent.style.backgroundColor = this.state.background

        if (this.state.barPos.colorPallet === "left") this.parent.style.left = 0 + "px"
        else this.parent.style.right = 0 + "px"

        document.body.appendChild(this.parent)
    }

    setCol(col: string) {
        this.col = col
        this.isAddCol = true
    }

    icons() {
        const palletLen = 50
        for (let i = 0; i < palletLen; i++) {
            const icon = document.createElement("div")
            icon.classList.add("colorPallet-icon")
            this.parent.appendChild(icon)
            if (i < this.state.colorPallet.length) {
                icon.style.backgroundColor = this.state.colorPallet[i]
                icon.addEventListener("click", () => {
                    this.state.setBrushCol(this.state.colorPallet[i])
                    this.state.setToolCond("brush")
                    this.toolsBar.brushOrEraserIcon!.style.backgroundColor = "black"
                })
            } else {
                icon.textContent = "+"
                icon.addEventListener("click", () => {
                    // TODO: choose a new color
                    // use ColorPicker and ColorManager 
                })
            }
        }
    }
}

