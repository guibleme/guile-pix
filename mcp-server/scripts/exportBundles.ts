/**
 * Bundle Exporter for itch.io — packages templates into sellable asset packs.
 *
 * Usage: cd mcp-server && npx tsx scripts/exportBundles.ts
 *
 * Output: mcp-server/output/bundles/
 *   ├── rpg-icon-megapack/
 *   │   ├── sprites-1x/          (16x16 PNGs)
 *   │   ├── sprites-4x/          (64x64 PNGs, nearest-neighbor)
 *   │   ├── spritesheets/        (combined sheets)
 *   │   ├── preview/             (marketing images)
 *   │   ├── gallery.html         (interactive browser)
 *   │   ├── README.txt           (license + usage)
 *   │   └── palette.png          (DB16 reference)
 *   ├── world-builder-pack/
 *   │   └── ...
 *   └── ...
 */

import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';
import { createProject, deleteProject } from '../src/project.js';
import { handleDrawTemplate } from '../src/tools/templateTools.js';
import { renderProjectToPng, compositeProject } from '../src/render.js';
import { renderToPng } from '../src/render.js';

// ─── Import ALL template registries ─────────────────────────────

import { TEMPLATES } from '../src/templates/humanoid16.js';
import { GAME_TEMPLATES } from '../src/templates/gameStyles.js';
import { CREATURE_TEMPLATES } from '../src/templates/creatures.js';
import { ITEM_TEMPLATES } from '../src/templates/items.js';
import { ITEM_VARIETY_TEMPLATES } from '../src/templates/itemsVariety.js';
import { ENVIRONMENT_TEMPLATES } from '../src/templates/environment.js';
import { UI_TEMPLATES } from '../src/templates/uiElements.js';
import { COZY_SHOP_UI_TEMPLATES } from '../src/templates/uiCozyShop.js';
import { EFFECT_TEMPLATES } from '../src/templates/effects.js';
import { DUNGEON_TEMPLATES } from '../src/templates/dungeon.js';
import { DUNGEON_BATCH1_TEMPLATES } from '../src/templates/dungeonVariety.js';
import { EQUIPMENT_TEMPLATES } from '../src/templates/equipment.js';
import { FURNITURE_TEMPLATES } from '../src/templates/furniture.js';
import { RPG_UI_TEMPLATES } from '../src/templates/rpgUI.js';
import { RPG_UI_VARIETY_TEMPLATES } from '../src/templates/rpgUIVariety.js';
import { NATURE_TEMPLATES } from '../src/templates/nature.js';
import { ENEMY_TEMPLATES } from '../src/templates/enemies.js';
import { BOSS_TEMPLATES } from '../src/templates/bosses.js';
import { NPC_TEMPLATES } from '../src/templates/npcs.js';
import { FOOD_TEMPLATES } from '../src/templates/food.js';
import { BIOME_TEMPLATES } from '../src/templates/biomes.js';
import { VEHICLE_TEMPLATES } from '../src/templates/vehicles.js';
import { CHARACTER_VARIANT_TEMPLATES } from '../src/templates/characterVariants.js';
import { PROP_TEMPLATES } from '../src/templates/props.js';
import { ANIMATION_16_TEMPLATES } from '../src/templates/animations16.js';
import { PLANT_TEMPLATES } from '../src/templates/plants.js';
import { PLANT_BATCH1_TEMPLATES } from '../src/templates/plantsVariety.js';
import { BUILDING_TEMPLATES } from '../src/templates/buildings.js';
import { CREATURE_BATCH1_TEMPLATES } from '../src/templates/creaturesVariety.js';
import { ENEMY_BATCH1_TEMPLATES } from '../src/templates/enemiesVariety.js';
import { BUILDING_BATCH1_TEMPLATES } from '../src/templates/buildingsVariety.js';
import { EFFECT_BATCH1_TEMPLATES } from '../src/templates/effectsVariety.js';
import { FOOD_BATCH1_TEMPLATES } from '../src/templates/foodVariety.js';
import { BOSS_BATCH1_TEMPLATES } from '../src/templates/bossesVariety.js';
import { VEHICLE_BATCH1_TEMPLATES } from '../src/templates/vehiclesVariety.js';
import { CHARACTER_BATCH1_TEMPLATES } from '../src/templates/charactersVariety.js';
import { FURNITURE_BATCH1_TEMPLATES } from '../src/templates/furnitureVariety.js';
import { UI_VARIETY_TEMPLATES } from '../src/templates/uiVariety.js';
import { CREATURE_BATCH2_TEMPLATES } from '../src/templates/creaturesVariety2.js';
import { EFFECT_BATCH2_TEMPLATES } from '../src/templates/effectsVariety2.js';
import { BUILDING_BATCH2_TEMPLATES } from '../src/templates/buildingsVariety2.js';
import { FOOD_BATCH2_TEMPLATES } from '../src/templates/foodVariety2.js';
import { BIOME_VARIETY_TEMPLATES } from '../src/templates/biomesVariety.js';
import { ENVIRONMENT_VARIETY_TEMPLATES } from '../src/templates/environmentVariety.js';
import { NATURE_VARIETY_TEMPLATES } from '../src/templates/natureVariety.js';
import { CREATURE_BATCH3_TEMPLATES } from '../src/templates/creaturesVariety3.js';
import { ENEMY_BATCH2_TEMPLATES } from '../src/templates/enemiesVariety2.js';
import { ENEMY_BATCH3_TEMPLATES } from '../src/templates/enemiesVariety3.js';
import { BOSS_BATCH2_TEMPLATES } from '../src/templates/bossesVariety2.js';
import { VEHICLE_BATCH2_TEMPLATES } from '../src/templates/vehiclesVariety2.js';
import { VEHICLE_BATCH3_TEMPLATES } from '../src/templates/vehiclesVariety3.js';
import { VEHICLE_BATCH4_TEMPLATES } from '../src/templates/vehiclesVariety4.js';
import { VEHICLE_BATCH5_TEMPLATES } from '../src/templates/vehiclesVariety5.js';
import { EQUIPMENT_VARIETY_TEMPLATES } from '../src/templates/equipmentVariety.js';
import { FOOD_BATCH3_TEMPLATES } from '../src/templates/foodVariety3.js';
import { FURNITURE_BATCH2_TEMPLATES } from '../src/templates/furnitureVariety2.js';
import { FURNITURE_BATCH3_TEMPLATES } from '../src/templates/furnitureVariety3.js';
import { EFFECT_BATCH3_TEMPLATES } from '../src/templates/effectsVariety3.js';
import { BUILDING_BATCH3_TEMPLATES } from '../src/templates/buildingsVariety3.js';
import { MODERN_TECH_TEMPLATES } from '../src/templates/modernTech.js';
import { RETRO_TECH_TEMPLATES } from '../src/templates/retroTech.js';
import { RETRO_TECH_BATCH1_TEMPLATES } from '../src/templates/retroTechVariety.js';
import { RETRO_TECH_BATCH2_TEMPLATES } from '../src/templates/retroTechVariety2.js';
import { RETRO_TECH_BATCH3_TEMPLATES } from '../src/templates/retroTechVariety3.js';
import { RETRO_TECH_BATCH4_TEMPLATES } from '../src/templates/retroTechVariety4.js';
import { ITEM_BATCH2_TEMPLATES } from '../src/templates/itemsVariety2.js';
import { EQUIPMENT_BATCH2_TEMPLATES } from '../src/templates/equipmentVariety2.js';
import { WEAPONS_CLASSIC_TEMPLATES } from '../src/templates/weaponsClassic.js';
import { MODERN_TECH_BATCH1_TEMPLATES } from '../src/templates/modernTechVariety.js';
import { MODERN_TECH_BATCH2_TEMPLATES } from '../src/templates/modernTechVariety2.js';
import { MODERN_TECH_BATCH3_TEMPLATES } from '../src/templates/modernTechVariety3.js';
import { MODERN_TECH_BATCH4_TEMPLATES } from '../src/templates/modernTechVariety4.js';
import { EFFECT_BATCH4_TEMPLATES } from '../src/templates/effectsVariety4.js';
import { EFFECT_BATCH5_TEMPLATES } from '../src/templates/effectsVariety5.js';
import { EFFECT_BATCH6_TEMPLATES } from '../src/templates/effectsVariety6.js';
import { UI_BARS_TEMPLATES } from '../src/templates/uiBarsVariety.js';
import { COZY_BATCH1_TEMPLATES } from '../src/templates/cozyVariety.js';
import { FOOD_BATCH4_TEMPLATES } from '../src/templates/foodVariety4.js';
import { COZY_BATCH2_TEMPLATES } from '../src/templates/cozyVariety2.js';
import { COZY_BATCH3_TEMPLATES } from '../src/templates/cozyVariety3.js';
import { FOOD_BATCH5_TEMPLATES } from '../src/templates/foodVariety5.js';
import { DUNGEON_BATCH2_TEMPLATES } from '../src/templates/dungeonVariety2.js';
import { DUNGEON_TILES_BATCH1_TEMPLATES } from '../src/templates/dungeonTilesVariety.js';
import { DUNGEON_TILES_BATCH2_TEMPLATES } from '../src/templates/dungeonTilesVariety2.js';
import { DUNGEON_TILES_BATCH3_TEMPLATES } from '../src/templates/dungeonTilesVariety3.js';
import { DUNGEON_TILES_BATCH4_TEMPLATES } from '../src/templates/dungeonTilesVariety4.js';
import { DUNGEON_TILES_BATCH5_TEMPLATES } from '../src/templates/dungeonTilesVariety5.js';
import { COZY_BATCH4_TEMPLATES } from '../src/templates/cozyVariety4.js';
import { LIBRARY_BATCH1_TEMPLATES } from '../src/templates/libraryVariety.js';
import { LIBRARY_BATCH2_TEMPLATES } from '../src/templates/libraryVariety2.js';
import { LIBRARY_BATCH3_TEMPLATES } from '../src/templates/libraryVariety3.js';
import { LIBRARY_BATCH4_TEMPLATES } from '../src/templates/libraryVariety4.js';
import { LIBRARY_BATCH5_TEMPLATES } from '../src/templates/libraryVariety5.js';
import { LOFI_BATCH1_TEMPLATES } from '../src/templates/lofiStudyVariety.js';
import { LOFI_BATCH2_TEMPLATES } from '../src/templates/lofiStudyVariety2.js';
import { LOFI_BATCH3_TEMPLATES } from '../src/templates/lofiStudyVariety3.js';
import { MUSIC_BATCH1_TEMPLATES } from '../src/templates/musicVariety.js';
import { CRAFTING_BATCH1_TEMPLATES } from '../src/templates/craftingVariety.js';
import { MUSIC_BATCH2_TEMPLATES } from '../src/templates/musicVariety2.js';
import { MUSIC_BATCH3_TEMPLATES } from '../src/templates/musicVariety3.js';
import { MUSIC_BATCH4_TEMPLATES } from '../src/templates/musicVariety4.js';
import { MUSIC_BATCH5_TEMPLATES } from '../src/templates/musicVariety5.js';
import { CRAFTING_BATCH2_TEMPLATES } from '../src/templates/craftingVariety2.js';
import { CRAFTING_BATCH3_TEMPLATES } from '../src/templates/craftingVariety3.js';
import { CRAFTING_BATCH4_TEMPLATES } from '../src/templates/craftingVariety4.js';
import { CRAFTING_BATCH5_TEMPLATES } from '../src/templates/craftingVariety5.js';
import { WEAPON_STAFF_BATCH1_TEMPLATES } from '../src/templates/weaponStaffVariety.js';
import { WEAPON_STAFF_BATCH2_TEMPLATES } from '../src/templates/weaponStaffVariety2.js';
import { WEAPON_STAFF_BATCH3_TEMPLATES } from '../src/templates/weaponStaffVariety3.js';
import { WEAPON_STAFF_BATCH4_TEMPLATES } from '../src/templates/weaponStaffVariety4.js';
import { WEAPON_STAFF_BATCH5_TEMPLATES } from '../src/templates/weaponStaffVariety5.js';
import { ARMOR_HELMETS_TEMPLATES } from '../src/templates/armorHelmets.js';
import { ARMOR_CHEST_TEMPLATES } from '../src/templates/armorChest.js';
import { ARMOR_ARMS_TEMPLATES } from '../src/templates/armorArms.js';
import { ARMOR_LEGS_TEMPLATES } from '../src/templates/armorLegs.js';
import { ARMOR_SHIELDS_TEMPLATES } from '../src/templates/armorShields.js';
import { BUILDING_BATCH4_TEMPLATES } from '../src/templates/buildingsVariety4.js';
import { BUILDING_BATCH5_TEMPLATES } from '../src/templates/buildingsVariety5.js';
import { SUPER_UI_BATCH1_TEMPLATES } from '../src/templates/superUiVariety.js';
import { SUPER_UI_BATCH2_TEMPLATES } from '../src/templates/superUiVariety2.js';
import { SUPER_UI_BATCH3_TEMPLATES } from '../src/templates/superUiVariety3.js';
import { SUPER_UI_BATCH4_TEMPLATES } from '../src/templates/superUiVariety4.js';
import { SUPER_UI_BATCH5_TEMPLATES } from '../src/templates/superUiVariety5.js';
import { BAKERY_BATCH1_TEMPLATES } from '../src/templates/bakeryVariety.js';
import { BAKERY_BATCH2_TEMPLATES } from '../src/templates/bakeryVariety2.js';
import { BAKERY_BATCH3_TEMPLATES } from '../src/templates/bakeryVariety3.js';
import { BAKERY_BATCH4_TEMPLATES } from '../src/templates/bakeryVariety4.js';
import { BAKERY_BATCH5_TEMPLATES } from '../src/templates/bakeryVariety5.js';
import { FRUITS_BATCH1_TEMPLATES } from '../src/templates/fruitsVariety.js';
import { FRUITS_BATCH2_TEMPLATES } from '../src/templates/fruitsVariety2.js';
import { VEGGIES_BATCH1_TEMPLATES } from '../src/templates/veggiesVariety.js';
import { VEGGIES_BATCH2_TEMPLATES } from '../src/templates/veggiesVariety2.js';
import { VEGGIES_BATCH3_TEMPLATES } from '../src/templates/veggiesVariety3.js';
import { YATAI_BATCH1_TEMPLATES } from '../src/templates/yataiVariety.js';
import { YATAI_BATCH2_TEMPLATES } from '../src/templates/yataiVariety2.js';
import { YATAI_BATCH3_TEMPLATES } from '../src/templates/yataiVariety3.js';
import { YATAI_BATCH4_TEMPLATES } from '../src/templates/yataiVariety4.js';
import { YATAI_BATCH5_TEMPLATES } from '../src/templates/yataiVariety5.js';
import { MANGAKA_BATCH1_TEMPLATES } from '../src/templates/mangakaVariety.js';
import { MANGAKA_BATCH2_TEMPLATES } from '../src/templates/mangakaVariety2.js';
import { MANGAKA_BATCH3_TEMPLATES } from '../src/templates/mangakaVariety3.js';
import { MANGAKA_BATCH4_TEMPLATES } from '../src/templates/mangakaVariety4.js';
import { MANGAKA_BATCH5_TEMPLATES } from '../src/templates/mangakaVariety5.js';
import { TOKYO_BATCH2_TEMPLATES } from '../src/templates/tokyoCityVariety2.js';
import { TOKYO_BATCH3_TEMPLATES } from '../src/templates/tokyoCityVariety3.js';
import { TOKYO_BATCH4_TEMPLATES } from '../src/templates/tokyoCityVariety4.js';
import { TOKYO_BATCH5_TEMPLATES } from '../src/templates/tokyoCityVariety5.js';
import { TOKYO_BATCH6_TEMPLATES } from '../src/templates/tokyoCityVariety6.js';
import { GUNS_BATCH1_TEMPLATES } from '../src/templates/gunsVariety.js';
import { GUNS_BATCH2_TEMPLATES } from '../src/templates/gunsVariety2.js';
import { GUNS_BATCH3_TEMPLATES } from '../src/templates/gunsVariety3.js';
import { GUNS_BATCH4_TEMPLATES } from '../src/templates/gunsVariety4.js';
import { GUNS_BATCH5_TEMPLATES } from '../src/templates/gunsVariety5.js';
import { LIBERAL_ARTS_BATCH1_TEMPLATES } from '../src/templates/liberalArtsVariety.js';
import { LIBERAL_ARTS_BATCH2_TEMPLATES } from '../src/templates/liberalArtsVariety2.js';
import { LIBERAL_ARTS_BATCH3_TEMPLATES } from '../src/templates/liberalArtsVariety3.js';
import { LIBERAL_ARTS_BATCH4_TEMPLATES } from '../src/templates/liberalArtsVariety4.js';
import { LIBERAL_ARTS_BATCH5_TEMPLATES } from '../src/templates/liberalArtsVariety5.js';
import { ROGUELIKE_SWORDS_32_TEMPLATES } from '../src/templates/roguelikeWeapons32.js';
import { DUNGEON_STORAGE_32_TEMPLATES } from '../src/templates/dungeonStorage32.js';
import { DUNGEON_LIGHTS_32_TEMPLATES } from '../src/templates/dungeonLights32.js';
import { DUNGEON_PICKUPS_32_TEMPLATES } from '../src/templates/dungeonPickups32.js';
import { DUNGEON_INTERACTIVE_32_TEMPLATES } from '../src/templates/dungeonInteractive32.js';
import { DUNGEON_DECOR_32_TEMPLATES } from '../src/templates/dungeonDecor32.js';
import { COZY_POTIONS_32_TEMPLATES } from '../src/templates/cozyPotions32.js';
import { COZY_BOOKS_32_TEMPLATES } from '../src/templates/cozyBooks32.js';
import { COZY_COFFEE_32_TEMPLATES } from '../src/templates/cozyCoffee32.js';
import { COZY_RAMEN_32_TEMPLATES } from '../src/templates/cozyRamen32.js';
import { COZY_FOOD_32_TEMPLATES } from '../src/templates/cozyFood32.js';
import { ROGUELIKE_SHIELDS_32_TEMPLATES } from '../src/templates/roguelikeShields32.js';
import { ROGUELIKE_BOWS_32_TEMPLATES } from '../src/templates/roguelikeBows32.js';
import { ROGUELIKE_STAFFS_32_TEMPLATES } from '../src/templates/roguelikeStaffs32.js';
import { ROGUELIKE_EXOTIC_32_TEMPLATES } from '../src/templates/roguelikeExotic32.js';
import { RPG_BARS_32_TEMPLATES } from '../src/templates/rpgBars32.js';
import { RPG_STATUS_32_TEMPLATES } from '../src/templates/rpgStatus32.js';
import { RPG_SLOTS_32_TEMPLATES } from '../src/templates/rpgSlots32.js';
import { RPG_BUTTONS_32_TEMPLATES } from '../src/templates/rpgButtons32.js';
import { RPG_HUD_32_TEMPLATES } from '../src/templates/rpgHud32.js';
import { LIBERAL_ARTS_32_BATCH1_TEMPLATES } from '../src/templates/liberalArts32.js';
import { LIBERAL_ARTS_32_BATCH2_TEMPLATES } from '../src/templates/liberalArts32v2.js';
import { LIBERAL_ARTS_32_BATCH3_TEMPLATES } from '../src/templates/liberalArts32v3.js';
import { LIBERAL_ARTS_32_BATCH4_TEMPLATES } from '../src/templates/liberalArts32v4.js';
import { LIBERAL_ARTS_32_BATCH5_TEMPLATES } from '../src/templates/liberalArts32v5.js';
import { GAME_ICONS_32_BATCH1_TEMPLATES } from '../src/templates/gameIcons32.js';
import { GAME_ICONS_32_BATCH2_TEMPLATES } from '../src/templates/gameIcons32v2.js';
import { GAME_ICONS_32_BATCH3_TEMPLATES } from '../src/templates/gameIcons32v3.js';
import { GAME_ICONS_32_BATCH4_TEMPLATES } from '../src/templates/gameIcons32v4.js';
import { GAME_ICONS_32_BATCH5_TEMPLATES } from '../src/templates/gameIcons32v5.js';
import { RETRO_COMPUTING_32_BATCH1_TEMPLATES } from '../src/templates/retroComputing32.js';
import { RETRO_COMPUTING_32_BATCH2_TEMPLATES } from '../src/templates/retroComputing32v2.js';
import { RETRO_COMPUTING_32_BATCH3_TEMPLATES } from '../src/templates/retroComputing32v3.js';
import { RETRO_COMPUTING_32_BATCH4_TEMPLATES } from '../src/templates/retroComputing32v4.js';
import { RETRO_COMPUTING_32_BATCH5_TEMPLATES } from '../src/templates/retroComputing32v5.js';
import { RETRO_COMPUTING_32_FIX_TEMPLATES } from '../src/templates/retroComputingFix32.js';
import { DUNGEON_CREATURES_32_BATCH1_TEMPLATES } from '../src/templates/dungeonCreatures32.js';
import { DUNGEON_CREATURES_32_BATCH2_TEMPLATES } from '../src/templates/dungeonCreatures32v2.js';
import { DUNGEON_CREATURES_32_BATCH3_TEMPLATES } from '../src/templates/dungeonCreatures32v3.js';
import { DUNGEON_CREATURES_32_BATCH4_TEMPLATES } from '../src/templates/dungeonCreatures32v4.js';
import { DUNGEON_CREATURES_32_BATCH5_TEMPLATES } from '../src/templates/dungeonCreatures32v5.js';

