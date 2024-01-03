import {isCustomEvent} from "../types/guards.ts";
import CommonDropdownButton from "./CommonDropdownButton.ts";
import CommonDropdownList from "./CommonDropdownList.ts";

const template = `
  <div class="common-dropdown">
    <slot name="dropdownButton"></slot>
    <slot name="dropdownList"></slot>
  </div>
`;

class CommonDropdown extends HTMLElement {
  isOpen!: boolean;
  // observer!: MutationObserver;
  dropdownList: HTMLElement | null = null;
  dropdownButton: HTMLElement | null = null;

  static observedAttributes = [
    'style',
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.init();
  }

  init() {
    this.dropdownList = null;
    this.isOpen = false;
    // this.observer = new MutationObserver((mutations) => {
    //   mutations.forEach(mutation => {
    //     if (mutation.type === "childList") {
    //       // 자식 노드가 추가되거나 제거됐습니다.
    //       this.dropdownList = this.querySelector<HTMLElement>('common-dropdown-list')!;
    //       this.updateDisplay();
    //     } else if (mutation.type === "attributes") {
    //       console.log(`${mutation.attributeName} 특성이 변경됐습니다.`);
    //     }
    //   })
    // })
  }

  /**
   * life cycle
   * */
  connectedCallback() {
    requestAnimationFrame(() => {
      this.render();
      // this.observer.observe(this, {
      //   attributes: true,
      //   childList: true,
      //   subtree: true,
      // })

      this.shadowRoot!.querySelector('slot[name="dropdownList"]')?.addEventListener('slotchange', event => {
        const slot = event.target as HTMLSlotElement;
        const assignedElements = slot.assignedElements();

        console.log('assignedElements', assignedElements[0] instanceof CommonDropdownList)

        this.dropdownList = assignedElements.find(el => el instanceof CommonDropdownList) as HTMLElement | null;

        this.updateDisplay();
      })

      this.shadowRoot!.querySelector('slot[name="dropdownButton"]')?.addEventListener('slotchange', (event) => {
        const slot = event.target as HTMLSlotElement;
        const assignedElements = slot.assignedElements();
        this.dropdownButton = assignedElements.find(el => el instanceof CommonDropdownButton) as HTMLElement | null;

        console.log('this.dropdownButton', this.dropdownButton)

        if (this.dropdownButton) {
          this.dropdownButton.addEventListener('click', () => {
            this.toggleDropdown();
          });
        }
      });

      this.addEventListener('clicked-dropdown-item-button', event => {
        if (isCustomEvent(event)) {
          console.log('list item button clicked', event.detail)
        }
      })

      this.updateDisplay();
    })
  }

  disconnectedCallback() {
    // this.observer.disconnect();
  }

  attributeChangedCallbackattributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    switch (name) {
      case 'style':
        this.applyStyles(newValue);
        break
      default:
        break;
    }
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

  applyStyles(styles: string) {
    const button = this.shadowRoot!.querySelector<HTMLElement>('.common-dropdown');
    if (button) {
      button.style.cssText = styles;
    }
  }
}

export default CommonDropdown;
