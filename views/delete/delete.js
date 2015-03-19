Template.cometDashboardPagesDelete.helpers({
	onSuccess: function () {
		return function (result) { 
			Router.go('cometDashboardPagesIndex'); 
		};
	}
})