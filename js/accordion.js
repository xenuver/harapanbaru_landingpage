document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      faqItems.forEach(faq => {
        faq.classList.remove('open');
        faq.querySelector('.faq-answer').setAttribute('aria-hidden', 'true');
        faq.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-answer').setAttribute('aria-hidden', 'false');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
