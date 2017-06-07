function damperDetailedDirective($state, $timeout, dampersFactory, notificationsFactory, modalFactory) {
	return {
		scope: {},
		bindToController: {
			damper: '<'
		},
		templateUrl: 'scripts/dev/components/damper/detailed/damper-detailed.tmpl.html',
		controller: function () {
			var self = this;
			self.showAlert = false;
			self.currentContract = {};
			self.nf = notificationsFactory;
			self.update = false;
			self.currentAccessory = {};
			self.hideDone = false;
			self.accessoryTypes = {
				'component': 'Комплектующее',
				'material': 'Расходный материал'
			};

			var currentModal = null;

			self.toggleDone = function () {
				self.hideDone = !self.hideDone;
			};

			self.filterContract = function (contract) {
				if (self.hideDone) {
					return !contract.done;
				} else {
					return true;
				}
			};

			self.onUpdate = function () {
				dampersFactory.updateDamper(self.damper).then(function () {
					self.showAlert = true;

					$timeout(function () {
						self.showAlert = false;
					}, 3000);
				});
			};

			self.addContract = function (modal) {
				self.update = false;
				self.currentContract = {};
				modalFactory.openModal(modal);
			};

			self.updateContract = function (contract, modal) {
				self.update = true;
				self.currentContract = angular.copy(contract);
                modalFactory.openModal(modal);
			};

			self.saveContract = function () {
				if (self.update) {
					dampersFactory.updateContract(self.currentContract).then(function () {
						modalFactory.closeModal();
					});

				} else {
					dampersFactory.addContractToDamper(self.damper, self.currentContract).then(function () {
						modalFactory.closeModal();
					});
				}
			};

			self.addAccessory = function (modal, type) {
				self.update = false;
				self.currentAccessory = {};
				self.currentAccessory.type = type;
				self.openModal(modal);
			};

			self.updateAccessory = function (accessory, modal) {
				self.update = true;
				self.currentAccessory = angular.copy(accessory);
				self.openModal(modal);
			};

			self.saveAccessory = function () {
				if (self.update) {
					dampersFactory.updateAccessory(self.currentAccessory).then(function () {
						self.closeModal();
						self.currentAccessory = {};

						$timeout(function () {
							$state.reload();
						}, 500);
					});
				} else {
					dampersFactory.addAccessoryToDamper(self.damper, self.currentAccessory).then(function () {
						self.closeModal();

						$timeout(function () {
							$state.reload();
						}, 500);
					})
				}
			};

			self.deleteAccessory = function () {
				dampersFactory.deleteAccessory(self.currentAccessory).then(function () {
					self.closeModal();

					$timeout(function () {
						$state.reload();
					}, 500);
				})
			};

			self.onDelete = function () {
				dampersFactory.deleteDamper(self.damper).then(function () {
					$state.go('dampers');
				})
			};

			self.deleteContract = function () {

				dampersFactory.deleteContract(self.currentContract).then(function () {
					self.closeModal();

					$timeout(function () {
						$state.reload();
					}, 500);
				});
			}
		},
		controllerAs: 'ctrl'
	}
}