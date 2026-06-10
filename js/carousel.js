document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-btn-prev');
    const nextBtn = carousel.querySelector('.carousel-btn-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    // Gunakan scrollBy untuk memindahkan scroll horizontal
    nextBtn.addEventListener('click', () => {
      // Dapatkan lebar dari satu card
      const cardWidth = track.querySelector('.card').clientWidth;
      // Scroll ditambah gap
      track.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', () => {
      const cardWidth = track.querySelector('.card').clientWidth;
      track.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    });
  });
});
