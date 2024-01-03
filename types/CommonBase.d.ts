declare class CommonBase extends HTMLElement {
    style: CSSStyleDeclaration;
    constructor();
    connectedCallback(): void;
    render(): void;
}

export default CommonBase;
