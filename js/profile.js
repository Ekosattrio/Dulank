function profile() {
    // Add data-label attributes to table cells for responsive view
    function addDataLabelsToTable() {
        const table = document.querySelector('.recent-orders-table');
        if (table) {
            const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    if (headers[index]) {
                        if(headers[index] != 'Actions' && headers[index] != 'Products'){
                            cell.setAttribute('data-label', headers[index]);
                        }
                    }
                });
            });
        }
    }

    // Handle profile avatar badge click for photo upload
    function setupAvatarUpload() {
        const avatarBadge = document.querySelector('.profile-avatar-badge');
        if (avatarBadge) {
            avatarBadge.addEventListener('click', function() {
                // Create a file input dynamically
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';

                // When file input changes, handle the selected file
                fileInput.addEventListener('change', function() {
                    if (this.files && this.files[0]) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            // Update the avatar image with selected file
                            document.querySelector('.profile-avatar img').src = e.target.result;

                            // In a real implementation, you would also upload the file to server
                            // For demo purposes, we'll just show a toast/notification
                            showToast('Profile photo updated successfully');
                        };
                        reader.readAsDataURL(this.files[0]);
                    }
                });

                // Append to document and trigger click
                document.body.appendChild(fileInput);
                fileInput.click();

                // Remove the element after handling
                setTimeout(() => {
                    document.body.removeChild(fileInput);
                }, 1000);
            });
        }
    }

    // Highlight active sidebar item based on URL path
    function highlightActiveSidebar() {
        const currentUrl = window.location.pathname;
        const sidebarItems = document.querySelectorAll('.profile-nav-item');

        sidebarItems.forEach(item => {
            // Remove active class from all items
            item.classList.remove('active');

            // Get the link and check if it's in the current URL
            const link = item.querySelector('a');
            if (link && link.getAttribute('href')) {
                const href = link.getAttribute('href');
                if (currentUrl.includes(href) && href !== '#') {
                    item.classList.add('active');
                }
            }
        });

        // If no item is active, highlight the overview by default
        if (!document.querySelector('.profile-nav-item.active')) {
            const overviewItem = document.querySelector('.profile-nav-item:first-child');
            if (overviewItem) {
                overviewItem.classList.add('active');
            }
        }
    }

    // Display a toast notification
    function showToast(message) {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            toastContainer.style.zIndex = '11';
            document.body.appendChild(toastContainer);
        }

        // Create the toast element
        const toastEl = document.createElement('div');
        toastEl.className = 'toast';
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');

        toastEl.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;

        toastContainer.appendChild(toastEl);

        // Initialize and show the toast
        const toast = new bootstrap.Toast(toastEl, {
            autohide: true,
            delay: 3000
        });

        toast.show();

        // Clean up after toast is hidden
        toastEl.addEventListener('hidden.bs.toast', function() {
            toastContainer.removeChild(toastEl);
        });
    }

    // Call the initialization functions
    addDataLabelsToTable();
    setupAvatarUpload();
    highlightActiveSidebar();

    // Handle profile nav item clicks for single page application behavior
    document.querySelectorAll('.profile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process links that point to sections (not external links)
            if (this.getAttribute('href') === '#') {
                e.preventDefault();

                // Remove active class from all items
                document.querySelectorAll('.profile-nav-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Add active class to clicked item
                this.parentElement.classList.add('active');

                // In a real implementation, you would load different content
                // based on which nav item was clicked
                const navText = this.textContent.trim();
                if (navText !== 'Overview' && navText !== 'Logout') {
                    showToast(`${navText} section would load here`);
                }

                // Handle special case for logout
                if (navText === 'Logout') {
                    // In a real app, you would perform logout actions here
                    showToast('Logging out...');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                }
            }
        });
    });
};

// loadHTML('account.html', 'content-profile-placeholder').then();
document.addEventListener("DOMContentLoaded", function() {
    // Muat Sidebar-profile
    loadHTML('templates/sidebar-profile.html', 'sidebar-profile-placeholder').then(() => {
        profile()
    })
});