// ─── Template filtering helpers ─────────────────────────────────

function pick<T>(source: Record<string, T>, keys: string[]): Record<string, T> {
  const result: Record<string, T> = {};
  for (const k of keys) {
    if (k in source) result[k] = source[k];
  }
  return result;
}

function omit<T>(source: Record<string, T>, keys: string[]): Record<string, T> {
  const result = { ...source };
  for (const k of keys) delete result[k];
  return result;
}

// ─── Curated key lists for mixed files ──────────────────────────

// itemsVariety.ts has 26 keys mixing weapons, cozy items, and food.
// Split them cleanly across bundles:

const ITEMS_VARIETY_RPG_KEYS = [
  'spear_16', 'dagger_16', 'wizard_staff_16', 'magic_wand_16', 'crossbow_16',
  'iron_helmet_16', 'plate_armor_16', 'travel_boots_16', 'leather_gloves_16',
  'blacksmith_hammer_16', 'hand_saw_16', 'torch_item_16', 'compass_16', 'map_parchment_16',
];

const ITEMS_VARIETY_FOOD_KEYS = [
  'apple_item_16', 'bread_loaf_16', 'cheese_wedge_16', 'carrot_item_16', 'tea_kettle_16',
];

const ITEMS_VARIETY_COZY_KEYS = [
  'wooden_chair_16', 'round_table_16', 'cozy_lantern_16', 'picnic_basket_16',
  'watering_can_16', 'iron_shovel_16', 'fishing_rod_16',
];

