Router.route("cometDashboardPagesIndex", {
	path:"/admin/pages",
	template: "cometDashboardPagesIndex",
	controller: "AdminController",
	waitOn: function() {
		return comet.subs.subscribe('pages');
	},
	data: function() {
		return { pages: comet.pages.collection.find() };
	}
});

Router.route("cometDashboardPagesEdit", {
	path:"/admin/pages/:_id/edit",
	template: "cometDashboardPagesEdit",
	controller: "AdminController",
	data: function() {
    return {
      user: Meteor.users.find(this.params._id).fetch(),
      roles: Roles.getRolesForUser(this.params._id),
      otherRoles: _.difference(_.map(Meteor.roles.find().fetch(), function(role) {
        return role.name;
      }), Roles.getRolesForUser(this.params._id))
    };
  },
  action: function() {
    return this.render();
  },
  onAfterAction: function() {
    Session.set('admin_title', 'Pages');
    Session.set('admin_subtitle', 'Edit page ' + this.params._id);
    Session.set('admin_collection_page', 'edit');
    Session.set('admin_collection_name', 'Pages');
    Session.set('admin_id', this.params._id);
    return Session.set('admin_doc', Meteor.users.findOne({
      _id: this.params._id
    }));
  }
});



Router.route("cometDashboardPagesDelete",  {
	path:"/admin/pages/:_id/delete",
	template: "cometDashboardPagesDelete",
	controller: AdminController,
	waitOn: function() {
		return comet.subs.subscribe('pages');
	},
	data: function() {
		return comet.pages.collection.findOne(this.params._id);
	}
});

Router.route("cometDashboardPagesNew", {
	path:"/admin/create"
	template: "cometDashboardPagesNew",
	controller: AdminController
});

Router.route('/pages/:url', function() {
	this.wait(comet.subs.subscribe('pages', { url: this.params.slug }));
	if (this.ready()) {
		var page = comet.pages.collection.findOne({ url: this.params.url });
		if (page) {
			this.render(page.template, { data: page });
		} else {
			this.render('adminLoading');
		}
	} else {
		this.render('adminLoading');
	}
}, { name: 'pages' });