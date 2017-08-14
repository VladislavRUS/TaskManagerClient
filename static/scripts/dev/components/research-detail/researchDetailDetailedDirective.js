function researchDetailDetailedDirective($timeout, $state, researchDetailsFactory,
										 modalFactory, notificationsFactory, toastFactory) {
	return {
		scope: {},
		bindToController: {
			researchDetail: '<'
		},
		templateUrl: 'scripts/dev/components/research-detail/research-detail-detailed.tmpl.html',
		controller: function () {
			var self = this;
			self.currentStep = {};
			self.nf = notificationsFactory;
			self.update = false;

			var stepModal = 'createStepModal';

			self.onUpdate = function () {
				researchDetailsFactory.updateResearchDetail(self.researchDetail).then(function () {
					toastFactory.successToast('НИОКР успешно обновлен!')
				});
			};

			self.addStep = function () {
				self.update = false;
				self.currentStep = {};
				modalFactory.openModal(stepModal);
			};

			self.saveStep = function () {

				var promise = self.update
					? researchDetailsFactory.updateStep(self.currentStep)
					: researchDetailsFactory.createStep(self.researchDetail, self.currentStep);

				promise.then(function() {
					modalFactory.closeModal();

					if (self.update) {
						toastFactory.successToast('Этап обновлен!');

					} else {
						toastFactory.successToast('Этап создан!');
					}
				});
			};

			self.updateStep = function (step) {
				self.update = true;

				self.currentStep = angular.copy(step);
				modalFactory.openModal(stepModal);
			};

			self.onDelete = function () {
				researchDetailsFactory.deleteResearchDetail(self.researchDetail).then(function () {
					$state.go('research-details');
				});
			};

			self.deleteStep = function () {
				researchDetailsFactory.deleteStep(self.currentStep).then(function () {
					modalFactory.closeModal(stepModal);
				});
			};
		},
		controllerAs: 'ctrl'
	}
}