// uiElements.ts mixes pure UI with cozy icons
const UI_ELEMENTS_PURE_KEYS = [
  'health_bar_16', 'button_16', 'cursor_16', 'speech_bubble_16', 'coin_icon_16', 'star_icon_16',
];

const UI_ELEMENTS_COZY_KEYS = [
  'cozy_calendar_16', 'recipe_card_16', 'tea_cup_icon_16', 'knitting_icon_16',
];

// uiCozyShop.ts mixes cozy shop items with gaming items
const COZY_SHOP_GAMING_KEYS = [
  'game_box_ui_16', 'cartridge_ui_16', 'controller_ui_16',
];

// ─── Bakery curated picks from existing food/cozy files ─────────

const EXISTING_BAKERY_FOOD_KEYS = [
  'bread_16', 'pie_16',
];

const EXISTING_BAKERY_FOOD1_KEYS = [
  'bread_loaf_16', 'cake_slice_16', 'pretzel_16', 'donut_16',
];

const EXISTING_BAKERY_FOOD2_KEYS = [
  'croissant_16', 'cupcake_16', 'baguette_16', 'pancake_stack_16', 'cookie_16', 'waffle_16',
];

const EXISTING_BAKERY_FOOD4_KEYS = [
  'french_toast_16', 'cinnamon_roll_16', 'bao_bun_16', 'cheesecake_16', 'brownie_16', 'garlic_bread_16',
];

const EXISTING_BAKERY_FOOD5_KEYS = [
  'pita_bread_16', 'tiramisu_16', 'fruit_tart_16', 'pretzel_soft_16', 'gingerbread_man_16', 'fortune_cookie_16', 'waffle_cone_16',
];

const EXISTING_BAKERY_COZY1_KEYS = [
  'mixing_bowl_16', 'rolling_pin_16', 'oven_mitt_16',
];

const EXISTING_BAKERY_COZY2_KEYS = [
  'bread_basket_16', 'cookie_jar_16',
];

const EXISTING_BAKERY_COZY3_KEYS = [
  'pie_cooling_16',
];

// ─── Bundle definitions ─────────────────────────────────────────

interface BundleDef {
  slug: string;
  name: string;
  description: string;
  price: string;
  tags: string[];
  templates: Record<string, any>;
}

