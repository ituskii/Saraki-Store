document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. View Details Logic (The fix for your button)
    window.viewProduct = function(name, price, image) {
        const product = { name, price, image };
        localStorage.setItem('cartItem', JSON.stringify(product));
        window.location.href = 'details.html';
    };

    // 3. Add to Cart Logic
    const cartButtons = document.querySelectorAll('.btn-add-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };
            localStorage.setItem('cartItem', JSON.stringify(product));
            
            this.textContent = '✓ Added to Cart';
            this.classList.replace('btn-primary', 'btn-success');
            setTimeout(() => window.location.href = 'cart.html', 300);
        });
    });

    // 4. Checkout Logic
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            btn.textContent = 'Processing Payment...';
            btn.disabled = true;
            setTimeout(() => {
                alert('Payment Successful!');
                localStorage.removeItem('cartItem');
                window.location.href = 'index.html';
            }, 2000);
        });
    }
});