class CommonDropdownButton extends HTMLElement {
  private template: string = `
  <button type="button" class="common-dropdown-button">
    <slot></slot>
  </button>
  `;

  static observedAttributes = [
    'disabled',
    'style',
  ];

  resolve: (value: unknown) => void = () => {};

  constructor() {
    super();
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.setAttribute('slot', 'dropdownButton');
    requestAnimationFrame(() => {
      this.render();
    })
  }

  render() {
    this.shadowRoot!.innerHTML = this.template;

    if (typeof this.resolve === 'function') {
      this.resolve(true);
    }
  }

  async attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    await new Promise((resolve) => {
      this.resolve = resolve;
    })

    switch (name) {
      case 'disabled':
        if (newValue === 'true') {
          this.shadowRoot!.querySelector<HTMLElement>('button')!.setAttribute('disabled', 'true')
        } else {
          this.shadowRoot!.querySelector<HTMLElement>('button')!.setAttribute('disabled', 'false')
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
    const button = this.shadowRoot!.querySelector<HTMLElement>('.common-dropdown-button');
    if (button) {
      button.style.cssText = styles;
    }
  }
}

export default CommonDropdownButton;
