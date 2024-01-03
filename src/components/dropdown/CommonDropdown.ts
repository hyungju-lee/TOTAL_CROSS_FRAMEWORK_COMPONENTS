import {isCustomEvent, isDropdownValueObject} from "../types/guards.ts";
import CommonDropdownButton from "./CommonDropdownButton.ts";
import CommonDropdownList from "./CommonDropdownList.ts";
import {CustomWebComponent} from "../types/interfaces.ts";

const template = `
  <div class="common-dropdown">
    <slot name="dropdownButton"></slot>
    <slot name="dropdownList"></slot>
  </div>
`;

/**
 * 1. MutationObserver
 * 2. 이벤트 위임
 * 3. slotchange
 *
 * - scoped slot - vue X
 *
 * 갖다 쓰는 쪽에서
 * - const a = useReact(CommonDropdown)
 * useVue2
 * useVue3
 * useSvelte
 *
 * customElements.define('x-a', a)
 * */
class CommonDropdown extends HTMLElement implements CustomWebComponent {
  value: {label: string; value: unknown} | undefined = undefined;
  isOpen!: boolean;
  // observer!: MutationObserver;
  dropdownList: HTMLElement | null = null;
  dropdownButton: HTMLElement | null = null;

  static observedAttributes = [
    'value',
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

      this.addEventListener('click:common-dropdown-item-button', event => {
        if (isCustomEvent(event)) {
          console.log('list item button clicked', event.detail)
          this.dispatchEvent(new CustomEvent('click:value', {
            bubbles: true, // 이벤트 버블링 허용
            detail: {
              data: event.detail.data,
            }
          }))
        }
      })

      this.updateDisplay();
    })
  }

  disconnectedCallback() {
    // this.observer.disconnect();
  }

  attributeChangedCallback(name: string, _oldValue: unknown, newValue: unknown) {
    switch (name) {
      case 'style':
        if (typeof newValue !== 'string') {
          return;
        }
        this.applyStyles(newValue);
        break
      case 'value':
        if (!isDropdownValueObject(newValue)) {
          return
        }
        this.value = newValue;
        break;
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
