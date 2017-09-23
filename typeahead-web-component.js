const selectColor = '#BDBDBD'
class TypeaheadComponent extends HTMLElement  {
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.setParentComponent(shadow)
        this.initTextBox()
        this.createListContainer()
        this.items = JSON.parse(this.getAttribute('items'))
        this.onSelected = eval(this.getAttribute('onselected'))
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
    selectValue(item) {
        this.text.value = item
        this.renderList([])
        if(this.onSelected) {
            this.onSelected(item)
        }
    }
    focusOnList(index) {
        const lis = this.ul.children
        for(var i=0;i<lis.length;i++) {
              const li = lis[i]
              if(i == index) {
                  li.style.backgroundColor = selectColor
              }
              else  {
                  li.style.backgroundColor = this.ul.style.backgroundColor
              }

        }
    }
    renderList(items) {
        this.ul.innerHTML = ""
        items.forEach((item,index)=>{
            const li = document.createElement('li')
            li.innerHTML = `<span style="margin-left:5%;">${item}</span>`
            li.onclick = (event) => {
                this.selectValue(item)
            }
            this.createLiStyle(li)
            li.onmouseenter = () => {
                this.focusOnList(index)
            }
            this.ul.appendChild(li)
        })
    }
    onBlurText() {
        this.renderList([])
    }
    connectedCallback() {
        this.text.onkeyup = (event) => {
            if([38,40,13,9].indexOf(event.keyCode) != -1) {
                event.preventDefault()
                return
            }
            if(this.text.value.trim() == '') {
                this.renderList([])
            }
            else {
                const matchedItems = this.items.filter((item)=>item.toLowerCase().indexOf(this.text.value.toLowerCase()) != -1)
                this.renderList(matchedItems)
            }
        }
        const keyHandler = new KeyHandler(this.text,this.ul)
        keyHandler.handleKey(this.focusOnList.bind(this),this.selectValue.bind(this),this.onBlurText.bind(this))
        window.onmousedown = (event) => {
            if(event.target != this) {
                this.renderList([])
            }
            else {
                console.log("clicking on typeahead component")
            }
        }
    }
}
class KeyHandler {
    constructor(keyElement,parentElement) {
        this.parentElement = parentElement
        this.keyElement = keyElement
        this.resetIndex()
    }
    resetIndex() {
        this.index = -1
    }
    handleKey(hovercb,selectcb,blurcb) {
        this.keyElement.onkeydown = (event) => {
            const n = this.parentElement.children.length
            if(event.keyCode == 40) {
                this.index++
                if(this.index == n) {
                    this.index = 0
                }
                hovercb(this.index)
            }
            if(event.keyCode == 38) {
                this.index--
                if(this.index<0) {
                    this.index = n-1
                }
                hovercb(this.index)
            }
            if(event.keyCode == 13) {
                if(this.parentElement && this.parentElement.children && this.parentElement.children.length > 0 && this.parentElement.children[this.index].children && this.parentElement.children[this.index].children.length > 0) {
                    selectcb(this.parentElement.children[this.index].children[0].innerHTML)
                    this.resetIndex()
                }
            }
            if(event.keyCode == 9) {
                blurcb()
                this.resetIndex()
            }
        }
    }
}
customElements.define('typeahead-comp',TypeaheadComponent)
