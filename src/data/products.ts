import { Product } from '../types';

export const INAUGURATION_DISCOUNT_AMOUNT = 10000;
export const STORE_WHATSAPP_NUMBER = '543834765670';
export const STORE_INSTAGRAM = 'maisoncatamarca';
export const DEFAULT_HERO_IMAGE = "/images/todos_juntos.jfif";
export const CATALOG_VERSION = "2026_10_08_v3_user_images";

export const CATEGORIES = [
  { id: 'all', label: 'Todos los Combos' },
  { id: 'cherry', label: 'Línea Cherry Signature' },
  { id: 'friends', label: 'Pack Friends & Compartidos' },
] as const;

export const PRODUCTS: Product[] = [
  {
    "id": "cherry-classic",
    "name": "CHERRY CLASIC",
    "tagline": "Collar dorado de cadena fina con dije cereza y aros colgantes con circonio",
    "price": 32200,
    "originalPrice": 32200,
    "category": "combos",
    "categoryLabel": "Combo 01",
    "image": "/images/c1principal.png",
    "secondaryImages": [
      "/images/c1secundaria_1.png",
      "/images/c1secundaria_2.png",
      "/images/c1secundaria_3.png"
    ],
    "description": "El conjunto clásico icónico de la marca. Incluye el delicado collar dorado con dije de doble cereza esmaltada en rojo rubí y hojitas verdes, acompañado de sus aros colgantes a juego con engarce superior de circonio brillante.",
    "includes": [
      "1x Collar fino dorado con dije doble cereza esmaltada en rojo rubí",
      "1x Par de aros colgantes cereza con gema superior de circonio brillante",
      "Sobre de presentación con lazo de satén rojo"
    ],
    "inStock": true,
    "isFeatured": true,
    "badge": "Combo Clásico"
  },
  {
    "id": "cherry-perla",
    "name": "CHERRY PERLA",
    "tagline": "Gargantilla de perlas pulidas con cerezas de cristal rubí + 3 pares de aros",
    "price": 42200,
    "originalPrice": 42200,
    "category": "combos",
    "categoryLabel": "Combo 02",
    "image": "/images/cpprincipal.jpg",
    "secondaryImages": [
      "/images/cpsecundaria_1.png",
      "/images/cpsecundaria_2.png"
    ],
    "description": "Exclusiva gargantilla de perlas pulidas de brillo sedoso con colgante central de cerezas dobles en cristal facetado color rubí y hojitas de circonio verde olivo. Incluye aros de cereza de cristal facetado más 2 pares adicionales de aritos solitarios de perla y punto de luz (3 pares de aros en total).",
    "includes": [
      "1x Gargantilla de perlas con dije central de cerezas en cristal rubí y circonios",
      "1x Par de aros colgantes cerezas de cristal facetado con hojas de gemas",
      "2x Pares de aritos solitarios adicionales (perla clásica + solitario brillante)",
      "Sobre de presentación con lazo de satén rojo"
    ],
    "inStock": true,
    "isFeatured": true,
    "badge": "Combo Perla"
  },
  {
    "id": "friends",
    "name": "FRIENDS",
    "tagline": "Pack doble regalo: Sol y Luna magnético, corazón vintage, choker y 4 pares de aros",
    "price": 72200,
    "originalPrice": 72200,
    "category": "besties",
    "categoryLabel": "Combo 03",
    "image": "/images/todos_juntos.jfif",
    "secondaryImages": [
      "/images/cf1.png",
      "/images/cf2.png",
      "/images/cf3.png",
      "/images/cf4.png",
      "/images/cf5.png",
      "/images/cf6.png",
      "/images/cf7.png"
    ],
    "description": "El conjunto completo pensado para compartir con tu mejor amiga o hermana. Incluye el collar compartido magnético Sol y Luna con cristales pavé (oro y plata), el collar con dije de corazón esmaltado con rosas, el choker negro con esfera cereza traslúcida, aros Cat in a Cup, aros gatito Luna, aros gatito blanco celestial y argollitas butterfly bordó.",
    "includes": [
      "1x Collar compartido Sol y Luna celestial magnético (Oro & Plata)",
      "1x Collar fino dorado con corazón vintage esmaltado con rosas",
      "1x Choker de gamuza negra con esfera colgante de cereza roja",
      "1x Par de aros Cat in a Cup (gatitos en taza rosa con corazón)",
      "1x Par de aros Cat Cartoon Luna (gatito negro esmaltado)",
      "1x Par de aros Gatito Blanco celestial con constelaciones",
      "1x Par de argollitas butterfly huggies fantasía bordó"
    ],
    "inStock": true,
    "isFeatured": true,
    "badge": "Pack Amigas / Doble"
  }
];
