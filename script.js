// JavaScript for Interactive Features

document.addEventListener("DOMContentLoaded", () => {
  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faq) => faq.classList.remove("active"))

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerOffset = 100
        const elementPosition = targetElement.offsetTop
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Parallax Effect for Floating Elements
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".parallax")

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  })

  // Game Search Functionality
  const gameSearch = document.querySelector('input[placeholder="Search games..."]')
  const gameCards = document.querySelectorAll(".game-card")

  if (gameSearch) {
    gameSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()

      gameCards.forEach((card) => {
        const gameName = card.querySelector("h3").textContent.toLowerCase()

        if (gameName.includes(searchTerm)) {
          card.style.display = "block"
          card.style.animation = "fadeInUp 0.5s ease-out"
        } else {
          card.style.display = "none"
        }
      })
    })
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
    })
  }

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".step-card, .game-card, .stat-card, .support-card, .promo-card")
  animateElements.forEach((el) => observer.observe(el))

  // Bonus Timer (if needed)
  function startBonusTimer() {
    const timerElement = document.querySelector(".bonus-timer")
    if (!timerElement) return

    let timeLeft = 24 * 60 * 60 // 24 hours in seconds

    const timer = setInterval(() => {
      const hours = Math.floor(timeLeft / 3600)
      const minutes = Math.floor((timeLeft % 3600) / 60)
      const seconds = timeLeft % 60

      timerElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

      if (timeLeft <= 0) {
        clearInterval(timer)
        timerElement.textContent = "Bonus Expired"
      }

      timeLeft--
    }, 1000)
  }

  // Initialize bonus timer
  startBonusTimer()

  // Add loading states for buttons
  const ctaButtons = document.querySelectorAll('[onclick*="/register"]')

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const originalText = this.innerHTML
      this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...'
      this.disabled = true

      // Simulate loading (remove in production)
      setTimeout(() => {
        this.innerHTML = originalText
        this.disabled = false
      }, 2000)
    })
  })

  // Add hover sound effects (optional)
  const hoverElements = document.querySelectorAll(".cta-button, .game-card, .step-card")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      // Add subtle hover effect
      element.style.filter = "brightness(1.1)"
    })

    element.addEventListener("mouseleave", () => {
      element.style.filter = "brightness(1)"
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll('img[src*="/images/"]')

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.5s ease"

        img.onload = () => {
          img.style.opacity = "1"
        }

        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Add dynamic copyright year
  const copyrightYear = document.querySelector("footer p")
  if (copyrightYear && copyrightYear.textContent.includes("2024")) {
    copyrightYear.textContent = copyrightYear.textContent.replace("2024", new Date().getFullYear())
  }

  // Performance optimization: Debounce scroll events
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Optimized scroll handler
  const optimizedScrollHandler = debounce(() => {
    const scrolled = window.pageYOffset
    const header = document.querySelector("header")

    if (scrolled > 100) {
      header.style.background = "rgba(0, 0, 0, 0.9)"
      header.style.backdropFilter = "blur(20px)"
    } else {
      header.style.background = "rgba(0, 0, 0, 0.2)"
      header.style.backdropFilter = "blur(10px)"
    }
  }, 10)

  window.addEventListener("scroll", optimizedScrollHandler)
})

// Global functions for onclick handlers
function redirectToRegister() {
  // Add analytics tracking here if needed
  window.location.href = "/register"
}

// Replace all onclick="/register" with this function
document.addEventListener("DOMContentLoaded", () => {
  const registerButtons = document.querySelectorAll('[onclick*="/register"]')
  registerButtons.forEach((button) => {
    button.removeAttribute("onclick")
    button.addEventListener("click", redirectToRegister)
  })
})
