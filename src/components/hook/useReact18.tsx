import {useRef} from "react";
const useReact18 = (WebComponent) => {
    return props => {
        const ref = useRef(null);

        return <WebComponent/>
    }
}

export default useReact18
