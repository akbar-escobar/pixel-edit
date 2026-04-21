export class Parent {
    el: HTMLElement
    constructor() {
        this.el = document.createElement("div")
        this.el.style.position = "absolute"
        this.el.style.top = 0 + "px "
        this.el.style.left = 0 + "px "
        this.el.style.width = window.innerWidth + "px"
        this.el.style.height = window.innerHeight + "px"
        this.el.style.backgroundColor = "orange"
        document.body.appendChild(this.el)
    }
}
