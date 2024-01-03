class CommonDropdownItemButton extends HTMLElement {
    private template: string = `
    <button type="button" class="common-dropdown-item-button">
        <slot></slot>
    </button>
    `;

    data: {label: string; value: unknown} | null = null;
    dropdownItemButton: HTMLElement | null = null;
    resolve: (value: unknown) => void = () => {};

    static observedAttributes = [
        'disabled',
        'style',
    ];

    set itemData(data: {label: string; value: unknown}) {
        this.data = data;
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        requestAnimationFrame(() => {
            this.shadowRoot!.innerHTML = this.template;

            this.dropdownItemButton = this.shadowRoot!.querySelector('button');
            this.dropdownItemButton?.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('click:common-dropdown-item-button', {
                    bubbles: true, // 이벤트 버블링 허용
                    detail: {
                        data: this.data,
                    }
                }))
            })

            if (typeof this.resolve === 'function') {
                this.resolve(true);
            }
        })
    }

    async attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
        await new Promise((resolve, _reject) => {
            this.resolve = resolve;
        })

        switch (name) {
            case 'disabled':
                if (newValue === 'true') {
                    this.shadowRoot!.querySelector('button')?.setAttribute('disabled', 'true');
                } else {
                    this.shadowRoot!.querySelector('button')?.setAttribute('disabled', 'false');
                }
                break;
            case 'style':
                this.applyStyles(newValue);
                break
            default:
                break;
        }
    }

    applyStyles(styles: string) {
        const button = this.shadowRoot!.querySelector<HTMLElement>('.common-dropdown-item-button');
        if (button) {
            button.style.cssText = styles;
        }
    }
}

export default CommonDropdownItemButton
