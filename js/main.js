/**
 * Main Application Logic
 */
import { fetchStatistik, fetchLayanan, fetchTrackerStatus, fetchPenduduk } from './api.js';
import { renderStatistikCard, renderLayananCard, renderTrackerResult } from './components.js';

// --- Router / Section Manager ---
let globalLayananData = [];

const sections = ['beranda', 'profil', 'layanan', 'organisasi', 'kontak', 'admin-dashboard', 'admin-dms', 'admin-penduduk'];

function navigateTo(sectionId) {
  sections.forEach(id => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      if (id === sectionId) {
        el.classList.remove('hidden');
        el.classList.add('block');
      } else {
        el.classList.add('hidden');
        el.classList.remove('block');
      }
    }
  });

  // Update active state di mobile menu & desktop menu
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.target === sectionId) {
      link.classList.add('text-accent', 'font-semibold');
      link.classList.remove('text-gray-200');
    } else {
      link.classList.remove('text-accent', 'font-semibold');
      link.classList.add('text-gray-200');
    }
  });

  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
  
  window.scrollTo(0, 0);
}

// --- Admin Panel Logic ---
function initAdminLogic() {
  const btnTte = document.getElementById('btn-tte-001');
  const statusBadge = document.getElementById('status-badge-001');
  
  if (btnTte) {
    btnTte.addEventListener('click', () => {
      // Change badge status
      statusBadge.textContent = 'Selesai (TTE Verified)';
      statusBadge.className = 'px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800';
      
      // Change button state
      btnTte.className = 'px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs flex items-center gap-1 hover:bg-gray-300';
      btnTte.innerHTML = `<div class="w-3 h-3" id="icon-tte-download"></div> Unduh Arsip`;
      
      // We need to re-render the icon inside since we overwrote innerHTML
      import('./components.js').then(module => {
        const renderIcon = module.renderIcon;
        btnTte.querySelector('#icon-tte-download').innerHTML = renderIcon('download', 'w-3 h-3');
      });
    });
  }

  // Pagination Logic (Simulation)
  const btnPage1 = document.getElementById('btn-page-1');
  const btnPage2 = document.getElementById('btn-page-2');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const tablePage1 = document.getElementById('table-page-1');
  const tablePage2 = document.getElementById('table-page-2');
  const pageInfo = document.getElementById('pagination-info');

  function switchPage(page) {
    if(!tablePage1 || !tablePage2) return;
    if (page === 1) {
      tablePage1.classList.remove('hidden');
      tablePage2.classList.add('hidden');
      
      btnPage1.className = 'px-3 py-1 bg-primary text-white border border-primary rounded text-sm';
      btnPage2.className = 'px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 text-gray-600';
      btnPrev.className = 'px-3 py-1 border border-gray-300 rounded text-sm bg-gray-100 text-gray-400 cursor-not-allowed';
      btnNext.className = 'px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 text-primary';
      pageInfo.textContent = 'Menampilkan 1-10 dari 3.450 data';
    } else if (page === 2) {
      tablePage1.classList.add('hidden');
      tablePage2.classList.remove('hidden');
      
      btnPage1.className = 'px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 text-gray-600';
      btnPage2.className = 'px-3 py-1 bg-primary text-white border border-primary rounded text-sm';
      btnPrev.className = 'px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 text-primary';
      btnNext.className = 'px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 text-primary';
      pageInfo.textContent = 'Menampilkan 11-20 dari 3.450 data';
    }
  }

  if (btnPage1) btnPage1.addEventListener('click', () => switchPage(1));
  if (btnPage2) btnPage2.addEventListener('click', () => switchPage(2));
  if (btnPrev) btnPrev.addEventListener('click', () => {
    if(!tablePage1.classList.contains('hidden')) return; // already on page 1
    switchPage(1);
  });
  if (btnNext) btnNext.addEventListener('click', () => {
    if(!tablePage2.classList.contains('hidden')) return; // logic simplification for 2 pages
    switchPage(2);
  });
}

// --- Init Data ---
async function initData() {
  // Render Statistik
  const statContainer = document.getElementById('statistik-container');
  if (statContainer) {
    const statistik = await fetchStatistik();
    statContainer.innerHTML = statistik.map(renderStatistikCard).join('');
  }

  // Render Layanan
  const layananContainer = document.getElementById('layanan-container');
  if (layananContainer) {
    globalLayananData = await fetchLayanan();
    layananContainer.innerHTML = globalLayananData.map(renderLayananCard).join('');
  }
}

