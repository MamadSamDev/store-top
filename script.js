// ===============================
// PRODUCTS
// ===============================

const products = [

    {
        id: 1,
        title: "گوشی موبایل سامسونگ Galaxy A55",
        category: "mobile",
        categoryName: "موبایل",
        price: 18500000,
        discount: 10,
        rating: 4.5,
        image: "https://api2.zoomit.ir/media/samsung-galaxy-a55-iceblue-65ef3aa267794fc357aff517?w=384&q=75"
    },

    {
        id: 2,
        title: "لپ تاپ اپل MacBook Air M2",
        category: "laptop",
        categoryName: "لپ تاپ",
        price: 48500000,
        discount: 8,
        rating: 4.8,
        image: "https://applecenter.ir/upload/news/croppie/Emperatour_20170104-015716.jpg"
    },

    {
        id: 3,
        title: "هدفون بی سیم JBL WH-1000XM5",
        category: "headphone",
        categoryName: "هدفون",
        price: 12900000,
        discount: 15,
        rating: 4.7,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbTOkuSCpH-n3dlzVMuS0vcbwf0BybO5OsRy33HJ9eAQ&s=10"
    },

    {
        id: 4,
        title: "ساعت هوشمند Apple Watch",
        category: "watch",
        categoryName: "ساعت هوشمند",
        price: 15900000,
        discount: 12,
        rating: 4.6,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwFAWmIwwKHdfpSmeoiWHKRW4iyvKa_wSUK4fKBgBjeg&s=10"
    },

    {
        id: 5,
        title: "گوشی موبایل iPhone 15",
        category: "mobile",
        categoryName: "موبایل",
        price: 62000000,
        discount: 5,
        rating: 4.9,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RPU-evWzPSeGLUqtZrDVb02RzvkEW4lhEvARAqkXuQ&s=10"
    },

    {
        id: 6,
        title: "لپ تاپ Lenovo IdeaPad",
        category: "laptop",
        categoryName: "لپ تاپ",
        price: 28500000,
        discount: 10,
        rating: 4.3,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vXWK_0iWXdpS8-IAJu7GEcDm3akZzVFiWG4Eu68zCQ&s=10"
    },

    {
        id: 7,
        title: "هدفون بی سیم JBL",
        category: "headphone",
        categoryName: "هدفون",
        price: 4500000,
        discount: 20,
        rating: 4.4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQh6efukO07QOXnHd-WyRSj29EmUXnPVjQxo3jSPPwoQ&s=10"
    },

    {
        id: 8,
        title: "ساعت هوشمند Samsung Galaxy Watch",
        category: "watch",
        categoryName: "ساعت هوشمند",
        price: 8900000,
        discount: 18,
        rating: 4.5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH2iyFr8zmQrmiUNKdShEHLFkrrK_3rujCOEiw2DdKug&s=10"
    }

];


// ===============================
// ELEMENTS
// ===============================

const productsContainer =
    document.getElementById("productsContainer");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const cartCount =
    document.getElementById("cartCount");

const themeBtn =
    document.getElementById("themeBtn");


// ===============================
// CART
// ===============================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// SHOW PRODUCTS
// ===============================

function displayProducts(productsList) {

    productsContainer.innerHTML = "";

    if (productsList.length === 0) {

        productsContainer.innerHTML = `
            <p>
                محصولی پیدا نشد 😕
            </p>
        `;

        return;
    }


    productsList.forEach(product => {

        const finalPrice =
            product.price -
            (product.price * product.discount / 100);


        const card = document.createElement("div");

        card.className = "product-card";

        card.style.cursor = "pointer";


card.addEventListener("click", (event) => {

    if (event.target.closest(".add-cart")) {

        return;

    }


    window.location.href =
        `pages/product.html?id=${product.id}`;

});

        card.innerHTML = `

            <span class="discount">
                ${product.discount}٪ تخفیف
            </span>


            <img
                class="product-image"
                src="${product.image}"
                alt="${product.title}"
            >


            <div class="product-info">

                <span class="product-category">
                    ${product.categoryName}
                </span>


                <h3 class="product-title">
                    ${product.title}
                </h3>


                <div class="product-rating">
                  ${product.rating}
                </div>


                <div class="product-price">

                    <div>

                        <div class="price">
                            ${formatPrice(finalPrice)}
                            تومان
                        </div>

                    </div>


                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        🛒
                    </button>

                </div>

            </div>
        `;


        productsContainer.appendChild(card);

    });

}


// ===============================
// FORMAT PRICE
// ===============================

