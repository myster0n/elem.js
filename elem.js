Object.forEach = function (object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key))
            callback.call(object, key, object[key]);
    }
};
Object.clone = function (o) {
    if (o == null || typeof(o) != 'object') return o;

    var objNew = o.constructor();

    for (var key in o)
        objNew[key] = Object.clone(o[key]);

    return objNew;
};
Object.merge = function (o1, o2) {
    var objNew = Object.clone(o1);
    for (var p in o2) {
        if (o2[p].constructor == Object) {
            if (!o1[p]) o1[p] = {};
            objNew[p] = Object.merge(o1[p], o2[p]);
        } else {
            objNew[p] = o2[p];
        }
    }
    return objNew;
};
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
document.delElem = function (element) {
    if (typeof element === 'string') {
        element = document.getElemAll(element);
    }
    if (element.each) {
        element.each(function () {
            if (this.parentNode) this.parentNode.removeChild(this);
        });
    } else if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
Element.prototype.getElem = function (selector) {
    return this.querySelector(selector);
};
Element.prototype.getElemAll = function (selector) {
    return this.querySelectorAll(selector);
};
Element.prototype.del = function () {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
    return parent;
};
Element.prototype.elem = function (elemname, attr, text, returnparent) {
    var elem = (typeof elemname === 'string') ? document.elem(elemname, attr, text) : elemname;
    this.appendChild(elem);
    return (returnparent !== null && returnparent) ? this : ['br', 'hr'].indexOf(elemname) === -1 ? elem : returnparent === false ? elem : this;
};
Element.prototype.attrib = function (attribute, value) {
    if (attribute) {
        var _this = this;
        var setOrRemove = function (key, value) {
            value !== null ? _this.setAttribute(key, value) : _this.removeAttribute(key);
        };
        if (typeof attribute === "object") {
            Object.forEach(attribute, setOrRemove);
        } else if (typeof attribute === 'string') {
            setOrRemove(attribute, value);
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
    return this;
};
NodeList.prototype.elem = function (elemname, attr, text, returnparent) {
    var rand = Math.random() * 10000, name = "data-elemjs-attachnodelist";
    this.each(function () {
        this.elem(elemname, attr, text, returnparent).attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.del = function () {
    var rand = Math.random() * 10000, name = "data-elemjs-attachnodelist";
    this.each(function () {
        this.del().attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.getElem = function (selector) {
    var rand = Math.random() * 10000, name = "data-elemjs-attachnodelist";
    this.each(function () {
        var temp = this.getElem(selector);
        if (temp !== null)temp.attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.getElemAll = function (selector) {
    var rand = Math.random() * 10000, name = "data-elemjs-attachnodelist";
    this.each(function () {
        this.getElemAll(selector).attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
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