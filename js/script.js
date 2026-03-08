const services = document.querySelectorAll(".service");
const emptyCart = document.querySelector(".empty-cart");
const filledCart = document.querySelector(".filled-cart");
const totalAmt = document.querySelector(".total h4:last-child");
const bookBox = document.querySelector(".book-now");
const inputs = document.querySelectorAll(".book-form input");
const bookBtn = document.querySelector(".book-btn");
const msg1 = document.querySelector(".msg1");
const msg2 = document.querySelector(".msg2");
const emptyCartHTML = emptyCart.innerHTML;
const filledCartHTML = filledCart.innerHTML;
let cartItems = [];

msg1.style.display = "none";
msg2.style.display = "none";
filledCart.style.display = "none";

bookBox.addEventListener("click", () => {    
    if(cartItems.length === 0) {
        msg1.style.display = "block";
        inputs.forEach(input => {
            input.disabled = true;
        });
        bookBtn.disabled = true;
    }else {
        msg1.style.display = "none";
    }
});

services.forEach(service => {
    const addBtn = service.querySelector(".add");

    addBtn.addEventListener("click", () => {
        const name = service.querySelector(".service-info div span:last-child").innerText;

        const priceText =service.querySelector(".price").innerText;
        const price = parseFloat(priceText.slice(1));

        if (addBtn.classList.contains("added")) {
            removeItem(name, addBtn);
            return;
        }

        addBtn.classList.add("added");
        addBtn.style.background = "#ffeded";
        addBtn.style.color = "#ff2626";

        addBtn.innerHTML =
            `<span>Remove Item </span><ion-icon class="remove-icon" name="remove-circle-outline"></ion-icon>`;

        cartItems.push({ name, price });
        updateCart();
    });
});

function updateCart() {

    if (cartItems.length === 0) {
        emptyCart.style.display = "flex";
        filledCart.style.display = "none";

        emptyCart.innerHTML = emptyCartHTML;
        filledCart.innerHTML = filledCartHTML;

        inputs.forEach(input => {
            input.disabled = true;
        });
        bookBtn.disabled = true;
        totalAmt.innerText = "₹ 0";
        return;
    }

    emptyCart.style.display = "none";
    filledCart.style.display = "block";

    filledCart.innerHTML = "";

    inputs.forEach(input => {
        input.disabled = false;
    });
    bookBtn.disabled = false;
    msg1.style.display = "none";

    cartItems.forEach((item, index) => {

        const row = document.createElement("div");
        row.classList.add("row");
        row.innerHTML = `
            <ul>
                <li class="one">${index + 1}</li>
                <li class="two">${item.name}</li>
                <li class="three">₹${item.price.toFixed(2)}</li>
            </ul>
        `;
        filledCart.appendChild(row);
    });
    calculateTotal();
    checkInputs();
}

function calculateTotal() {

    let total = 0;

    cartItems.forEach(item => {
        total += item.price;
    });

    totalAmt.innerText = "₹ " + total.toFixed(2);
}

function removeItem(name, btn) {

    cartItems = cartItems.filter(item => item.name !== name);

    btn.classList.remove("added");
    btn.style.background = "#f0f0f0";
    btn.style.color = "#4b5b62";

    btn.innerHTML = `
        <span>Add item</span>
        <ion-icon class="add-icon" name="add-circle-outline"></ion-icon>
    `;

    if (cartItems.length === 0) {

        emptyCart.innerHTML = emptyCartHTML;
        filledCart.innerHTML = filledCartHTML;

        emptyCart.style.display = "flex";
        filledCart.style.display = "none";
        totalAmt.innerText = "₹ 0";

        bookBtn.style.backgroundColor = "#a7a9ffd1";

        updateCart();
        return;
    }
    updateCart();
}

inputs.forEach(input => {
    input.addEventListener("input", checkInputs);
});

function checkInputs() {
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
        }
    });

    if(allFilled && cartItems.length > 0) {
        bookBtn.style.backgroundColor = "#5053ff";
        bookBtn.disabled = false;
    }else {
        bookBtn.disabled = true;
        bookBtn.style.backgroundColor = "#a7a9ffd1";
    }
}

const form = document.querySelector(".booking-form");
const msg = document.getElementById("msg");

bookBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let allFilled = true;
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
        }
    });

    if(cartItems.length === 0) {
        msg1.style.display = "block";
        return;
    }
    if(!allFilled) { return; }

    sendEmail();
    updateCart();
});

function sendEmail() {

    let params = {
        username: document.getElementById("name").value,
        email: document.getElementById("email").value,
    }

    emailjs.send("service_p295imk", "template_o5zeyhg", params).then(function(response) {
        form.reset();
        msg2.style.display = "block";

        setTimeout(() => {
            msg2.style.display = "none";
        }, 3000);
        
        cartItems = [];
        updateCart();
        bookBtn.style.backgroundColor = "#a5a7ffd1";
        inputs
        const btn = document.querySelector(".add");

        services.forEach(service => {

            const btn = service.querySelector(".add");
            btn.classList.remove("added");
            btn.style.background = "#f0f0f0";
            btn.style.color = "#4b5b62";

            btn.innerHTML = `
                <span>Add item</span>
                <ion-icon class="add-icon" name="add-circle-outline"></ion-icon>
            `;
        });
    }).catch(function(error) {
        console.log(error);
    });
}