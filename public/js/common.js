"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '.btn-modal-js';
		Fancybox.bind(link, {
			arrows: false,
			// // infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			type: 'inline',
			dragToClose: false,
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			showClass: "fancybox-throwOutUp",
			hideClass: "fancybox-throwOutDown",
			l10n: {
				CLOSE: "Закрыть",
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				MODAL: "Вы можете закрыть это модальное окно с помощью клавиши ESC.",
				ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
				IMAGE_ERROR: "Изображение не найдено",
				ELEMENT_NOT_FOUND: "HTML-элемент не найден",
				AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: не найдено",
				AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: запрещено",
				IFRAME_ERROR: "Ошибка загрузки iframe",
			},
			on: {
				done: (fancybox, slide) => {
					setTimeout(() => {
						
						JSCCommon.inputMask
					}, 1000);
				}
			}
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if(!element) return;
			let modal = document.querySelector(element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    toggle.forEach((el) => el.classList.toggle('on'));
    menu.classList.toggle('active');
    // [document.body, document.querySelector('html')].forEach((el) => el.classList.toggle('fixed'));
  },
  closeMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    toggle.forEach((element) => element.classList.remove('on'));
    if (menu) {
      menu.classList.remove('active');
      // [document.body, document.querySelector('html')].forEach((el) => el.classList.remove('fixed'));
    }
  },
  mobileMenu() {
    document.addEventListener('click', (event) => {
        let container = event.target.closest('.menu-mobile--js'); // (1)
        let toggle = event.target.closest('.toggle-menu-mobile--js'); // (1)
        if (toggle) this.toggleMenu();
        if (!container && !toggle) this.closeMenu();
      },
      { passive: true },
    );

    // window.addEventListener('resize', () => {
    //     if (window.matchMedia('(min-width: 992px)').matches) this.closeMenu();
    //   },
    //   { passive: true },
    // );
  },

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+7 999-999-99-99", showMaskOnHover: false}).mask(InputTel); 


		let validator = $('form').jbvalidator({
			errorMessage: true,
			//successClass: true,
			language: '/ru-validator.json'
		});
		validator.validator.custom = function (el, event) {
			if ($(el).is('[name=email_confirm]')) {
				if ($(el).closest('form').find('input[name=email]').val() !== $(el).val()) {
					return 'Подтвердите адрес электронной почты.';
				}
			}
			if ($(el).is('[name=preview_text]')) {
				if (!/^[?!,.а-яА-ЯёЁ0-9\s]+$/.test($(el).val()) && $(el).val().length) {
					return 'Ошибка в символе.';
				}
			}
		}
	},
	// /inputMask
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});


		// async function submitForm(event) {
		// 	event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
		// 	try {
		// 		// Формируем запрос
		// 		const response = await fetch(event.target.action, {
		// 			method: 'POST',
		// 			body: new FormData(event.target)
		// 		});
		// 		// проверяем, что ответ есть
		// 		if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
		// 		// проверяем, что ответ действительно JSON
		// 		const contentType = response.headers.get('content-type');
		// 		if (!contentType || !contentType.includes('application/json')) {
		// 			throw ('Ошибка обработки. Ответ не JSON');
		// 		}
		// 		// обрабатываем запрос
		// 		const json = await response.json();
		// 		if (json.result === "success") {
		// 			// в случае успеха
		// 			alert(json.info);
		// 		} else {
		// 			// в случае ошибки
		// 			console.log(json);
		// 			throw (json.info);
		// 		}
		// 	} catch (error) { // обработка ошибки
		// 		alert(error);
		// 	}
		// }
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		$('.dd-head-js').on('click', function () {
      let clickedHead = this;
      $(this).parent().toggleClass('active');
      $(this)
        .next()
        .slideToggle(function () {
          $(this).toggleClass('active');
        });
    });
		// let parents = document.querySelectorAll('.dd-group-js');
		// for (let parent of parents) {
		// 	if (parent) {
		// 		// childHeads, kind of funny))
		// 		let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
		// 		$(ChildHeads).click(function () {
		// 			let clickedHead = this;

		// 			$(ChildHeads).each(function () {
		// 				if (this === clickedHead) {
		// 					//parent element gain toggle class, style head change via parent
		// 					$(this.parentElement).toggleClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideToggle(function () {
		// 						$(this).toggleClass('active');
		// 					});
		// 				}
		// 				else {
		// 					$(this.parentElement).removeClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideUp(function () {
		// 						$(this).removeClass('active');
		// 					});
		// 				}
		// 			});

		// 		});
		// 	}
		// }
	},
	imgToSVG() {
    const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);
	
			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;
	
						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};
	
		convertImages('.img-svg-js');
  },
	disabledBtn(input = '.form-wrap__policy input', btn = ".form-wrap__btn", parent = ".form-wrap") {
		$(document).on("change", input, function () {
			let btnDisabled = $(this).parents(parent).find(btn)
			if (this.checked) {
				btnDisabled.removeAttr('disabled');
			}
			else {
				btnDisabled.attr('disabled', 'disabled');
			}
		})
	}
};
const $ = jQuery;

