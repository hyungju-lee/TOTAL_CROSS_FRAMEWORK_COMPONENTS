import {isCustomEvent} from "../types/guards.ts";

const template = `
  <div class="common-dropdown">
    <slot name="dropdownButton"></slot>
    <slot name="dropdownList"></slot>
  </div>
`;

class CommonDropdown extends HTMLElement {
  isOpen!: boolean;
  observer!: MutationObserver;
  dropdownList: HTMLElement | null = null;
  dropdownButton: HTMLElement | null = null;

  get style() {
    return (this.shadowRoot!.host as HTMLElement).style;
  }

  set style(value) {
    Object.assign((this.shadowRoot!.host as HTMLElement), value);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.init();
  }

  init() {
    this.dropdownList = null;
    this.isOpen = false;
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === "childList") {
          // 자식 노드가 추가되거나 제거됐습니다.
          this.dropdownList = this.querySelector<HTMLElement>('common-dropdown-list')!;
          this.updateDisplay();
        } else if (mutation.type === "attributes") {
          console.log(`${mutation.attributeName} 특성이 변경됐습니다.`);
        }
      })
    })
  }

  /**
   * life cycle
   * */
  connectedCallback() {
    requestAnimationFrame(() => {
      this.render();
      this.observer.observe(this, {
        attributes: true,
        childList: true,
        subtree: true,
      })

      this.dropdownButton = this.querySelector('common-dropdown-button');

      if (this.dropdownButton) {
        this.dropdownButton.addEventListener('click', () => {
          this.toggleDropdown();
        })
      }

      this.addEventListener('clicked-dropdown-item-button', event => {
        if (isCustomEvent(event)) {
          console.log('list item button clicked', event.detail)
        }
      })

      this.updateDisplay();
    })
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  /**
   * method
   * */
  render() {
    this.shadowRoot!.innerHTML = template;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.dropdownList) {
      this.dropdownList.style.display = this.isOpen ? 'block' : 'none';
    }
  }
}

export default CommonDropdown;
