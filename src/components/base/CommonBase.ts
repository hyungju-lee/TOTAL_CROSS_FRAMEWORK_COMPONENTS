const template = `
  <span style="font-size: 30px">하이 오 연결되네?</span>
  <ul class="common-base">
    <li>왜안돼</li>
    <li>
      <slot></slot>
    </li>
  </ul>
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
