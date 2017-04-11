function testEquipmentsLayoutDirective($stateParams, testEquipmentsFactory) {
	return {
		scope: {},
		bindToController: {},
		templateUrl: 'scripts/dev/components/layout/test-equipments/test-equipments-layout.tmpl.html',
		controller: function() {
			var self = this;

			self.storage = testEquipmentsFactory;
			self.vendor = $stateParams.vendor;

			self.onAdd = function() {
				openModal('createTestEquipmentModal');
			};

			self.save = function() {
				var testEquipment = {
					number: 1,
					name: self.name,
					type: self.type,
					expirationDate: self.expirationDate,
					vendor: self.vendor
				};

				testEquipmentsFactory.createTestEquipment(testEquipment).then(function() {
					closeModal('createTestEquipmentModal');
				})
			};

			self.vendorFilter = function(testEquipment) {
				return testEquipment.vendor == self.vendor;
			};

			function closeModal(id) {
				var el = angular.element(document).find('#' + id);
				el.modal('hide');
			}

			function openModal(id) {
				var el = angular.element(document).find('#' + id);
				el.modal('show');
			}
		},
		controllerAs: 'ctrl'
	}
}