Functions
===

Object
---
For this we've chosen to use static functions as not to burden the creation of objects.

* Object.forEach(object, callback)

    Loop through all your object attributes.

    _Example :_

    ```javascript
    var myObject = { a : "a", b : "b" };
    Object.forEach( myObject , function( key, value) { console.log(key+" : "+value); });
    ```

* Object.clone(object)

    Deep clone an object.

    _Example :_

    ```javascript
    var o2 = Object.clone(o1);
    ```
* Object.merge(object1, object2)

    Gives back the result of a deep merge of two objects

    _Example :_

    ```javascript
var o1 = { a : 'a', b : { b1 : 'b1' } };
var o2 = { b : { b2 : 'b2' }, c : { c1 : 'c1' } };
var o3 = Object.merge(o1, o2);
console.log(o1);
// prints { a : 'a', b : { b1 : 'b1' } }
console.log(o2);
// prints { b : { b2 : 'b2' }, c : { c1 : 'c1' } }
console.log(o3);
// prints { a : 'a', b : {  b1 : 'b1', b2 : 'b2' }, c : { c1 : 'c1' } }
    ```

Document
---

* document.elem(elemname, attributes, text)
 * with shortcuts for common HTML elements like div, span, table, ul, ...

    Creates a new html element.

    _Example :_

    ```javascript
var div1 = document.elem('div',{class : 'example', id : 'id1'}, 'hello world');
// or
var div2 = document.div({class : 'example', id : 'id2'}, 'hello world');
    ```

* document.getElem(selector)

    Returns the result of a css query.

    _Example :_

    ```javascript
var a = document.getElem("form input#name");
// returns the input tag with id name that's inside a form
    ```

* document.getElemAll(selector)

    Returns a list of tags as a result of a css query.

    _Example :_

    ```javascript
var a = document.getElemAll("form input[type=text]");
// returns all text input fields inside a form
    ```
* document.delElem(element)

    Deletes tags from your DOM. You either give it the element itself (or a list of elements) as a parameter or you give it a string that will be evaluated as a document.getElemAll parameter.

    _Example :_

    ```javascript
var element = document.getElem("#id1");
document.delElem(element);
// deletes the element with the id "id1"
document.delElem("input");
// deletes all input tags
var divs = document.getElemAll("div");
document.delElem(divs);
// deletes all divs
    ```

Element
---

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

NodeList
---

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
===

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