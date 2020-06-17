let i = 0;

// Clickable menu section starts here
let button = document.querySelector("div#menu img");
let menu = document.getElementById("clickableMenu");
let close = document.querySelector("div#icon > img")

button.onclick = function() {
	menu.style.right = "0";
	menu.style.transition = "right 0.5s";
}
close.onclick = function() {
	menu.style.right = "-400px";
	menu.style.transition = "right 0.5s";
}

// let options = document.querySelectorAll("div#cMenu > ul > li.menu");
// let subMenu = document.querySelectorAll("div#cMenu > ul > li > ul");
// Clickable menu section ends here

$(document).ready(function() {

	// Third slider starts here
	$('#thirdSlider .owl-carousel').owlCarousel({
		loop:true,
		nav:true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:5
			},
			1000:{
				items:8
			}
		}
	})

	$("#thirdSlider .owl-carousel").owlCarousel();
	// Third slider ends here

	$("div#cMenu > ul > li.menu").click(function() {
		$(this).children("ul").slideDown(500, function() {
			$("div#cMenu > ul > li.menu").click(function() {
				$(this).children("ul").slideUp(500)
			})
		});
	})

	// Filter section starts here
	$("div#cards div.row > div").mouseenter(function() {
		$(this).find("p:first-child").css({
			"-webkit-transform": "translateX(-30px)",
			"-webkit-transition": "-webkit-transform 0.5s"
		})
		$(this).find("p:last-child").css({
			"-webkit-transform": "translateX(200px)",
			"-webkit-transition": "-webkit-transform 0.5s"
		})
	})
	$("div#cards div.row > div").mouseleave(function() {
		$(this).find("p:first-child").css({
			"-webkit-transform": "translateX(-220px)",
			"-webkit-transition": "-webkit-transform 0.5s"
		})
		$(this).find("p:last-child").css({
			"-webkit-transform": "translateX(0)",
			"-webkit-transition": "-webkit-transform 0.5s"
		})
	})

	$("div#options ul li").click(function(ev) {
		ev.preventDefault();
		let category = $(this).attr("data-category");
		let node = $("div#cards div.row > div");
		let cards = Array.from(node);
		for (i = 0; i < cards.length; i++) {
			if ((cards[i].classList.contains(category) == true) == true) {
				$(cards[i]).css({
					"display": "block",
					"margin-right": "40px"
				});
				$("div#cards div.row").css("justify-content", "flex-start")
			} else {
				$(cards[i]).css("display", "none")
			}
		}
		for (i = 0; i < $(this).length; i++) {
			if (($(this).children("a").attr("class") == "clickedColor") != true) {
				$("div#options ul li").find("a.clickedColor").removeClass("clickedColor");
				$(this).children("a").addClass("clickedColor");
			}
		}
	})
	// Filter section ends here

	// Accordion page starts here
	$("section#accordionPage h6").click(function() {
        let value = $(this).next().attr("data-index");
        if ($(this).next()[0] != $(".active[data-index=" + value + "]")[0]) {
            $(".active[data-index=" + value + "]").slideUp("200", function() {
                $(this).removeClass("active")
            }).prev().removeClass("clickedColor clickedBackground");
            $(this).next().slideDown("200", function() {
                $(this).addClass("active")
            }).prev().addClass("clickedColor clickedBackground");
        } else {
            $(".active[data-index=" + value + "]").slideUp("200", function() {
                $(this).removeClass("active")
            }).prev().removeClass("clickedColor clickedBackground");
        }
    })
	// Accordion page ends here

})

// First slider starts here
let firstSliderImgs = document.querySelectorAll("div#firstSliderImgs img");

function slider() {
	if (i == 2) {
		firstSliderImgs[i].classList.remove("active");
		i = 0;
		firstSliderImgs[i].classList.add("active");
	} else {
		firstSliderImgs[i].classList.remove("active");
		firstSliderImgs[i].nextElementSibling.classList.add("active");
		i++;
	}
}
setInterval("slider()", 3000);
// First slider ends here

// Basket section starts here
let productPrice = Number(document.getElementById("buy").nextElementSibling.lastElementChild.innerText);
let addToCart = document.querySelectorAll("p#buy");

if (localStorage.getItem("basket") === null) {
	localStorage.setItem("basket", JSON.stringify([]));
}

if (localStorage.getItem("cartPrice") === null) {
	localStorage.setItem("cartPrice", JSON.stringify([]));
}

document.querySelector("div#cart a span").innerText = JSON.parse(localStorage.getItem("cartPrice"));

for (let btn of addToCart) {
	btn.onclick = function() {
		if (localStorage.getItem("basket") === null) {
			localStorage.setItem("basket", JSON.stringify([]));
		}
		if (localStorage.getItem("cartPrice") === null) {
			localStorage.setItem("cartPrice", JSON.stringify([]));
		}

		let basket = JSON.parse(localStorage.getItem("basket"));
		let cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
		let productId = this.parentElement.parentElement.parentElement.getAttribute("data-id");
		let productImg = this.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute("src");
		let productName = this.parentElement.previousElementSibling.innerText;
		let productPrice = Number(this.nextElementSibling.lastElementChild.innerText);
		let product = basket.find(pro => pro.id == productId);

		if (product === undefined) {
			basket.push({
				id: productId,
				img: productImg,
				name: productName,
				price: productPrice,
				count: 1
			})
		} else {
			product.count += 1;
		}

		if (cartPrice == []) {
			cartPrice = productPrice;
		} else {
			cartPrice += productPrice;
		}

		localStorage.setItem("cartPrice", cartPrice);
		document.querySelector("div#cart a span").innerText = JSON.parse(localStorage.getItem("cartPrice"));
		
		localStorage.setItem("basket", JSON.stringify(basket));
		basketCount();
	}
}

function basketCount () {
	let basket = JSON.parse(localStorage.getItem("basket"));
	document.getElementById("productCount").innerText = basket.length;
}
basketCount();
// Basket section ends here