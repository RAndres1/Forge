export type ShopItemCategory = 'passport_frame' | 'theme' | 'badge_title';

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  category: ShopItemCategory;
  priceOre: number;
  icon: string;
  isUnlocked: boolean;
}

export const SHOP_ITEMS_CATALOG: ShopItem[] = [
  {
    id: 'frame-fire',
    name: 'Marco Gladiador Fuego',
    description: 'Marco animado con aura de fuego para tu tarjeta de Pasaporte.',
    category: 'passport_frame',
    priceOre: 500,
    icon: '🔥',
    isUnlocked: false,
  },
  {
    id: 'frame-neon',
    name: 'Marco Cyber Neón',
    description: 'Borde fosforescente de alta intensidad.',
    category: 'passport_frame',
    priceOre: 800,
    icon: '⚡',
    isUnlocked: false,
  },
  {
    id: 'badge-titans',
    name: 'Título: "Levantador de Titanes"',
    description: 'Título exclusivo visible junto a tu nombre de usuario.',
    category: 'badge_title',
    priceOre: 1200,
    icon: '🏋️‍♂️',
    isUnlocked: false,
  },
  {
    id: 'theme-immortal',
    name: 'Tema: Modo Inmortal Oscuro',
    description: 'Paleta de colores ultra oscura con acentos dorados.',
    category: 'theme',
    priceOre: 2000,
    icon: '👑',
    isUnlocked: false,
  },
];

/**
 * Evaluates purchasing a shop item with Forge Ore
 */
export function purchaseShopItem(
  currentOre: number,
  item: ShopItem,
  unlockedItemIds: string[]
): { success: boolean; remainingOre: number; error?: string } {
  if (unlockedItemIds.includes(item.id)) {
    return { success: false, remainingOre: currentOre, error: 'Ya has desbloqueado este cosmético.' };
  }

  if (currentOre < item.priceOre) {
    return {
      success: false,
      remainingOre: currentOre,
      error: `Minerales insuficientes. Necesitas ${item.priceOre} Forge Ore (tienes ${currentOre}).`,
    };
  }

  return {
    success: true,
    remainingOre: currentOre - item.priceOre,
  };
}