const BUNDLES: BundleDef[] = [
  // ── 1. RPG WEAPONS & GEAR ─────────────────────────────────────
  {
    slug: 'rpg-weapons-gear-pack',
    name: 'RPG Weapons & Gear Pack',
    description: 'Swords, axes, bows, armor, shields, staffs, and adventure gear. Everything for RPG inventory systems, loot tables, and equipment screens.',
    price: '$4.99',
    tags: ['RPG', 'weapons', 'armor', 'equipment', 'inventory', 'pixel-art', '16x16'],
    templates: {
      ...ITEM_TEMPLATES,
      ...pick(ITEM_VARIETY_TEMPLATES, ITEMS_VARIETY_RPG_KEYS),
      ...ITEM_BATCH2_TEMPLATES,
      ...EQUIPMENT_TEMPLATES, ...EQUIPMENT_VARIETY_TEMPLATES, ...EQUIPMENT_BATCH2_TEMPLATES,
      ...WEAPONS_CLASSIC_TEMPLATES,
    },
  },
  // ── 2. FOOD & CONSUMABLES ─────────────────────────────────────
  {
    slug: 'food-consumables-pack',
    name: 'Food & Consumables Pack',
    description: 'Delicious pixel art food, drinks, potions, and ingredients. From tavern meals to exotic cuisine — perfect for cooking games, RPG consumables, and life sims.',
    price: '$2.99',
    tags: ['food', 'drinks', 'potions', 'cooking', 'consumables', 'pixel-art', '16x16'],
    templates: {
      ...FOOD_TEMPLATES, ...FOOD_BATCH1_TEMPLATES, ...FOOD_BATCH2_TEMPLATES, ...FOOD_BATCH3_TEMPLATES, ...FOOD_BATCH4_TEMPLATES, ...FOOD_BATCH5_TEMPLATES,
      ...pick(ITEM_VARIETY_TEMPLATES, ITEMS_VARIETY_FOOD_KEYS),
    },
  },
  // ── 3. COZY LIFE-SIM PACK ────────────────────────────────────
  {
    slug: 'cozy-life-sim-pack',
    name: 'Cozy Life-Sim Pack',
    description: 'Stardew-style cozy sprites — shop UI, farming tools, home furniture, crafting stations, and decorations. Perfect for farming sims, shop keepers, and cozy games.',
    price: '$2.99',
    tags: ['cozy', 'life-sim', 'farming', 'shop', 'furniture', 'Stardew', 'pixel-art', '16x16'],
    templates: {
      ...omit(COZY_SHOP_UI_TEMPLATES, COZY_SHOP_GAMING_KEYS),
      ...pick(UI_TEMPLATES, UI_ELEMENTS_COZY_KEYS),
      ...pick(ITEM_VARIETY_TEMPLATES, ITEMS_VARIETY_COZY_KEYS),
      ...FURNITURE_BATCH3_TEMPLATES,
      ...COZY_BATCH1_TEMPLATES,
      ...COZY_BATCH2_TEMPLATES,
      ...COZY_BATCH3_TEMPLATES,
      ...COZY_BATCH4_TEMPLATES,
    },
  },
  // ── 4. BOTANICAL PLANTS ───────────────────────────────────────
  {
    slug: 'botanical-plants-pack',
    name: 'Botanical Plants Pack',
    description: 'High-quality botanical sprite set with flowers, crops, vines, cacti, mushrooms, potted plants, aquatic flora, and herb clusters for cozy and nature-heavy games.',
    price: '$3.99',
    tags: ['plants', 'botanical', 'flora', 'farming', 'nature', 'pixel-art', '16x16'],
    templates: {
      ...PLANT_TEMPLATES,
      ...PLANT_BATCH1_TEMPLATES,
    },
  },
  // ── 5. WORLD BUILDER ──────────────────────────────────────────
  {
    slug: 'world-builder-pack',
    name: 'World Builder Pack',
    description: 'Everything you need to build game worlds — terrain tiles, biomes, nature elements, plants, and buildings. From forests to deserts, dungeons to cities.',
    price: '$4.99',
    tags: ['tileset', 'environment', 'terrain', 'buildings', 'nature', 'pixel-art', '16x16'],
    templates: {
      ...ENVIRONMENT_TEMPLATES, ...ENVIRONMENT_VARIETY_TEMPLATES,
      ...BIOME_TEMPLATES, ...BIOME_VARIETY_TEMPLATES,
      ...NATURE_TEMPLATES, ...NATURE_VARIETY_TEMPLATES,
      ...PLANT_TEMPLATES,
      ...BUILDING_TEMPLATES, ...BUILDING_BATCH1_TEMPLATES, ...BUILDING_BATCH2_TEMPLATES, ...BUILDING_BATCH3_TEMPLATES, ...BUILDING_BATCH4_TEMPLATES, ...BUILDING_BATCH5_TEMPLATES,
    },
  },
  // ── 6. DUNGEON & ADVENTURE ────────────────────────────────────
  {
    slug: 'dungeon-adventure-toolkit',
    name: 'Dungeon & Adventure Toolkit',
    description: 'Dungeon tiles, traps, props, and adventure furniture. Build dungeon crawlers, tavern interiors, and roguelike scenes.',
    price: '$3.99',
    tags: ['dungeon', 'adventure', 'furniture', 'props', 'roguelike', 'pixel-art', '16x16'],
    templates: {
      ...DUNGEON_TEMPLATES, ...DUNGEON_BATCH1_TEMPLATES, ...DUNGEON_BATCH2_TEMPLATES,
      ...PROP_TEMPLATES,
      ...FURNITURE_TEMPLATES, ...FURNITURE_BATCH1_TEMPLATES, ...FURNITURE_BATCH2_TEMPLATES,
    },
  },
  // ── 7. UI TOOLKIT ─────────────────────────────────────────────
  {
    slug: 'ui-toolkit',
    name: 'UI Toolkit',
    description: 'Pure pixel art UI kit — health bars, buttons, cursors, menus, HUD elements, inventory slots, status icons, and RPG interface components.',
    price: '$3.99',
    tags: ['UI', 'HUD', 'interface', 'buttons', 'bars', 'RPG', 'pixel-art', '16x16'],
    templates: {
      ...pick(UI_TEMPLATES, UI_ELEMENTS_PURE_KEYS),
      ...UI_VARIETY_TEMPLATES,
      ...RPG_UI_TEMPLATES, ...RPG_UI_VARIETY_TEMPLATES,
      ...UI_BARS_TEMPLATES,
    },
  },
  // ── 8. VFX & MAGIC ────────────────────────────────────────────
  {
    slug: 'vfx-magic-pack',
    name: 'VFX & Magic Pack',
    description: 'Spell effects, explosions, particles, auras, projectiles, and status indicators. Add visual polish to combat, magic, and action sequences.',
    price: '$2.99',
    tags: ['VFX', 'effects', 'particles', 'magic', 'spells', 'pixel-art', '16x16'],
    templates: {
      ...EFFECT_TEMPLATES, ...EFFECT_BATCH1_TEMPLATES, ...EFFECT_BATCH2_TEMPLATES,
      ...EFFECT_BATCH3_TEMPLATES, ...EFFECT_BATCH4_TEMPLATES, ...EFFECT_BATCH5_TEMPLATES,
      ...EFFECT_BATCH6_TEMPLATES,
    },
  },
  // ── 9. VEHICLES & TRANSPORT ───────────────────────────────────
  {
    slug: 'vehicle-transport-pack',
    name: 'Vehicle & Transport Pack',
    description: 'Boats, carts, spaceships, mounts, trains, and more. Vehicles for every game genre — fantasy, sci-fi, modern, and steampunk.',
    price: '$2.99',
    tags: ['vehicles', 'transport', 'boats', 'spaceships', 'mounts', 'pixel-art', '16x16'],
    templates: {
      ...VEHICLE_TEMPLATES, ...VEHICLE_BATCH1_TEMPLATES, ...VEHICLE_BATCH2_TEMPLATES,
      ...VEHICLE_BATCH3_TEMPLATES, ...VEHICLE_BATCH4_TEMPLATES, ...VEHICLE_BATCH5_TEMPLATES,
    },
  },
  // ── 10. MODERN TECH ────────────────────────────────────────────
  {
    slug: 'modern-tech-pack',
    name: 'Modern Tech Pack',
    description: 'Sleek modern technology sprites — gadgets, gaming peripherals, smart devices, and futuristic tech. Perfect for sci-fi and modern-day games.',
    price: '$2.99',
    tags: ['tech', 'modern', 'sci-fi', 'gadgets', 'devices', 'pixel-art', '16x16'],
    templates: {
      ...MODERN_TECH_TEMPLATES,
      ...MODERN_TECH_BATCH1_TEMPLATES, ...MODERN_TECH_BATCH2_TEMPLATES,
      ...MODERN_TECH_BATCH3_TEMPLATES, ...MODERN_TECH_BATCH4_TEMPLATES,
    },
  },
  // ── 11. RETRO TECH ────────────────────────────────────────────
  {
    slug: 'retro-tech-pack',
    name: 'Retro Tech Pack',
    description: 'Nostalgic 80s-90s technology sprites — CRT TVs, floppy disks, cassettes, rotary phones, vintage computing, and retro gaming items.',
    price: '$2.99',
    tags: ['tech', 'retro', '8-bit', 'vintage', 'arcade', 'pixel-art', '16x16'],
    templates: {
      ...RETRO_TECH_TEMPLATES,
      ...RETRO_TECH_BATCH1_TEMPLATES, ...RETRO_TECH_BATCH2_TEMPLATES,
      ...RETRO_TECH_BATCH3_TEMPLATES, ...RETRO_TECH_BATCH4_TEMPLATES,
      ...pick(COZY_SHOP_UI_TEMPLATES, COZY_SHOP_GAMING_KEYS),
    },
  },
  // ── 12. LIBRARY COZY ──────────────────────────────────────────
  {
    slug: 'library-cozy-pack',
    name: 'Library Cozy Pack',
    description: 'All-new cozy library variants: reading furniture, desk decor, books, archives, lamps, and atmospheric props built specifically for library-themed packs.',
    price: '$3.99',
    tags: ['library', 'cozy', 'books', 'furniture', 'reading', 'life-sim', 'pixel-art', '16x16'],
    templates: {
      ...LIBRARY_BATCH1_TEMPLATES,
      ...LIBRARY_BATCH2_TEMPLATES,
      ...LIBRARY_BATCH3_TEMPLATES,
      ...LIBRARY_BATCH4_TEMPLATES,
      ...LIBRARY_BATCH5_TEMPLATES,
    },
  },
  // ── 13. LO-FI STUDY COFI ─────────────────────────────────────
  {
    slug: 'lofi-study-cofi-pack',
    name: 'Lo-Fi Study Cofi Pack',
    description: 'Original lo-fi study + coffee sprite variants: desk setup icons, warm drink props, ambient room assets, and stream-friendly study scene pieces.',
    price: '$3.99',
    tags: ['lofi', 'study', 'coffee', 'tech', 'retro', 'cozy', 'pixel-art', '16x16'],
    templates: {
      ...LOFI_BATCH1_TEMPLATES,
      ...LOFI_BATCH2_TEMPLATES,
      ...LOFI_BATCH3_TEMPLATES,
    },
  },
  // ── 14. MUSIC & INSTRUMENTS ─────────────────────────────────────
  {
    slug: 'music-instruments-pack',
    name: 'Music & Instruments Pack',
    description: 'Pixel art musical instruments — guitars, pianos, drums, brass, strings, percussion, and audio gear. Perfect for rhythm games, music apps, and band-themed scenes.',
    price: '$2.99',
    tags: ['music', 'instruments', 'guitar', 'piano', 'drums', 'pixel-art', '16x16'],
    templates: {
      ...MUSIC_BATCH1_TEMPLATES,
      ...MUSIC_BATCH2_TEMPLATES,
      ...MUSIC_BATCH3_TEMPLATES,
      ...MUSIC_BATCH4_TEMPLATES,
      ...MUSIC_BATCH5_TEMPLATES,
    },
  },
  // ── 15. CRAFTING & WORKSHOP ─────────────────────────────────────
  {
    slug: 'crafting-workshop-pack',
    name: 'Crafting & Workshop Pack',
    description: 'Workshop and crafting station sprites — anvils, forges, looms, alchemy tables, kilns, and artisan tools. Essential for RPG crafting systems and simulation games.',
    price: '$2.99',
    tags: ['crafting', 'workshop', 'forge', 'alchemy', 'artisan', 'RPG', 'pixel-art', '16x16'],
    templates: {
      ...CRAFTING_BATCH1_TEMPLATES,
      ...CRAFTING_BATCH2_TEMPLATES,
      ...CRAFTING_BATCH3_TEMPLATES,
      ...CRAFTING_BATCH4_TEMPLATES,
      ...CRAFTING_BATCH5_TEMPLATES,
    },
  },
  // ── 16. WEAPONS, STAFFS & BOWS ──────────────────────────────────
  {
    slug: 'weapons-staffs-bows-pack',
    name: 'Weapons, Staffs & Bows Pack',
    description: 'Massive collection of pixel art weapons — elemental staffs, fantasy swords, ranged bows, polearms, hammers, and legendary exotic weapons. Perfect for RPG loot tables, inventory systems, and combat games.',
    price: '$4.99',
    tags: ['weapons', 'staffs', 'swords', 'bows', 'RPG', 'fantasy', 'combat', 'pixel-art', '16x16'],
    templates: {
      ...WEAPON_STAFF_BATCH1_TEMPLATES,
      ...WEAPON_STAFF_BATCH2_TEMPLATES,
      ...WEAPON_STAFF_BATCH3_TEMPLATES,
      ...WEAPON_STAFF_BATCH4_TEMPLATES,
      ...WEAPON_STAFF_BATCH5_TEMPLATES,
    },
  },
  // ── 16. ARMOR & EQUIPMENT ────────────────────────────────────
  {
    slug: 'armor-equipment-pack',
    name: 'Armor & Equipment Pack',
    description: 'Complete armor set collection — helmets, breastplates, gauntlets, boots, shields, belts, and capes in iron, bronze, gold, leather, crystal, bone, and more materials. Perfect for RPG equipment screens, character customization, and loot systems.',
    price: '$4.99',
    tags: ['armor', 'equipment', 'helmets', 'shields', 'boots', 'RPG', 'fantasy', 'pixel-art', '16x16'],
    templates: {
      ...ARMOR_HELMETS_TEMPLATES,
      ...ARMOR_CHEST_TEMPLATES,
      ...ARMOR_ARMS_TEMPLATES,
      ...ARMOR_LEGS_TEMPLATES,
      ...ARMOR_SHIELDS_TEMPLATES,
    },
  },

  // ── 18. SUPER UI/UX MEGA PACK ──────────────────────────────────
  {
    slug: 'super-ui-ux-pack',
    name: 'Super UI/UX Mega Pack',
    description: 'Massive UI/UX collection covering ALL video game genres — RPG stat panels, action combo counters, strategy resource icons, racing speedometers, mobile gacha buttons, roguelike floor counters, and much more. 100 unique UI elements for any game project.',
    price: '$4.99',
    tags: ['UI', 'UX', 'HUD', 'RPG', 'action', 'strategy', 'racing', 'mobile', 'roguelike', 'pixel-art', '16x16'],
    templates: {
      ...SUPER_UI_BATCH1_TEMPLATES,
      ...SUPER_UI_BATCH2_TEMPLATES,
      ...SUPER_UI_BATCH3_TEMPLATES,
      ...SUPER_UI_BATCH4_TEMPLATES,
      ...SUPER_UI_BATCH5_TEMPLATES,
    },
  },

  // ── 19. BAKERY & PASTRY SHOP ──────────────────────────────────
  {
    slug: 'bakery-pastry-shop-pack',
    name: 'Bakery & Pastry Shop Pack',
    description: 'Complete bakery asset collection — artisan breads, layered cakes, cupcakes, French pastries, pies, cookies, muffins, and bakery equipment. Everything to build a pixel art bakery, patisserie, or cooking game.',
    price: '$4.99',
    tags: ['bakery', 'pastry', 'bread', 'cake', 'cookies', 'pie', 'food', 'cooking', 'pixel-art', '16x16'],
    templates: {
      // New bakery batches (100 templates)
      ...BAKERY_BATCH1_TEMPLATES,
      ...BAKERY_BATCH2_TEMPLATES,
      ...BAKERY_BATCH3_TEMPLATES,
      ...BAKERY_BATCH4_TEMPLATES,
      ...BAKERY_BATCH5_TEMPLATES,
      // Existing bakery-related picks (~30 templates)
      ...pick(FOOD_TEMPLATES, EXISTING_BAKERY_FOOD_KEYS),
      ...pick(FOOD_BATCH1_TEMPLATES, EXISTING_BAKERY_FOOD1_KEYS),
      ...pick(FOOD_BATCH2_TEMPLATES, EXISTING_BAKERY_FOOD2_KEYS),
      ...pick(FOOD_BATCH4_TEMPLATES, EXISTING_BAKERY_FOOD4_KEYS),
      ...pick(FOOD_BATCH5_TEMPLATES, EXISTING_BAKERY_FOOD5_KEYS),
      ...pick(COZY_BATCH1_TEMPLATES, EXISTING_BAKERY_COZY1_KEYS),
      ...pick(COZY_BATCH2_TEMPLATES, EXISTING_BAKERY_COZY2_KEYS),
      ...pick(COZY_BATCH3_TEMPLATES, EXISTING_BAKERY_COZY3_KEYS),
    },
  },

  // ─── 20. Fruits & Vegetables Farm Pack ──────────────────────────
  {
    slug: 'fruits-vegetables-farm-pack',
    name: 'Fruits & Vegetables Farm Pack',
    description: 'Complete farm produce collection — 100 pixel art fruits and vegetables. Common fruits, exotic tropicals, root vegetables, leafy greens, and vine garden crops. Perfect for farming simulators, cooking games, and harvest-themed projects.',
    price: '$4.99',
    tags: ['fruits', 'vegetables', 'farming', 'harvest', 'produce', 'food', 'garden', 'pixel-art', '16x16'],
    templates: {
      ...FRUITS_BATCH1_TEMPLATES,
      ...FRUITS_BATCH2_TEMPLATES,
      ...VEGGIES_BATCH1_TEMPLATES,
      ...VEGGIES_BATCH2_TEMPLATES,
      ...VEGGIES_BATCH3_TEMPLATES,
    },
  },

  // ── 21. YATAI SIMULATOR ──────────────────────────────────────
  {
    slug: 'yatai-simulator-pack',
    name: 'Yatai Simulator Pack',
    description: 'Complete Japanese street food stall asset collection — ramen bowls, takoyaki, yakitori, dango, sake sets, yatai carts, cooking equipment, and atmospheric Japanese decor. Perfect for yatai simulators, cooking games, and Japanese-themed projects.',
    price: '$4.99',
    tags: ['yatai', 'japanese', 'ramen', 'street-food', 'cooking', 'japan', 'food', 'pixel-art', '16x16'],
    templates: {
      ...YATAI_BATCH1_TEMPLATES,
      ...YATAI_BATCH2_TEMPLATES,
      ...YATAI_BATCH3_TEMPLATES,
      ...YATAI_BATCH4_TEMPLATES,
      ...YATAI_BATCH5_TEMPLATES,
    },
  },

  // ── 22. MANGAKA SIMULATOR ───────────────────────────────────
  {
    slug: 'mangaka-simulator-pack',
    name: 'Mangaka Simulator Pack',
    description: 'Cozy manga studio asset collection — writing tools, manuscript sheets, desk setups, reading decor, and lo-fi work props. Built for mangaka/life-sim workflows, visual novel interfaces, and creator-focused simulator games.',
    price: '$4.99',
    tags: ['mangaka', 'manga', 'studio', 'drawing', 'cozy', 'simulator', 'life-sim', 'pixel-art', '16x16'],
    templates: {
      ...MANGAKA_BATCH1_TEMPLATES,
      ...MANGAKA_BATCH2_TEMPLATES,
      ...MANGAKA_BATCH3_TEMPLATES,
      ...MANGAKA_BATCH4_TEMPLATES,
      ...MANGAKA_BATCH5_TEMPLATES,
    },
  },

  // ── 23. TOKYO LIFE ──────────────────────────────────────────
  {
    slug: 'tokyo-life-pack',
    name: 'Tokyo Life Pack',
    description: 'Everyday Tokyo life icon collection with 100 original 16x16 sprites: Japanese food & drinks, traditional interiors & furniture, nature & seasons, pop culture & otaku items, and seasonal festival decorations.',
    price: '$4.99',
    tags: ['tokyo', 'japan', 'food', 'culture', 'nature', 'seasonal', 'anime', 'pixel-art', '16x16'],
    templates: {
      ...TOKYO_BATCH2_TEMPLATES,
      ...TOKYO_BATCH3_TEMPLATES,
      ...TOKYO_BATCH4_TEMPLATES,
      ...TOKYO_BATCH5_TEMPLATES,
      ...TOKYO_BATCH6_TEMPLATES,
    },
  },

  // ── 24. PIXEL ARSENAL ─────────────────────────────────────────
  {
    slug: 'pixel-arsenal-pack',
    name: 'Pixel Arsenal Pack',
    description: 'Complete firearms & weapons icon collection with 100 original 16x16 sprites: pistols, revolvers, rifles, shotguns, SMGs, heavy weapons, explosives, sci-fi energy blasters, and gun accessories for shooters, RPGs, and survival games.',
    price: '$4.99',
    tags: ['guns', 'weapons', 'firearms', 'pistol', 'rifle', 'shotgun', 'sci-fi', 'pixel-art', '16x16'],
    templates: {
      ...GUNS_BATCH1_TEMPLATES,
      ...GUNS_BATCH2_TEMPLATES,
      ...GUNS_BATCH3_TEMPLATES,
      ...GUNS_BATCH4_TEMPLATES,
      ...GUNS_BATCH5_TEMPLATES,
    },
  },

  // ── 25. MEDIEVAL SCHOLAR ────────────────────────────────────────
  {
    slug: 'medieval-scholars-pack',
    name: 'Medieval Scholar\'s Collection — The 7 Liberal Arts',
    description: 'Academic icons from the medieval Trivium & Quadrivium: quills, scrolls, books, balance scales, compasses, astrolabes, lutes, harps, and more. 100 original 16x16 sprites for RPGs, strategy, and educational games.',
    price: '$4.99',
    tags: ['medieval', 'scholar', 'liberal-arts', 'trivium', 'quadrivium', 'academic', 'pixel-art', '16x16'],
    templates: {
      ...LIBERAL_ARTS_BATCH1_TEMPLATES,
      ...LIBERAL_ARTS_BATCH2_TEMPLATES,
      ...LIBERAL_ARTS_BATCH3_TEMPLATES,
      ...LIBERAL_ARTS_BATCH4_TEMPLATES,
      ...LIBERAL_ARTS_BATCH5_TEMPLATES,
    },
  },

  // ── 26. ROGUELIKE WEAPONS 32x32 ─────────────────────────────────
  {
    slug: 'roguelike-weapons-32x32',
    name: 'Roguelike Weapons Arsenal — 32x32 HD',
    description: '100 original 32x32 roguelike weapon sprites: swords, shields, bows, crossbows, staffs, wands, axes, hammers, polearms, and exotic weapons. Neo-SNES style with DB16 palette, 5-value shading, and colored selout outlines. Perfect for roguelike, RPG, and dungeon crawler games.',
    price: '$6.99',
    tags: ['roguelike', 'weapons', '32x32', 'swords', 'shields', 'bows', 'staffs', 'axes', 'pixel-art', 'rpg', 'dungeon-crawler'],
    templates: {
      ...ROGUELIKE_SWORDS_32_TEMPLATES,
      ...ROGUELIKE_SHIELDS_32_TEMPLATES,
      ...ROGUELIKE_BOWS_32_TEMPLATES,
      ...ROGUELIKE_STAFFS_32_TEMPLATES,
      ...ROGUELIKE_EXOTIC_32_TEMPLATES,
    },
  },

  // ── 27. DUNGEON PROPS 32x32 ─────────────────────────────────
  {
    slug: 'dungeon-props-32x32',
    name: 'Dungeon Props Collection — 32x32 HD',
    description: '100 original 32x32 dungeon prop sprites: chests, barrels, torches, lanterns, crystals, potions, scrolls, keys, traps, doors, portals, altars, statues, and more. Neo-SNES style with DB16 palette. Perfect for roguelike, RPG, and dungeon crawler games.',
    price: '$6.99',
    tags: ['dungeon', 'props', '32x32', 'roguelike', 'chests', 'torches', 'potions', 'traps', 'pixel-art', 'rpg'],
    templates: {
      ...DUNGEON_STORAGE_32_TEMPLATES,
      ...DUNGEON_LIGHTS_32_TEMPLATES,
      ...DUNGEON_PICKUPS_32_TEMPLATES,
      ...DUNGEON_INTERACTIVE_32_TEMPLATES,
      ...DUNGEON_DECOR_32_TEMPLATES,
    },
  },
  {
    slug: 'cozy-consumables-32x32',
    name: 'Cozy Consumables Collection — 32x32 HD',
    description: '100 original 32x32 consumable sprites: potions, books, scrolls, coffee, tea, ramen, sushi, dumplings, pizza, burgers, desserts, and more. Neo-SNES style with DB16 palette. Perfect for RPG, life-sim, cooking, and cozy games.',
    price: '$6.99',
    tags: ['consumables', 'food', '32x32', 'potions', 'books', 'coffee', 'ramen', 'cozy', 'pixel-art', 'rpg'],
    templates: {
      ...COZY_POTIONS_32_TEMPLATES,
      ...COZY_BOOKS_32_TEMPLATES,
      ...COZY_COFFEE_32_TEMPLATES,
      ...COZY_RAMEN_32_TEMPLATES,
      ...COZY_FOOD_32_TEMPLATES,
    },
  },
  {
    slug: 'rpg-ui-32x32',
    name: 'RPG UI Kit — 32x32 HD',
    description: '100 original 32x32 RPG UI sprites: HP/MP/XP bars (full+empty pairs for animation), status bars, inventory slots, equipment frames, rarity borders, buttons, cursors, quest markers, health/mana orbs, dialog bubbles, HUD icons, buff/debuff indicators, and more. Neo-SNES style with DB16 palette. Perfect for RPG, roguelike, and action games.',
    price: '$6.99',
    tags: ['ui', 'rpg', '32x32', 'hud', 'bars', 'inventory', 'buttons', 'icons', 'pixel-art', 'game-ui'],
    templates: {
      ...RPG_BARS_32_TEMPLATES,
      ...RPG_STATUS_32_TEMPLATES,
      ...RPG_SLOTS_32_TEMPLATES,
      ...RPG_BUTTONS_32_TEMPLATES,
      ...RPG_HUD_32_TEMPLATES,
    },
  },

  // ── 30. DUNGEON TILESET PACK ──────────────────────────────────
  {
    slug: 'dungeon-tileset-pack',
    name: 'Dungeon Tileset Pack — Seamless 16x16',
    description: '100 seamless tileable dungeon tiles: stone floors, brick walls, natural terrain, themed surfaces, paths, and decorative wall tiles. Every tile loops perfectly in all directions. DB16 palette with colored selout. Perfect for roguelike, dungeon crawler, and RPG map editors.',
    price: '$4.99',
    tags: ['dungeon', 'tileset', 'tileable', 'seamless', 'floors', 'walls', 'terrain', 'roguelike', 'pixel-art', '16x16'],
    templates: {
      ...DUNGEON_TILES_BATCH1_TEMPLATES,
      ...DUNGEON_TILES_BATCH2_TEMPLATES,
      ...DUNGEON_TILES_BATCH3_TEMPLATES,
      ...DUNGEON_TILES_BATCH4_TEMPLATES,
      ...DUNGEON_TILES_BATCH5_TEMPLATES,
    },
  },

  // ── 31. MEDIEVAL SCHOLAR 32x32 ────────────────────────────────
  {
    slug: 'liberal-arts-32x32',
    name: "Medieval Scholar's Collection — 32x32 HD",
    description: '100 original 32x32 medieval academic sprites from the 7 Liberal Arts (Trivium & Quadrivium): quills, codices, scrolls, balance scales, compasses, astrolabes, lutes, harps, abacuses, and scholarly instruments. Neo-SNES style with DB16 palette, 5-value shading, and colored selout outlines. Perfect for RPG, strategy, and educational games.',
    price: '$6.99',
    tags: ['medieval', 'scholar', '32x32', 'liberal-arts', 'academic', 'pixel-art', 'rpg'],
    templates: {
      ...LIBERAL_ARTS_32_BATCH1_TEMPLATES,
      ...LIBERAL_ARTS_32_BATCH2_TEMPLATES,
      ...LIBERAL_ARTS_32_BATCH3_TEMPLATES,
      ...LIBERAL_ARTS_32_BATCH4_TEMPLATES,
      ...LIBERAL_ARTS_32_BATCH5_TEMPLATES,
    },
  },

  // ── 32. GAME ICONS 32x32 ────────────────────────────────────
  {
    slug: 'game-icons-32x32',
    name: 'Game Icons Collection — 32x32 HD',
    description: '100 original 32x32 game icons: inventory items (backpacks, potions, keys, scrolls), status effects (fire, ice, poison, buffs), crafting resources (ores, herbs, crystals), achievements (trophies, medals, emotes), and system UI (save, settings, chest, waypoint). Neo-SNES style with DB16 palette, 5-value shading, and colored selout outlines. Perfect for RPG, roguelike, and strategy game interfaces.',
    price: '$6.99',
    tags: ['icons', 'ui', '32x32', 'inventory', 'buffs', 'resources', 'rpg', 'pixel-art'],
    templates: {
      ...GAME_ICONS_32_BATCH1_TEMPLATES,
      ...GAME_ICONS_32_BATCH2_TEMPLATES,
      ...GAME_ICONS_32_BATCH3_TEMPLATES,
      ...GAME_ICONS_32_BATCH4_TEMPLATES,
      ...GAME_ICONS_32_BATCH5_TEMPLATES,
    },
  },

  // ── 33. RETRO COMPUTING 32x32 ────────────────────────────────
  {
    slug: 'retro-computing-32x32',
    name: 'Retro Computing & Tech Collection — 32x32 HD',
    description: '100 original 32x32 retro computing sprites: classic consoles (SNES, Genesis, PS1, N64, Game Boy, Dreamcast), cartridges, memory cards, AV cables, CRT monitors, 90s PCs, keyboards, mice, printers, modems, plus modern gaming PCs, GPUs, SSDs, RGB peripherals, arcade cabinets, boomboxes, Walkmans, Nokia phones, and more. Neo-SNES style with DB16 palette, 5-value shading, and colored selout outlines. Perfect for retro-themed, tech sim, and nostalgia games.',
    price: '$6.99',
    tags: ['retro', 'computing', '32x32', 'consoles', 'cartridges', '90s', 'pc', 'gaming', 'pixel-art', 'tech'],
    templates: {
      ...RETRO_COMPUTING_32_BATCH1_TEMPLATES,
      ...RETRO_COMPUTING_32_BATCH2_TEMPLATES,
      ...RETRO_COMPUTING_32_BATCH3_TEMPLATES,
      ...RETRO_COMPUTING_32_BATCH4_TEMPLATES,
      ...RETRO_COMPUTING_32_BATCH5_TEMPLATES,
      ...RETRO_COMPUTING_32_FIX_TEMPLATES,
    },
  },

  // ── 34. DUNGEON CREATURES 32x32 ────────────────────────────────
  {
    slug: 'dungeon-creatures-32x32',
    name: 'Dungeon Creatures Collection — 32x32 HD',
    description: '100 original 32x32 dungeon creature sprites with idle animation frames: slimes, oozes, giant spiders, beetles, scorpions, bats, wisps, floating eyes, cave snakes, worms, lizards, mushrooms, carnivorous plants, mimics, elementals, animated swords, arcane orbs, and more. Each creature has base + idle frame for simple animation. Neo-SNES style with DB16 palette, 5-value shading, and colored selout outlines. Perfect for roguelikes, dungeon crawlers, and RPGs.',
    price: '$6.99',
    tags: ['dungeon', 'creatures', '32x32', 'monsters', 'slimes', 'insects', 'animation', 'pixel-art', 'roguelike', 'rpg'],
    templates: {
      ...DUNGEON_CREATURES_32_BATCH1_TEMPLATES,
      ...DUNGEON_CREATURES_32_BATCH2_TEMPLATES,
      ...DUNGEON_CREATURES_32_BATCH3_TEMPLATES,
      ...DUNGEON_CREATURES_32_BATCH4_TEMPLATES,
      ...DUNGEON_CREATURES_32_BATCH5_TEMPLATES,
    },
  },
];

