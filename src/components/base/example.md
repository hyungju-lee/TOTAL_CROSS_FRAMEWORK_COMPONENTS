```js
// web component
const template = document.createElement('template');
template.innerHTML = `
  <style>
    div {
      padding: 8px;
      border: 1px solid #ccc;
      width: 150px;
    }
  </style>
  <button></button>
  <div>
    <slot></slot>
  </div>
`;

export class XDropdown extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
    this.buttonElement.innerText = this._title;
  }

  constructor() {
    super();
    this._title = 'dropdown';
    this.show = false;

    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template.content.cloneNode(true));

    this.buttonElement = this.root.querySelector('button');
    this.buttonElement.innerText = this.title;
    this.buttonElement.addEventListener('click', () => this.toggle());

    this.contentElement = this.root.querySelector('div');
    this.contentElement.style.display = 'none';
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'title' && this.buttonElement) {
      this.title = newValue;
    }
  }

  toggle() {
    this.show = !this.show;
    this.contentElement.style.display = this.show ? 'block' : 'none';
    this.dispatchEvent(new CustomEvent('show', { detail: this.show }));
  }
}

customElements.define('x-dropdown', XDropdown);
```

```js
// for react - class component
import React, { Component } from 'react';
import 'web-component-essentials';

export class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        this.dropdownRef.current.title = this.props.title;

        if (this.props.onShow) {
            this.dropdownRef.current.addEventListener('show', (e) => this.props.onShow(e));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.title !== prevProps.title) {
            this.dropdownRef.current.title = this.props.title;
        }

        if (this.props.show !== prevProps.show) {
            this.dropdownRef.current.show = this.props.show;
        }
    }

    render() {
        return (
            <x-dropdown ref={this.dropdownRef}>
                {this.props.children}
            </x-dropdown>
        )
    }
}
```

```js
// for react - functional component
import React, { useEffect, useRef } from 'react';

const Dropdown = ({ title, onShow, children }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (dropdownRef.current) {
            dropdownRef.current.title = title;
        }
    }, [title]);

    useEffect(() => {
        const dropdown = dropdownRef.current;

        if (dropdown && onShow) {
            const handleShow = (e) => onShow(e);
            dropdown.addEventListener('show', handleShow);

            // 이벤트 리스너 해제
            return () => {
                dropdown.removeEventListener('show', handleShow);
            };
        }
    }, [onShow]);

    return (
        <x-dropdown ref={dropdownRef}>
            {children}
        </x-dropdown>
    );
};

export default Dropdown;
```
