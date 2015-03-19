if (Meteor.isClient) {
	comet.admin.addSidebarTab({
		routeName: 'adminPagesIndex',
		navbarTitle: 'Pages',
		activeRouteRegex: 'adminPages',
		icon: 'tags',
		permission: 'pages'
	});
}

comet.users.permissions.add('pages');