function eventHandler() { 
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.disabledBtn();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	// var x = window.location.host;
	// let screenName;
	// screenName = 'screen/'+document.body.dataset.bg;
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`);
	// }


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	
	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});
	
	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	// modal window

	
    

	let opt = {
		slidesPerView: 'auto',
		loop: false,
		// speed: 1400,
		spaceBetween: 0,
		// parallax: true,
		// scrollbar: {
		// 	el: '.swiper-scrollbar',
		// 	draggable: true,
		// },
		// lazy: {
		// 	loadPrevNext: true,
		// 	loadPrevNextAmount: 3
		// },

	}

	const NewsSwiper = new Swiper('.sNews__slider--js', {
		...opt,
		navigation: {
			nextEl: '.sNews .swiper-button-next',
			prevEl: '.sNews .swiper-button-prev',
		}
	});
	new Swiper('.sPartners__slider--js', {
		...opt,
		spaceBetween: 20,
		navigation: {
			nextEl: '.sPartners .swiper-button-next',
			prevEl: '.sPartners .swiper-button-prev',
		}
	});

	// const NewsSwiperMd = new Swiper('.sNews__slider--md-js', opt);

	// const NewsSwiperMd2 = new Swiper('.sNews__slider--md2-js', opt);

	// NewsSwiper.controller.control = [NewsSwiperMd, NewsSwiperMd2];
	// NewsSwiperMd.controller.control = NewsSwiper;
	// NewsSwiperMd2.controller.control = NewsSwiper;

	

	let panzoomClass = document.querySelector('.f-panzoom');
	if (panzoomClass) {
		new Panzoom(panzoomClass, {
			wheel: false,
			// // baseScale: 0,
			// click: false,
			// zoomInCentered: false,
			Toolbar: {
				display: ["zoomIn", "zoomOut"],
			},
		}, { Toolbar });
	};


	document.addEventListener('click', (event) => {
		let customInputs = document.querySelectorAll('.custom-input-wrap .custom-input__input');
		let customInputTarget = event.target.closest('.custom-input-wrap .custom-input__input');
		if(customInputTarget) {
			if(customInputTarget.dataset.face === 'legal') {
				document.querySelectorAll('.form-wrap__legal-col').forEach((item) => {
					item.classList.add('active');
				})
			} else {
				document.querySelectorAll('.form-wrap__legal-col').forEach((item) => {
					item.classList.remove('active');
				})
			}
		}
	})

	let filepondArr = document.querySelectorAll('.filepond--js');
	if (filepondArr.length) {
		filepondArr.forEach((item) => {
			pond = FilePond.create(item, {
				labelIdle: 'Прикрепить файл',
				styleButtonRemoveItemPosition: 'right',
			});
		})
	}

	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
	var popover = [...tooltipTriggerList].map((tooltipTriggerElem) => new bootstrap.Popover(tooltipTriggerElem, {
		offset: [-10, 0], 
		trigger: 'hover',
		placement: 'top',
	}));


};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }