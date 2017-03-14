function dampersLayoutDirective($timeout, $state, dampersFactory) {
    return {
        scope: {},
        bindToController: {},
        templateUrl: 'scripts/dev/components/layout/dampers/dampers-layout.tmpl.html',
        controller: function() {
            var self = this;
            self.storage = dampersFactory;

            self.onAdd = function() {
                openModal('createDamperModal');
            };

            self.save = function() {
                var damper = {
                    name: self.name,
                    designation: self.designation,
                    expirationDate: self.expirationDate
                };

                dampersFactory.createDamper(damper).then(function() {
                    closeModal('createDamperModal')
                });
            };

            function closeModal(id) {
                var el = angular.element(document).find('#' + id);
                el.modal('hide');
            }

            function openModal(id) {
                var el = angular.element(document).find('#' + id);
                el.modal('show');
            }

            function reloadState() {
                $timeout(function() {
                    $state.reload();
                }, 500);
            }
        },
        controllerAs: 'ctrl'
    }
}