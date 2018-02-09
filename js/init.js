/**
 * Created by Иван on 06.02.2018.
 */
//проверка, если любимые ие
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE");

if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
{
    document.write('<script src="js/polyfill/es6-promise.auto.min.js"></script>');
    document.write('<script src="js/polyfill/fetch.min.js"></script>');
    document.write('<script src="js/polyfill/polifills.js"></script>');
}