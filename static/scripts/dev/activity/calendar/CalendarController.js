function CalendarController($rootScope, loginFactory, eventsFactory) {
    var self = this;

    self.loginFactory = loginFactory;

    $rootScope.$emit('updateNotifications');
}