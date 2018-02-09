
(function (ElementProto) {
    if (typeof ElementProto.matches !== 'function') {
        ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
                var element = this;
                var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
                var index = 0;

                while (elements[index] && elements[index] !== element) {
                    ++index;
                }

                return Boolean(elements[index]);
            };
    }

    if (typeof ElementProto.closest !== 'function') {
        ElementProto.closest = function closest(selector) {
            var element = this;

            while (element && element.nodeType === 1) {
                if (element.matches(selector)) {
                    return element;
                }

                element = element.parentNode;
            }

            return null;
        };
    }


    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function (callback, thisArg) {

            var T, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }

            var O = Object(this);

            var len = O.length >>> 0;

           if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }


            if (arguments.length > 1) {
                T = thisArg;
            }
            k = 0;

            while (k < len) {

                var kValue;

                if (k in O) {


                    kValue = O[k];


                    callback.call(T, kValue, k, O);
                }

                k++;
            }

        };
    }
})(window.Element.prototype);


