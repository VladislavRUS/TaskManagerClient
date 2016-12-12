function dialogWrapFactory() {
    var factory = {};

    var templateUrl, isOpened = false;

    factory.open = function(url) {
        templateUrl = url;
        isOpened = true;
    };

    factory.close = function() {
        templateUrl = '';
        isOpened = false;
    };

    factory.getTemplateUrl = function() {
        return templateUrl;
    };

    factory.getOpenState = function() {
        return isOpened;
    };

    return factory;
}