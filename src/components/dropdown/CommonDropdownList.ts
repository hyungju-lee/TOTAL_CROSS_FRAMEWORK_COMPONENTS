class CommonDropdownList extends HTMLElement {
    private template = `
    <ul>
        <slot></slot>
    </ul>
    `;

    get style() {
        return (this.shadowRoot!.host as HTMLElement).style;
    }

    set style(value) {
        Object.assign((this.shadowRoot!.host as HTMLElement), value);
    }

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
}

export default CommonDropdownList
