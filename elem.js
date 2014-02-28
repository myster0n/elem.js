Object.forEach = function (object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key))
            callback.call(object, key, object[key]);
    }
};
Object.every = function (object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key))
            if (callback.call(object, key, object[key]) === false) return false;
    }
    return true;
};
Object.some = function (object, callback) {
    var status = false;
    for (var key in object) {
        if (object.hasOwnProperty(key))
            status = callback.call(object, key, object[key]) || status;
    }
    return status;
};
Object.clone = function (o) {
    if (o === null || typeof(o) !== 'object') return o;

    var objNew = o.constructor();

    for (var key in o)
        objNew[key] = Object.clone(o[key]);

    return objNew;
};
Object.merge = function (o1, o2) {
    var objNew = Object.clone(o1);
    for (var p in o2) {
        if (o2[p] && o2[p].constructor === Object) {
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
    if (elemname === 'textElem') return document.createTextNode(text);
    return document.createElement(elemname).attrib(attributes).setText(text);
};
document.getElem = document.querySelector;
document.getElemAll = document.querySelectorAll;
document.delElem = function (element) {
    if (typeof element === 'string') {
        element = document.getElemAll(element);
    }
    if (element.forEach) {
        element.forEach(function (node) {
            if (node.parentNode) node.parentNode.removeChild(node);
        });
    } else if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
document.ready = function (callback) {
    if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
        setTimeout(callback, 1);
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        document.onreadystatechange = function () {
            if (document.readyState == "interactive") callback();
        }
    }
};
Element.prototype.getElem = Element.prototype.querySelector;
Element.prototype.getElemAll = Element.prototype.querySelectorAll;
Element.prototype.del = function () {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
    return parent;
};
Element.prototype.elem = function (elemname, attr, text, returnparent) {
    if (typeof elemname !== 'string') {
        var _that = this;
        [].concat(elemname).forEach(function (element) {
            _that.appendChild(element);
        });
        return this;
    }
    var elem = document.elem(elemname, attr, text);
    this.appendChild(elem);
    return (returnparent !== null && returnparent) ? this : ['br', 'hr', 'textElem'].indexOf(elemname) === -1 ? elem : returnparent === false ? elem : this;
};
Element.prototype.siblings = function () {
    return this.parentElement.children;
};
Element.prototype.up = function () {
    return this.parentElement;
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
Element.prototype.addClass = function (className) {
    if (this.classList) {
        this.classList.add(className);
    } else {
        var classes = this.className.split(' ');
        if (classes.indexOf(className) === -1) {
            classes.push(className);
            this.className = classes.join(' ');
        }
    }
    return this;
};
Element.prototype.removeClass = function (className) {
    if (this.classList) {
        this.classList.remove(className);
    } else {
        var classes = this.className.split(' ');
        var index = classes.indexOf(className);
        if (index !== -1) {
            classes.splice(index, 1);
            this.className = classes.join(' ');
        }
    }
    return this;
};
Element.prototype.toggleClass = function (className) {
    if (this.classList) {
        this.classList.toggle(className);
    } else if (this.className.split(' ').indexOf(className) !== -1) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
    return this;
};
Element.prototype.hasClass = function (className) {
    if (this.classList) {
        return this.classList.contains(className);
    } else {
        return this.className.split(' ').indexOf(className) !== -1;
    }
};
NodeList.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback(this[i], i);
    }
};
NodeList.prototype.every = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback(this[i], i) === false) return false;
    }
    return true;
};
NodeList.prototype.some = function (callback) {
    var status = false;
    for (var i = 0; i < this.length; i++) {
        status = callback(this[i], i) || status;
    }
    return status;
};
NodeList.prototype.attrib = function (attribute, value) {
    this.forEach(function (node) {
        node.attrib(attribute, value)
    });
    return this;
};
NodeList.prototype.elem = function (elemname, attr, text, returnparent) {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-elem";
    this.forEach(function (node) {
        node.elem(elemname, attr, text, returnparent).attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.del = function () {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-del";
    this.forEach(function (node) {
        node.del().attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.getElem = function (selector) {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-getElem";
    this.forEach(function (node) {
        var temp = node.getElem(selector);
        if (temp !== null)temp.attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.getElemAll = function (selector) {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-getElemAll";
    this.forEach(function (node) {
        node.getElemAll(selector).attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.on = function (event, listener, useCapture) {
    this.forEach(function (node) {
        node.on(event, listener, useCapture);
    });
    return this;
};
NodeList.prototype.off = function (event, listener, useCapture) {
    this.forEach(function (node) {
        node.off(event, listener, useCapture);
    });
    return this;
};
NodeList.prototype.addClass = function (className) {
    this.forEach(function (node) {
        node.addClass(className);
    });
    return this;
};
NodeList.prototype.removeClass = function (className) {
    this.forEach(function (node) {
        node.removeClass(className);
    });
    return this;
};
NodeList.prototype.toggleClass = function (className) {
    this.forEach(function (node) {
        node.toggleClass(className);
    });
    return this;
};
NodeList.prototype.hasClass = function (className) {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-hasClass";
    this.forEach(function (node) {
        if (node.hasClass(className)) {
            node.attrib(name, rand);
        }
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.toArray = function () {
    var arr = [];
    for (var i = this.length; i--; arr.unshift(this[i]));
    return arr;
};
['section', 'nav', 'article', 'aside', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'address', 'main', 'p', 'hr', 'pre', 'ol', 'ul', 'li', 'div', 'a', 'em', 'strong', 'code', 'span', 'br', 'img', 'svg', 'table', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th', 'form', 'label', 'input', 'button', 'select', 'option', 'textarea', 'textElem'].map(function (elemname) {
    Element.prototype[elemname] = function (attr, text, returnparent) {
        return this.elem(elemname, attr, text, returnparent);
    };
    document[elemname] = function (attr, text) {
        return this.elem(elemname, attr, text);
    };
    NodeList.prototype[elemname] = function (attr, text, returnparent) {
        return this.elem(elemname, attr, text, returnparent);
    }
});
Window.http = {
    defaults: { method: 'GET', async: true, headers: {} },
    request: function (config) {
        var options = Object.merge(Window.http.defaults, config);
        Window.http._callback(options.before);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                Window.http._callback(options.success, this.responseText, this.status, this.statusText, this);
            } else {
                Window.http._callback(options.error, this.responseText, this.status, this.statusText, this);
            }
        };
        xhr.onerror = function () {
            Window.http._callback(options.error, this.responseText, this.status, this.statusText, this);
        };
        xhr.onloadend = function () {
            Window.http._callback(options.loadEnd);
        };
        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                Window.http._callback(options.progress, event.loaded, event.total);
            } else {
                Window.http._callback(options.progress, event.loaded, null);
            }
        };
        xhr.open(options.method, options.url, options.async);
        if (options.headers !== null && typeof options.headers === 'object')
            Object.forEach(options.headers, function (key, value) {
                xhr.setRequestHeader(key, value);
            });
        if (options.data && typeof options.data === "object" && config.headers["Content-type"] === "application/x-www-form-urlencoded") {
            options.data = Window.http.serialize(options.data);
        }
        xhr.send(options.data);
        return xhr;
    },
    _callback: function (callbackObject) {
        if (callbackObject && typeof callbackObject === 'function') {
            var args = [].slice.call(arguments).slice(1);
            setTimeout(function () {
                callbackObject.apply(document, args)
            }, 0);
        }
    },
    GET: function (config) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.method = "GET";
        if (config.data && typeof config.data === 'object') {
            config.url += document.a({href: config.url}).search ? '&' : '?';
            config.url += Window.http.serialize(config.data);
            delete config.data;
        }
        return Window.http.request(config);
    },
    POST: function (config) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.method = "POST";
        config.headers = config.headers || {};
        config.headers["Content-type"] = config.headers["Content-type"] || "application/x-www-form-urlencoded";
        return Window.http.request(config);
    },
    PUT: function (config) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.method = "PUT";
        config.headers = config.headers || {};
        config.headers["Content-type"] = config.headers["Content-type"] || "application/x-www-form-urlencoded";
        return Window.http.request(config);
    },
    DELETE: function (config) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.method = "DELETE";
        return Window.http.request(config);
    },
    serialize: function (obj, prefix) {
        var str = [];
        Object.forEach(obj, function (key, value) {
            var k = prefix ? prefix + "[" + key + "]" : key;
            str.push(typeof value == "object" ?
                Window.http.serialize(value, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(value));
        });
        return str.join("&");
    },
    load: function (config) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.src = config.src || config.url;
        delete config.url;
        if (config.data && typeof config.data === 'object') {
            config.src += document.a({href: config.src}).search ? '&' : '?';
            config.src += Window.http.serialize(config.data);
            delete config.data;
        }
        if (config.id) {
            var toDelete = document.getElem("#" + config.id);
            if (toDelete !== null) {
                toDelete.del();
            }
        }
        return document.getElem("head").elem("script", config);
    }
};
