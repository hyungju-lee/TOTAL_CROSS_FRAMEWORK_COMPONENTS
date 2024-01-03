export default class CommonDropdown extends HTMLElement {
    isOpen: boolean;
    observer: MutationObserver;
    dropdownList: HTMLElement | null;
    dropdownButton: HTMLElement | null;

    style: CSSStyleDeclaration;

    constructor();

    init(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): void;
    toggleDropdown(): void;
    updateDisplay(): void;
}
