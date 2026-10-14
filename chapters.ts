import type { LocationId } from './locations'

/**
 * Bab Digital Storytelling.
 * Teks dalam tanda [ ... ] adalah placeholder yang perlu dilengkapi
 * dengan informasi terverifikasi dari pengelola / masyarakat setempat.
 * Jangan menambahkan legenda atau fakta sejarah yang belum diverifikasi.
 */

export type StoryChapter = {
  number: string
  title: string
  kicker: string
  summary: string
  body: string[]
  locationId: LocationId
  needsVerification?: boolean
}

export const chapters: StoryChapter[] = [
  {
    number: '01',
    title: 'Mengenal Gua Laumehe',
    kicker: 'Pengantar',
    summary:
      'Gua Laumehe berada di Wantopi, Kecamatan Mawasangka Timur, Kabupaten Buton Tengah, Sulawesi Tenggara — sebuah destinasi alam yang menyimpan dunia tersembunyi di bawah permukaan.',
    body: [
      'Website ini mengajak Anda mengenal Gua Laumehe secara digital sebelum berkunjung: ruang-ruangnya, keunikan alamnya, dan cara menjelajahinya dengan bertanggung jawab.',
      '[Placeholder: tambahkan profil singkat gua yang telah diverifikasi pengelola, misalnya status pengelolaan dan akses menuju lokasi.]',
    ],
    locationId: 'pintu-masuk',
  },
  {
    number: '02',
    title: 'Lanskap dan Lingkungan Gua',
    kicker: 'Alam Sekitar',
    summary:
      'Gua terbentuk di dalam bentang alam batuan kapur. Lingkungan di sekitarnya menjadi bagian penting dari sistem gua itu sendiri.',
    body: [
      'Air hujan yang meresap melalui tanah dan celah batuan perlahan melarutkan batuan kapur, membentuk lorong dan ruang di bawah tanah.',
      '[Placeholder: tambahkan deskripsi vegetasi, kondisi lanskap, dan lingkungan sekitar Gua Laumehe berdasarkan pengamatan lapangan.]',
    ],
    locationId: 'ruang-stalaktit',
  },
  {
    number: '03',
    title: 'Formasi Alam dan Keunikan Gua',
    kicker: 'Geologi',
    summary:
      'Stalaktit, stalagmit, dan formasi batuan lainnya adalah hasil proses pengendapan mineral yang sangat lambat.',
    body: [
      'Setiap formasi tumbuh sedikit demi sedikit dari tetesan air yang membawa mineral. Karena prosesnya sangat lambat, kerusakan kecil sekalipun sulit dipulihkan.',
      '[Placeholder: tambahkan formasi khas Gua Laumehe yang telah terdokumentasi.]',
    ],
    locationId: 'ruang-stalagmit',
  },
  {
    number: '04',
    title: 'Menelusuri Ruang Gua',
    kicker: 'Jalur Eksplorasi',
    summary:
      'Jalur penelusuran menghubungkan enam titik: Pintu Masuk, Ruang Stalaktit, Ruang Stalagmit, Danau Biru, Ruang Besar, hingga Ruang Akhir.',
    body: [
      'Setiap ruang memiliki suasana berbeda. Gunakan peta digital untuk memahami urutan ruang dan virtual experience untuk melihat gambarannya.',
      'Kondisi jalur dapat berubah mengikuti cuaca dan kondisi lapangan. Selalu ikuti arahan pemandu.',
    ],
    locationId: 'danau-biru',
  },
  {
    number: '05',
    title: 'Cerita dan Pengetahuan Lokal',
    kicker: 'Budaya',
    summary:
      'Bagian ini disiapkan untuk cerita dan pengetahuan lokal tentang Gua Laumehe yang telah dikumpulkan dan diverifikasi bersama masyarakat setempat.',
    body: [
      '[Placeholder: tambahkan cerita, makna nama, atau pengetahuan lokal yang telah dikonfirmasi oleh tokoh masyarakat atau pengelola. Cantumkan sumbernya.]',
      'Kami sengaja tidak menampilkan legenda atau sejarah yang belum terverifikasi untuk menghormati keaslian budaya setempat.',
    ],
    locationId: 'ruang-besar',
    needsVerification: true,
  },
  {
    number: '06',
    title: 'Pelestarian dan Wisata Berkelanjutan',
    kicker: 'Konservasi',
    summary:
      'Gua adalah ekosistem yang rapuh. Wisata yang baik adalah wisata yang meninggalkan gua tetap utuh untuk generasi berikutnya.',
    body: [
      'Tidak menyentuh formasi, tidak meninggalkan sampah, dan mengikuti jalur yang diizinkan adalah cara paling sederhana untuk ikut melestarikan Gua Laumehe.',
      '[Placeholder: tambahkan program pelestarian atau peran masyarakat dalam pengelolaan gua.]',
    ],
    locationId: 'ruang-akhir',
  },
]
