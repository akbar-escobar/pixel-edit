import { State } from "../scripts/State"
// import type { ColorPallet } from "./ColorPallet"
import "../Styles.css"
import { ToolsBar } from "./ToolsBar"

export class ColorPicker {
    state: State
    parent: HTMLElement
    wheel: HTMLCanvasElement
    inp: HTMLInputElement
    lilCol: HTMLElement
    s: HTMLElement
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
    sliderHSL: { h: string, s: string, l: string }
    hsl: string
    toolsBar
    hslSliders: HTMLInputElement[]
    constructor(state: State, toolsBar: ToolsBar) {
        this.state = state
        this.toolsBar = toolsBar
        this.hsl = state.brushCol
        this.hslSliders = []
        this.sliderHSL = { h: "180", s: "50", l: "50" }
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
        this.colorWheel()
        this.colorInput()
        this.slider()
        this.button()
    }

    add(cond: typeCond) {
        this.parent.classList.add("colorPicker-parent")
        document.body.appendChild(this.parent)
        this.parent.style.display = cond // remove flex
        this.parent.style.display = "flex" // add flex
    }

    colorWheel() {
        this.colorWheelP.classList.add("colorPicker-colorWheelP")
        this.parent.appendChild(this.colorWheelP)

        this.wheel.classList.add("colorPicker-wheel")
        this.colorWheelP.appendChild(this.wheel)

        this.colSlider.classList.add("colorPicker-wheelSliders")
        this.colorWheelP.appendChild(this.colSlider)

        this.alphaSlider.classList.add("colorPicker-wheelSliders")
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
        this.colorInputP.classList.add("colorPicker-colorInputP")
        this.parent.appendChild(this.colorInputP)

        // this.inp.style.boxSizing = "border-box"
        this.inp.classList.add("colorPicker-inp")
        this.inp.placeholder = "hsl"
        this.colorInputP.appendChild(this.inp)

        this.lilCol.classList.add("colorPicker-lilCol")
        this.lilCol.style.backgroundColor = this.state.brushCol
        this.colorInputP.appendChild(this.lilCol)

        this.inp.addEventListener("input", () => {
            const s = this.s.style
            s.color = this.inp.value
            if (s.color !== '') {
                this.hsl = this.inp.value
                const hslMatch = this.inp.value.match(/\d+(?:\.\d+)?/g)
                this.lilCol.style.backgroundColor = this.inp.value
                this.hslSliders[0].value = hslMatch![0]
                this.hslSliders[1].value = hslMatch![1]
                this.hslSliders[2].value = hslMatch![2]
            }
        })
    }

    slider() {
        this.sliderP.classList.add("colorPicker-sliderP")
        this.parent.appendChild(this.sliderP)

        for (let i = 0; i < 3; i++) {
            const hslSlider = document.createElement("input")
            this.hslSliders.push(hslSlider)
            hslSlider.type = "range"
            hslSlider.min = "0"
            hslSlider.max = "100"
            hslSlider.value = "50"
            hslSlider.classList.add("colorPicker-hslSliders")
            if (i === 0) {
                hslSlider.max = "360"
                hslSlider.value = this.sliderHSL.h
                hslSlider.addEventListener("input", () => {
                    this.sliderHSL.h = hslSlider.value
                })
            }
            else if (i === 1) {
                hslSlider.addEventListener("input", () => {
                    this.sliderHSL.s = hslSlider.value
                })
            } else {
                hslSlider.addEventListener("input", () => {
                    this.sliderHSL.l = hslSlider.value
                })
            }
            hslSlider.addEventListener("input", () => {
                const hsl = `hsl(${this.sliderHSL.h}, ${this.sliderHSL.s}%, ${this.sliderHSL.l}%)`
                this.lilCol.style.backgroundColor = hsl
                this.inp.value = hsl
                this.hsl = hsl
            })
            this.sliderP.appendChild(hslSlider)
        }
    }

    button() {
        this.btn.classList.add("colorPicker-btn")
        this.parent.appendChild(this.btn)
    }

    eventBtn(onClick: (hsl: string) => void) {
        if (!onClick) return
        this.btn.onclick = () => {
            this.parent.style.display = "none"
            this.state.setBrushCol(this.hsl)
            this.toolsBar.brushOrEraserIcon!.style.backgroundColor = this.hsl
            onClick(this.hsl)
        }
    }
}

type typeCond = "block" | "none" 
