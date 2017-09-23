class TypeaheadComponent extends HTMLElement  {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.setParentComponent(shadow)
        this.initTextBox()
        this.createListContainer()
    }
    styleTextBorders() {
        this.text.style.borderBottomWidth = "0.2rem"
        this.text.style.borderBottomColor = "black"
        this.text.style.borderLeftWidth = 0
        this.text.style.borderRightWidth = 0
        this.text.style.borderTopWidth = 0
        this.text.style.outline = 'none'
    }
    setParentComponent(shadow) {
        this.div = document.createElement('div')
        this.div.style.width = "50%"
        this.div.style.marginLeft = "25%"
        this.div.style.marginRight = "25%"
        this.div.style.marginTop = "10%"
        shadow.appendChild(this.div)
    }
    initTextBox() {
        this.text = document.createElement('input')
        this.text.style.width = "100%"
        this.text.style.fontSize = (window.innerHeight)*0.08
        this.styleTextBorders()
        this.div.appendChild(this.text)
    }
    createListContainer() {
        this.ul = document.createElement('ul')
        this.ul.style.width = "94%"
        this.ul.style.background = '#ecf0f1'
        this.ul.style.marginTop = 0
        this.div.appendChild(this.ul)
    }
    connectedCallback() {

    }
}
customElements.define('typeahead-comp',TypeaheadComponent)
