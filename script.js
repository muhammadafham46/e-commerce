document.addEventListener('DOMContentLoaded', function() {
    // Countdown timer for deals
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement && hoursElement && minutesElement && secondsElement) {
        // Set the countdown date (3 days from now)
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 3);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            if (distance < 0) {
                clearInterval(countdownInterval);
                daysElement.textContent = "00";
                hoursElement.textContent = "00";
                minutesElement.textContent = "00";
                secondsElement.textContent = "00";
            }
        }
        
        // Update the countdown every second
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    // Wishlist button functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                alert('Product added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                alert('Product removed from wishlist!');
            }
        });
    });
    
    // Form submission handling
    const quoteForm = document.getElementById('quote-form');
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const formValid = this.checkValidity();
            
            if (formValid) {
                alert('Your inquiry has been sent! This is a frontend demo, so no actual data is being sent.');
                this.reset();
            } else {
                // Show validation messages
                this.reportValidity();
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            // Validate email
            if (emailInput.checkValidity()) {
                alert('Thank you for subscribing to our newsletter! This is a frontend demo, so no actual data is being sent.');
                this.reset();
            } else {
                // Show validation message
                emailInput.reportValidity();
            }
        });
    }
    
    // Product image gallery (for product detail page)
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image
                mainImage.src = this.src.replace('100x100', '600x600');
            });
        });
    }
    
    // Tab functionality (for product detail page)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Price range slider (for product listing page)
    const sliderMin = document.querySelector('.slider-min');
    const sliderMax = document.querySelector('.slider-max');
    const sliderFill = document.querySelector('.slider-fill');
    const minInput = document.querySelector('.price-input:first-child input');
    const maxInput = document.querySelector('.price-input:last-child input');
    
    if (sliderMin && sliderMax && sliderFill && minInput && maxInput) {
        // Set initial values
        const minValue = parseInt(sliderMin.value);
        const maxValue = parseInt(sliderMax.value);
        const range = sliderMax.max - sliderMin.min;
        
        // Update slider fill
        function updateSliderFill() {
            const minVal = parseInt(sliderMin.value);
            const maxVal = parseInt(sliderMax.value);
            
            sliderFill.style.left = ((minVal - sliderMin.min) / range) * 100 + '%';
            sliderFill.style.width = ((maxVal - minVal) / range) * 100 + '%';
            
            minInput.value = minVal;
            maxInput.value = maxVal;
        }
        
        // Initialize slider fill
        updateSliderFill();
        
        // Event listeners for sliders
        sliderMin.addEventListener('input', function() {
            const minVal = parseInt(sliderMin.value);
            const maxVal = parseInt(sliderMax.value);
            
            if (minVal > maxVal) {
                sliderMin.value = maxVal;
            }
            
            updateSliderFill();
        });
        
        sliderMax.addEventListener('input', function() {
            const minVal = parseInt(sliderMin.value);
            const maxVal = parseInt(sliderMax.value);
            
            if (maxVal < minVal) {
                sliderMax.value = minVal;
            }
            
            updateSliderFill();
        });
        
        // Event listeners for inputs
        minInput.addEventListener('input', function() {
            const minVal = parseInt(minInput.value);
            const maxVal = parseInt(maxInput.value);
            
            if (minVal > maxVal) {
                minInput.value = maxVal;
            }
            
            if (minVal < sliderMin.min) {
                minInput.value = sliderMin.min;
            }
            
            if (minVal > sliderMin.max) {
                minInput.value = sliderMin.max;
            }
            
            sliderMin.value = minInput.value;
            updateSliderFill();
        });
        
        maxInput.addEventListener('input', function() {
            const minVal = parseInt(minInput.value);
            const maxVal = parseInt(maxInput.value);
            
            if (maxVal < minVal) {
                maxInput.value = minVal;
            }
            
            if (maxVal < sliderMax.min) {
                maxInput.value = sliderMax.min;
            }
            
            if (maxVal > sliderMax.max) {
                maxInput.value = sliderMax.max;
            }
            
            sliderMax.value = maxInput.value;
            updateSliderFill();
        });
    }
    
    // View options (grid/list) for product listing page
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productsGrid = document.querySelector('.products-grid');
    
    if (gridViewBtn && listViewBtn && productsGrid) {
        gridViewBtn.addEventListener('click', function() {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            productsGrid.classList.remove('list-view');
            productsGrid.classList.add('grid-view');
        });
        
        listViewBtn.addEventListener('click', function() {
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            productsGrid.classList.remove('grid-view');
            productsGrid.classList.add('list-view');
        });
    }
    
    // Filter section toggle
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const filterSection = this.parentElement;
            const filterList = filterSection.querySelector('.filter-list');
            const icon = this.querySelector('i');
            
            if (filterList.style.display === 'none') {
                filterList.style.display = 'flex';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                filterList.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Remove filter tag
    const removeFilterBtns = document.querySelectorAll('.remove-filter');
    
    removeFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterTag = this.parentElement;
            filterTag.remove();
        });
    });
    
    // Clear all filters
    const clearFiltersBtn = document.querySelector('.clear-filters');
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => tag.remove());
        });
    }
    
    // Mobile menu toggle
    const categoryMenu = document.querySelector('.category-menu');
    const categoryDropdown = document.querySelector('.category-dropdown');
    
    if (categoryMenu && categoryDropdown) {
        categoryMenu.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                if (categoryDropdown.style.display === 'block') {
                    categoryDropdown.style.display = 'none';
                } else {
                    categoryDropdown.style.display = 'block';
                }
            }
        });
    }
    
    // Window resize handling
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            if (categoryDropdown) {
                categoryDropdown.style.display = '';
            }
        }
    });
});