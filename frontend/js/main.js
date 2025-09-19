(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);

// Contact us
const contactForm = document.querySelector('.contact-form');
if (contactForm) contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the default form submission behavior
    
    const form = event.target;
    const formData = new FormData(form);
  
    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(response => {
      if (response.ok) { // Check if the HTTP response status is 200-299
        alert("Your message has been sent successfully. We'll respond shortly!");
        form.reset(); // Reset form fields
      } else {
        return response.text().then(text => {
          throw new Error(text); // Throw an error with response text
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Your message has been sent successfully. We'll respond shortly!");
    });
    });

// Simple login handler to navigate after submit (placeholder until real backend auth)
(function () {
    const form = document.getElementById('login-form');
    if (!form) return;
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = (document.getElementById('email') || {}).value || '';
            const password = (document.getElementById('password') || {}).value || '';
            if (!email || !password) {
                alert('Please enter email and password');
                return;
            }
            try {
                const res = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                if (!res.ok) throw new Error('Login failed');
                const data = await res.json();
                // Save token (demo only; consider HttpOnly cookies in real apps)
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            } catch (err) {
                alert('Invalid credentials or server error');
            }
        });
})();

// Backend health indicator
(function () {
    const badge = document.getElementById('api-status-badge');
    if (!badge) return;
    const endpoints = [
        'http://localhost:3000/api/health',
        'http://127.0.0.1:3000/api/health',
    ];

    async function checkHealth() {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);
        try {
            let res;
            for (const url of endpoints) {
                try {
                    res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
                    if (res.ok) break;
                } catch (e) {
                    // try next endpoint
                }
            }
            clearTimeout(timer);
            if (res && res.ok) {
                badge.className = 'badge bg-success';
                badge.textContent = 'online';
            } else {
                throw new Error('no ok response');
            }
        } catch (e) {
            badge.className = 'badge bg-danger';
            badge.textContent = 'offline';
        }
    }

    // initial and periodic checks
    checkHealth();
    setInterval(checkHealth, 15000);
})();
  
