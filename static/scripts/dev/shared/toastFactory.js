function toastFactory() {
	var factory = {};

	factory.toast = function (title, message, options) {
		iziToast.show({
			title: title,
			message: message,
			color: options.color || 'blue'
		});
	};

	factory.successToast = function (text) {
		iziToast.show({
			title: text,
			titleColor: '#fff',
			color: '#16AB39'
		});
	};

	return factory;
}