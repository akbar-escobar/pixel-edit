import { State } from "../scripts/State"
import type { ColorPallet } from "./ColorPallet"

export class ColorPicker {
    state: State
    parent: HTMLElement
    wheel: HTMLCanvasElement
    inp: HTMLInputElement
    lilCol: HTMLElement
    s: HTMLElement
    cond: typeCond
    colorPallet: ColorPallet
    btn: HTMLElement
    colorWheelP: HTMLElement
    colorInputP: HTMLElement
    buttonP: HTMLElement
    RSlider: HTMLElement
    GSlider: HTMLElement
    BSlider: HTMLElement
    colSlider: HTMLElement
    alphaSlider: HTMLElement
    sliderP: HTMLElement
    constructor(state: State, colorPallet: ColorPallet) {
        this.parent = document.createElement("div")
        this.wheel = document.createElement("canvas")
        this.colSlider = document.createElement("div")
        this.alphaSlider = document.createElement("div")
        this.inp = document.createElement("input")
        this.RSlider = document.createElement("div")
        this.GSlider = document.createElement("div")
        this.BSlider = document.createElement("div")
        this.lilCol = document.createElement("div")
        this.sliderP = document.createElement("div")
        this.s = document.createElement("div")
        this.btn = document.createElement("div")
        this.colorWheelP = document.createElement("div")
        this.colorInputP = document.createElement("div")
        this.buttonP = document.createElement("div")

        this.cond = "none"
        this.state = state
        this.colorPallet = colorPallet
    }

    add(cond: typeCond) {
        this.cond = cond
        this.parentStyle()
        this.colorWheel()
        this.colorInput()
        this.slider()
        this.button()
    }

    parentStyle() {
        this.parent.style.display = this.cond
        this.parent.style.backgroundColor = "purple"
        this.parent.style.height = this.state.colorPickerWH.h + "px"
        this.parent.style.width = this.state.colorPickerWH.w + "px"
        this.parent.style.position = "absolute"
        // this.parent.style.left = (this.state.horiBarW) + "px"
        // this.parent.style.bottom = (this.state.vertiBarH) + "px"
        document.body.appendChild(this.parent)
    }

    colorWheel() {
        this.colorWheelP.style.width = "100%"
        this.colorWheelP.style.height = "50%"
        this.colorWheelP.style.display = "flex"
        this.colorWheelP.style.alignItems = "center"
        this.parent.appendChild(this.colorWheelP)

        this.wheel.style.backgroundColor = "white"
        this.wheel.style.borderRadius = "50%"
        this.wheel.style.width = "75%"
        this.colorWheelP.appendChild(this.wheel)

        this.colSlider.style.backgroundColor = "green"
        this.colSlider.style.height = "90%"
        this.colSlider.style.width = "10%"
        this.colorWheelP.appendChild(this.colSlider)

        this.alphaSlider.style.backgroundColor = "white"
        this.alphaSlider.style.height = "90%"
        this.alphaSlider.style.width = "10%"
        this.colorWheelP.appendChild(this.alphaSlider)

        const ctx = this.wheel.getContext("2d")
        if (!ctx) return
        const size = { w: ctx.canvas.width, h: ctx.canvas.height }

        for (let i = 0; i <= 360; i++) {
            for (let j = 0; j <= 100; j++) {
                ctx.fillStyle = `hsl(${i}, 100%, ${j}%)`
                ctx.fillRect(i, j, size.w / 360, size.h / 100)
            }
        }
    }

    colorInput() {
        this.colorInputP.style.width = "100%"
        this.colorInputP.style.height = "10%"
        this.colorInputP.style.display = "flex"
        this.colorInputP.style.alignItems = "center"
        this.colorInputP.style.justifyContent = "center"
        this.parent.appendChild(this.colorInputP)

        this.inp.style.display = this.cond
        this.inp.style.width = "30%"
        this.inp.style.height = "80%"
        this.inp.style.boxSizing = "border-box"
        this.inp.style.fontSize = "24px"
        this.colorInputP.appendChild(this.inp)

        this.lilCol.style.display = this.cond
        this.lilCol.style.width = "10%"
        this.lilCol.style.height = "80%"
        this.lilCol.style.position = "relative"
        this.lilCol.style.backgroundColor = this.state.brushCol
        this.colorInputP.appendChild(this.lilCol)

        this.inp.addEventListener("input", () => {
            const s = this.s.style
            s.color = this.inp.value
            if (s.color !== '') {
                this.state.setBrushCol(this.inp.value)
                this.lilCol.style.backgroundColor = this.state.brushCol
            }
        })
    }

    slider() {
        this.sliderP.style.width = "100%"
        this.sliderP.style.height = "30%"
        this.sliderP.style.justifyItems = "center"
        this.sliderP.style.alignContent = "center"
        this.parent.appendChild(this.sliderP)

        this.RSlider.style.backgroundColor = "red"
        this.RSlider.style.height = "15%"
        this.RSlider.style.width = "90%"
        this.sliderP.appendChild(this.RSlider)

        this.GSlider.style.backgroundColor = "green"
        this.GSlider.style.height = "15%"
        this.GSlider.style.width = "90%"
        this.sliderP.appendChild(this.GSlider)

        this.BSlider.style.backgroundColor = "blue"
        this.BSlider.style.height = "15%"
        this.BSlider.style.width = "90%"
        this.sliderP.appendChild(this.BSlider)
    }

    button() {
        this.buttonP.style.width = "100%"
        this.buttonP.style.height = "10%"
        this.buttonP.style.justifyItems = "center"
        this.buttonP.style.alignContent = "center"
        this.parent.appendChild(this.buttonP)

        this.btn.style.width = "30%"
        this.btn.style.height = "80%"
        this.btn.style.backgroundColor = "red"
        this.btn.textContent = "biiji"
        this.buttonP.appendChild(this.btn)

        this.btn.addEventListener("click", () => {
            this.colorPallet.setCol(this.inp.value)
        })
    }
}

type typeCond = "block" | "none" 