function formatPrice(price) {

    return Math.round(price)
        .toLocaleString("fa-IR");

}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);


    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();


    alert("محصول به سبد خرید اضافه شد 🛒");

}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent = total;

}


// ===============================
// CATEGORY FILTER
// ===============================

const categoryButtons =
    document.querySelectorAll(
        ".categories button"
    );


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const category =
                button.dataset.category;


            if (category === "all") {

                displayProducts(products);

            } else {

                const filtered =
                    products.filter(
                        product =>
                            product.category === category
                    );


                displayProducts(filtered);

            }

        }
    );

});


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener(
    "input",
    () => {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const filtered =
            products.filter(product =>
                product.title
                    .toLowerCase()
                    .includes(search)
            );


        displayProducts(filtered);

    }
);


// ===============================
// SORT
// ===============================

sortSelect.addEventListener(
    "change",
    () => {

        const value =
            sortSelect.value;


        let sortedProducts =
            [...products];


        if (value === "cheap") {

            sortedProducts.sort(
                (a, b) => a.price - b.price
            );

        }


        if (value === "expensive") {

            sortedProducts.sort(
                (a, b) => b.price - a.price
            );

        }


        displayProducts(sortedProducts);

    }
);


// ===============================
// DARK MODE
// ===============================

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");


        const isDark =
            document.body.classList.contains("dark");


        themeBtn.textContent =
            isDark ? "☀️" : "🌙";


        localStorage.setItem(
            "darkMode",
            isDark
        );

    }
);


// ===============================
// LOADDARK MODE
// ===============================

const savedTheme =
    localStorage.getItem("darkMode");


if (savedTheme === "true") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


// ===============================
// INITIALIZE
// ===============================

displayProducts(products);

updateCartCount();
// =====================================
// PROFESSIONAL CART SYSTEM
// =====================================


// فقط زمانی اجرا شود که صفحه سبد خرید باشد

