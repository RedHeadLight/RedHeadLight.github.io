/**
 * Отправляет или запрашивает данные.
 * @param {?HTMLElement} form - Форма. Или можно передать data.
 * @param {?string} action - URL сервера. Если не передано - берётся у form.
 * @param {?data} data - Данные, которые надо передать (если нет form).
 * @param {?string} method - Метод. По умолчанию "POST".
 */

async function sendData(form, action, data, method) {
	let url = action ? action : form.action;

	let options = {
		method: method ? method : "POST",
	};

	let formData = null;

	if (form) {
		formData = new FormData(form);
	} else {
		formData = JSON.stringify(data);
	}

	if (options.method.toUpperCase() != "GET") {
		options.body = formData;
	}

	const res = await fetch(url, options);

	if (!res.ok) {
		console.warn(res);
		let err = new Error("HTTP status code: " + res.status);
		throw err;
	}

	return res;
}


// Закрытие модалки.
let modalCloseBtn = document.querySelector('.modal__close')
if (modalCloseBtn) {
	modalCloseBtn.addEventListener('click', () => {
		let modalOverlay = document.querySelector('.modalOverlay')
		let modal = modalCloseBtn.closest('.modal--visible')

		if(modalOverlay) {
			modalOverlay.classList.remove('modalOverlay--visible')
		}
		if(modal) {
			modal.classList.remove('modal--visible')
		}
	})
}

// Маска на поля с телефоном.
let phoneInputs = document.querySelectorAll('.phoneInput')

phoneInputs.forEach((item) => {
	IMask(
	  item.querySelector('.modalField__input'),
	  {
		mask: '+{7}(000)000-00-00'
	  }
	)
})



let mobileMenuBtns = document.querySelectorAll('.header__mobileOpenBtn, .header__mobileCloseBtn')
let menuLinks = document.querySelectorAll('.header__menu a')

mobileMenuBtns.forEach((item) => {
	item.addEventListener('click', () => {
		document.querySelector('.header__menu').classList.toggle('header__menu--active')
	})
})

menuLinks.forEach((item) => {
	item.addEventListener('click', () => {
		document.querySelector('.header__menu').classList.remove('header__menu--active')
	})
})


let mapPreviewBtn = document.querySelector('.mapPreview__btn')
let mapClubs = document.querySelector('.mapPreview')

if (mapPreviewBtn && mapClubs) {
	mapPreviewBtn.addEventListener('click', () => {
		mapClubs.classList.toggle('mapPreview--active')
	})
}


let scrollUpBtn = document.querySelector('.scrollUp')

if (scrollUpBtn) {
	scrollUpBtn.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	})
}
