AutoForm.hooks({
	adminPagesNewForm: {
		before: {
			insert: function(doc) {
				var name = Session.get('adminPagesNew_choosenTemplate');
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
			Router.go('adminPagesIndex');
		}
	}
});


Template.adminPagesNew.rendered = function () {
	if (_.keys(comet.pages.templates).length == 1) {
		Session.set('adminPagesNew_choosenTemplate', _.keys(comet.pages.templates)[0]);
	} else {
		Session.set('adminPagesNew_choosenTemplate', null);
	}
};

Template.adminPagesNew.helpers({
	choosenTemplate: function() {
		var name = Session.get('adminPagesNew_choosenTemplate');
		return name && comet.pages.templates[name];
	},
	templates: function () {
		return _.values(comet.pages.templates);
	}
});

Template.adminPagesNew.events({
	'click .template-choose': function () {
		Session.set('adminPagesNew_choosenTemplate', this.template);
	},
	'click #cancel-btn': function () {
		if (_.keys(comet.pages.templates).length == 1) {
			Router.go('adminPagesIndex')
		} else {
			Session.set('adminPagesNew_choosenTemplate', null);
		}
	},
	'click #submit-btn': function () {
		$("#adminPagesNewForm").submit();
	}
});