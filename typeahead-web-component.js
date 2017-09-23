class TypeaheadComponent extends HTMLElement  {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.initTextBox(shadow)
    }
    styleTextBorders() {
        this.text.style.borderBottomWidth = "0.2rem"
        this.text.style.borderBottomColor = "black"
        this.text.style.borderLeftWidth = 0
        this.text.style.borderRightWidth = 0
        this.text.style.borderTopWidth = 0
        this.text.style.outline = 'none'
    }
    initTextBox(shadow) {
        this.text = document.createElement('input')
        this.text.style.width = "70%"
        this.text.style.marginLeft = "15%"
        this.text.style.marginRight = "15%"
        this.text.style.marginTop = "5%"
        this.text.style.height = "15%"
        this.text.style.fontSize = (window.innerHeight)*0.08
        this.styleTextBorders()
        shadow.appendChild(this.text)
    }
    connectedCallback() {

    }
}
customElements.define('typeahead-comp',TypeaheadComponent)
