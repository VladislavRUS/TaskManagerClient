function detailContractsDirective() {
    return {
        scope: {},
        bindToController: {
            detail: '<'
        },
        templateUrl: 'scripts/dev/components/detail/contracts/detail-contracts.tmpl.html',
        controller: function() {
            var self = this;
            self.opened = false;

            self.toggle = function() {
                self.opened = !self.opened;
            }
        },
        controllerAs: 'detailContractsCtrl'
    }
}