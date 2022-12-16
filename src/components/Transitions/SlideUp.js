import {Transition} from "@headlessui/react";

export default function SlideUp(props) {
    return (<div>
            <Transition
                show={true}
                enter="transform transition ease-in-out duration-1000"
                enterFrom="opacity-0 translate-y-24"
                enterTo="opacity-100 translate-y-0"
                leave="transform transition ease-in-out duration-1000"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-24"
            >
                {props.children}
            </Transition>
        </div>
    )
}