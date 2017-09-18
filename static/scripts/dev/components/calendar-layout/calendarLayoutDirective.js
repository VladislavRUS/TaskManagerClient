function calendarLayoutDirective($timeout, $q, $window, $state, uiCalendarConfig,
    eventsFactory, notificationsFactory, modalFactory, toastFactory) {
    return {
        scope: {},
        bindToController: {},
        templateUrl: 'scripts/dev/components/calendar-layout/calendar-layout.tmpl.html',
        controller: function($scope) {
            var self = this;

            self.currentDate = new Date();
            self.currentEvent = {};
            self.update = false;

            $scope.eventSources = [];

            $scope.uiConfig = {
                calendar: {
                    editable: false,
                    header: {
                        left: 'month',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    displayEventTime: false,
                    height: '450',
                    dayClick: function(date) {
                        modalFactory.openModal('createEventModal');

                        self.currentEvent = {};
                        self.currentEvent.date = new Date(date);
                        self.update = false;
                    },

                    eventClick: function(calEvent, jsEvent, view) {

                        modalFactory.openModal('createEventModal');

                        self.currentEvent = {};
                        self.currentEvent.title = calEvent.title;
                        self.currentEvent.date = calEvent.start._i;
                        self.currentEvent.comment = calEvent.comment;
                        self.currentEvent.custom = calEvent.custom || false;
                        self.currentEvent.uuid = calEvent.uuid;
                        self.currentEvent.link = calEvent.link;
                        self.currentEvent.linkText = calEvent.linkText;

                        self.update = true;
                    },

                    dayRender: function(date, cell) {
                        var day = new Date(date);
                        var isWeekend = false;

                        if (day.getDay() === 6 || day.getDay() === 0) {
                            isWeekend = true;
                        }

                        if (isWeekend) {
                            $(cell).css({
                                'background-color': '#ffc4b7'
                            });
                        }
                    },

                    lang: 'ru'
                }
            };

            self.updateEventSources = function() {
                $scope.eventSources.length = 0;

                var p1 = notificationsFactory.getNotifications();
                var p2 = eventsFactory.getEvents();

                $q.all(p1, p2).then(function() {
                    var userEvents = eventsFactory.events.map(function(event) {
                        return {
                            uuid: event.uuid,
                            title: event.title,
                            start: new Date(event.date),
                            comment: event.comment,
                            color: '#2196F3'
                        }
                    });

                    $scope.eventSources.push({
                        events: userEvents
                    });

                    var notificationEvents = notificationsFactory.notifications.

                    filter(function(n) {
                        return n.type.split(':')[0] !== 'event';

                    }).map(function(n) {
                        return {
                            uuid: n.uuid,
                            title: n.title,
                            start: n.date,
                            comment: n.text,
                            link: n.link,
                            linkText: n.linkText,
                            custom: true,
                            color: getNotificationColor(n)
                        }
                    });

                    $scope.eventSources.push({
                        events: notificationEvents
                    });
                });

            };

            function getNotificationColor(n) {
                var type = n.type.split(':')[1];

                if (type === 'yellow') {
                    return '#FFC107';

                } else if (type === 'red') {
                    return '#F44336';

                } else return 'blue';
            }

            self.go = function(link) {
                modalFactory.closeModal();

                $timeout(function() {
                    window.location.href = '#/' + link;
                }, 500);
            };

            self.save = function() {
                var promise = self.update ?
                    eventsFactory.updateEvent(self.currentEvent) :
                    eventsFactory.addEvent(self.currentEvent);

                promise.then(function() {
                    modalFactory.closeModal();

                    if (self.update) {
                        toastFactory.successToast('Событие обновлено!');

                    } else {
                        toastFactory.successToast('Событие создано!');
                    }

                    self.updateEventSources();
                    $state.reload();
                });
            };

            self.delete = function() {
                var event = { uuid: self.currentEvent.uuid };

                modalFactory.closeModal();

                eventsFactory.removeEvent(event).then(function() {
                    toastFactory.successToast('Событие удалено!');
                    self.updateEventSources();
                });
            };

            self.updateEventSources();
        },

        controllerAs: 'ctrl'
    }
}