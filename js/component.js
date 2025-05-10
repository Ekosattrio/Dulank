function myComponent() {
    const minusButtons = document.querySelectorAll('.quantity-minus-cart');
    const plusButtons = document.querySelectorAll('.quantity-plus-cart');
    const removeButtons = document.querySelectorAll('.btn-remove-cart');
    
    // Add event listeners to quantity minus buttons
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input-cart');
            let value = parseInt(input.value);
            if (value > 1) {
                value--;
                input.value = value;
                updateCartTotals();
            }
        });
    });
    
    // Add event listeners to quantity plus buttons
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input-cart');
            let value = parseInt(input.value);
            const max = parseInt(input.getAttribute('max'));
            if (value < max) {
                value++;
                input.value = value;
                updateCartTotals();
            }
        });
    });
    
    // Add event listeners to remove buttons
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.remove();
            
            // Check if cart is empty after removal
            const cartItems = document.querySelectorAll('.cart-item');
            if (cartItems.length === 0) {
                document.querySelector('.cart-items').classList.add('d-none');
                document.querySelector('.cart-empty').classList.remove('d-none');
                document.querySelector('.cart-summary').classList.add('d-none');
                
                // Update cart badge
                document.querySelector('.icon-badge').textContent = '0';
            } else {
                // Update cart badge
                document.querySelector('.icon-badge').textContent = cartItems.length;
                updateCartTotals();
            }
        });
    });
    // Function to update cart totals
    function updateCartTotals() {
        let subtotal = 0;
        
        // Calculate subtotal based on items in cart
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.cart-item-price').textContent.replace('Rp', ''));
            const quantity = parseInt(item.querySelector('.quantity-input-cart').value);
            subtotal += price * quantity;
        });
        
        // Update the subtotal and total in UI
        document.querySelectorAll('.cart-summary div')[0].querySelector('span:last-child').textContent = 'Rp' + subtotal.toFixed(2);
        document.querySelectorAll('.cart-summary div')[2].querySelector('span:last-child').textContent = 'Rp' + subtotal.toFixed(2);
    }

    // Initialize cart totals when page loads
    updateCartTotals();

    // Show Offer modal after 3 seconds
    const showOfferModal = () => {
        // Check if modal should be shown (not opted out via checkbox)
        if (!localStorage.getItem('dontShowOfferModal')) {
            const OfferModal = new bootstrap.Modal(document.getElementById('offerModal'));
            OfferModal.show();
        }
    };

    // Show product toast notification after 1 second
    const showProductToast = () => {
        const productToast = document.getElementById('newProductToast');
        if (productToast) {
            const toast = new bootstrap.Toast(productToast, {
                autohide: true,
                delay: 8000
            });
            toast.show();
        }
    };

    // Handle Offer modal's "Don't show again" checkbox
    const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
    if (dontShowAgainCheckbox) {
        dontShowAgainCheckbox.addEventListener('change', function() {
            if (this.checked) {
                localStorage.setItem('dontShowOfferModal', 'true');
            } else {
                localStorage.removeItem('dontShowOfferModal');
            }
        });
    }
};

// Fungsi untuk memuat HTML dari file ke elemen target
const loadHTML = (url, elementId) => {
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = data;
        } else {
            console.error(`Element with id "${elementId}" not found.`);
        }
    })
    .catch(error => {
        console.error(`Error loading HTML from ${url}:`, error);
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<p style="color:red;">Gagal memuat ${elementId}.</p>`;
        }
    });
};
