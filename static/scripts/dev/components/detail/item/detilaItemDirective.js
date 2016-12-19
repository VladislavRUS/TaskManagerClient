function detailItemDirective(dialogWrapFactory) {
    return {
        scope: {},
        bindToController: {
            item: '<'
        },
        templateUrl: 'scripts/dev/components/detail/item/detail-item.tmpl.html',
        controller: function() {
            var self = this;
            self.isOpened = false;

            self.toggleContracts = function() {
                self.isOpened = !self.isOpened;
            };

            self.addContract = function() {
                dialogWrapFactory.open('scripts/dev/components/dialog/contract/add/add-contract-dialog.tmpl.html', {
                    detail: self.item
                })
            }
        },
        controllerAs: 'detailItemCtrl'
    }
}