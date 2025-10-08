// TPO Website Main JavaScript File
document.addEventListener("DOMContentLoaded", function () {
  // Navigation scroll effect
  const navbar = document.querySelector(".navbar");
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      backToTop.classList.add("visible");
    } else {
      navbar.classList.remove("scrolled");
      backToTop.classList.remove("visible");
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Counter animation
  const counters = document.querySelectorAll(".counter");

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 50;
    const inc = target / speed;

    const updateCount = () => {
      if (count < target) {
        count += inc;
        counter.innerText = Math.floor(count);
        setTimeout(updateCount, 50);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  };

  // Intersection Observer for counters
  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("counter")) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // Filter buttons for opportunities section
  const filterBtns = document.querySelectorAll(".filter-btn");
  const opportunityCards = document.querySelectorAll(".opportunity-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active");
      });
      btn.classList.add("active");

      // Filter cards
      const filter = btn.getAttribute("data-filter");

      opportunityCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Success stories slider
  const sliderBtns = document.querySelectorAll(".slider-btn");
  const storyCards = document.querySelectorAll(".story-card");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  const showSlide = (index) => {
    // Hide all slides
    storyCards.forEach((card) => {
      card.classList.remove("active");
    });

    // Remove active from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the selected slide
    if (storyCards[index]) {
      storyCards[index].classList.add("active");
    }

    // Highlight the correct dot
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  };

  if (sliderBtns.length > 0) {
    sliderBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("next")) {
          currentSlide = (currentSlide + 1) % storyCards.length;
        } else {
          currentSlide =
            (currentSlide - 1 + storyCards.length) % storyCards.length;
        }
        showSlide(currentSlide);
      });
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !phone || !subject || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Display success message (in a real app, you'd send this to a server)
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href === "#") return;

      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          mobileToggle.classList.remove("active");
          navMenu.classList.remove("active");
        }
      }
    });
  });

  // View more toggle for team members
  const viewMoreBtns = document.querySelectorAll(".btn-view-more");

  viewMoreBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const moreMembers =
        this.closest(".view-more").querySelector(".more-members");
      moreMembers.classList.toggle("show");
      this.classList.toggle("active");

      if (moreMembers.classList.contains("show")) {
        this.innerHTML = 'View less <i class="fas fa-chevron-up"></i>';
      } else {
        this.innerHTML = 'View all members <i class="fas fa-chevron-down"></i>';
      }
    });
  });
});
