var data = arguments[0] || {};
$.winDetail.title = data.name;

$.lblHeader.text = data.captured ? 'Captured' : 'Not Captured';
$.btnCapture.visible = !data.captured;
