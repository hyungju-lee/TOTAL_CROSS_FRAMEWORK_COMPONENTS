class CommonDropdownList extends HTMLElement {
    private template = `
    <ul class="common-dropdown-list">
        <slot></slot>
    </ul>
    `;

    static observedAttributes = [
        'style',
    ];

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.setAttribute('slot', 'dropdownList');
        requestAnimationFrame(() => {
            this.shadowRoot!.innerHTML = this.template;
        })
    }

    attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        switch (name) {
            case 'style':
                this.applyStyles(newValue);
                break
            default:
                break;
        }
    }

    applyStyles(styles: string) {
        const button = this.shadowRoot!.querySelector<HTMLElement>('.common-dropdown-list');
        if (button) {
            button.style.cssText = styles;
        }
    }
}

export default CommonDropdownList
