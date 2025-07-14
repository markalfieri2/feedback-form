
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  const inputs = form.querySelectorAll('input, textarea');
  const charCount = document.getElementById('char-count');
  const comments = document.getElementById('comments');
  const feedbackDisplay = document.getElementById('feedback-display');

  // Character count
  comments.addEventListener('input', () => {
    charCount.textContent = `${comments.value.length} characters`;
  });

  // Tooltips
  inputs.forEach(input => {
    input.addEventListener('mouseover', (e) => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = e.target.title;
      tooltip.style.position = 'absolute';
      tooltip.style.background = '#333';
      tooltip.style.color = '#fff';
      tooltip.style.padding = '5px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.top = `${e.pageY}px`;
      tooltip.style.left = `${e.pageX + 10}px`;
      tooltip.id = 'tooltip';
      document.body.appendChild(tooltip);
    });

    input.addEventListener('mouseout', () => {
      const tooltip = document.getElementById('tooltip');
      if (tooltip) tooltip.remove();
    });
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let valid = true;
    inputs.forEach(input => {
      if (!input.value.trim()) {
        alert(`Please fill out the ${input.name} field.`);
        valid = false;
      }
    });

    if (valid) {
      const entry = document.createElement('div');
      entry.innerHTML = `
        <p><strong>${form.username.value}</strong> (${form.email.value})</p>
        <p>${form.comments.value}</p>
        <hr/>
      `;
      feedbackDisplay.appendChild(entry);
      form.reset();
      charCount.textContent = '0 characters';
    }
  });

  // Event delegation and bubbling
  form.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      console.log(`Clicked on ${e.target.name}`);
    }
  });

  // Prevent background clicks from triggering form events
  document.body.addEventListener('click', (e) => {
    if (!form.contains(e.target)) {
      e.stopPropagation();
    }
  }, true);
});