// ─── DB16 Palette ───────────────────────────────────────────────

const DB16_COLORS = [
  '#140c1c', '#442434', '#30346d', '#4e4a4e',
  '#854c30', '#346524', '#d04648', '#757161',
  '#597dce', '#d27d2c', '#8595a1', '#6daa2c',
  '#d2aa99', '#6dc2ca', '#dad45e', '#deeed6',
];

// ─── Render helpers ─────────────────────────────────────────────

function renderTemplate(name: string, templates: Record<string, any>, scale: number): Buffer | null {
  const t = templates[name];
  if (!t) return null;
  const w = t.width ?? 16;
  const h = t.height ?? 16;

  try {
    const project = createProject(w, h, name);
    const result = handleDrawTemplate({
      projectId: project.id,
      template: name,
      autoOutline: true,
      autoShade: true,
      autoHighlight: true,
    });
    if (result.isError) {
      deleteProject(project.id);
      return null;
    }
    const pngBuffer = renderProjectToPng(project, scale);
    deleteProject(project.id);
    return pngBuffer;
  } catch {
    return null;
  }
}

function generateSpritesheet(
  pngBuffers: { name: string; buffer: Buffer }[],
  cols: number,
  cellSize: number,
  scale: number,
): Buffer {
  const scaledCell = cellSize * scale;
  const rows = Math.ceil(pngBuffers.length / cols);
  const sheetW = cols * scaledCell;
  const sheetH = rows * scaledCell;
  const sheet = new PNG({ width: sheetW, height: sheetH });

  // Fill transparent
  sheet.data.fill(0);

  for (let i = 0; i < pngBuffers.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const offsetX = col * scaledCell;
    const offsetY = row * scaledCell;

    try {
      const sprite = PNG.sync.read(pngBuffers[i].buffer);
      const copyW = Math.min(sprite.width, scaledCell);
      const copyH = Math.min(sprite.height, scaledCell);

      for (let y = 0; y < copyH; y++) {
        for (let x = 0; x < copyW; x++) {
          const srcIdx = (y * sprite.width + x) * 4;
          const dstIdx = ((offsetY + y) * sheetW + (offsetX + x)) * 4;
          sheet.data[dstIdx] = sprite.data[srcIdx];
          sheet.data[dstIdx + 1] = sprite.data[srcIdx + 1];
          sheet.data[dstIdx + 2] = sprite.data[srcIdx + 2];
          sheet.data[dstIdx + 3] = sprite.data[srcIdx + 3];
        }
      }
    } catch {
      // Skip broken sprites
    }
  }

  return PNG.sync.write(sheet);
}

