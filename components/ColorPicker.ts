import { State } from "../scripts/State"

export class ColorPicker {
    state: State
    parent: HTMLElement
    head: HTMLElement
    wheel: HTMLCanvasElement
    inp: HTMLInputElement
    lilCol: HTMLElement
    s: HTMLElement
    constructor(state: State) {
        this.state = state
        this.parent = document.createElement("div")
        this.head = document.createElement("div")
        this.wheel = document.createElement("canvas")
        this.inp = document.createElement("input")
        this.lilCol = document.createElement("div")
        this.s = document.createElement("div")
    }

    add(cond: "block" | "none") {
        this.parent.style.backgroundColor = "purple"
        this.parent.style.height = this.state.colorPickerWH.h + "px"
        this.parent.style.width = this.state.colorPickerWH.w + "px"
        this.parent.style.position = "absolute"
        this.parent.style.left = (this.state.horiBarW) + "px"
        this.parent.style.bottom = (this.state.vertiBarH) + "px"
        this.parent.style.display = cond // HIDDEN
        document.body.appendChild(this.parent)

        this.headerBar("yellow")
        this.colorWheel()
        this.colorInput()
        // this.headerBar("blue")
    }

    headerBar(col: string) {
        this.head.style.width = this.state.colorPickerWH.w + "px"
        this.head.style.height = this.state.colorPickerWH.h * 0.12 + "px"
        this.head.style.backgroundColor = col

        this.parent.appendChild(this.head)
    }

    colorWheel() {
        this.wheel.style.backgroundColor = "white"
        // this.wheel.style.borderRadius = "50%"
        this.wheel.style.margin = 20 + "px"
        this.wheel.style.width = this.state.colorPickerWH.w * 0.65 + "px "
        this.wheel.style.height = this.state.colorPickerWH.h * 0.65 + "px "

        const ctx = this.wheel.getContext("2d")
        if (!ctx) return
        const size = { w: ctx.canvas.width, h: ctx.canvas.height }

        for (let i = 0; i <= 360; i++) {
            for (let j = 0; j <= 100; j++) {
                ctx.fillStyle = `hsl(${i}, 100%, ${j}%)`
                ctx.fillRect(i, j, size.w / 360, size.h / 100)
            }
        }

        this.parent.appendChild(this.wheel)
    }

    colorInput() {
        const inpGet = { w: 200, h: 40, mL: 20 }
        this.inp.style.marginLeft = inpGet.mL + "px"
        this.inp.style.height = inpGet.h + "px"
        this.inp.style.width = inpGet.w + "px"
        this.inp.style.boxSizing = "border-box"
        this.inp.style.fontSize = "24px"

        this.lilCol.style.height = inpGet.h + "px"
        this.lilCol.style.width = inpGet.h + "px"
        this.lilCol.style.position = "relative"
        this.lilCol.style.marginLeft = inpGet.mL + "px"
        this.lilCol.style.top = -inpGet.h + "px"
        this.lilCol.style.left = (inpGet.w + inpGet.mL) + "px"
        this.lilCol.style.backgroundColor = this.state.brushCol

        this.inp.addEventListener("input", () => {
            const s = this.s.style
            s.color = `rgb${this.inp.value}`
            if (s.color !== '') {
                this.state.setBrushCol(this.inp.value)
                this.lilCol.style.backgroundColor = this.state.brushCol
            }
        })

        this.parent.appendChild(this.inp)
        this.parent.appendChild(this.lilCol)
    }
}
