// This script helps with client-side routing in a static site environment
// It should be included in the HTML of each page

(function() {
  // Check if we're coming from a 404 redirect
  const notFoundRedirect = sessionStorage.getItem('notFoundRedirect');
  if (notFoundRedirect) {
    // Clear the stored path
    sessionStorage.removeItem('notFoundRedirect');
    
    // Check if this is the home page and we should try to route
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      // Wait for Next.js to initialize
      setTimeout(() => {
        // Try to navigate to the stored path using client-side routing
        const router = window.__NEXT_ROUTER__;
        if (router && router.push) {
          router.push(notFoundRedirect);
        }
      }, 100);
    }
  }
  
  // Handle clicks on links to use client-side routing when possible
  document.addEventListener('click', function(event) {
    // Find closest anchor element
    let anchor = event.target.closest('a');
    
    // If we found an anchor and it's a local link
    if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
      // Get the pathname from the anchor
      const pathname = new URL(anchor.href).pathname;
      
      // Skip if it's a file download or has a hash
      if (pathname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|zip|rar)$/i) || 
          anchor.getAttribute('download') ||
          anchor.getAttribute('target') === '_blank') {
        return;
      }
      
      // Try to use Next.js router for client-side navigation
      const router = window.__NEXT_ROUTER__;
      if (router && router.push) {
        event.preventDefault();
        router.push(pathname);
      }
    }
  });
})();
