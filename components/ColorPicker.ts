import { State } from "../scripts/State"

export class ColorPicker {
    state: State
    parent: HTMLElement | null
    constructor(state: State) {
        this.state = state
        this.parent = document.createElement("div")
        this.parent.style.backgroundColor = "purple"
        this.parent.style.height = state.colorPickerWH.h + "px"
        this.parent.style.width = state.colorPickerWH.w + "px"
        this.parent.style.position = "absolute"
        this.parent.style.left = (state.horiBarW) + "px"
        this.parent.style.bottom = (state.vertiBarH) + "px"

        document.body.appendChild(this.parent)

        this.headerBar("yellow")
        this.colorWheel()
        this.colorInput()
        // this.headerBar("blue")
    }

    headerBar(col: string) {
        const head = document.createElement("div")
        head.style.width = this.state.colorPickerWH.w + "px"
        head.style.height = this.state.colorPickerWH.h * 0.12 + "px"
        head.style.backgroundColor = col

        this.parent?.appendChild(head)
    }

    colorWheel() {
        const wheel = document.createElement("canvas")
        wheel.style.backgroundColor = "white"
        // wheel.style.borderRadius = "50%"
        wheel.style.margin = 20 + "px"
        wheel.style.width = this.state.colorPickerWH.w * 0.65 + "px "
        wheel.style.height = this.state.colorPickerWH.h * 0.65 + "px "

        const ctx = wheel.getContext("2d")
        if (!ctx) return
        const size = { w: ctx.canvas.width, h: ctx.canvas.height }
        const lilRect = 3

        //  primary color: RYB
        //  secondary color: OGP

        // R + Y 
        // +   +
        // M   G
        // +   +
        // B + C

        // R + Y + G + C + B + M
        const pallet = [
            "(255, 0, 0)", "(255, 255, 0)", "(0, 255, 0)", "(0, 255, 255)", "(0, 0, 255)", "(255, 0, 255)"
        ]

        for (let i = 0; i < lilRect; i++) {
            for (let j = 0; j < lilRect; j++) {
                ctx.fillStyle = `rgb${pallet[i + j]}`
                ctx.fillRect((size.w / lilRect) * i, (size.h / lilRect) * j, size.w / lilRect, size.h / lilRect)
            }
        }

        this.parent?.appendChild(wheel)
    }

    colorInput() {
        const inpGet = { w: 200, h: 25, mL: 20 }
        const inp = document.createElement("input")
        inp.style.marginLeft = inpGet.mL + "px"
        inp.style.height = inpGet.h + "px"
        inp.style.width = inpGet.w + "px"
        inp.style.boxSizing = "border-box"

        inp.addEventListener("input", () => {
            this.state.setBrushCol(inp.value)
        })

        const lilCol = document.createElement("div")
        lilCol.style.height = inpGet.h + "px"
        lilCol.style.width = 30 + "px"
        lilCol.style.position = "relative"
        lilCol.style.marginLeft = inpGet.mL + "px"
        lilCol.style.top = -inpGet.h + "px"
        lilCol.style.left = (inpGet.w + inpGet.mL) + "px"
        lilCol.style.backgroundColor = this.state.brushCol

        this.parent?.appendChild(inp)
        this.parent?.appendChild(lilCol)
    }
}
