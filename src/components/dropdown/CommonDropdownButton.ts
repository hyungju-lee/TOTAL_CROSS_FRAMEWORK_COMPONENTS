const template = `
<button type="button">
  <slot></slot>
</button>
`;

class CommonDropdownButton extends HTMLElement {
  static observedAttributes = [
    'disabled',
  ];

  resolve: () => void = () => {};

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
      this.resolve();
    }
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    await new Promise((resolve, reject) => {
      this.resolve = resolve;
    })

    switch (name) {
      case 'disabled':
        if (newValue === 'true') {
          this.shadowRoot!.querySelector('button').setAttribute('disabled', 'true')
        } else {
          this.shadowRoot!.querySelector('button').setAttribute('disabled', 'false')
        }
        break;
      default:
        break;
    }
  }
}
