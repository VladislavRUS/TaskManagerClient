function modalFactory($q, $timeout) {
    var factory = {};
    factory.deferred = null;
    factory.currentModal = null;

    factory.openModal = function (modalId, approveCallback, successCallback, errorCallback) {
        factory.deferred = $q.defer();
        factory.currentModal = modalId;

        var el = angular.element(document).find('#' + modalId);
        el.modal({

            onHide: function () {
                $timeout(function() {
                    factory.deferred.resolve();
                }, 1000);
            },
            onApprove: function () {
                return false;
            }

        }).modal('show');
    };

    factory.closeModal = function () {

        $('#' + factory.currentModal).modal('hide');

        return factory.deferred.promise;
    };

    return factory;
}