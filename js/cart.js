function basketCount () {
	let basket = JSON.parse(localStorage.getItem("basket"));
	document.getElementById("productCount").innerText = basket.length;
}

basketCount();

let basket = JSON.parse(localStorage.getItem("basket"));
let cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
let table = document.querySelector("div#productTable > table");
let order = 1;

document.querySelector("div#cart a span").innerText = JSON.parse(localStorage.getItem("cartPrice"));

basket.forEach(elm => {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let tdImg = document.createElement("td");
    let tdName = document.createElement("td");
    let tdPrice = document.createElement("td");
    let tdCount = document.createElement("td");
    let img = document.createElement("img");
    console.log(elm.price)

    th.innerText = order;
    order++;
    img.setAttribute("src", "../" + elm.img);

    tdImg.appendChild(img);
    tdName.innerText = elm.name;
    tdPrice.innerText = elm.count + " * " + elm.price + "=" + " $" + elm.count * elm.price;
    tdCount.innerText = elm.count;

    tr.append(th, tdImg, tdName, tdPrice, tdCount);
    table.lastElementChild.appendChild(tr);
});