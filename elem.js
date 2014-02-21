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
        element.forEach(function () {
            if (this.parentNode) this.parentNode.removeChild(this);
        });
    } else if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
};
document.ready = function (callback) {
    if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
        setTimeout(callback,1);
    }else if (document.addEventListener) {
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
}
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
    var classes = this.className.split(' ');
    if (classes.indexOf(className) === -1) {
        classes.push(className);
        this.className = classes.join(' ');
    }
    return this;
};
Element.prototype.removeClass = function (className) {
    var classes = this.className.split(' ');
    var index = classes.indexOf(className);
    if (index !== -1) {
        classes.splice(index, 1);
        this.className = classes.join(' ');
    }
    return this;
};
Element.prototype.hasClass = function (className) {
    return this.className.split(' ').indexOf(className) !== -1;
};
NodeList.prototype.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {
        callback.call(this[i], i);
    }
};
NodeList.prototype.every = function (callback) {
    for (var i = 0; i < this.length; i++) {
        if (callback.call(this[i]) === false) return false;
    }
    return true;
};
NodeList.prototype.some = function (callback) {
    var status = false;
    for (var i = 0; i < this.length; i++) {
        status = callback.call(this[i]) || status;
    }
    return status;
};
NodeList.prototype.attrib = function (attribute, value) {
    this.each(function () {
        this.attrib(attribute, value)
    });
    return this;
};
NodeList.prototype.elem = function (elemname, attr, text, returnparent) {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-elem";
    this.each(function () {
        this.elem(elemname, attr, text, returnparent).attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.del = function () {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-del";
    this.each(function () {
        this.del().attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.getElem = function (selector) {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-getElem";
    this.each(function () {
        var temp = this.getElem(selector);
        if (temp !== null)temp.attrib(name, rand);
    });
    return document.getElemAll("[" + name + "='" + rand + "']").attrib(name, null);
};
NodeList.prototype.getElemAll = function (selector) {
    var rand = Math.random() * 10000, name = "data-elemjs-NL-getElemAll";
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
    request: function (config, onSuccess, onError) {
        Window.http._callback(Window.http._before);
        try{
            var defaults = { method: 'GET', async: true, headers: {} };
            var options = Object.merge(defaults, config);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                Window.http._callback(Window.http._after);
                if (this.status >= 200 && this.status < 300) {
                    if (typeof onSuccess === 'function') onSuccess(this.responseText, this.status, this);
                } else {
                    if (typeof onError === 'function') onError(this.responseText, this.status, this);
                }
            };
            xhr.onerror = function () {
                Window.http._callback(Window.http._after);
                if (typeof onError === 'function') onError(this.statusText, this.status, this);
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
        }catch(e) {
            Window.http._callback(Window.http._after);
        }
    },
    _callback: function(callbackObject){
      if(callbackObject && typeof callbackObject.callback === 'function'){
          if(callbackObject.async){
              setTimeout(callbackObject.callback,1);
          }else{
              callbackObject.callback.call();
          }
      }
    },
    GET: function (config, onSuccess, onError) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.method = "GET";
        if (config.data && typeof config.data === 'object') {
            config.url += document.a({href: config.url}).search ? '&' : '?';
            config.url += Window.http.serialize(config.data);
            delete config.data;
        }
        return Window.http.request(config, onSuccess, onError);
    },
    POST: function (config, onSuccess, onError) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.method = "POST";
        config.headers = config.headers || {};
        config.headers["Content-type"] = config.headers["Content-type"] || "application/x-www-form-urlencoded";
        return Window.http.request(config, onSuccess, onError);
    },
    PUT: function (config, onSuccess, onError) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.method = "PUT";
        config.headers = config.headers || {};
        config.headers["Content-type"] = config.headers["Content-type"] || "application/x-www-form-urlencoded";
        return Window.http.request(config, onSuccess, onError);
    },
    DELETE: function (config, onSuccess, onError) {
        config = (typeof config === "string") ? {url: config} : config || {};
        config.method = "DELETE";
        return Window.http.request(config, onSuccess, onError);
    },
    serialize: function (obj, prefix) {
        var str = [];
        Object.forEach(obj, function (key, value) {
            var k = prefix ? prefix + "[" + key + "]" : key, v = value;
            str.push(typeof v == "object" ?
                Window.http.serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
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
    },
    setBefore: function(callback, async){
        Window.http._before = {callback:callback,async:async};
    },
    setAfter: function(callback, async){
        Window.http._after = {callback:callback,async:async};
    }
};