function generatePalettePng(): Buffer {
  const cellSize = 32;
  const cols = 4;
  const rows = 4;
  const png = new PNG({ width: cols * cellSize, height: rows * cellSize });

  for (let i = 0; i < 16; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const hex = DB16_COLORS[i];
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    for (let y = row * cellSize; y < (row + 1) * cellSize; y++) {
      for (let x = col * cellSize; x < (col + 1) * cellSize; x++) {
        const idx = (y * cols * cellSize + x) * 4;
        png.data[idx] = r;
        png.data[idx + 1] = g;
        png.data[idx + 2] = b;
        png.data[idx + 3] = 255;
      }
    }
  }

  return PNG.sync.write(png);
}

function generatePreviewImage(
  pngBuffers: { name: string; buffer: Buffer }[],
  bundleName: string,
  count: number,
): Buffer {
  // Preview: 8x6 grid of hand-picked sprites at 8x scale, dark background
  const previewScale = 8;
  const cellSize = 16 * previewScale; // 128px per cell
  const padding = 4;
  const cols = 8;
  const maxRows = 6;
  const maxSprites = cols * maxRows;
  const shown = pngBuffers.slice(0, maxSprites);
  const rows = Math.ceil(shown.length / cols);

  const headerH = 80;
  const footerH = 40;
  const gridW = cols * (cellSize + padding) + padding;
  const gridH = rows * (cellSize + padding) + padding;
  const imgW = gridW;
  const imgH = headerH + gridH + footerH;

  const png = new PNG({ width: imgW, height: imgH });

  // Dark background
  for (let i = 0; i < imgW * imgH * 4; i += 4) {
    png.data[i] = 0x1a;
    png.data[i + 1] = 0x1a;
    png.data[i + 2] = 0x2e;
    png.data[i + 3] = 0xff;
  }

  // Blit sprites into grid
  for (let i = 0; i < shown.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ox = padding + col * (cellSize + padding);
    const oy = headerH + padding + row * (cellSize + padding);

    try {
      const sprite = PNG.sync.read(shown[i].buffer);
      // Draw checkerboard background for each cell
      for (let y = 0; y < cellSize; y++) {
        for (let x = 0; x < cellSize; x++) {
          const checker = ((Math.floor(x / 16) + Math.floor(y / 16)) % 2 === 0) ? 0x33 : 0x2a;
          const dstIdx = ((oy + y) * imgW + (ox + x)) * 4;
          png.data[dstIdx] = checker;
          png.data[dstIdx + 1] = checker;
          png.data[dstIdx + 2] = checker + 0x10;
          png.data[dstIdx + 3] = 0xff;
        }
      }
      // Blit sprite
      const copyW = Math.min(sprite.width, cellSize);
      const copyH = Math.min(sprite.height, cellSize);
      for (let y = 0; y < copyH; y++) {
        for (let x = 0; x < copyW; x++) {
          const srcIdx = (y * sprite.width + x) * 4;
          const a = sprite.data[srcIdx + 3];
          if (a === 0) continue;
          const dstIdx = ((oy + y) * imgW + (ox + x)) * 4;
          const alpha = a / 255;
          png.data[dstIdx] = Math.round(sprite.data[srcIdx] * alpha + png.data[dstIdx] * (1 - alpha));
          png.data[dstIdx + 1] = Math.round(sprite.data[srcIdx + 1] * alpha + png.data[dstIdx + 1] * (1 - alpha));
          png.data[dstIdx + 2] = Math.round(sprite.data[srcIdx + 2] * alpha + png.data[dstIdx + 2] * (1 - alpha));
          png.data[dstIdx + 3] = 0xff;
        }
      }
    } catch {
      // Skip broken
    }
  }

  return PNG.sync.write(png);
}

