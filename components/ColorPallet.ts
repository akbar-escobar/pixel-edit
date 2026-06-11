import type { State } from "../scripts/State";
// import { PalletManager } from "./PalletManager";
import "../Styles.css"
import { ToolsBar } from "./ToolsBar";
import { ColorPicker } from "./ColorPicker";

export class ColorPallet {
    parent: HTMLDivElement
    state: State
    toolsBar: ToolsBar
    colorPicker: ColorPicker
    constructor(state: State, toolsBar: ToolsBar, colorPicker: ColorPicker) {
        this.state = state
        this.colorPicker = colorPicker
        this.toolsBar = toolsBar
        this.parent = document.createElement("div")
    }

    create() {
        this.parent.classList.add("colorPallet-parent")
        this.parent.style.width = this.state.barWH.w + "px"
        this.parent.style.backgroundColor = this.state.background

        if (this.state.barPos.colorPallet === "left") this.parent.style.left = 0 + "px"
        else this.parent.style.right = 0 + "px"

        document.body.appendChild(this.parent)

        this.icons()
    }

    icons() {
        let iconLen = 30
        let pressDuration = 700
        let isPress = false
        for (let i = 0; i < iconLen; i++) {
            const icon = document.createElement("div")
            icon.classList.add("colorPallet-icon")
            this.parent.appendChild(icon)
            if (i < this.state.colorPallet.length) {
                icon.style.backgroundColor = this.state.colorPallet[i]
            } else {
                icon.textContent = "+"
            }
            icon.addEventListener("click", () => {
                if (i < this.state.colorPallet.length) {
                    this.state.setBrushCol(this.state.colorPallet[i])
                    this.state.setToolCond("brush")
                    this.toolsBar.brushOrEraserIcon!.style.backgroundColor = this.state.colorPallet[i]
                } else {
                    this.colorPicker.add("block")
                    this.colorPicker.eventBtn((hsl) => {
                        icon.style.backgroundColor = hsl
                        this.state.colorPallet[i] = hsl
                        icon.textContent = ""
                    })
                }
            })

            icon.addEventListener("touchstart", () => {
                isPress = true
                setTimeout(() => {
                    if (isPress) {
                        if (i < this.state.colorPallet.length) {
                            this.colorPicker.add("block")
                            this.colorPicker.eventBtn((hsl) => {
                                icon.style.backgroundColor = hsl
                                this.state.colorPallet[i] = hsl
                            })
                        }
                    }
                }, pressDuration);
            })
            icon.addEventListener("touchend", () => {
                isPress = false
            })
        }
    }
}

