window.addEventListener('DOMContentLoaded', function () {

	const rangeSlider = document.getElementById('range-slider');
	noUiSlider.create(rangeSlider, {
		start: [0, 154060],
		connect: true,
		step: 1,
		range: {
			'min': [0],
			'max': [154600]
		}
	});

	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	rangeSlider.noUiSlider.on('update', function (values, handle) {
		inputs[handle].value = Math.round(values[handle]);

	});

	const setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setRangeSlider(index, e.currentTarget.value);
		});
	});

	const rangeSliderSquare = document.getElementById('range-slider-square');

	noUiSlider.create(rangeSliderSquare, {
		start: [15, 42],
		connect: true,
		step: 1,
		range: {
			'min': [15],
			'max': [42]
		}
	});

	const input2 = document.getElementById('input-2');
	const input3 = document.getElementById('input-3');
	const inputsSquare = [input2, input3];

	rangeSliderSquare.noUiSlider.on('update', function (values, handle) {
		inputsSquare[handle].value = Math.round(values[handle]);
	});

	const setRangeSliderSquare = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		rangeSliderSquare.noUiSlider.set(arr);
	};

	inputsSquare.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setRangeSliderSquare(index, e.currentTarget.value);
		});
	});

	const rangeSliderPower = document.getElementById('range-slider-power');

	noUiSlider.create(rangeSliderPower, {
		start: [15, 150],
		connect: true,
		step: 1,
		range: {
			'min': [15],
			'max': [150]
		}
	});

	const input4 = document.getElementById('input-4');
	const input5 = document.getElementById('input-5');
	const inputsPower = [input4, input5];

	rangeSliderPower.noUiSlider.on('update', function (values, handle) {
		inputsPower[handle].value = Math.round(values[handle]);
	});

	const setRangeSliderPower = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		rangeSliderPower.noUiSlider.set(arr);
	};

	inputsPower.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setRangeSliderPower(index, e.currentTarget.value);
		});
	});

	const rangeSliderNoise = document.getElementById('range-slider-noise');

	noUiSlider.create(rangeSliderNoise, {
		start: [1, 150],
		connect: true,
		step: 1,
		range: {
			'min': [1],
			'max': [150]
		}
	});

	const input6 = document.getElementById('input-6');
	const input7 = document.getElementById('input-7');
	const inputsNoise = [input6, input7];

	rangeSliderNoise.noUiSlider.on('update', function (values, handle) {
		inputsNoise[handle].value = Math.round(values[handle]);
	});

	const setrangeSliderNoise = (i, value) => {
		let arr = [null, null];
		arr[i] = value;

		rangeSliderNoise.noUiSlider.set(arr);
	};

	inputsNoise.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setrangeSliderNoise(index, e.currentTarget.value);
		});
	});


	// Сортировка

	const defaultSelect = () => {
		const element = document.querySelector('select');
		const choices = new Choices(element, {
			searchEnabled: false,
			shouldSort: false,
		});

		let ariaLabel = element.getAttribute('aria-label');
		element.closest('.choices').setAttribute('aria-label', ariaLabel);
	};
	defaultSelect();


	//Work Slider

	var swiperWork = new Swiper('.work__swiper', {
		slidesPerView: 1,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		on: {
			init: function () {
				const paginationBullet = document.querySelectorAll('.work-pagination .swiper-pagination-bullet');

				paginationBullet.forEach(el => {
					el.innerHTML = `<span class="work-bar"><span>`
				})
			}
		}
	});

	//Reputation Slider

	var swiperReputation = new Swiper('.reputation__swiper', {
		slideClass: 'reputation-slide',
		slidesPerView: 1,
		navigation: {
			nextEl: ".reputation-button-next",
			prevEl: ".reputation-button-prev",
		},
	});

	var swiperSertificate = new Swiper('.reputation__block-right-slider', {
		slideClass: 'sertificate-slide',
		slidesPerView: 1,
		spaceBetween: 20,
		breakpoints: {
			1560: {
				slidesPerView: 2,
				spaceBetween: 0
			},

		},
		autoplay: {
			delay: 5000,
		},
	});

	//Валидация формы

	const selector = document.querySelector("input[type='tel']");
	var im = new Inputmask("+7(999) 999-99-99");
	im.mask(selector);

	new JustValidate('.discount__container-content-form', {
		rules: {
			name: {
				required: true,
				minLength: 2,
				maxLength: 11
			},

			tel: {
				required: true,
				function: (name, value) => {
					const phone = selector.inputmask.unmaskedvalue();
					return Number(phone) && phone.length === 10
				}
			},
		},
		messages: {
			name: 'Введите имя',
			tel: 'Введите телефон'
		},
	});

	//Карта

	ymaps.ready(init);

	function init() {
		var myMap = new ymaps.Map('map', {
			center: [59.88920622572573, 30.39635994825744],
			zoom: 16
		});

		var myGeoObject = new ymaps.GeoObject({
			geometry: {
				type: "Point", // тип геометрии - точка
				coordinates: [59.88789606422914, 30.416991500000016] // координаты точки
			}
		});

		var myPlacemark = new ymaps.Placemark([59.88920622572573, 30.39635994825744], {
			balloonContent: `
			<div class="balloon">
			<strong>Мисталь</strong>
			<p class="balloon__descr">
			  закрыто
			</p>
		  </div>
			`,
		}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/favicon.svg',
			iconImageSize: [16, 16],
			iconImageOffset: [-3, -42]
		});

		myMap.geoObjects.add(myPlacemark);
	}


	//Больше карточек товаров

	if (window.innerWidth < 768) {
		jQuery(document).ready(function ($) {
			if ($('.right__products').find('.right__products-item').length > 3) {
				$('.products__btn').click(function () {
					$('.right__products-item:nth-child(n+4)').slideToggle('');
					$(this).toggleClass('opnd_g');
					if ($(this).hasClass('opnd_g')) {
						$(this).html('Ты все посмотрел');
					} else {
						$(this).html('Больше товаров');
					}
				});
			} else {
				$('.products__btn').hide();
			}
		});
	}

	//Бургер

	document.querySelector('#burger').addEventListener('click', function () {
		document.querySelector('#menu').classList.toggle('is-active');
		document.querySelector('#menu').classList.add("shadow");
	});

	document.getElementById('#close').addEventListener('click', function () {
		document.querySelector('#menu').classList.toggle('is-active');
		document.querySelector('#menu').classList.remove("shadow");
	})

	//Симплбар

	let manufacturer = document.querySelectorAll('.left__manufacturer-list');
	manufacturer.forEach(el => {
		new SimpleBar(el, {
			scrollbarMaxSize: 28
		});
	});

})
