class CommonDropdownItem extends HTMLElement {
    private template: string = `
        <li class="common-dropdown-item">
            <slot></slot>
        </li>
    `;

    static observedAttributes = [
        'style',
    ];

    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
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
        const button = this.shadowRoot!.querySelector<HTMLElement>('.common-dropdown-item');
        if (button) {
            button.style.cssText = styles;
        }
    }
}

export default CommonDropdownItem
