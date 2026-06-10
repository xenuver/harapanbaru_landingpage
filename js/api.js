/**
 * API Module
 * Simulasi pemanggilan data (Phase C: Arsitektur Data)
 */

export async function fetchStatistik() {
  try {
    const response = await fetch('/data/statistik.json');
    const data = await response.json();
    return data.statistik;
  } catch (error) {
    console.error('Error fetching statistik:', error);
    return [];
  }
}

export async function fetchLayanan() {
  try {
    const response = await fetch('/data/layanan.json');
    const data = await response.json();
    return data.layanan;
  } catch (error) {
    console.error('Error fetching layanan:', error);
    return [];
  }
}

export async function fetchTrackerStatus(ticketId) {
  try {
    const response = await fetch('/data/tracker.json');
    const data = await response.json();
    return data[ticketId] || null;
  } catch (error) {
    console.error('Error fetching tracker:', error);
    return null;
  }
}

export async function fetchPenduduk(nik) {
  try {
    const response = await fetch('/data/penduduk.json');
    const data = await response.json();
    return data[nik] || null;
  } catch (error) {
    console.error('Error fetching penduduk data:', error);
    return null;
  }
}

