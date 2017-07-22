(function (global) {
	
	function populateDate() {
		if ($('.js-input-date').length) {
			$('.js-input-date').val('26th of July');
		}
	}
	
	function populateShareLink() {
		if ($('.js-share-link').length) {
			var path = window.location.href;
			var realPath;
			var pathParts = path.split('/');

			if (pathParts.length > 1) {
				realPath = '';

				for(var i = 0 ; i < pathParts.length - 1 ; i++) {
					realPath += pathParts[i] + '/';
				}

				realPath += 'UserContractPage';
			} else {
				realPath = path + 'UserContractPage';
			}

			$('.js-share-link')
				.attr('href', realPath)
				.text(realPath);
		}
	}

	$(".js-go-to-events").click(function () {
		var path = window.location.href;
		var realPath;

		if (path.split('?').length > 1) {
			realPath = path.split('?')[0];
		} else {
			realPath = path;
		}

		window.location.href = path + 'ViewEventsPage';
	});

	$(".js-submit-organize-form").click(function (e) {
		e.preventDefault();
		var nextStep = false;
		var createContract = false;
		// get form info

		var name = $('.js-input-name').val();
		var location = $('.js-input-location').val();
		var date = $('.js-input-date').val();

		if (name && location && date) {
			nextStep = true;
		}

		// create contract

		// create link (optional)

		if (nextStep) {
			window.location.href = window.location.href + 'EventConfirmationPage';
		}
	});

	populateDate();
	populateShareLink();

}(window));