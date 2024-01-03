export default class CommonDropdownItemButton extends HTMLElement {
    private template: string;

    data: { label: string; value: unknown } | null;
    dropdownItemButton: HTMLElement | null;
    resolve: (value: unknown) => void;

    static observedAttributes: string[];

    set itemData(data: { label: string; value: unknown });

    style: CSSStyleDeclaration;

    constructor();

    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): Promise<void>;
}
