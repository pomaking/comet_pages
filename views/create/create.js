AutoForm.hooks({
	cometDashboardPagesNewForm: {
		before: {
			insert: function(doc) {
				var name = Session.get('cometDashboardPagesNew_choosenTemplate');
				if (!name) {
					this.result(false);
				} else {
					doc = comet.pages.templates[name].schema.clean(doc, {
						extendAutoValueContext: {
							isInsert: true,
							userId: Meteor.userId()
						}
					});
					this.result(doc);
				}
			}
		},
		onSuccess: function() {
			Router.go('cometDashboardPagesIndex');
		}
	}
});


Template.cometDashboardPagesNew.rendered = function () {
	if (_.keys(comet.pages.templates).length == 1) {
		Session.set('cometDashboardPagesNew_choosenTemplate', _.keys(comet.pages.templates)[0]);
	} else {
		Session.set('cometDashboardPagesNew_choosenTemplate', null);
	}
};

Template.cometDashboardPagesNew.helpers({
	choosenTemplate: function() {
		var name = Session.get('cometDashboardPagesNew_choosenTemplate');
		return name && comet.pages.templates[name];
	},
	templates: function () {
		return _.values(comet.pages.templates);
	}
});

Template.cometDashboardPagesNew.events({
	'click .template-choose': function () {
		Session.set('cometDashboardPagesNew_choosenTemplate', this.template);
	},
	'click #cancel-btn': function () {
		if (_.keys(comet.pages.templates).length == 1) {
			Router.go('adminPagesIndex')
		} else {
			Session.set('cometDashboardPagesNew_choosenTemplate', null);
		}
	},
	'click #submit-btn': function () {
		$("#cometDashboardPagesNewForm").submit();
	}
});