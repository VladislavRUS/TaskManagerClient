function detailAccessoriesDirective(dialogWrapFactory) {
    return {
        scope: {},
        bindToController: {
            detail: '<'
        },
        templateUrl: 'scripts/dev/components/detail/accessories/detail-accessories.tmpl.html',
        controller: function () {
            var self = this;
            self.opened = false;

            self.toggle = function () {
                self.opened = !self.opened;
            };

            self.addAccessory = function () {
                dialogWrapFactory.open('scripts/dev/components/dialog/accessory/add/add-accessory-dialog.tmpl.html', {
                    detail: self.detail
                });
            }

        },
        controllerAs: 'detailAccessoriesCtrl'
    }
}