import { State } from "../scripts/State"
import type { ColorPallet } from "./ColorPallet"
import "../Styles.css"

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
    hsl: string
    constructor(state: State) {
        this.state = state
        this.hsl = ""
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
        this.button(null)
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
                this.lilCol.style.backgroundColor = this.state.brushCol
            }
        })
    }

    slider() {
        this.sliderP.classList.add("colorPicker-sliderP")
        this.parent.appendChild(this.sliderP)
        let h = "180", s = "50", l = "50"

        for (let i = 0; i < 3; i++) {
            const hslSlider = document.createElement("input")
            hslSlider.type = "range"
            hslSlider.min = "0"
            hslSlider.max = "100"
            hslSlider.value = "50"
            hslSlider.classList.add("colorPicker-hslSliders")
            if (i === 0) {
                hslSlider.max = "360"
                hslSlider.value = h
                hslSlider.addEventListener("input", () => {
                    h = hslSlider.value
                })
            }
            else if (i === 1) {
                hslSlider.addEventListener("input", () => {
                    s = hslSlider.value
                })
            } else {
                hslSlider.addEventListener("input", () => {
                    l = hslSlider.value
                })
            }
            hslSlider.addEventListener("input", () => {
                this.lilCol.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`
                this.inp.value = `hsl(${h}, ${s}%, ${l}%)`
                this.hsl = `hsl(${h}, ${s}%, ${l}%)`
            })
            this.sliderP.appendChild(hslSlider)
        }
    }

    button(onClick: (hsl: string) => void | null) {
        this.btn.classList.add("colorPicker-btn")
        this.parent.appendChild(this.btn)

        if (!onClick) return
        this.btn.addEventListener("click", () => {
            this.parent.style.display = "none"
            this.state.setBrushCol(this.hsl)
            onClick(this.hsl)
        })
    }
}

type typeCond = "block" | "none" 
