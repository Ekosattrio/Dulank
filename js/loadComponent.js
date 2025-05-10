document.addEventListener("DOMContentLoaded", function() {
    // Muat Navbar, lalu tandai link aktif setelah navbar dimuat
    loadHTML('templates/navbar.html', 'navbar-placeholder')

    // Muat Footer
    loadHTML('templates/footer.html', 'footer-placeholder').then(() => {
        myComponent()
    })

    const collapseElementList = document.querySelectorAll('.collapse')
    const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl))
});