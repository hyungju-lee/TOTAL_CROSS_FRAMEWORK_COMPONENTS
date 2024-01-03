const template = `
  <div class="common-base">
    <slot></slot>
  </div>
`;

class CommonBase extends HTMLElement {
  get style() {
    return (this.shadowRoot!.host as HTMLElement).style;
  }

  set style(value) {
    Object.assign((this.shadowRoot!.host as HTMLElement), value);
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    requestAnimationFrame(() => {
      this.render();
    })
  }

  render() {
    this.shadowRoot!.innerHTML = template;
  }
}

export default CommonBase;
