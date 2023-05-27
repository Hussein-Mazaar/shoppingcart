$(document).ready(function () {
    // Retrieve the access token from localStorage
    var accessToken = localStorage.getItem('accessToken');

    // Check if the user is not logged in, redirect to the login page
    if (!accessToken) {
        window.location.href = 'index.html';
        return;
    }
    // split access token by - and get the second element
    var username = accessToken.split('-')[1];
    $('#username').html(username);
    $('#logoutBtn').on('click', function () {
        // Remove access token from localStorage
        localStorage.removeItem('accessToken');
        // Redirect to the login page
        window.location.href = 'index.html';
    });

    $('#checkoutBtn').on('click', function () {

        $.ajax({
            url: 'http://localhost:3000/api/cart/placeOrder',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            success: function (response) {
                alert('Order placed successfully!');
                // Refresh the shopping cart items
                getProducts();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                alert('An error occurred while placing the order.');

            }
        });
    });

    function getProducts(){
    // Make the API request to fetch products
    $.ajax({
        url: 'http://localhost:3000/api/products',
        type: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        success: function (response) {
            // Process the products and populate the table
            var productTableBody = $('#product-table-body');
            productTableBody.empty();

            response.forEach(function (product) {
                var row = '<tr>' +
                    '<td>' + product.name + '</td>' +
                    '<td><img src="' + product.image + '" alt="' + product.name + '" width="100"></td>' +
                    '<td>' + product.quantity + '</td>' +
                    '<td>' + product.price + '</td>' +
                    '<td><button class="btn btn-primary add-to-cart-btn" data-prod-id="' + product.id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg></button></td>' +
                    '</tr>';

                productTableBody.append(row);
            });

            // Add event listener for the "Add to Cart" buttons
            $('.add-to-cart-btn').click(function () {
                var prodId = $(this).data('prod-id');
                addItemToCart(prodId, 1);
            });

            // Refresh the shopping cart items
            getCartInfo();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred while fetching products.');
        }
    });
    }


    // Function to add a product to the shopping cart
    function addItemToCart(prodId, quantity) {
        var data = {
            "prodId": prodId,
            "quantity": quantity
        };

        $.ajax({
            url: 'http://localhost:3000/api/cart/addItem',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            data: JSON.stringify(data),
            success: function (response) {
                alert('Product added to cart successfully!');
                // Refresh the shopping cart items
                getCartInfo();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                alert('Out of Stock');
            }
        });
    }

    // Function to get the shopping cart information
    // Function to get the shopping cart information
    function getCartInfo() {
        $.ajax({
            url: 'http://localhost:3000/api/cart/cartInfo',
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            success: function (response) {
                // Process the shopping cart items and populate the table
                var cartTableBody = $('#cart-table-body');
                cartTableBody.empty();

                if (response.items.length === 0) {

                    // Hide the cart table if the cart is empty
                    $('#cart-table').hide();
                    $('#checkoutBtn').hide();
                    // Display the message when the cart is empty
                    $('#cart-message').show();

                } else {
                    $('#cart-table').show();
                    $('#checkoutBtn').show();
                    $('#cart-message').hide();
                    response.items.forEach(function (item) {
                        var row = '<tr>' +
                            '<td>' + item.name + '</td>' +
                            '<td>' + item.price + '</td>' +
                            '<td>' + item.totalPrice + '</td>' +
                            '<td>' + '<div class="quantity">' +
                            '<button class="quantity-minus mr-2" data-item-id="' + item.id + '">-</button>' +
                            '<input type="number" class="quantity-input" disabled value="' + item.quantity + '">' +
                            '<button class="quantity-plus ml-2" data-item-id="' + item.id + '">+</button>' +
                            '</div>' + '</td>' +

                            '</tr>';

                        cartTableBody.append(row);

                    });
                    var totalRow = '<tr>' +
                    '<td colspan="2"></td>' +
                    '<td>Total:</td>' +
                    '<td>' + response.cart.totalPrice + '</td>' +
                    '</tr>';

                     cartTableBody.append(totalRow);
                       // Add event listeners for the quantity buttons
                       $('.quantity-minus').click(function () {
                        var input = $(this).siblings('.quantity-input');
                        var itemId = $(this).data('item-id');
                        var quantity = parseInt(input.val());

                        // Decrease the quantity by 1, if greater than 1
                        if (quantity > 0) {
                            quantity -= 1;
                            updateQuantity(itemId, quantity, input);
                        }
                    }

                    );
                    $('.quantity-plus').click(function () {
                        var input = $(this).siblings('.quantity-input');
                        var itemId = $(this).data('item-id');
                        var quantity = parseInt(input.val());
                        updateQuantity(itemId, quantity + 1, input);
                    }
                    );
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                alert('An error occurred while fetching the cart information.');
            }
        });
    }



    // Function to update the quantity for a specific item
    function updateQuantity(itemId, quantity, input) {
        var data = {
            "itemId": itemId,
            "quantity": quantity
        };

        $.ajax({
            url: 'http://localhost:3000/api/cart/setQuantity',
            type: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            data: JSON.stringify(data),
            success: function (response) {
               input.val(quantity);
                getCartInfo();
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                alert('No enough quantity in stock.');
            }
        });
    }

    getProducts();

});
