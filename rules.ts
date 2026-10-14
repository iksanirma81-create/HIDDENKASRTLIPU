import {
  Ban,
  CigaretteOff,
  CloudRain,
  Flashlight,
  Footprints,
  Gem,
  Hand,
  OctagonAlert,
  PenOff,
  Trash2,
  Users,
  Volume1,
  type LucideIcon,
} from 'lucide-react'

export type CaveRule = { text: string; icon: LucideIcon }

/** Rancangan awal — sesuaikan dengan kebijakan resmi pengelola setempat. */
export const caveRules: CaveRule[] = [
  { text: 'Ikuti arahan pemandu atau pengelola setempat.', icon: Hand },
  { text: 'Gunakan alas kaki yang sesuai dan tidak licin.', icon: Footprints },
  { text: 'Bawa lampu penerangan yang memadai jika diperlukan.', icon: Flashlight },
  {
    text: 'Jangan menyentuh, mematahkan, mengambil, atau merusak stalaktit dan stalagmit.',
    icon: Gem,
  },
  { text: 'Jangan membuang sampah di dalam atau sekitar gua.', icon: Trash2 },
  { text: 'Jangan mencoret dinding atau meninggalkan tanda pada batuan.', icon: PenOff },
  { text: 'Jangan membuat api atau merokok di dalam gua.', icon: CigaretteOff },
  { text: 'Jaga suara dan hormati pengunjung serta lingkungan sekitar.', icon: Volume1 },
  {
    text: 'Jangan memasuki lorong yang ditutup atau melanjutkan penelusuran di luar jalur yang diizinkan.',
    icon: Ban,
  },
  {
    text: 'Jangan memasuki gua sendirian; lakukan penelusuran bersama pemandu atau pendamping yang kompeten.',
    icon: Users,
  },
  {
    text: 'Perhatikan kondisi cuaca, genangan air, permukaan licin, dan potensi bahaya setempat.',
    icon: CloudRain,
  },
  {
    text: 'Jika merasa tidak aman atau kondisi berubah, hentikan penelusuran dan ikuti instruksi pemandu.',
    icon: OctagonAlert,
  },
]