// --- Event Listeners ---
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget.dataset.target;
      if (target) navigateTo(target);
    });
  });

  // Mobile Menu Toggle
  const btnMenu = document.getElementById('btn-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  if (btnMenu && mobileMenu) {
    btnMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Tracker Form
  const formTracker = document.getElementById('form-tracker');
  if (formTracker) {
    formTracker.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('input-tiket').value.trim();
      const resultContainer = document.getElementById('tracker-result');
      
      if (!input) return;
      
      resultContainer.innerHTML = `<div class="text-center py-4 text-gray-500">Mencari data...</div>`;
      
      // Simulate network delay
      setTimeout(async () => {
        const data = await fetchTrackerStatus(input);
        resultContainer.innerHTML = renderTrackerResult(input, data);
      }, 600);
    });
  }

  // TOGAF Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      
      // Update Buttons
      tabBtns.forEach(b => {
        b.classList.remove('tab-active');
        b.classList.add('tab-inactive');
      });
      btn.classList.add('tab-active');
      btn.classList.remove('tab-inactive');
      
      // Update Panes
      tabPanes.forEach(pane => {
        if (pane.id === `tab-${target}`) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });

  // Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      content.classList.toggle('hidden');
      if(content.classList.contains('hidden')) {
        icon.style.transform = 'rotate(0deg)';
      } else {
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // --- MODAL LOGIC ---
  const modal = document.getElementById('service-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalPanel = document.getElementById('modal-panel');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');
  
  function openModal(layananName) {
    document.getElementById('modal-title').textContent = `Pengajuan: ${layananName}`;
    
    // Reset State
    document.getElementById('form-nik-container').classList.remove('hidden');
    document.getElementById('form-autofill-container').classList.add('hidden');
    document.getElementById('success-container').classList.add('hidden');
    document.getElementById('input-nik-modal').value = '';
    document.getElementById('input-keperluan').value = '';
    document.getElementById('nik-error').classList.add('hidden');

    // Generate Dynamic Upload Fields
    const reqContainer = document.getElementById('dynamic-requirements-container');
    if (reqContainer) {
      reqContainer.innerHTML = '';
      const selectedLayanan = globalLayananData.find(l => l.nama === layananName);
      if (selectedLayanan && selectedLayanan.persyaratan) {
        selectedLayanan.persyaratan.forEach(req => {
          reqContainer.innerHTML += `
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1">Unggah ${req} <span class="text-red-500">*</span></label>
              <input type="file" required class="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-200 rounded-md p-1 outline-none focus:border-primary transition" />
            </div>
          `;
        });
      }
    }

    modal.classList.remove('hidden');
    // Trigger transition
    setTimeout(() => {
      modalBackdrop.classList.remove('opacity-0');
      modalPanel.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
    }, 10);
  }

  function closeModal() {
    modalBackdrop.classList.add('opacity-0');
    modalPanel.classList.add('opacity-0', 'scale-95', 'translate-y-4');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);

  // Event Delegation for dynamically created 'Ajukan Dokumen' buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-ajukan')) {
      const layananName = e.target.closest('.btn-ajukan').dataset.layanan;
      openModal(layananName);
    }
  });

  // NIK Validation Logic
  const formCekNik = document.getElementById('form-cek-nik');
  if (formCekNik) {
    formCekNik.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nik = document.getElementById('input-nik-modal').value.trim();
      const errorMsg = document.getElementById('nik-error');
      
      // Simulate loading
      const btn = formCekNik.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Mengecek...';
      btn.disabled = true;

      const dataPenduduk = await fetchPenduduk(nik);
      
      btn.textContent = originalText;
      btn.disabled = false;

      if (dataPenduduk) {
        errorMsg.classList.add('hidden');
        document.getElementById('form-nik-container').classList.add('hidden');
        document.getElementById('form-autofill-container').classList.remove('hidden');
        
        // Auto-fill
        document.getElementById('af-nama').textContent = dataPenduduk.nama;
        document.getElementById('af-kk').textContent = dataPenduduk.noKk;
        document.getElementById('af-alamat').textContent = dataPenduduk.alamat;
      } else {
        errorMsg.classList.remove('hidden');
      }
    });
  }

  // Submit Layanan Logic
  const btnSubmitLayanan = document.getElementById('btn-submit-layanan');
  if (btnSubmitLayanan) {
    btnSubmitLayanan.addEventListener('click', () => {
      document.getElementById('form-autofill-container').classList.add('hidden');
      
      // Generate hardcoded ticket for simulation
      const ticketId = 'DHB-2026-001';
      document.getElementById('ticket-number-display').textContent = ticketId;
      
      document.getElementById('success-container').classList.remove('hidden');
    });
  }
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initData();
  initAdminLogic();
  
  // Start di halaman beranda
  navigateTo('beranda');
});
