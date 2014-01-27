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
        document.getElemAll(element).each(function () {
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
        if (typeof attribute === "object") {
            for (var key in attribute) {
                if (attribute.hasOwnProperty(key)) {
                    if(attribute[key]!==null){
                        this.setAttribute(key, attribute[key]);
                    }else{
                        this.removeAttribute(key);
                    }
                }
            }
        } else if (typeof attribute === 'string') {
            if(value!==null){
                this.setAttribute(attribute, value);
            } else {
                this.removeAttribute(attribute);
            }
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
    var rand = Math.random()*10000;
    this.each(function () {
        this.elem(elemname, attr, text, returnparent).attrib("data-elemjs-attachnodelist",rand);
    });
    return document.getElemAll("[data-elemjs-attachnodelist='"+rand+"']").attrib("data-elemjs-attachnodelist",null);
};
NodeList.prototype.del = function () {
    var rand = Math.random()*10000;
    this.each(function () {
        this.delete().attrib("data-elemjs-attachnodelist",rand);
    });
    return document.getElemAll("[data-elemjs-attachnodelist='"+rand+"']").attrib("data-elemjs-attachnodelist",null);
};
NodeList.prototype.getElem = function(selector){
    var rand = Math.random()*10000;
    this.each(function(){
        var temp = this.getElem(selector);
        if(temp!==null)temp.attrib("data-elemjs-attachnodelist",rand);
    });
    return document.getElemAll("[data-elemjs-attachnodelist='"+rand+"']").attrib("data-elemjs-attachnodelist",null);
};
NodeList.prototype.getElemAll = function(selector){
    var rand = Math.random()*10000;
    this.each(function(){
        this.getElemAll(selector).attrib("data-elemjs-attachnodelist",rand);
    });
    return document.getElemAll("[data-elemjs-attachnodelist='"+rand+"']").attrib("data-elemjs-attachnodelist",null);
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
