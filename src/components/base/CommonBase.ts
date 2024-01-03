class CommonBase extends HTMLElement {
  private template: string = `
  <div class="common-base">
    <slot></slot>
  </div>
`;

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
    this.shadowRoot!.innerHTML = this.template;
  }
}

export default CommonBase;
