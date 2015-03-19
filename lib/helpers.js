Template.registerHelper('pages', function(kw) {
	var options = (kw && kw.hash) || {};
	return comet.pages.collection.find(options);
});