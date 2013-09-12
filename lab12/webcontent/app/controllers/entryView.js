var updateWebView = function() {
	$.a.blur();
	$.b.blur();
	
	Ti.App.fireEvent('app:updatedValues', {
		a: parseFloat($.a.value),
		b: parseFloat($.b.value),
		c: parseFloat($.c.value)
	});
};
var calcC = function() {
	$.c.value = String(Math.round(100 - $.a.value - $.b.value));
};

$.submit.addEventListener('click', updateWebView);
$.a.addEventListener('change', calcC);
$.b.addEventListener('change', calcC);
