function testEquipmentsFactory($http, $q, restServiceFactory) {
	var factory = {};

	factory.testEquipments = [];

	factory.createTestEquipment = function (testEquipment) {
		var deferred = $q.defer();

		$http.post(restServiceFactory.testEquipmentsCreate, testEquipment).then(function (resp) {
			factory.getTestEquipments().then(deferred.resolve);

		}, function () {
			deferred.reject();
		});

		return deferred.promise;
	};

	factory.getTestEquipments = function () {
		var deferred = $q.defer();

		$http.get(restServiceFactory.testEquipmentsAll).then(function (resp) {
			factory.testEquipments = resp.data;
			deferred.resolve();

		}, function () {
			deferred.reject();
		});

		return deferred.promise;
	};

	factory.updateTestEquipment = function(testEquipment) {
		var deferred = $q.defer();

		$http.delete(restServiceFactory.testEquipmentsUpdate.replace('{uuid}', testEquipment.uuid)).then(function (data) {
			factory.getTestEquipments().then(deferred.resolve);
		});

		return deferred.promise;
	};

	factory.deleteTestEquipment = function (testEquipment) {
		var deferred = $q.defer();

		$http.delete(restServiceFactory.testEquipmentsDelete.replace('{uuid}', testEquipment.uuid)).then(function (data) {
			factory.getTestEquipments().then(deferred.resolve);
		});

		return deferred.promise;
	};

	return factory;
}