/**
 * Data lokasi eksplorasi Gua Laumehe.
 * ID harus konsisten dan dipakai oleh storytelling, peta, dan virtual experience.
 *
 * - `image.isPlaceholder: true` berarti gambar adalah ilustrasi, BUKAN foto asli Gua Laumehe.
 *   Ganti `src` dengan foto asli lalu set `isPlaceholder` ke false.
 * - `marker` adalah posisi visual (persen) di atas gambar peta, BUKAN koordinat GPS.
 *   Sesuaikan dengan posisi titik pada peta asli setelah peta diunggah.
 * - `panorama` (opsional): path gambar panorama equirectangular/silinder untuk viewer 360.
 * - `model3d` (opsional): path model .glb untuk pengembangan berikutnya.
 */

export type LocationId =
  | 'pintu-masuk'
  | 'ruang-stalaktit'
  | 'ruang-stalagmit'
  | 'danau-biru'
  | 'ruang-besar'
  | 'ruang-akhir'

export type CaveLocation = {
  id: LocationId
  number: string
  name: string
  tagline: string
  description: string
  education: string
  narration: string
  image: { src: string; alt: string; isPlaceholder: boolean } | null
  marker: { x: number; y: number }
  panorama?: string
  model3d?: string
}

export const locations: CaveLocation[] = [
  {
    id: 'pintu-masuk',
    number: '01',
    name: 'Pintu Masuk',
    tagline: 'Gerbang menuju dunia bawah tanah',
    description:
      'Titik awal penelusuran Gua Laumehe, tempat cahaya luar mulai berganti dengan suasana gelap dan sejuk di dalam gua.',
    education:
      'Zona mulut gua biasanya masih menerima cahaya matahari sehingga suhu dan kelembapannya berubah-ubah. Zona ini menjadi peralihan antara ekosistem luar dan dalam gua.',
    narration:
      'Langkah pertama dimulai di sini. Siapkan penerangan, dengarkan arahan pemandu, dan biarkan mata beradaptasi dengan gelap.',
    image: {
      src: '/images/lokasi-01-pintu-masuk.png',
      alt: 'Ilustrasi pintu masuk gua kapur dengan hutan hijau di luarnya',
      isPlaceholder: true,
    },
    marker: { x: 14, y: 72 },
  },
  {
    id: 'ruang-stalaktit',
    number: '02',
    name: 'Ruang Stalaktit',
    tagline: 'Formasi yang tumbuh dari langit-langit',
    description:
      'Ruang dengan formasi batuan yang menggantung dari langit-langit gua. [Lengkapi deskripsi spesifik ruang ini dari pengelola.]',
    education:
      'Stalaktit terbentuk dari tetesan air yang membawa kalsium karbonat terlarut. Saat air menetes, mineral mengendap sedikit demi sedikit dalam waktu yang sangat lama.',
    narration:
      'Arahkan lampu perlahan ke atas. Setiap tetes air adalah bagian dari proses alam yang berlangsung ribuan tahun — jangan disentuh.',
    image: {
      src: '/images/lokasi-02-stalaktit.png',
      alt: 'Ilustrasi langit-langit gua dengan banyak stalaktit',
      isPlaceholder: true,
    },
    marker: { x: 30, y: 52 },
  },
  {
    id: 'ruang-stalagmit',
    number: '03',
    name: 'Ruang Stalagmit',
    tagline: 'Pilar batu yang tumbuh dari lantai gua',
    description:
      'Ruang dengan formasi batuan yang menjulang dari lantai gua. [Lengkapi deskripsi spesifik ruang ini dari pengelola.]',
    education:
      'Stalagmit tumbuh dari lantai gua di bawah titik tetesan air. Bila stalaktit dan stalagmit bertemu, keduanya dapat membentuk pilar atau kolom.',
    narration:
      'Perhatikan langkah Anda. Lantai gua bisa licin, dan formasi di sekitar kaki Anda sangat rapuh.',
    image: {
      src: '/images/lokasi-03-stalagmit.png',
      alt: 'Ilustrasi stalagmit yang menjulang dari lantai gua',
      isPlaceholder: true,
    },
    marker: { x: 46, y: 36 },
  },
  {
    id: 'danau-biru',
    number: '04',
    name: 'Danau Biru',
    tagline: 'Genangan air jernih di dalam gua',
    description:
      'Area berair di dalam gua yang dikenal dengan nama Danau Biru. [Lengkapi informasi kedalaman, warna, dan kondisi air dari pengelola.]',
    education:
      'Air di dalam gua kapur umumnya berasal dari rembesan air hujan melalui celah batuan. Warna air dapat dipengaruhi oleh kandungan mineral, kedalaman, dan pantulan cahaya.',
    narration:
      'Diamlah sejenak dan lihat pantulan cahaya di permukaan air. Jaga kebersihan air — jangan membuang apa pun ke dalamnya.',
    image: {
      src: '/images/lokasi-04-danau-biru.png',
      alt: 'Ilustrasi kolam air biru jernih di dalam gua',
      isPlaceholder: true,
    },
    marker: { x: 60, y: 56 },
  },
  {
    id: 'ruang-besar',
    number: '05',
    name: 'Ruang Besar',
    tagline: 'Ruang luas di jantung gua',
    description:
      'Ruang terbesar dalam jalur penelusuran dengan langit-langit tinggi. [Lengkapi ukuran dan ciri khas ruang ini dari pengelola.]',
    education:
      'Ruang besar di dalam gua dapat terbentuk dari pelarutan batuan kapur oleh air dalam jangka waktu panjang, serta runtuhan batuan yang membuka ruang lebih luas.',
    narration:
      'Rasakan skala ruang ini. Suara Anda akan bergema — jaga ketenangan agar semua pengunjung dapat menikmatinya.',
    image: {
      src: '/images/lokasi-05-ruang-besar.png',
      alt: 'Ilustrasi ruang gua yang sangat luas dengan langit-langit tinggi',
      isPlaceholder: true,
    },
    marker: { x: 74, y: 40 },
  },
  {
    id: 'ruang-akhir',
    number: '06',
    name: 'Ruang Akhir',
    tagline: 'Batas jalur penelusuran yang diizinkan',
    description:
      'Titik akhir jalur penelusuran pengunjung. [Konfirmasikan batas jalur resmi bersama pengelola.]',
    education:
      'Bagian dalam gua umumnya memiliki kondisi gelap total dengan suhu dan kelembapan yang lebih stabil. Kondisi ini membuat ekosistemnya sensitif terhadap gangguan.',
    narration:
      'Inilah batas penelusuran. Jangan melanjutkan ke lorong yang tertutup. Saatnya kembali dengan aman dan tanpa meninggalkan jejak.',
    image: {
      src: '/images/lokasi-06-ruang-akhir.png',
      alt: 'Ilustrasi lorong sempit di ujung gua yang memudar ke dalam gelap',
      isPlaceholder: true,
    },
    marker: { x: 88, y: 24 },
  },
]

export function getLocation(id: LocationId) {
  return locations.find((location) => location.id === id) ?? locations[0]
}

export function getLocationIndex(id: LocationId) {
  return Math.max(
    0,
    locations.findIndex((location) => location.id === id),
  )
}
