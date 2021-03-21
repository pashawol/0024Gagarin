
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			beforeLoad: function () {
				document.querySelector("html").classList.add("fixed")
			},
			afterClose: function () {
				document.querySelector("html").classList.remove("fixed")
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
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
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));

		}, { passive: true });
	},
	closeMenu() {
		if (!this.menuMobile) return;
		this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
		this.menuMobile.classList.remove("active");
		[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			if (!container) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		const tabs = document.querySelectorAll(".tabs");
		const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		tabs.forEach(element => {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach((el, index) => {
				const tabIndex = `tab-content-${random}-${index}`;
				el.dataset.tabBtn = tabIndex;
			})
			tabsContent.forEach((el, index) => {
				const tabIndex = `tab-content-${random}-${index}`;
				el.dataset.tabContent = tabIndex;
				const active = el.classList.contains('active') ? 'active' : '';
				console.log(tabsBtn[index].innerHTML);
				el.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary d-block mb-1 ${active}" data-tab-btn="${tabIndex}">${tabsBtn[index].innerHTML}</div>`)
			})
			document.addEventListener('click', function (element) {
				const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = btn.closest('.tabs').querySelectorAll(`[data-tab-btn`);
				const content = btn.closest('.tabs').querySelectorAll(`[data-tab-content]`);
				tabsAllBtn.forEach(element => {
					element.dataset.tabBtn == data
						? element.classList.add('active')
						: element.classList.remove('active')
				});
				content.forEach(element => {
					element.dataset.tabContent == data
						? (element.classList.add('active'), element.previousSibling.classList.add('active'))
						: element.classList.remove('active')
				});
			})
		})

		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
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

		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 2000);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	const x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}



	function whenResize() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.addEventListener('scroll', function (e) {
			this.scrollY > 0
				? topNav.classList.add('fixed')
				: topNav.classList.remove('fixed');
		}, { passive: true })

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	var controller = new ScrollMagic.Controller();


	let height = window.innerHeight;
	var tween = new TimelineMax()
		.from(".picture-block--1", 100, { y: height / 1.8 })
		.from(".picture-block--1 .picture-block__caption", 10, { opacity: 0 })
		.from(".picture-block--2", 200, { y: height })
		.to(".picture-block--1 .picture-block__caption", 10, { opacity: 0 })
		.to(".picture-block--2 .picture-block__caption", 10, { x: '50%', opacity: 0 })
		.to(".picture-block--2 ", 100, { scale: '.8', x: '10%' })
		.from(".picture-block--3", 200, { y: height, delay: -1 })
		.from(".picture-block--3", 200, { scale: '.5', x: '-10%' })
		.to(".picture-block--1, .picture-block--2", 100, { opacity: 0, delay: -50 })
		.to(".headerBlock__block", 100, { opacity: 0, })
		.to(".picture-block--3", 100, { opacity: .4, delay: -50 })
	// build scene
	new ScrollMagic
		.Scene({ triggerElement: ".headerBlock", triggerHook: "onLeave", duration: '500%', offset: '0%' })
		.setTween(tween)
		.setPin(".headerBlock")
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller);
	var tween2 = new TimelineMax()
		.to(".fixed-block p", 1, {y: '-50%', opacity:0})
		.to(".picture-block--3", 100, { opacity: .2})
		.to(".fixed-block , .picture-block--3", 100, { y: '-100%'})

	let scene2 = new ScrollMagic
		.Scene({
			triggerElement: "#trigger1",
			duration: "100%",
			offset: '0%',
			triggerHook: 'onLeave',
		})
		.setTween(tween2)
		.setPin(".fixed-block")
		// .addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)
		.addTo(controller);

	var tween3 = new TimelineMax()
		.from(".sMap h2", 1, {opacity:0})
		.from(".map-block", 1, {y: '50%', opacity:0})
	let scene3 = new ScrollMagic
		.Scene({
			triggerElement: "#sMap",
			duration: "100%",
			// offset: '0%',
			// triggerHook: 'onLeave',
		})
		.setTween(tween3)
		// .setPin(".fixed-block")
		// .addIndicators({name: "3 (duration: 0)"}) // add indicators (requires plugin)
		.addTo(controller);

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