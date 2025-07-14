document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const inputs = form.querySelectorAll('input, textarea');
  const charCount = document.getElementById('char-count');
  const comments = document.getElementById('comments');
  const feedbackDisplay = document.getElementById('feedback-display');

  // Character count functionality with limit enhancement
  comments.addEventListener('input', () => {
    // Update character count in real-time with visual feedback
    const length = comments.value.length;
    charCount.textContent = `${length} characters`;
    
    // Add visual feedback for character limits
    if (length > 500) {
      charCount.style.color = '#ff4444';
      charCount.textContent += ' (Consider keeping it concise)';
    } else {
      charCount.style.color = '#666';
    }
  });

  // Enhanced tooltips with better positioning and styling
  inputs.forEach(input => {
    input.addEventListener('mouseover', (e) => {
      // Remove any existing tooltip to prevent duplicates
      const existingTooltip = document.getElementById('tooltip');
      if (existingTooltip) existingTooltip.remove();
      
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = e.target.title;
      tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: #fff;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        pointer-events: none;
      `;
      
      // Better positioning logic to prevent tooltip from going off-screen
      const rect = e.target.getBoundingClientRect();
      tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.id = 'tooltip';
      document.body.appendChild(tooltip);
    });

    input.addEventListener('mouseout', () => {
      // Clean up tooltip on mouse out
      const tooltip = document.getElementById('tooltip');
      if (tooltip) tooltip.remove();
    });

    // Additional enhancement: Focus/blur events for better accessibility
    input.addEventListener('focus', (e) => {
      e.target.style.outline = '2px solid #007cba';
      e.target.style.outlineOffset = '2px';
    });

    input.addEventListener('blur', (e) => {
      e.target.style.outline = 'none';
    });
  });

  // Enhanced form submission with better validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let valid = true;
    let errorMessages = [];

    // Enhanced validation with specific error messages
    inputs.forEach(input => {
      const value = input.value.trim();
       
      if (!value) {
        errorMessages.push(`${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`);
        valid = false;
        input.style.borderColor = '#ff4444';
      } else {
        input.style.borderColor = '#ddd';
        
        // Email validation enhancement
        if (input.type === 'email' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errorMessages.push('Please enter a valid email address');
            valid = false;
            input.style.borderColor = '#ff4444';
          }
        }
      }
    });

    if (!valid) {
      // Show all errors in a single, well-formatted alert
      alert('Please fix the following issues:\n\n• ' + errorMessages.join('\n• '));
      return;
    }

    // Success: Create and display feedback entry with enhanced styling
    const entry = document.createElement('div');
    entry.className = 'feedback-entry';
    entry.style.cssText = `
      background: #f9f9f9;
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 6px;
      border-left: 4px solid #007cba;
      transition: all 0.3s ease;
    `;
    
    const timestamp = new Date().toLocaleString();
    entry.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <strong style="color: #333;">${form.username.value}</strong>
        <small style="color: #666;">${timestamp}</small>
      </div>
      <div style="color: #666; font-size: 14px; margin-bottom: 8px;">${form.email.value}</div>
      <div style="color: #333; line-height: 1.5;">${form.comments.value}</div>
    `;
    
    // Add hover effect to feedback entries
    entry.addEventListener('mouseenter', () => {
      entry.style.backgroundColor = '#f0f8ff';
      entry.style.transform = 'translateX(5px)';
    });
    
    entry.addEventListener('mouseleave', () => {
      entry.style.backgroundColor = '#f9f9f9';
      entry.style.transform = 'translateX(0)';
    });
    
    feedbackDisplay.appendChild(entry);
    
    // Enhanced form reset with visual feedback
    form.reset();
    charCount.textContent = '0 characters';
    charCount.style.color = '#666';
    
    // Reset any validation styling
    inputs.forEach(input => {
      input.style.borderColor = '#ddd';
    });
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.textContent = '✓ Feedback submitted successfully!';
    successMsg.style.cssText = `
      background: #d4edda;
      color: #155724;
      padding: 10px;
      border-radius: 4px;
      margin-bottom: 15px;
      text-align: center;
      font-weight: bold;
    `;
    form.insertBefore(successMsg, form.firstChild);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      if (successMsg.parentNode) {
        successMsg.remove();
      }
    }, 3000);
  });

  // Enhanced event delegation with more comprehensive logging
  form.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      console.log(`User interacted with: ${e.target.name} (${e.target.tagName.toLowerCase()})`);
       
      // Add subtle visual feedback for interactions
      e.target.style.transition = 'box-shadow 0.2s ease';
      e.target.style.boxShadow = '0 0 5px rgba(0, 124, 186, 0.3)';
       
      setTimeout(() => {
        e.target.style.boxShadow = 'none';
      }, 1000);
    }
    
    // Handle button clicks with enhanced feedback
    if (e.target.tagName === 'BUTTON') {
      console.log(`Button clicked: ${e.target.textContent}`);
      e.target.style.transform = 'scale(0.98)';
      setTimeout(() => {
        e.target.style.transform = 'scale(1)';
      }, 100);
    }
  });

  // Enhanced background click handling with better event control
  document.body.addEventListener('click', (e) => {
    // Only prevent propagation for clicks outside the form container
    if (!form.contains(e.target) && !e.target.closest('.feedback-entry')) {
      console.log('Background click detected - preventing event bubbling');
      e.stopPropagation();
       
      // Remove any active tooltips when clicking outside
      const tooltip = document.getElementById('tooltip');
      if (tooltip) tooltip.remove();
    }
  }, true);

  // Additional enhancement: Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // ESC key to clear form
    if (e.key === 'Escape' && document.activeElement && form.contains(document.activeElement)) {
      if (confirm('Clear the form? All entered data will be lost.')) {
        form.reset();
        charCount.textContent = '0 characters';
        charCount.style.color = '#666';
        inputs.forEach(input => input.style.borderColor = '#ddd');
      }
    }
    
    // Ctrl+Enter to submit form (when focus is in form)
    if (e.ctrlKey && e.key === 'Enter' && form.contains(document.activeElement)) {
      form.dispatchEvent(new Event('submit'));
    }
  });

  console.log('✓ Feedback form initialized with enhanced features');
});
