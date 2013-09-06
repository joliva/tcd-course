// only show fugitive people
function filterFugitives(collection) {
	return collection.where({captured:0});
}
