function researchDetailsLayoutDirective($state, researchDetailsFactory, modalFactory, toastFactory) {
    return {
        scope: {},
        bindToController: {},
        templateUrl: 'scripts/dev/components/layout/research-details/research-details-layout.tmpl.html',
        controller: function () {
            var self = this;
            var modalId = 'createResearchDetailModal';

            self.storage = researchDetailsFactory;

            self.onAdd = function () {
                modalFactory.openModal(modalId);
            };

            self.save = function () {
                var researchDetail = {
                    requirements: self.requirements,
                    contract: self.contract,
                    name: self.name,
                    vendor: self.vendor,
                    head: self.head,
                    customer: self.customer
                };

                researchDetailsFactory.createResearchDetail(researchDetail).then(function () {
                    modalFactory.closeModal(modalId);
					toastFactory.successToast('НИОКР добавлен!');
                });
            };

            self.onClick = function(researchDetail) {
                $state.go('research-details-detailed', {uuid: researchDetail.uuid});
            };
        },
        controllerAs: 'ctrl'
    }
}