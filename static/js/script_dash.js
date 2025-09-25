// Unified Sidebar Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main');
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    // Initialize sidebar state based on screen size
    function initializeSidebar() {
        if (window.innerWidth <= 768) {
            // Mobile: collapsed by default
            sidebar.classList.remove('expand');
            main.classList.add('sidebar-collapsed');
        } else {
            // Desktop: expanded by default
            sidebar.classList.add('expand');
            main.classList.remove('sidebar-collapsed');
        }
    }
    
    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('expand');
        main.classList.toggle('sidebar-collapsed');
        
        // Add visual feedback
        const icon = toggleBtn.querySelector('i');
        if (sidebar.classList.contains('expand')) {
            icon.style.transform = 'rotate(0deg)';
        } else {
            icon.style.transform = 'rotate(180deg)';
        }
    }
    
    // Event listeners for both toggle buttons
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarToggle && sidebarToggle !== toggleBtn) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(initializeSidebar, 250);
    });
    
    // Initialize on load
    initializeSidebar();
    
    // Close sidebar when clicking outside on mobile
    if (window.innerWidth <= 768) {
        document.addEventListener('click', function(e) {
            if (sidebar.classList.contains('expand') && 
                !sidebar.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('expand');
                main.classList.add('sidebar-collapsed');
            }
        });
    }
    
    // Add keyboard support (ESC to close sidebar on mobile)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.innerWidth <= 768 && sidebar.classList.contains('expand')) {
            sidebar.classList.remove('expand');
            main.classList.add('sidebar-collapsed');
        }
    });
    
    // Debug: Log sidebar state changes (remove in production)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                console.log('Sidebar state:', sidebar.classList.contains('expand') ? 'expanded' : 'collapsed');
            }
        });
    });
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
});

// Additional functionality for Lottie animations
document.addEventListener("DOMContentLoaded", function () {
  // Load Lottie.js for animations
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js";
  script.onload = initLottieAnimations;
  document.body.appendChild(script);

  function initLottieAnimations() {
      document.querySelectorAll("[id^='json-animation-']").forEach(animationDiv => {
          const camId = animationDiv.id.split("-").pop();
          lottie.loadAnimation({
              container: animationDiv,
              renderer: "svg",
              loop: true,
              autoplay: true,
              path: "static/img/CCTV.json"
          });

          // Check if camera feed is available
          checkCameraConnection(camId);
      });
    }
});

function checkCameraConnection(camId) {
    const videoFrame = document.getElementById(`video-${camId}`);
    const loadingDiv = document.getElementById(`loading-animation-${camId}`);

    function tryLoading() {
        videoFrame.src = `/video_feed/${camId}`; // Reload the video source
    }

    videoFrame.onload = function () {
        loadingDiv.style.display = "none"; // Hide animation
        videoFrame.style.display = "block"; // Show video feed
    };

    videoFrame.onerror = function () {
        videoFrame.style.display = "none"; // Hide video
        loadingDiv.style.display = "flex"; // Show animation
        setTimeout(tryLoading, 5000); // Retry after 5 sec
    };

    tryLoading(); // Try loading initially
    
}

document.addEventListener("DOMContentLoaded", function () {
    // Looping status messages
    const statusMessages = [
        "Connecting...",
        "IP Address Retrieving...",
        "Database Connect...",
        "Advanced AI System On...",
        "System Optimized..."
    ];
    let statusIndex = 0;

    function updateStatus() {
        document.getElementById("status-text").innerText = statusMessages[statusIndex];
        statusIndex = (statusIndex + 1) % statusMessages.length;
    }

    setInterval(updateStatus, 1500); // Change message every 1.5 seconds
    updateStatus(); // Initial update

    // Hide JSON animation after 2 seconds
    setTimeout(() => {
        document.querySelectorAll(".camera-loading").forEach(el => el.style.display = "none");
    }, 2000);

    // Auto-adjust camera iframe height
    function adjustCameraHeight() {
        document.querySelectorAll(".video-feed").forEach(iframe => {
            iframe.style.height = window.innerHeight + "px";
        });
    }

    adjustCameraHeight(); // Initial adjustment
    window.addEventListener("resize", adjustCameraHeight);
});
