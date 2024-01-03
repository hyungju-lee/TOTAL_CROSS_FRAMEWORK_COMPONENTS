import {useEffect, useRef} from 'react'
import CommonDropdown from "../CommonDropdown.ts";

customElements.define('common-dropdown', CommonDropdown)

const CommonDropdownForReact = ({modelValue, onChange, children}) => {
    const commonDropdownRef = useRef(null);

    useEffect(() => {
        if (commonDropdownRef.current) {
            commonDropdownRef.current.modelValue = modelValue;
        }
    }, [modelValue]);

    useEffect(() => {
        if (commonDropdownRef.current && onChange) {
            const handleChange = (e: Event) => onChange(e);
            commonDropdownRef.current.addEventListener('update:modelValue', handleChange);

            return () => {
                commonDropdownRef.current.removeEventListener('update:modelValue', handleChange);
            }
        }
    }, [onChange]);


    return (
        <common-dropdown ref={commonDropdownRef}>
            {children}
        </common-dropdown>
    )
}

export default CommonDropdownForReact
