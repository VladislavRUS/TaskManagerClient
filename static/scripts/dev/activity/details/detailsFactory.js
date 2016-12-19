function detailsFactory($http, restServiceFactory) {
    var factory = {};

    factory.getDetails = function() {
        $http.get(restServiceFactory.detailsReadAll).then(function(resp) {
            factory.details = resp.data;
        });
    };

    factory.addContractToDetail = function(detail, contract) {
        $http.post(restServiceFactory.createContract.replace('{detailUUID}', detail.uuid), contract).then(function(resp) {
            factory.getDetails();
        })
    };

    factory.deleteContractFromDetail = function(detail, contract) {
        var url = restServiceFactory.deleteContract;
        url = url.replace('{detailUUID}', detail.uuid);
        url = url.replace('{UUID}', contract.uuid);

        $http.delete(url).then(function(resp) {
            factory.getDetails();
        })
    };

    factory.createDetail = function(detail) {
        $http.post(restServiceFactory.detailsCreate, detail).then(function(resp) {
            factory.getDetails();
        })
    };

    factory.deleteDetail = function(detail) {
        $http.delete(restServiceFactory.detailsDelete.replace('{UUID}', detail.uuid)).then(function(data) {
            factory.getDetails();
        })
    };

    return factory;
}