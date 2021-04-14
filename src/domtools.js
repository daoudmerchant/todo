// yes I'm very aware that the below is just a quick fix
// before the React module

const DOMtools = (function() {
    function _emptyElement(parent) {
        while (parent.firstChild) {
            parent.remove(parent.lastChild);
        }
    }

    function createElement(obj) {

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

        const newElement = document.createElement(type);
        if (obj.hasOwnProperty("class_es")) {
            newElement.className = obj.class_es;
        }
        if (obj.hasOwnProperty("text")) {
            newElement.textContent = obj.text;
        }
        if (obj.hasOwnProperty("attribute")) {
            const entries = Object.entries(obj);
            for (const [attr, value] of entries) {
                newElement.setAttribute(attr, value);
            };
        }        
    }

    function appendChildren(parent, ...children) {
        children.forEach(child => parent.appendChild(child));
    }

    function rerender(parent, callback, ...parameters) {
        _emptyElement(parent);
        callback(parent, ...parameters);
    }

    return {
        createElement,
        appendChildren,
        rerender
    }
})();

export default DOMtools;