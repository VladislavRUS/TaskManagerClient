function contractsLayoutDirective($timeout, $state, $q, modalFactory, dialogWrapFactory,
    notificationsFactory, contractsFactory, printFactory, toastFactory) {
    return {
        scope: {},
        bindToController: {

        },
        templateUrl: 'scripts/dev/components/layout/contracts/contracts-layout.tmpl.html',
        controller: function() {
            var self = this;

            self.storage = contractsFactory;

            self.onAdd = function() {
                dialogWrapFactory.openDialog('scripts/dev/components/dialog/contract/add/add-contract-dialog.tmpl.html');
            };

        },
        controllerAs: 'ctrl'
    }
}