if (document.getElementById("cartContainer")) {


    const cartContainer =
        document.getElementById("cartContainer");


    const subtotalElement =
        document.getElementById("subtotal");


    const discountElement =
        document.getElementById("discountTotal");


    const totalElement =
        document.getElementById("totalPrice");


    const cartItemsCount =
        document.getElementById("cartItemsCount");


    // ===============================
    // GET CART
    // ===============================

    function getCart() {

        return JSON.parse(
            localStorage.getItem("marketinoCart")
        ) || [];

    }


    // ===============================
    // SAVE CART
    // ===============================

    function saveCart(cart) {

        localStorage.setItem(
            "marketinoCart",
            JSON.stringify(cart)
        );

    }


    // ===============================
    // RENDER CART
    // ===============================

    function renderCart() {


        const cart =
            getCart();


        cartContainer.innerHTML = "";


        if (cart.length === 0) {


            cartContainer.innerHTML = `

                <div class="empty-cart">

                    <div class="empty-cart-icon">
                        🛒
                    </div>

                    <h2>
                        سبد خریدت خالیه
                    </h2>

                    <p>
                        هنوز محصولی به سبد خرید اضافه نکردی.
                    </p>

                    <a href="../index.html">
                        شروع خرید
                    </a>

                </div>

            `;


            subtotalElement.textContent =
                "۰ تومان";


            discountElement.textContent =
                "۰ تومان";


            totalElement.textContent =
                "۰ تومان";


            cartItemsCount.textContent =
                "۰ کالا";


            return;

        }


        let subtotal = 0;

        let discount = 0;

        let totalQuantity = 0;


        cart.forEach(item => {


            const product =
                products.find(
                    product =>
                        product.id === item.id
                );


            if (!product) return;


            const finalPrice =
                product.price -
                (
                    product.price *
                    product.discount /
                    100
                );


            const itemSubtotal =
                product.price *
                item.quantity;


            const itemDiscount =
                (
                    product.price -
                    finalPrice
                ) *
                item.quantity;


            subtotal += itemSubtotal;

            discount += itemDiscount;

            totalQuantity += item.quantity;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "cart-item";


            itemElement.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                    >

                </div>


                <div class="cart-item-info">

                    <div class="cart-item-category">

                        ${product.categoryName}

                    </div>


                    <h3>

                        ${product.title}

                    </h3>


                    <div class="cart-item-price">

                        ${formatPrice(finalPrice)}
                        تومان

                    </div>

                </div>


                <div class="cart-item-actions">


                    <div class="quantity-control">


                        <button
                            class="minus-btn"
                            data-id="${product.id}"
                        >
                            −
                        </button>


                        <span>

                            ${item.quantity}

                        </span>


                        <button
                            class="plus-btn"
                            data-id="${product.id}"
                        >
                            +
                        </button>


                    </div>


                    <button
                        class="remove-cart-item"
                        data-id="${product.id}"
                    >

                        🗑 حذف محصول

                    </button>


                </div>

            `;


            cartContainer.appendChild(
                itemElement
            );

        });


        // ===============================
        // SHIPPING
        // ===============================

        let shipping = 0;


        const finalTotal =
            subtotal -
            discount +
            shipping;


        // ===============================
        // SHOW SUMMARY
        // ===============================

        subtotalElement.textContent =
            formatPrice(subtotal) +
            " تومان";


        discountElement.textContent =
            formatPrice(discount) +
            " تومان";


        totalElement.textContent =
            formatPrice(finalTotal) +
            " تومان";


        cartItemsCount.textContent =
            totalQuantity +
            " کالا";


        // ===============================
        // PLUS
        // ===============================

        document
            .querySelectorAll(".plus-btn")
            .forEach(button => {


                button.addEventListener(
                    "click",
                    () => {


                        const id =
                            Number(
                                button.dataset.id
                            );


                        const cart =
                            getCart();


                        const item =
                            cart.find(
                                item =>
                                    item.id === id
                            );


                        if (item) {

                            item.quantity++;

                        }


                        saveCart(cart);

                        renderCart();

                    }
                );

            });


        // ===============================
        // MINUS
        // ===============================

        document
            .querySelectorAll(".minus-btn")
            .forEach(button => {


                button.addEventListener(
                    "click",
                    () => {


                        const id =
                            Number(
                                button.dataset.id
                            );


                        const cart =
                            getCart();


                        const item =
                            cart.find(
                                item =>
                                    item.id === id
                            );


                        if (!item) return;


                        if (item.quantity > 1) {

                            item.quantity--;

                        } else {

                            const index =
                                cart.findIndex(
                                    item =>
                                        item.id === id
                                );


                            cart.splice(
                                index,
                                1
                            );

                        }


                        saveCart(cart);

                        renderCart();

                    }
                );

            });


        // ===============================
        // REMOVE
        // ===============================

        document
            .querySelectorAll(
                ".remove-cart-item"
            )
            .forEach(button => {


                button.addEventListener(
                    "click",
                    () => {


                        const id =
                            Number(
                                button.dataset.id
                            );


                        const cart =
                            getCart();


                        const newCart =
                            cart.filter(
                                item =>
                                    item.id !== id
                            );


                        saveCart(newCart);

                        renderCart();

                    }
                );

            });

    }


    // ===============================
    // CHECKOUT
    // ===============================

    const checkoutBtn =
        document.getElementById(
            "checkoutBtn"
        );


    if (checkoutBtn) {


        checkoutBtn.addEventListener(
            "click",
            () => {


                const cart =
                    getCart();


                if (cart.length === 0) {

                    alert(
                        "سبد خرید شما خالی است."
                    );

                    return;

                }


                alert(
                    "مرحله پرداخت در نسخه بعدی ساخته می‌شود 💳"
                );

            }
        );

    }


    // ===============================
    // START
    // ===============================

    renderCart();

}
// باز کردن صفحه سبد خرید

const cartButton = document.querySelector(".cart-btn");

if (cartButton) {

    cartButton.addEventListener("click", function () {

        window.location.href = "pages/cart.html";

    });

}
document.addEventListener("DOMContentLoaded", function () {

    const openAuth = document.getElementById("openAuth");

    const authOverlay =
        document.getElementById("authOverlay");

    const closeAuth =
        document.getElementById("closeAuth");

    const registerForm =
        document.getElementById("registerForm");


    // باز کردن فرم

    openAuth.addEventListener("click", function () {

        authOverlay.classList.add("active");

    });


    // بستن فرم

    closeAuth.addEventListener("click", function () {

        authOverlay.classList.remove("active");

    });


    // کلیک بیرون فرم

    authOverlay.addEventListener("click", function (event) {

        if (event.target === authOverlay) {

            authOverlay.classList.remove("active");

        }

    });


    // ثبت نام

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("fullName").value;

        const phone =
            document.getElementById("phone").value;

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // بررسی رمز

        if (password !== confirmPassword) {

            alert("رمز عبور و تکرار رمز عبور یکسان نیستند.");

            return;

        }


        // فعلاً فقط تست

        alert(
            "ثبت‌نام با موفقیت انجام شد 🌟\n\n" +
            "نام: " + name + "\n" +
            "شماره: " + phone
        );


        // بستن فرم

        authOverlay.classList.remove("active");


        // پاک کردن فرم

        registerForm.reset();

    });

});