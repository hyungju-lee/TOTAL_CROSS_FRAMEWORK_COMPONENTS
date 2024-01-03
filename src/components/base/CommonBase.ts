class CommonBase extends HTMLElement {
  private template: string = `
  <div class="common-base">
    <slot></slot>
  </div>
`;

  static observedAttributes = [
    'style',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    requestAnimationFrame(() => {
      this.render();
    })
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'style':
        this.applyStyles(newValue);
        break
      default:
        break
    }
  }

  render() {
    this.shadowRoot!.innerHTML = this.template;
  }

  applyStyles(styles: string) {
    const button = this.shadowRoot!.querySelector<HTMLElement>('.common-base');
    if (button) {
      button.style.cssText = styles;
    }
  }
}

export default CommonBase;
