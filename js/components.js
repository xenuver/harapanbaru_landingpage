/**
 * UI Components Module
 */
import * as lucideIcons from 'lucide';
const icons = lucideIcons.icons || lucideIcons;

// Helper to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

// Helper to render lucide icon
export function renderIcon(iconName, classes = 'w-6 h-6') {
  const pascalName = toPascalCase(iconName);
  const icon = icons[pascalName] || icons[iconName];
  if (!icon || !Array.isArray(icon)) return `<span class="${classes} flex items-center justify-center font-bold text-red-500 bg-red-100 rounded-full">?</span>`;
  
  const defaultAttrs = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  const content = icon.map(child => {
    const tagName = child[0];
    const attrs = child[1] || {};
    const childAttrsStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    return `<${tagName} ${childAttrsStr}></${tagName}>`;
  }).join('');

  const svgAttrsStr = Object.entries(defaultAttrs).map(([k, v]) => `${k}="${v}"`).join(' ');
  
  return `<svg class="${classes}" ${svgAttrsStr}>${content}</svg>`;
}

export function renderStatistikCard(stat) {
  return `
    <div class="card flex flex-col items-center justify-center text-center">
      <div class="w-12 h-12 rounded-full bg-light text-primary flex items-center justify-center mb-4">
        ${renderIcon(stat.icon || 'circle')}
      </div>
      <h3 class="text-3xl font-bold text-primary mb-1">${stat.angka}</h3>
      <p class="text-gray-600 font-medium">${stat.label}</p>
    </div>
  `;
}

export function renderLayananCard(layanan) {
  const badgeClass = `badge-${layanan.statusColor}`;
  
  return `
    <div class="card flex flex-col h-full">
      <div class="flex items-start justify-between mb-4">
        <div class="w-12 h-12 rounded-lg bg-light text-primary flex items-center justify-center">
          ${renderIcon(layanan.icon || 'file-text')}
        </div>
        <span class="badge ${badgeClass} text-xs">${layanan.statusSistem}</span>
      </div>
      
      <h3 class="text-xl font-bold text-primary mb-3">${layanan.nama}</h3>
      
      <div class="flex-grow">
        <h4 class="text-sm font-semibold text-gray-700 mb-2">Persyaratan:</h4>
        <ul class="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
          ${layanan.persyaratan.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
      
      <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm mb-4">
        <span class="text-gray-500">Estimasi:</span>
        <span class="font-medium text-gray-800">${layanan.estimasi}</span>
      </div>
      <button class="w-full btn-primary py-2 text-sm btn-ajukan" data-layanan="${layanan.nama}">
        Ajukan Dokumen
      </button>
    </div>
  `;
}

export function renderTrackerResult(tiketId, data) {
  if (!data) {
    return `
      <div class="p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 mt-4">
        <div class="flex items-center gap-2 font-semibold mb-1">
          ${renderIcon('alert-circle', 'w-5 h-5')} Tiket Tidak Ditemukan
        </div>
        <p class="text-sm">Nomor tiket <strong>${tiketId}</strong> tidak terdaftar dalam sistem. Periksa kembali nomor Anda.</p>
      </div>
    `;
  }

  return `
    <div class="p-5 bg-white border border-gray-200 shadow-sm rounded-lg mt-4">
      <div class="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
        <h4 class="font-bold text-lg text-primary">Detail Tiket: ${tiketId}</h4>
        <span class="badge badge-blue">Tgl: ${data.tanggal}</span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500 mb-1">Nama Pemohon</p>
          <p class="font-medium">${data.nama}</p>
        </div>
        <div>
          <p class="text-gray-500 mb-1">Jenis Layanan</p>
          <p class="font-medium">${data.layanan}</p>
        </div>
        <div class="md:col-span-2 p-3 bg-light rounded flex items-start gap-3">
          <div class="text-accent mt-0.5">${renderIcon('clock', 'w-5 h-5')}</div>
          <div>
            <p class="font-bold text-gray-800">${data.status}</p>
            <p class="text-gray-500">Estimasi selesai: ${data.estimasi}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
