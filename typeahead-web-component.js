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
        this.ul.style.width = "100%"
        this.ul.style.background = '#ecf0f1'
        this.ul.style.marginTop = 0
        this.ul.style.padding = 0
        this.ul.style.boxShadow =  '0 2px 4px rgba(0, 0, 0, 0.2)'
        this.ul.style.boxSizing = this.ul.style.boxSizing || this.ul.style.mozBoxSizing || this.ul.style.webkitBoxSizing
        this.ul.style.boxSizing = 'border-box'
        this.div.appendChild(this.ul)
    }
    createLiStyle(li) {
        li.style.margin = 0
        li.style.marginBottom = '2%'
        li.style.width = '100%'
        li.style.background = this.ul.style.background
        li.style.fontSize = window.innerHeight/15
        li.style.listStyleType = 'none'
        li.style.cursor = 'pointer'
    }
    renderList(items) {
        this.ul.innerHTML = ""
        items.forEach((item)=>{
            const li = document.createElement('li')
            li.innerHTML = `<span style="margin-left:5%;">${item}</span>`
            li.onclick = (event) => {
                this.text.value = item
                this.renderList([])
            }
            this.createLiStyle(li)
            li.onmouseenter = () => {
                li.style.background = '#BDBDBD'
            }
            li.onmouseout = () => {
                li.style.background = this.ul.style.background
            }
            this.ul.appendChild(li)
        })
    }
    connectedCallback() {
        this.renderList(['hello','hello','hello','hello','hello'])
    }
}
customElements.define('typeahead-comp',TypeaheadComponent)
