function responseInterceptor($q, $injector) {
    return {
        response: function(response) {

            var nf = $injector.get('notificationsFactory');
            nf.getNotifications();

            return response;
        }
    }
}