// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const minusButtons = document.querySelectorAll('.wishlist-item .quantity-minus');
    const plusButtons = document.querySelectorAll('.wishlist-item .quantity-plus');
    const removeButtons = document.querySelectorAll('.btn-remove-wishlist');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const goToCartButton = document.querySelector('.btn-outline-secondary');
    const socialShareIcons = document.querySelectorAll('.social-share-icon');

    // Add event listeners to quantity minus buttons
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            if (value > 1) {
                value--;
                input.value = value;
            }
        });
    });

    // Add event listeners to quantity plus buttons
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            console.log(value)
            const max = parseInt(input.getAttribute('max') || 10);
            if (value < max) {
                value++;
                input.value = value;
            }
        });
    });

    // Add event listeners to remove buttons
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wishlistItem = this.closest('.wishlist-item');

            // Add a fade-out animation
            wishlistItem.style.transition = 'opacity 0.3s ease';
            wishlistItem.style.opacity = '0';

            // Remove the item after animation completes
            setTimeout(() => {
                wishlistItem.remove();

                // Check if wishlist is empty after removal
                const wishlistItems = document.querySelectorAll('.wishlist-item');
                if (wishlistItems.length === 0) {
                    document.querySelector('.table-responsive').classList.add('d-none');
                    document.querySelector('.empty-wishlist-container').classList.remove('d-none');
                    document.querySelector('.mt-4').classList.add('d-none');

                    // Update wishlist badge count
                    updateWishlistBadge(0);
                } else {
                    // Update wishlist badge count
                    updateWishlistBadge(wishlistItems.length);
                }
            }, 300);
        });
    });

    // Add event listeners to "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wishlistItem = this.closest('.wishlist-item');
            const productTitle = wishlistItem.querySelector('.wishlist-item-title').textContent.split('(')[0].trim();
            const productPrice = wishlistItem.querySelector('.wishlist-item-price').textContent;
            const quantity = wishlistItem.querySelector('.quantity-input').value;

            // Show confirmation with toast or alert
            showAddToCartToast(productTitle);

            // Could also implement actual cart functionality here
            // For now, just update the cart badge count
            const currentCount = parseInt(document.querySelector('.icon-badge:nth-of-type(2)').textContent);
            document.querySelector('.icon-badge:nth-of-type(2)').textContent = currentCount + 1;

            // Optional: remove from wishlist after adding to cart
            // this.closest('.wishlist-item').remove();
        });
    });

    // Helper function to update wishlist badge
    function updateWishlistBadge(count) {
        const wishlistBadge = document.querySelector('.icon-link:nth-of-type(1) .icon-badge');
        if (wishlistBadge) {
            wishlistBadge.textContent = count;
        }
    }

    // Helper function to show Add to Cart Toast notification
    function showAddToCartToast(productTitle) {
        // Create a toast element
        const toastContainer = document.createElement('div');
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '11';

        const toastEl = document.createElement('div');
        toastEl.className = 'toast bg-white';
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');

        toastEl.innerHTML = `
            <div class="toast-header bg-success text-white">
                <strong class="me-auto">Added to Cart</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${productTitle} has been added to your cart.
            </div>
        `;

        toastContainer.appendChild(toastEl);
        document.body.appendChild(toastContainer);

        // Initialize and show the toast
        const toast = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 3000
        });
        toast.show();

        // Remove the toast container after the toast is hidden
        toastEl.addEventListener('hidden.bs.toast', function() {
            document.body.removeChild(toastContainer);
        });
    }

    // Social sharing functionality (placeholder)
    socialShareIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;

            // Implement actual sharing functionality here
            console.log(`Sharing wishlist on ${platform}`);

            // Example sharing URL
            let shareUrl = window.location.href;
            let shareTitle = 'Check out my wishlist at Percetakan Dulank';

            // Placeholder for different social media sharing
            if (platform.includes('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
            } else if (platform.includes('twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
            } else if (platform.includes('pinterest')) {
                window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareTitle)}`, '_blank');
            } else if (platform.includes('linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
            } else if (platform.includes('whatsapp')) {
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
            } else if (platform.includes('envelope')) {
                window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent('Check out my wishlist: ' + shareUrl)}`;
            }
        });
    });

    // Make sure the table rows have data-title attributes for responsive view
    function addDataTitlesToResponsiveTable() {
        const wishlistItems = document.querySelectorAll('.wishlist-item');

        wishlistItems.forEach(item => {
            const cells = item.querySelectorAll('td');

            // Skip the first cell (product info)
            if (cells.length > 1) {
                cells[1].setAttribute('data-title', 'Price');
            }
            if (cells.length > 2) {
                cells[2].setAttribute('data-title', 'Quantity');
            }
        });
    }

    // Call the function to add data-titles
    addDataTitlesToResponsiveTable();
});
