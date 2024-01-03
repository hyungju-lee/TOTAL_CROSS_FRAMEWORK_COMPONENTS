const template = `
<button type="button">
  <slot></slot>
</button>
`;

class CommonDropdownButton extends HTMLElement {
  static observedAttributes = [
    'disabled',
  ];

  resolve: (value: unknown) => void = () => {};

  constructor() {
    super();
    this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.setAttribute('slot', 'dropdownButton');
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = template;

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
      default:
        break;
    }
  }
}
