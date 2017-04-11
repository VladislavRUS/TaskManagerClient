function testEquipmentDetailedDirective($timeout, testEquipmentsFactory) {
    return {
        scope: {},
        bindToController: {
            testEquipment: '<'
        },
        templateUrl: 'scripts/dev/components/test-equipment/test-equipment-detailed.tmpl.html',
        controller: function() {
            var self = this;

            self.onUpdate = function() {
                testEquipmentsFactory.updateTestEquipment(self.testEquipment).then(function () {
                    self.showAlert = true;

                    $timeout(function () {
                        self.showAlert = false;
                    }, 3000);
                });
            }
        },
        controllerAs: 'ctrl'
    }
}