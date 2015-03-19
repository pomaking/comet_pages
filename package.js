Package.describe({
	name: 'pomaking:comet_pages',
	summary: 'Pages for Comet CMS',
	version: '0.0.1',
	git: 'https://github.com/pomaking/comet_pages'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'meteor-platform',
		'less',
		'aldeed:collection2@2.0.0',
		]);

	api.imply([
		'less', 
		]);

	api.addFiles([
		'lib/main.js',
		'lib/routes.js',
		'lib/register.js'
		]);

	api.addFiles([
		'views/index/index.html',
		'views/update/update.html',
		'views/update/update.js',
		'views/delete/delete.html',
		'views/delete/delete.js',
		'views/create/create.html',
		'views/create/create.js',
		'lib/helpers.js',
		], 'client');

});