// ─── HTML Gallery Generator ─────────────────────────────────────

function generateBundleGallery(
  bundle: BundleDef,
  entries: { name: string; file1x: string; file4x: string }[],
): string {
  const cards = entries.map(e => `
      <div class="card">
        <img src="${e.file4x}" alt="${e.name}" loading="lazy">
        <span class="label">${e.name.replace(/_16$/, '').replace(/_/g, ' ')}</span>
      </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${bundle.name} — DogSprite Asset Pack</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #1a1a2e; color: #e0e0e0; font-family: system-ui, sans-serif; padding: 2rem; }
    h1 { text-align: center; margin-bottom: 0.25rem; color: #f0c040; font-size: 2rem; }
    .subtitle { text-align: center; color: #999; margin-bottom: 0.5rem; }
    .meta { text-align: center; color: #666; margin-bottom: 2rem; font-size: 0.85rem; }
    .tags { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
    .tag { background: #252540; border: 1px solid #444; border-radius: 12px; padding: 0.25rem 0.75rem; font-size: 0.75rem; color: #aaa; }
    .grid { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
    .card {
      background: #252540; border: 1px solid #333; border-radius: 8px;
      padding: 0.75rem; display: flex; flex-direction: column; align-items: center;
      gap: 0.5rem; transition: border-color 0.2s, transform 0.2s;
    }
    .card:hover { border-color: #f0c040; transform: translateY(-2px); }
    .card img {
      image-rendering: pixelated; width: 128px; height: 128px; object-fit: contain;
      background: repeating-conic-gradient(#333 0% 25%, #2a2a2a 0% 50%) 50% / 16px 16px;
      border-radius: 4px;
    }
    .card .label {
      font-size: 0.7rem; font-weight: 600; text-align: center;
      text-transform: capitalize; color: #ccc; max-width: 128px;
    }
    .footer { text-align: center; margin-top: 3rem; color: #555; font-size: 0.8rem; }
    .footer a { color: #f0c040; text-decoration: none; }
  </style>
</head>
<body>
  <h1>${bundle.name}</h1>
  <p class="subtitle">${bundle.description}</p>
  <p class="meta">${entries.length} sprites · 16×16 pixels · DB16 palette</p>
  <div class="tags">${bundle.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  <div class="grid">${cards}
  </div>
  <div class="footer">
    <p>Made with <a href="#">DogSprite</a> · DB16 Palette · All sprites 16×16</p>
  </div>
</body>
</html>`;
}

// ─── README Generator ───────────────────────────────────────────

function generateReadme(bundle: BundleDef, count: number): string {
  return `${bundle.name}
${'='.repeat(bundle.name.length)}

${bundle.description}

CONTENTS
--------
- sprites-1x/     ${count} PNG files at native 16x16 resolution
- sprites-4x/     ${count} PNG files upscaled to 64x64 (nearest-neighbor, crisp pixels)
- spritesheets/
  - sheet-1x.png  All sprites in a single sheet (16x16 per cell)
  - sheet-4x.png  All sprites in a single sheet (64x64 per cell)
  - sheet.json    Spritesheet metadata (position, name, size per sprite)
- preview/        Marketing preview images
- gallery.html    Interactive sprite browser (open in any web browser)
- palette.png     DB16 color palette reference (16 colors)
- README.txt      This file

SPECS
-----
- Resolution: 16x16 pixels per sprite
- Palette: DawnBringer 16 (DB16) — 16 carefully chosen colors
- Format: PNG with transparency
- Style: Earthbound / Stardew Valley inspired
- Shading: Colored selout outlines, material-aware shading

USAGE
-----
- Import individual PNGs or the spritesheet into your game engine
- Sprites use transparency (alpha channel) — no background color to remove
- The 4x versions are pre-scaled for higher-res games or marketing
- Spritesheet JSON metadata is compatible with most engines (Godot, Unity, GameMaker, Phaser)

LICENSE
-------
This asset pack is licensed for use in commercial and non-commercial projects.
- You MAY use these sprites in any number of projects (games, apps, videos)
- You MAY modify the sprites to fit your project
- You may NOT resell the sprites as-is or in another asset pack
- You may NOT claim the sprites as your own original work
- Credit is appreciated but not required

PALETTE REFERENCE (DB16)
------------------------
#140c1c  #442434  #30346d  #4e4a4e
#854c30  #346524  #d04648  #757161
#597dce  #d27d2c  #8595a1  #6daa2c
#d2aa99  #6dc2ca  #dad45e  #deeed6

---
Made with DogSprite · https://dogsprite.org
`;
}

// ─── Spritesheet JSON metadata ──────────────────────────────────

function generateSheetJson(
  names: string[],
  cols: number,
  cellSize: number,
): string {
  const frames: Record<string, any> = {};
  for (let i = 0; i < names.length; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    frames[names[i]] = {
      frame: { x: col * cellSize, y: row * cellSize, w: cellSize, h: cellSize },
      sourceSize: { w: cellSize, h: cellSize },
    };
  }
  const rows = Math.ceil(names.length / cols);
  return JSON.stringify({
    frames,
    meta: {
      app: 'DogSprite',
      version: '1.0',
      format: 'RGBA8888',
      size: { w: cols * cellSize, h: rows * cellSize },
      scale: 1,
    },
  }, null, 2);
}

// ─── Main ───────────────────────────────────────────────────────

const outBase = path.resolve(import.meta.dirname, '..', 'output', 'bundles');

// Clean previous output
if (fs.existsSync(outBase)) fs.rmSync(outBase, { recursive: true });
fs.mkdirSync(outBase, { recursive: true });

// Generate palette PNG once
const palettePng = generatePalettePng();

let grandTotal = 0;

for (const bundle of BUNDLES) {
  const bundleDir = path.join(outBase, bundle.slug);
  const dir1x = path.join(bundleDir, 'sprites-1x');
  const dir4x = path.join(bundleDir, 'sprites-4x');
  const dirSheets = path.join(bundleDir, 'spritesheets');
  const dirPreview = path.join(bundleDir, 'preview');

  fs.mkdirSync(dir1x, { recursive: true });
  fs.mkdirSync(dir4x, { recursive: true });
  fs.mkdirSync(dirSheets, { recursive: true });
  fs.mkdirSync(dirPreview, { recursive: true });

  const names = Object.keys(bundle.templates);
  console.log(`\n[${bundle.name}] ${names.length} templates...`);

  const exported1x: { name: string; buffer: Buffer }[] = [];
  const exported4x: { name: string; buffer: Buffer }[] = [];
  const galleryEntries: { name: string; file1x: string; file4x: string }[] = [];
  let errors = 0;

  for (const name of names) {
    const buf1x = renderTemplate(name, bundle.templates, 1);
    const buf4x = renderTemplate(name, bundle.templates, 4);
    const buf8x = renderTemplate(name, bundle.templates, 8);

    if (!buf1x || !buf4x || !buf8x) {
      errors++;
      continue;
    }

    // Write individual PNGs
    fs.writeFileSync(path.join(dir1x, `${name}.png`), buf1x);
    fs.writeFileSync(path.join(dir4x, `${name}.png`), buf4x);

    exported1x.push({ name, buffer: buf1x });
    exported4x.push({ name, buffer: buf8x }); // Use 8x for gallery display
    galleryEntries.push({
      name,
      file1x: `sprites-1x/${name}.png`,
      file4x: `sprites-4x/${name}.png`,
    });

    process.stdout.write('.');
  }

  const exportedCount = exported1x.length;
  grandTotal += exportedCount;

  // Generate spritesheets
  const sheetCols = Math.min(16, Math.ceil(Math.sqrt(exportedCount)));

  if (exported1x.length > 0) {
    const sheet1x = generateSpritesheet(exported1x, sheetCols, 16, 1);
    fs.writeFileSync(path.join(dirSheets, 'sheet-1x.png'), sheet1x);

    const sheet4x = generateSpritesheet(exported1x, sheetCols, 16, 4);
    fs.writeFileSync(path.join(dirSheets, 'sheet-4x.png'), sheet4x);

    const sheetJson = generateSheetJson(exported1x.map(e => e.name), sheetCols, 16);
    fs.writeFileSync(path.join(dirSheets, 'sheet.json'), sheetJson);
  }

  // Generate preview image
  if (exported4x.length > 0) {
    const preview = generatePreviewImage(exported4x, bundle.name, exportedCount);
    fs.writeFileSync(path.join(dirPreview, 'preview.png'), preview);
  }

  // Generate gallery HTML
  const galleryHtml = generateBundleGallery(bundle, galleryEntries);
  fs.writeFileSync(path.join(bundleDir, 'gallery.html'), galleryHtml);

  // Write README
  fs.writeFileSync(path.join(bundleDir, 'README.txt'), generateReadme(bundle, exportedCount));

  // Write palette
  fs.writeFileSync(path.join(bundleDir, 'palette.png'), palettePng);

  console.log(`\n  ✓ ${exportedCount} sprites exported${errors > 0 ? ` (${errors} errors)` : ''}`);
}

// ─── Generate MEGA bundle index ─────────────────────────────────

const megaDir = path.join(outBase, '_MEGA-BUNDLE');
fs.mkdirSync(megaDir, { recursive: true });

const megaReadme = `DogSprite MEGA Bundle
=====================

All ${grandTotal} sprites from every DogSprite asset pack in one collection.

INCLUDED PACKS
--------------
${BUNDLES.map(b => `- ${b.name} (${Object.keys(b.templates).length} sprites)`).join('\n')}

Each pack is in its own folder with sprites, spritesheets, and gallery.

Total: ${grandTotal} unique sprites · 16×16 · DB16 palette

LICENSE
-------
Same license as individual packs — use in any project, no resale as asset pack.

---
Made with DogSprite · https://dogsprite.org
`;

fs.writeFileSync(path.join(megaDir, 'README.txt'), megaReadme);
fs.writeFileSync(path.join(megaDir, 'palette.png'), palettePng);

console.log(`\n${'='.repeat(50)}`);
console.log(`✓ TOTAL: ${grandTotal} sprites across ${BUNDLES.length} bundles`);
console.log(`  Output: ${outBase}`);
console.log(`\nBundles:`);
BUNDLES.forEach(b => {
  const count = Object.keys(b.templates).length;
  console.log(`  ${b.slug.padEnd(30)} ${String(count).padStart(4)} sprites`);
});
