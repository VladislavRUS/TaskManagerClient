function detailAccessoriesDirective() {
    return {
        scope: {},
        bindToController: {},
        templateUrl: 'scripts/dev/components/detail/accessories/detail-accessories.tmpl.html',
        controller: function() {
            var self = this;
            self.opened = false;

            self.toggle = function() {
                self.opened = !self.opened;
            }

        },
        controllerAs: 'detailAccessoriesCtrl'
    }
}