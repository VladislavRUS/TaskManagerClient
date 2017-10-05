function AddResearchDetailDialogController(dialogWrapFactory, researchDetailsFactory, toastFactory) {
    var self = this;

    self.researchDetail = {};

    self.onSave = function() {
        researchDetailsFactory.createResearchDetail(self.researchDetail).then(function() {
            toastFactory.successToast('НИОКР добавлен!');
        });

        dialogWrapFactory.closeDialog();
    };

    self.onCancel = function() {
        dialogWrapFactory.closeDialog();
    }
}