class CommonDropdownItem extends HTMLElement {
    private template: string = `
        <li class="common-dropdown-item">
            <slot></slot>
        </li>
    `;

    get style() {
        return (this.shadowRoot!.host as HTMLElement).style;
    }

    set style(value) {
        Object.assign((this.shadowRoot!.host as HTMLElement), value);
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        requestAnimationFrame(() => {
            this.shadowRoot!.innerHTML = this.template;
        })
    }
}

export default CommonDropdownItem
