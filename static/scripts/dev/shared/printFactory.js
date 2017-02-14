function printFactory($http, restServiceFactory) {
    var factory = {};

    factory.printArray = [];

    factory.addToPrintArray = function (item) {
        factory.printArray.push(item);
    };

    factory.removeFromPrintArray = function (item) {
        factory.printArray = factory.printArray.filter(function (obj) {
            return obj.uuid != item.uuid;
        });
    };

    factory.sendToPrint = function (page) {
        switch (page) {
            case 'details': {
                var uuidList = factory.printArray.map(function (obj) {
                    return obj.uuid;
                });
                $http({
                    method: 'POST',
                    url: restServiceFactory.detailsPrint,
                    responseType: 'arraybuffer'
                }).then(function (resp) {
                    factory.saveData(resp.data, 'report.docx');
                });
                break;
            }
        }
    };

    factory.saveData = function (data, fileName) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);

    };

    return factory;
}