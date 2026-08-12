// ===============================
// GET PRODUCT ID
// ===============================

const urlParams =
    new URLSearchParams(window.location.search);


const productId =
    Number(urlParams.get("id"));


// ===============================
// FIND PRODUCT
// ===============================

const product =
    products.find(
        item => item.id === productId
    );


// ===============================
// PRODUCT CONTAINER
// ===============================

const productDetails =
    document.getElementById("productDetails");


// ===============================
// CHECK PRODUCT
// ===============================

if (!product) {

    productDetails.innerHTML = `

        <div>

            <h2>
                محصول پیدا نشد 😕
            </h2>

            <br>

            <a href="../index.html">
                بازگشت به فروشگاه
            </a>

        </div>

    `;

} else {


    // ===============================
    // CALCULATE PRICE
    // ===============================

    const finalPrice =
        product.price -
        (product.price * product.discount / 100);


    // ===============================
    // SHOW PRODUCT
    // ===============================

    productDetails.innerHTML = `

        <!-- Product Image -->

        <div class="product-details-image">

            <img
                src="${product.image}"
                alt="${product.title}"
            >

        </div>



        <!-- Product Information -->

        <div class="product-details-info">


            <div class="details-category">

                دسته‌بندی:
                ${product.categoryName}

            </div>


            <h1>
                ${product.title}
            </h1>


            <div class="details-rating">

                ⭐ ${product.rating}

            </div>


            <p class="details-description">

                این محصول یکی از محصولات محبوب
                بازارینو است.

                <br><br>

                کیفیت بالا، طراحی مناسب و قیمت
                رقابتی از ویژگی‌های این محصول است.

            </p>


            <div class="details-price">

                ${formatPrice(finalPrice)}

                تومان

            </div>


            <!-- Quantity -->

            <div class="quantity-box">


                <button id="decrease">

                    −

                </button>


                <span id="quantity">

                    1

                </span>


                <button id="increase">

                    +

                </button>


            </div>


            <!-- Add To Cart -->

            <button
                id="addToCartDetails"
                class="details-add-cart"
            >

                🛒 افزودن به سبد خرید

            </button>


        </div>

    `;



    // ===============================
    // QUANTITY
    // ===============================

    let quantity = 1;


    const quantityElement =
        document.getElementById("quantity");


    // Increase

    document
        .getElementById("increase")
        .addEventListener(
            "click",
            () => {

                quantity++;

                quantityElement.textContent =
                    quantity;

            }
        );


    // Decrease

    document
        .getElementById("decrease")
        .addEventListener(
            "click",
            () => {

                if (quantity > 1) {

                    quantity--;

                    quantityElement.textContent =
                        quantity;

                }

            }
        );



    // ===============================
    // ADD TO CART
    // ===============================

    document
        .getElementById("addToCartDetails")
        .addEventListener(
            "click",
            () => {


                for (
                    let i = 0;
                    i < quantity;
                    i++
                ) {

                    addToCart(product.id);

                }


                alert(
                    "محصول با موفقیت به سبد خرید اضافه شد 🛒"
                );

            }
        );

}