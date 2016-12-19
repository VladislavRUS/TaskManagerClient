function AddContractDialogController(dialogWrapFactory, detailsFactory) {
    var self = this;

    self.onSave = function() {
        var contract = {
            agreement: self.agreement,
            customer: self.customer,
            amount: self.amount,
            quoter: self.quoter,
            year: self.year,
            prepaidNote: self.prepaidNote
        };

        var detail = dialogWrapFactory.getParams().detail;
        detailsFactory.addContractToDetail(detail, contract);
        dialogWrapFactory.close();
    };

    self.onCancel = function() {
        dialogWrapFactory.close();
    }
}