import { Product } from '../types';

function cs(colors: string[], price: number) {
  return colors.map((color, i) => ({ ml: i + 1, price, color }));
}

export const products: Product[] = [
  // ── PANAS ────────────────────────────────────────────────────────────────
  {
    id: '1',
    name: 'PANA MURANO',
    brand: 'PANA MURANO',
    description: '100% poliéster · Ancho 1.42m · 385 g/m lineal · Proceso antimancha.',
    longDescription: 'Pana Murano es nuestra línea premium de tapicería con textura aterciopelada suave al tacto y proceso antimancha incorporado. Su peso de 385 g/m la hace ideal para proyectos de tapizado exigentes. Disponible en 12 colores modernos para cualquier proyecto de decoración.',
    notes: {
      top: ['100% Poliéster', 'Ancho: 1.42 m', '385 g/m lineal'],
      heart: ['Proceso antimancha', 'Semiopaca', 'Suave al tacto'],
      base: ['Tapicería', 'Cortinería', 'Decoración de interiores'],
    },
    price: 7100,
    originalPrice: 8165,
    category: 'panas',
    gender: 'unisex',
    sizes: cs(['Vison', 'Verde Uva', 'Verde Inglés', 'Stone', 'Rojo', 'Rosa', 'Roble', 'Plomo', 'Oro', 'Negro', 'Bordo', 'Azul Noche'], 7100),
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    ],
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isFeatured: true,
    isNew: false,
    tags: ['antimancha', 'tapicería', 'suave'],
  },
  {
    id: '2',
    name: 'PANNE',
    brand: 'PANNE',
    description: '100% poliéster · Ancho 1.45m · Efecto marmolado · Semiopaca y resistente.',
    longDescription: 'La Panne es una tela con efecto marmolado único que aporta profundidad visual a cualquier proyecto. Semiopaca con caída pesada y suave al tacto, es muy resistente al uso cotidiano. Perfecta para tapizado de sofás y cortinas de alta gama.',
    notes: {
      top: ['100% Poliéster', 'Ancho: 1.45 m', 'Caída pesada'],
      heart: ['Efecto marmolado', 'Semiopaca', 'Resistente'],
      base: ['Tapicería premium', 'Cortinas', 'Cabeceras'],
    },
    price: 16400,
    originalPrice: 18860,
    category: 'panas',
    gender: 'unisex',
    sizes: cs(['Violeta', 'Rojo Vivo', 'Roca', 'Agua'], 16400),
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isFeatured: true,
    isNew: false,
    tags: ['marmolado', 'semiopaca', 'premium'],
  },
  {
    id: '3',
    name: 'MECHA',
    brand: 'MECHA',
    description: 'Pana suave de diseño moderno con proceso antimancha. Ideal para tapicería.',
    longDescription: 'MECHA es una pana de diseño moderno con proceso antimancha de alta efectividad. Su textura suave la hace perfecta para proyectos de tapizado residencial y comercial. Disponible en una amplia paleta de 18 colores que cubre desde neutros clásicos hasta tonos vibrantes.',
    notes: {
      top: ['Proceso antimancha', 'Diseño moderno'],
      heart: ['Textura suave', 'Alta durabilidad'],
      base: ['Tapicería', 'Mobiliario', 'Decoración'],
    },
    price: 12990,
    originalPrice: 14939,
    category: 'panas',
    gender: 'unisex',
    sizes: cs(['Violeta', 'Turquesa', 'Topo', 'Tabaco', 'Sambayón', 'Rojo', 'Plata', 'Petróleo', 'Perla', 'Negro', 'Navy', 'Malbec', 'Gris', 'Gamuza', 'Gamo', 'Cobre', 'Arena'], 12990),
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    ],
    rating: 4.7,
    reviews: 203,
    inStock: true,
    isFeatured: true,
    isNew: false,
    tags: ['antimancha', 'moderna', '18 colores'],
  },
  {
    id: '4',
    name: 'MICA',
    brand: 'MICA',
    description: 'Pana premium con proceso antimancha y efecto marmolado. Semiopaca y pesada.',
    longDescription: 'MICA es nuestra pana de calidad premium con proceso antimancha y un sofisticado efecto marmolado que le da un aspecto único. Es semiopaca, pesada y muy resistente, ideal para tapizados que requieren mayor durabilidad y un toque de distinción.',
    notes: {
      top: ['Premium', 'Proceso antimancha'],
      heart: ['Efecto marmolado', 'Semiopaca', 'Pesada'],
      base: ['Tapicería premium', 'Sillones', 'Cortinas pesadas'],
    },
    price: 11990,
    originalPrice: 13789,
    category: 'panas',
    gender: 'unisex',
    sizes: cs(['Granate', 'Cherry', 'Azul Marino', 'Negro', 'Plomo', 'Gris', 'Plata', 'Rosa', 'Agua Marina', 'Azul Profundo', 'Vison', 'Beige'], 11990),
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    ],
    rating: 4.8,
    reviews: 142,
    inStock: true,
    isFeatured: false,
    isNew: true,
    tags: ['marmolado', 'premium', 'antimancha'],
  },
  {
    id: '5',
    name: 'THOR',
    brand: 'THOR',
    description: 'Alta resistencia con estilo moderno. Suavidad y excelente durabilidad.',
    longDescription: 'THOR es la pana de mayor durabilidad de nuestra colección, diseñada para soportar el uso intensivo sin perder su elegancia. Su suavidad al tacto y resistencia excepcional la hacen ideal tanto para proyectos residenciales como comerciales de alta exigencia.',
    notes: {
      top: ['Alta resistencia', 'Uso intensivo'],
      heart: ['Suave al tacto', 'Estilo moderno'],
      base: ['Tapicería comercial', 'Residencial', 'Hotelería'],
    },
    price: 14990,
    originalPrice: 17239,
    category: 'panas',
    gender: 'unisex',
    sizes: cs(['Topo', 'Petróleo', 'Perla', 'Marsala', 'Lino', 'Gris', 'Gris Oscuro', 'Gamuza', 'Dijon', 'Cielo', 'Bronce', 'Azul', 'Alga', 'Natural', 'Tostado'], 14990),
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80',
    ],
    rating: 4.9,
    reviews: 178,
    inStock: true,
    isFeatured: true,
    isNew: false,
    tags: ['resistente', 'durable', 'comercial'],
  },
  {
    id: '6',
    name: 'DONN',
    brand: 'DONN',
    description: 'Pana con excelente relación calidad-precio. Disponible en colores clásicos.',
    longDescription: 'DONN es una pana clásica de gran calidad a un precio accesible. Su composición garantiza durabilidad y fácil mantenimiento. Perfecta para proyectos donde se busca equilibrio entre calidad y economía.',
    notes: {
      top: ['Buena relación calidad-precio'],
      heart: ['Fácil mantenimiento'],
      base: ['Tapicería', 'Decoración'],
    },
    price: 8690,
    originalPrice: 9994,
    category: 'panas',
    gender: 'unisex',
    sizes: cs(['Chicle', 'Gris'], 8690),
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
    rating: 4.6,
    reviews: 67,
    inStock: true,
    isFeatured: false,
    isNew: false,
    tags: ['accesible', 'clásico'],
  },
  // ── TELAS ────────────────────────────────────────────────────────────────
  {
    id: '7',
    name: 'MAUI',
    brand: 'MAUI',
    description: 'Tela versátil para tapicería y decoración. Gran variedad de colores.',
    longDescription: 'MAUI es una tela polivalente de alta calidad, perfecta para tapizado de sillas, sillones y aplicaciones decorativas. Su textura uniforme y variedad cromática de 15 colores la convierten en una de las opciones más elegidas por tapiceros y decoradores.',
    notes: {
      top: ['Textura uniforme', 'Alta versatilidad'],
      heart: ['Fácil de trabajar', 'Durabilidad'],
      base: ['Tapicería', 'Sillas', 'Decoración'],
    },
    price: 7390,
    originalPrice: 8500,
    category: 'telas',
    gender: 'unisex',
    sizes: cs(['Petróleo', 'Topo', 'Gris', 'Piedra', 'Azul', 'Agua', 'Verde', 'Rojo', 'Naranja', 'Amarillo', 'Tostado', 'Gamuza', 'Lino', 'Arena', 'Crudo'], 7390),
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80',
    ],
    rating: 4.7,
    reviews: 134,
    inStock: true,
    isFeatured: true,
    isNew: false,
    tags: ['versátil', 'tapicería', '15 colores'],
  },
  {
    id: '8',
    name: 'SPAZIO',
    brand: 'SPAZIO',
    description: 'Tela premium con amplia paleta de 20 colores. Ideal para proyectos de diseño.',
    longDescription: 'SPAZIO es nuestra tela de línea premium con la mayor paleta de colores del catálogo: 20 opciones que van desde neutros clásicos hasta tonos tendencia. Su acabado y calidad de confección la hacen ideal para proyectos de diseño de interiores exigentes.',
    notes: {
      top: ['Línea premium', '20 colores disponibles'],
      heart: ['Acabado refinado', 'Textura agradable'],
      base: ['Diseño de interiores', 'Tapicería', 'Mobiliario'],
    },
    price: 9890,
    originalPrice: 11374,
    category: 'telas',
    gender: 'unisex',
    sizes: cs(['Negro', 'Topo', 'Petróleo', 'Gris', 'Azul', 'Cielo', 'Piedra', 'Stone', 'Gamo', 'Nuda', 'Rosa', 'Musgo', 'Verde', 'Amarillo', 'Almendra', 'Arena', 'Lino', 'Beige', 'Crudo', 'Óptico'], 9890),
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    ],
    rating: 4.8,
    reviews: 211,
    inStock: true,
    isFeatured: true,
    isNew: true,
    tags: ['premium', '20 colores', 'diseño'],
  },
  {
    id: '9',
    name: 'APOLO',
    brand: 'APOLO',
    description: 'Tela resistente de uso general. Excelente para proyectos de tapicería.',
    longDescription: 'APOLO es una tela de uso general con excelente resistencia al desgaste. Su construcción sólida la hace ideal para tapizado de alta exigencia, especialmente en ambientes de uso frecuente como comedores, oficinas y locales comerciales.',
    notes: {
      top: ['Resistencia al desgaste', 'Uso general'],
      heart: ['Construcción sólida'],
      base: ['Comedores', 'Oficinas', 'Comercios'],
    },
    price: 8500,
    originalPrice: 9770,
    category: 'telas',
    gender: 'unisex',
    sizes: cs(['Negro', 'Gris', 'Topo', 'Beige', 'Azul', 'Verde', 'Bordo', 'Crudo'], 8500),
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80',
    ],
    rating: 4.6,
    reviews: 95,
    inStock: true,
    isFeatured: false,
    isNew: false,
    tags: ['resistente', 'uso general', 'tapicería'],
  },
  // ── CUERINAS ─────────────────────────────────────────────────────────────
  {
    id: '10',
    name: 'CUEROTEX',
    brand: 'CUEROTEX',
    description: 'Cuero sintético premium. Fácil limpieza y alta durabilidad.',
    longDescription: 'CUEROTEX es nuestro cuero sintético de mayor calidad, con acabado que imita el cuero natural a la perfección. Su superficie lisa facilita la limpieza y su resistencia al desgaste lo convierte en la elección ideal para tapizado de sillas de comedor, bares, restaurantes y oficinas.',
    notes: {
      top: ['Cuero sintético premium', 'Fácil limpieza'],
      heart: ['Imitación cuero natural', 'Alta resistencia'],
      base: ['Sillas de comedor', 'Bares y restaurantes', 'Oficinas'],
    },
    price: 6690,
    originalPrice: 7694,
    category: 'cuerinas',
    gender: 'unisex',
    sizes: cs(['Hunger Green', 'Ocre', 'Tostado', 'Black', 'Marsala', 'Stone', 'Suela', 'Vison', 'Beige', 'Bone', 'Cemento', 'Chocolate'], 6690),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    ],
    rating: 4.7,
    reviews: 189,
    inStock: true,
    isFeatured: true,
    isNew: false,
    tags: ['cuero sintético', 'fácil limpieza', 'restaurantes'],
  },
];

export function getProductById(id: string): typeof products[0] | undefined {
  return products.find(p => p.id === id);
}

export function getFeaturedProducts(): typeof products {
  return products.filter(p => p.isFeatured);
}

export function getNewProducts(): typeof products {
  return products.filter(p => p.isNew);
}

export function getBrands(): string[] {
  return [...new Set(products.map(p => p.brand))].sort();
}

export function getMaxPrice(): number {
  return Math.max(...products.map(p => p.originalPrice ?? p.price));
}
