export class Body {
    zMin1: HTMLElement
    zPos1: HTMLElement
    constructor() {
        this.zMin1 = document.createElement("div")
        this.zMin1.style.zIndex = "-1"
        this.zMin1.style.backgroundColor = "orange"
        this.style(this.zMin1)

        this.zPos1 = document.createElement("div")
        this.zPos1.style.zIndex = "1"
        this.zPos1.style.backgroundColor = "rgba(1, 11, 111, 0.5)"
        this.zPos1.style.visibility = "hidden"
        this.zPos1.style.display = "flex"
        this.zPos1.style.justifyContent = "center"
        this.zPos1.style.alignItems = "center"
        this.style(this.zPos1)
    }

    style(el: HTMLElement) {
        el.style.position = "absolute"
        el.style.top = 0 + "px"
        el.style.left = 0 + "px "
        el.style.width = window.innerWidth + "px"
        el.style.height = window.innerHeight + "px"
        document.body.appendChild(el)
    }
}
