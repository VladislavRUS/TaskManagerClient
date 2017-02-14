function detailItemDirective($document, $timeout, $q, dialogWrapFactory, dateFactory, detailsFactory, notificationsFactory) {
    return {
        scope: {},
        bindToController: {
            item: '<'
        },
        templateUrl: 'scripts/dev/components/detail/item/detail-item.tmpl.html',
        controller: function() {
            var self = this;

            self.expired = new Date(self.item.expirationDate).getTime() < new Date().getTime();

            self.toggleContracts = function() {
                self.isOpened = !self.isOpened;

                if (self.isOpened) {
                    $timeout(function() {
                        var contract = angular.element(document.getElementById(self.item.uuid + '-table'));
                        $document.scrollToElement(contract, 100, 300);
                    }, 200);
                }
            };
        },
        controllerAs: 'detailItemCtrl'
    }
}