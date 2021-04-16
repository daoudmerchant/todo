// yes I'm very aware that the below is just a quick fix
// before the React module

const DOMtools = (function() {
    function _emptyElement(parent) {
        while (parent.firstChild) {
            parent.remove(parent.lastChild);
        }
    }

    function returnElement(obj) {

        // parameter object can contain maximum:
        //     type: ...
        //     class_es: ...
        //     text: ...
        //     attribute: [
        //         [type, ...],
        //         [placeholder, ...],
        //         [name, ...],
        //         [value, ...],
        //         [color, ...],
        //         [data-projIndex, ...],
        //         [data-todoIndex, ...]
        //     ]

        const newElement = document.createElement(obj.type);
        if (obj.hasOwnProperty("class")) {
            newElement.className = obj.class;
        }
        if (obj.hasOwnProperty("text")) {
            newElement.innerHTML = obj.text;
        }
        if (obj.hasOwnProperty("attribute")) {
            const entries = Object.entries(obj.attribute);
            for (const [attr, value] of entries) {
                newElement.setAttribute(attr, value);
            };
        }
        return newElement;
    }

    function setAttributes(element, attributes) {
        const entries = Object.entries(attributes);
        for (const [attr, value] of entries) {
            element.setAttribute(attr, value);
        }
        // return element;
    }

    function appendChildren(parent, ...children) {
        children.forEach(child => parent.appendChild(child));
    }

    function addEventListeners(fn, ...elements) {
        elements.forEach(element => element.addEventListener(fn));
    }

    function clearAndRender(panel, callback, ...args) {
        // _emptyElement(parent);
        callback(panel, ...args);
    }

    return {
        returnElement,
        setAttributes,
        appendChildren,
        addEventListeners,
        clearAndRender
    }
})();

export default DOMtools;