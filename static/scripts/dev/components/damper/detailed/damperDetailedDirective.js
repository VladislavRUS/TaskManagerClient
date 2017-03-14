function damperDetailedDirective($state, $timeout, dampersFactory) {
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
            self.update = false;
            var currentModal = null;

            self.onUpdate = function () {
                dampersFactory.updateDamper(self.damper).then(function () {
                    self.showAlert = true;

                    $timeout(function () {
                        self.showAlert = false;
                    }, 3000);
                });
            };

            self.closeModal = function () {
                var el = angular.element(document).find('#' + currentModal);
                el.modal('hide');
            };

            self.openModal = function (id) {
                currentModal = id;
                var el = angular.element(document).find('#' + id);
                el.modal('show');
            };

            self.addContract = function(modal) {
                self.update = false;
                self.currentContract = {};
                self.openModal(modal);
            };

            self.updateContract = function(contract, modal) {
                self.update = true;
                self.currentContract = angular.copy(contract);
                self.openModal(modal);
            };

            self.saveContract = function () {
                if (self.update) {
                    dampersFactory.updateContract(self.currentContract).then(function() {
                        self.closeModal();
                        self.currentContract = {};

                        $timeout(function() {
                            $state.reload();
                        }, 500);
                    });

                } else {
                    dampersFactory.addContractToDamper(self.damper, self.currentContract).then(function() {
                        self.closeModal();

                        $timeout(function() {
                            $state.reload();
                        }, 500);
                    });
                }
            }
        },
        controllerAs: 'ctrl'
    }
}