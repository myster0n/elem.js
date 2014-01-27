Elem.js
=======

JavaScript library for easy DOM manipulation by extending document, Element, NodeList, ... class.

Functions
-------

* document.elem = function (elemname, attributes, text) 
  * with shortcuts for common HTML elements like div, span, table, ul, ... 
* document.getElem = function (selector) 
* document.getElemAll = function (selector) 
* document.delElem = function (element) 
* Element.prototype.getElem = function (selector) 
* Element.prototype.getElemAll = function (selector) 
* Element.prototype.del = function () 
* Element.prototype.elem = function (elemname, attr, text, returnparent) 
  * with shortcuts for common HTML elements like div, span, table, ul, ... 
* Element.prototype.attrib = function (attribute, value) 
* Element.prototype.setText = function (text) 
* Element.prototype.clearElem = function () 
* Element.prototype.on = function (event, listener, useCapture) 
* Element.prototype.off = function (event, listener, useCapture) 
* NodeList.prototype.each = function (callback) 
* NodeList.prototype.attrib = function (attribute, value) 
* NodeList.prototype.elem = function (elemname, attr, text, returnparent) 
  * with shortcuts for common HTML elements like div, span, table, ul, ... 
* NodeList.prototype.del = function () 
* NodeList.prototype.getElem = function(selector)
* NodeList.prototype.getElemAll = function(selector)
* NodeList.prototype.on = function (event, listener, useCapture) 
* NodeList.prototype.off = function (event, listener, useCapture) 

Examples
-------

Create DOM element:

	document.elem("div", {class: "myClass"}, "text content");

Create DOM element shortcuts:

	document.div({class: "myClass"}, "text content");

Find element by CSS selector:

	document.getElem("#myDiv");
	document.getElem("div[myAttr='myValue']");
	document.getElem(".myClass");

Chaining:

	var mySpan = document.getElem("body").div({id: 'myDiv'}).span();