export default class CommonDropdownButton extends HTMLElement {
    private template: string;

    static observedAttributes: string[];

    resolve: (value: unknown) => void;

    style: CSSStyleDeclaration;

    constructor();

    connectedCallback(): void;
    render(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): Promise<void>;
}
