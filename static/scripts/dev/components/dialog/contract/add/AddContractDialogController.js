function AddContractDialogController($timeout, dialogWrapFactory, dampersFactory, toastFactory) {
    var self = this;
    var dropdownInit = false;

    self.update = dialogWrapFactory.getParams().update;
    self.damper = dialogWrapFactory.getParams().damper;

    dampersFactory.getDampers();

    self.dampers = dampersFactory.dampers;

    self.items = [];

    if (self.update) {
        self.contract = dialogWrapFactory.getParams().contract;

    } else {
        self.contract = {
            amount: 1,
            quoter: 1,
            year: new Date().getFullYear()
        };
    }

    self.newItem = function () {
        self.items.push({
            damperUuid: '',
            amount: 0,
            expirationDate: new Date(),
            accepted: 0
        });

        $timeout(function () {
            $('.ui.dropdown').dropdown();
        });
    };

    self.removeItem = function (idx) {
        self.items.splice(idx, 1);
    }

    self.onSave = function () {
        console.log(self.items);
        return;

        if (self.update) {
            dampersFactory.updateContract(self.contract).then(function () {
                toastFactory.successToast('Договор обновлен!')
            });

        } else {
            dampersFactory.addContractToDamper(self.damper, self.contract).then(function () {
                toastFactory.successToast('Договор создан!')
            });
        }

        dialogWrapFactory.closeDialog();
    }

    self.onDelete = function () {
        dampersFactory.deleteContract(self.contract).then(function () {
            toastFactory.successToast('Договор удален!')
        });

        dialogWrapFactory.closeDialog();
    }

    self.onCancel = function () {
        dialogWrapFactory.closeDialog();
    }
}