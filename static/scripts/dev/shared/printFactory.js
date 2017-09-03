function printFactory($http, restServiceFactory, fileFactory) {
    var factory = {};

    factory.printList = function (printArray) {
		factory.print(restServiceFactory.printList, printArray);
	};

	factory.printNomenclature = function (printArray) {
	    factory.print(restServiceFactory.printNomenclature, printArray);
	};

    factory.print = function(url, printArray) {
		$http({
			method: 'POST',
			url: url,
			responseType: 'arraybuffer',
			data: { uuidList: printArray }
		}).then(function (resp) {

			fileFactory.makeFile(resp.data, getName());

		});
    };

    function getName() {
        var date = new Date();
        return 'report(' + date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear() + '__' + date.getHours() + ':' + date.getMinutes() + ').docx';
    }

    return factory;
}