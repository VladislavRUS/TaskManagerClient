function testEquipmentsLayoutDirective($stateParams, $timeout, $state,
									   testEquipmentsFactory, notificationsFactory, modalFactory) {
	return {
		scope: {},
		bindToController: {},
		templateUrl: 'scripts/dev/components/layout/test-equipments/test-equipments-layout.tmpl.html',
		controller: function() {
			var self = this;

			self.storage = testEquipmentsFactory;
			self.vendor = $stateParams.vendor;
			self.nf = notificationsFactory;

			self.onAdd = function() {
				modalFactory.openModal('createTestEquipmentModal');
			};

			self.save = function() {
				var testEquipment = {
					name: self.name,
                    number: self.number,
                    type: self.type,
					expirationDate: self.expirationDate,
					vendor: self.vendor
				};

				testEquipmentsFactory.createTestEquipment(testEquipment).then(function() {
					modalFactory.closeModal();
				});
			};

			self.vendorFilter = function(testEquipment) {
				return testEquipment.vendor === self.vendor;
			};

			self.onClick = function(testEquipment) {
                $state.go('test-equipments-detailed', { uuid: testEquipment.uuid });
			};
		},
		controllerAs: 'ctrl'
	}
}