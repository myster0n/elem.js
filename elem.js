document.elem = function (elemname, attributes, text) {
    if (typeof attributes === 'string') {
        text = attributes;
        attributes = null;
    }
    return document.createElement(elemname).attrib(attributes).setText(text);
};
document.getElem = function (selector) {
    return document.querySelector(selector);
};
document.getElemAll = function (selector) {
    return document.querySelectorAll(selector);
};
document.delElem = function (elemname) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
Element.prototype.getElem = function (selector) {
    return this.querySelector(selector);
};
Element.prototype.getElemAll = function (selector) {
    return this.querySelectorAll(selector);
};
Element.prototype.elem = function (elemname, attr, text, returnparent) {
    var elem = (typeof elemname === 'string') ? document.elem(elemname, attr, text) : elemname;
    this.appendChild(elem);
    return (returnparent !== null && returnparent) ? this : ['br', 'hr'].indexOf(elemname) === -1 ? elem : returnparent === false ? elem : this;
};
Element.prototype.attrib = function (attribute, value) {
    if (attribute) {
        if (typeof attribute === "object") {
            for (var key in attribute) {
                if (attribute.hasOwnProperty(key)) {
                    this.setAttribute(key, attribute[key]);
                }
            }
        } else if (typeof attribute === 'string') {
            this.setAttribute(attribute, value);
        }
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
Element.prototype.on = function (event, listener, useCapture) {
    if (this.attachEvent) {
        this.attachEvent(event, listener);
    } else {
        this.addEventListener(event, listener, useCapture);
    }
    return this;
};
Element.prototype.off = function (event, listener, useCapture) {
    if (this.detachEvent) {
        this.detachEvent(event, listener);
    } else {
        this.removeEventListener(event, listener, useCapture);
    }
    return this;
};
NodeList.prototype.each = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this[i], i);
    }
};
NodeList.prototype.attrib = function (attribute, value) {
    this.each(function () {
        this.attrib(attribute, value)
    });
};
NodeList.prototype.elem = function (elemname, attr, text, returnparent) {
    var nlist = document.createDocumentFragment();
    this.each(function () {
        nlist.appendChild(this.elem(elemname, attr, text, returnparent));
    });
    return nlist.childNodes;
};
NodeList.prototype.on = function (event, listener, useCapture) {
    this.each(function () {
        this.on(event, listener, useCapture);
    });
    return this;
};
NodeList.prototype.off = function (event, listener, useCapture) {
    this.each(function () {
        this.off(event, listener, useCapture);
    });
    return this;
};
['span', 'div', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'i', 'em', 'b', 'img', 'table', 'tbody', 'thead', 'tr', 'th', 'td', 'a', 'label', 'input', 'br', 'hr'].map(function (elemname) {
    Element.prototype[elemname] = function (attr, text, returnparent) {
        return this.elem(elemname, attr, text, returnparent);
    };
    document[elemname] = function (attr, text) {
        return this.elem(elemname, attr, text);
    };
    NodeList[elemname] = function (attr, text, returnparent) {
        return this.elem(elemname, attr, text, returnparent);
    }
});
