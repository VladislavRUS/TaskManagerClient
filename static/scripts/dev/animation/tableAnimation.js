function tableAnimation() {
    return {
        enter: function(element, doneFn) {
            element.velocity('slideDown', {
                duration: 300,
                easing: [0.4, 0.0, 0.2, 1]
            })
        },
        leave: function(element, doneFn) {
            element.velocity('slideUp', {
                duration: 300,
                easing: [0.4, 0.0, 0.2, 1]
            })
        }
    }
}