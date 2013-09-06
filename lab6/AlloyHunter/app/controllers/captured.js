// only show captured people
function filterCaptured(collection) {
	return collection.where({captured:1});
}
