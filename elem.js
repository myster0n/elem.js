document.elem = function (elemname, attributes, text) {
    if (typeof attributes === 'string') {
        text = attributes;
        attributes = null;
    }
    return document.createElement(elemname).attribs(attributes).setText(text);
};
document.getElem = function(selector) {
    return document.querySelector(selector);
};
document.getElemAll = function(selector) {
    return document.querySelectorAll(selector);
};
document.delElem = function (elemname) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
Element.prototype.getElem = function(selector) {
    return this.querySelector(selector);
};
Element.prototype.getElemAll = function(selector) {
    return this.querySelectorAll(selector);
};
Element.prototype.elem = function (elemname, attr, text, returnparent) {
    var elem = (typeof elemname === 'string') ? document.elem(elemname, attr, text) : elemname;
    this.appendChild(elem);
    return (returnparent !== null && returnparent) ? this : elem;
};
Element.prototype.attribs = function (attributes) {
    if (attributes !== null && typeof attributes == "object") {
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                this.setAttribute(attribute, attributes[attribute]);
            }
        }
    }
    return this;
};
Element.prototype.attrib = function (name, value) {
    if (name) {
        this.setAttribute(name, value);
    }
    return this;
};
Element.prototype.setText = function (text) {
    if (text) {
        this.textContent = text;
    }
    return this;
};
Element.prototype.clearElem = function () {
    if (this.textContent !== null) {
        this.textContent = '';
    }
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
    return this;
};
['span', 'div', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'i', 'em', 'b', 'img', 'table', 'tbody', 'thead', 'tr', 'th', 'td', 'a', 'label', 'input', 'br', 'hr'].map(function (elemname) {
    Element.prototype[elemname] = function (attr, text, returnparent) {
        return this.elem(elemname, attr, text, ['br', 'hr'].indexOf(elemname) !== -1 ? true : returnparent);
    };
    document[elemname] = function (attr, text) {
        return this.elem(elemname, attr, text);
    };
});

