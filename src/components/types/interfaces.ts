// CustomWebComponent 인터페이스 정의
interface CustomWebComponent extends HTMLElement {
    value: string | number | object | Array<unknown> | undefined;
}

export type {
    CustomWebComponent,
}
