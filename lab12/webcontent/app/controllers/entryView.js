var updateWebView = function() {
	$.a.blur();$.b.blur();
};
var calcC = function() {
	$.c.value = String(Math.round(100 - $.a.value - $.b.value));
};

$.submit.addEventListener('click', updateWebView);
$.a.addEventListener('change', calcC);
$.b.addEventListener('change', calcC);
