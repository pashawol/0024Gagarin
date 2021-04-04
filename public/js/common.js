"use strict";

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		if (!this.menuMobile) return;
		this.btnToggleMenuMobile.forEach(function (element) {
			return element.classList.remove("on");
		});
		this.menuMobile.classList.remove("active");
		[document.body, document.querySelector('html')].forEach(function (el) {
			return el.classList.remove("fixed");
		});
	},
	mobileMenu: function mobileMenu() {
		var _this = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			if (!container) _this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(min-width: 992px)").matches) _this.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 2000);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	var screenName;
	screenName = document.body.dataset.bg;

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	}

	function whenResize() {
		var topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.addEventListener('scroll', function (e) {
			this.scrollY > 0 ? topNav.classList.add('fixed') : topNav.classList.remove('fixed');
		}, {
			passive: true
		});
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var controller = new ScrollMagic.Controller();
	var height = window.innerHeight;
	var tween = new TimelineMax().from(".picture-block--1", 3000, {
		y: height / 1.8,
		duration: 1500
	}).from(".picture-block--1 .picture-block__caption", 10, {
		opacity: 0,
		duration: 1500
	}).from(".picture-block--2", 3000, {
		y: height,
		duration: 1500
	}).to(".picture-block--1 .picture-block__caption", 10, {
		opacity: 0,
		duration: 1500
	}).to(".picture-block--2 .picture-block__caption", 10, {
		x: '50%',
		opacity: 0,
		duration: 1500
	}).to(".picture-block--2 ", 3000, {
		scale: '.8',
		x: '10%',
		duration: 1500
	}).from(".picture-block--3", 3000, {
		y: height,
		delay: -1,
		duration: 1500
	}).from(".picture-block--3", 3000, {
		scale: '.5',
		x: '-10%',
		duration: 1500
	}).to(".picture-block--1, .picture-block--2", 100, {
		opacity: 0,
		delay: -50,
		duration: 1500
	}).to(".headerBlock__block", 3000, {
		opacity: 0,
		duration: 1500
	}).to(".picture-block--3", 3000, {
		opacity: .4,
		delay: -50,
		duration: 1500
	}); // build scene

	new ScrollMagic.Scene({
		triggerElement: ".headerBlock",
		triggerHook: "onLeave",
		duration: '500%',
		offset: '0%'
	}).setTween(tween).setPin(".headerBlock") // .addIndicators() // add indicators (requires plugin)
	.addTo(controller);
	var tween2 = new TimelineMax().to(".fixed-block p", 3000, {
		y: '-50%',
		opacity: 0,
		duration: 1500
	}).to(".picture-block--3", 3000, {
		opacity: .2,
		duration: 1500
	}).to(".fixed-block , .picture-block--3", 3000, {
		y: '-100%',
		duration: 1500
	});
	var scene2 = new ScrollMagic.Scene({
		triggerElement: "#trigger1",
		duration: "150%",
		offset: '0%',
		triggerHook: 'onLeave'
	}).setTween(tween2).setPin(".fixed-block") // .addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)
	.addTo(controller);
	var tween3 = new TimelineMax().from(".sMap h2", 2000, {
		opacity: 0,
		duration: 1500
	}).from(".map-block", 2000, {
		y: '50%',
		opacity: 0,
		duration: 1500
	});
	var scene3 = new ScrollMagic.Scene({
		triggerElement: "#sMap",
		duration: "100%" // offset: '0%',
		// triggerHook: 'onLeave',

	}).setTween(tween3) // .setPin(".fixed-block")
	// .addIndicators({name: "3 (duration: 0)"}) // add indicators (requires plugin)
	.addTo(controller);
	var mediaSlider = new Swiper('.media-slider--js', {
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.media-slider--js .swiper-button-next',
			prevEl: '.media-slider--js .swiper-button-prev'
		},
		pagination: {
			el: '.media-slider--js .swiper-pagination',
			clickable: true,
			renderBullet: function renderBullet(index, className) {
				return '<span class="' + className + '">' + '</span>';
			}
		},
		on: {
			init: function init(swiper) {
				var next = $(".swiper-slide-next").data("title");
				var prev = $(".swiper-slide-prev").data("title");
				$(".swiper-button-next span").html(next);
				$(".swiper-button-prev span").html(prev);
			},
			slideChangeTransitionEnd: function slideChangeTransitionEnd() {
				var next = $(".swiper-slide-next").data("title");
				var prev = $(".swiper-slide-prev").data("title");
				$(".swiper-button-next span").html(next);
				$(".swiper-button-prev span").html(prev);
			}
		}
	});
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }