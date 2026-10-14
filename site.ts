export const navItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Storytelling', href: '#storytelling' },
  { label: 'Digital Mapping', href: '#mapping' },
  { label: 'Virtual Experience', href: '#virtual' },
  { label: 'Tata Tertib', href: '#tata-tertib' },
  { label: 'Informasi', href: '#informasi' },
] as const

/**
 * Jam operasional — informasi yang diberikan pemilik proyek,
 * belum diverifikasi oleh pihak pengelola.
 */
export const visitInfo = {
  hours: '07.00–17.00 WITA',
  openHour: 7,
  closeHour: 17,
  timezoneOffset: 8,
  days: 'Konfirmasikan kepada pengelola setempat',
  location: 'Gua Laumehe, Wantopi, Mawasangka Timur, Sulawesi Tenggara',
  fullLocation:
    'Gua Laumehe, Wantopi, Kecamatan Mawasangka Timur, Kabupaten Buton Tengah, Sulawesi Tenggara',
  /** Ganti dengan tautan Google Maps resmi bila tersedia. */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Gua+Laumehe+Wantopi+Mawasangka+Timur+Buton+Tengah',
  reminder:
    'Rencanakan kunjungan sebelum jam operasional berakhir. Akses dan penelusuran ruang gua mengikuti kondisi lapangan serta arahan pengelola.',
  source: 'Informasi operasional dari pemilik proyek. Belum diverifikasi oleh pihak pengelola.',
}

/**
 * Peta asli Gua Laumehe.
 * Unggah gambar peta asli ke /public/images/peta-gua-laumehe.png
 * lalu set `available` ke true. Gambar akan ditampilkan apa adanya tanpa diubah.
 */
export const caveMap = {
  src: '/images/peta-gua-laumehe.png',
  alt: 'Peta asli Gua Laumehe',
  available: false,
  aspectRatio: 16 / 10,
}

export const conservationMessage =
  'Jelajahi dengan bijak. Lindungi alam, hormati lingkungan, dan tinggalkan gua tanpa sampah.'
