/**
 * Build-time script: generates static sprite library data for the browser.
 * Only includes templates that are part of the itch.io bundles (25 x 16x16 + 9 x 32x32).
 *
 * Usage: npx tsx scripts/buildSpriteLibrary.ts
 *
 * Output: public/sprites/
 *   catalog.json           — lightweight metadata for all templates
 *   data/{slug}.json       — full template + scheme data per category
 *   atlases/{slug}.png     — pre-rendered sprite atlas per category
 *   atlases/{slug}.json    — atlas layout positions
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
// Resolve pngjs from mcp-server's node_modules
import { createRequire } from 'module';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require2 = createRequire(import.meta.url);
const mcpNodeModules = path.resolve(__dirname, '..', 'mcp-server', 'node_modules');
const pngjs = require2(path.join(mcpNodeModules, 'pngjs'));
const PNG = pngjs.PNG;
import { createProject, deleteProject } from '../mcp-server/src/project.js';
import { handleDrawTemplate } from '../mcp-server/src/tools/templateTools.js';
import { compositeProject } from '../mcp-server/src/render.js';

// ─── Import ONLY template + scheme registries used in itch.io bundles ────

// Bundle 1: RPG Weapons & Gear
import { ITEM_TEMPLATES, ITEM_COLOR_SCHEMES } from '../mcp-server/src/templates/items.js';
import { ITEM_VARIETY_TEMPLATES, ITEM_VARIETY_COLOR_SCHEMES } from '../mcp-server/src/templates/itemsVariety.js';
import { ITEM_BATCH2_TEMPLATES, ITEM_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/itemsVariety2.js';
import { EQUIPMENT_TEMPLATES, EQUIPMENT_COLOR_SCHEMES } from '../mcp-server/src/templates/equipment.js';
import { EQUIPMENT_VARIETY_TEMPLATES, EQUIPMENT_VARIETY_COLOR_SCHEMES } from '../mcp-server/src/templates/equipmentVariety.js';
import { EQUIPMENT_BATCH2_TEMPLATES, EQUIPMENT_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/equipmentVariety2.js';
import { WEAPONS_CLASSIC_TEMPLATES, WEAPONS_CLASSIC_COLOR_SCHEMES } from '../mcp-server/src/templates/weaponsClassic.js';

// Bundle 2: Food & Consumables
import { FOOD_TEMPLATES, FOOD_COLOR_SCHEMES } from '../mcp-server/src/templates/food.js';
import { FOOD_BATCH1_TEMPLATES, FOOD_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/foodVariety.js';
import { FOOD_BATCH2_TEMPLATES, FOOD_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/foodVariety2.js';
import { FOOD_BATCH3_TEMPLATES, FOOD_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/foodVariety3.js';
import { FOOD_BATCH4_TEMPLATES, FOOD_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/foodVariety4.js';
import { FOOD_BATCH5_TEMPLATES, FOOD_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/foodVariety5.js';

// Bundle 3: Cozy Life-Sim
import { COZY_SHOP_UI_TEMPLATES, COZY_SHOP_UI_COLOR_SCHEMES } from '../mcp-server/src/templates/uiCozyShop.js';
import { UI_TEMPLATES, UI_COLOR_SCHEMES } from '../mcp-server/src/templates/uiElements.js';
import { FURNITURE_BATCH3_TEMPLATES, FURNITURE_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/furnitureVariety3.js';
import { COZY_BATCH1_TEMPLATES, COZY_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyVariety.js';
import { COZY_BATCH2_TEMPLATES, COZY_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyVariety2.js';
import { COZY_BATCH3_TEMPLATES, COZY_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyVariety3.js';
import { COZY_BATCH4_TEMPLATES, COZY_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyVariety4.js';

// Bundle 4: Botanical Plants
import { PLANT_TEMPLATES, PLANT_COLOR_SCHEMES } from '../mcp-server/src/templates/plants.js';
import { PLANT_BATCH1_TEMPLATES, PLANT_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/plantsVariety.js';

// Bundle 5: World Builder
import { ENVIRONMENT_TEMPLATES, ENVIRONMENT_COLOR_SCHEMES } from '../mcp-server/src/templates/environment.js';
import { ENVIRONMENT_VARIETY_TEMPLATES, ENVIRONMENT_VARIETY_COLOR_SCHEMES } from '../mcp-server/src/templates/environmentVariety.js';
import { BIOME_TEMPLATES, BIOME_COLOR_SCHEMES } from '../mcp-server/src/templates/biomes.js';
import { BIOME_VARIETY_TEMPLATES, BIOME_VARIETY_COLOR_SCHEMES } from '../mcp-server/src/templates/biomesVariety.js';
import { NATURE_TEMPLATES, NATURE_COLOR_SCHEMES } from '../mcp-server/src/templates/nature.js';
import { NATURE_VARIETY_TEMPLATES, NATURE_VARIETY_COLOR_SCHEMES } from '../mcp-server/src/templates/natureVariety.js';
import { BUILDING_TEMPLATES, BUILDING_COLOR_SCHEMES } from '../mcp-server/src/templates/buildings.js';
import { BUILDING_BATCH1_TEMPLATES, BUILDING_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/buildingsVariety.js';
import { BUILDING_BATCH2_TEMPLATES, BUILDING_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/buildingsVariety2.js';
import { BUILDING_BATCH3_TEMPLATES, BUILDING_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/buildingsVariety3.js';
import { BUILDING_BATCH4_TEMPLATES, BUILDING_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/buildingsVariety4.js';
import { BUILDING_BATCH5_TEMPLATES, BUILDING_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/buildingsVariety5.js';

// Bundle 6: Dungeon & Adventure
import { DUNGEON_TEMPLATES, DUNGEON_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeon.js';
import { DUNGEON_BATCH1_TEMPLATES, DUNGEON_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonVariety.js';
import { DUNGEON_BATCH2_TEMPLATES, DUNGEON_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonVariety2.js';
import { PROP_TEMPLATES, PROP_COLOR_SCHEMES } from '../mcp-server/src/templates/props.js';
import { FURNITURE_TEMPLATES, FURNITURE_COLOR_SCHEMES } from '../mcp-server/src/templates/furniture.js';
import { FURNITURE_BATCH1_TEMPLATES, FURNITURE_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/furnitureVariety.js';
import { FURNITURE_BATCH2_TEMPLATES, FURNITURE_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/furnitureVariety2.js';

// Bundle 7: UI Toolkit
import { UI_VARIETY_TEMPLATES, UI_VARIETY_COLOR_SCHEMES } from '../mcp-server/src/templates/uiVariety.js';
import { RPG_UI_TEMPLATES, RPG_UI_COLOR_SCHEMES } from '../mcp-server/src/templates/rpgUI.js';
import { RPG_UI_VARIETY_TEMPLATES, RPG_UI_VARIETY_COLOR_SCHEMES } from '../mcp-server/src/templates/rpgUIVariety.js';
import { UI_BARS_TEMPLATES, UI_BARS_COLOR_SCHEMES } from '../mcp-server/src/templates/uiBarsVariety.js';

// Bundle 8: VFX & Magic
import { EFFECT_TEMPLATES, EFFECT_COLOR_SCHEMES } from '../mcp-server/src/templates/effects.js';
import { EFFECT_BATCH1_TEMPLATES, EFFECT_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/effectsVariety.js';
import { EFFECT_BATCH2_TEMPLATES, EFFECT_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/effectsVariety2.js';
import { EFFECT_BATCH3_TEMPLATES, EFFECT_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/effectsVariety3.js';
import { EFFECT_BATCH4_TEMPLATES, EFFECT_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/effectsVariety4.js';
import { EFFECT_BATCH5_TEMPLATES, EFFECT_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/effectsVariety5.js';
import { EFFECT_BATCH6_TEMPLATES, EFFECT_BATCH6_COLOR_SCHEMES } from '../mcp-server/src/templates/effectsVariety6.js';

// Bundle 9: Vehicles
import { VEHICLE_TEMPLATES, VEHICLE_COLOR_SCHEMES } from '../mcp-server/src/templates/vehicles.js';
import { VEHICLE_BATCH1_TEMPLATES, VEHICLE_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/vehiclesVariety.js';
import { VEHICLE_BATCH2_TEMPLATES, VEHICLE_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/vehiclesVariety2.js';
import { VEHICLE_BATCH3_TEMPLATES, VEHICLE_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/vehiclesVariety3.js';
import { VEHICLE_BATCH4_TEMPLATES, VEHICLE_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/vehiclesVariety4.js';
import { VEHICLE_BATCH5_TEMPLATES, VEHICLE_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/vehiclesVariety5.js';

// Bundle 10: Modern Tech
import { MODERN_TECH_TEMPLATES, MODERN_TECH_COLOR_SCHEMES } from '../mcp-server/src/templates/modernTech.js';
import { MODERN_TECH_BATCH1_TEMPLATES, MODERN_TECH_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/modernTechVariety.js';
import { MODERN_TECH_BATCH2_TEMPLATES, MODERN_TECH_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/modernTechVariety2.js';
import { MODERN_TECH_BATCH3_TEMPLATES, MODERN_TECH_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/modernTechVariety3.js';
import { MODERN_TECH_BATCH4_TEMPLATES, MODERN_TECH_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/modernTechVariety4.js';

// Bundle 11: Retro Tech
import { RETRO_TECH_TEMPLATES, RETRO_TECH_COLOR_SCHEMES } from '../mcp-server/src/templates/retroTech.js';
import { RETRO_TECH_BATCH1_TEMPLATES, RETRO_TECH_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/retroTechVariety.js';
import { RETRO_TECH_BATCH2_TEMPLATES, RETRO_TECH_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/retroTechVariety2.js';
import { RETRO_TECH_BATCH3_TEMPLATES, RETRO_TECH_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/retroTechVariety3.js';
import { RETRO_TECH_BATCH4_TEMPLATES, RETRO_TECH_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/retroTechVariety4.js';

// Bundle 12: Library Cozy
import { LIBRARY_BATCH1_TEMPLATES, LIBRARY_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/libraryVariety.js';
import { LIBRARY_BATCH2_TEMPLATES, LIBRARY_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/libraryVariety2.js';
import { LIBRARY_BATCH3_TEMPLATES, LIBRARY_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/libraryVariety3.js';
import { LIBRARY_BATCH4_TEMPLATES, LIBRARY_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/libraryVariety4.js';
import { LIBRARY_BATCH5_TEMPLATES, LIBRARY_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/libraryVariety5.js';

// Bundle 13: Lo-Fi Study
import { LOFI_BATCH1_TEMPLATES, LOFI_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/lofiStudyVariety.js';
import { LOFI_BATCH2_TEMPLATES, LOFI_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/lofiStudyVariety2.js';
import { LOFI_BATCH3_TEMPLATES, LOFI_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/lofiStudyVariety3.js';

// Bundle 14: Music & Instruments
import { MUSIC_BATCH1_TEMPLATES, MUSIC_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/musicVariety.js';
import { MUSIC_BATCH2_TEMPLATES, MUSIC_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/musicVariety2.js';
import { MUSIC_BATCH3_TEMPLATES, MUSIC_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/musicVariety3.js';
import { MUSIC_BATCH4_TEMPLATES, MUSIC_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/musicVariety4.js';
import { MUSIC_BATCH5_TEMPLATES, MUSIC_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/musicVariety5.js';

// Bundle 15: Crafting & Workshop
import { CRAFTING_BATCH1_TEMPLATES, CRAFTING_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/craftingVariety.js';
import { CRAFTING_BATCH2_TEMPLATES, CRAFTING_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/craftingVariety2.js';
import { CRAFTING_BATCH3_TEMPLATES, CRAFTING_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/craftingVariety3.js';
import { CRAFTING_BATCH4_TEMPLATES, CRAFTING_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/craftingVariety4.js';
import { CRAFTING_BATCH5_TEMPLATES, CRAFTING_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/craftingVariety5.js';

// Bundle 16: Weapons, Staffs & Bows
import { WEAPON_STAFF_BATCH1_TEMPLATES, WEAPON_STAFF_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/weaponStaffVariety.js';
import { WEAPON_STAFF_BATCH2_TEMPLATES, WEAPON_STAFF_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/weaponStaffVariety2.js';
import { WEAPON_STAFF_BATCH3_TEMPLATES, WEAPON_STAFF_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/weaponStaffVariety3.js';
import { WEAPON_STAFF_BATCH4_TEMPLATES, WEAPON_STAFF_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/weaponStaffVariety4.js';
import { WEAPON_STAFF_BATCH5_TEMPLATES, WEAPON_STAFF_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/weaponStaffVariety5.js';

// Bundle 17: Armor & Equipment
import { ARMOR_HELMETS_TEMPLATES, ARMOR_HELMETS_COLOR_SCHEMES } from '../mcp-server/src/templates/armorHelmets.js';
import { ARMOR_CHEST_TEMPLATES, ARMOR_CHEST_COLOR_SCHEMES } from '../mcp-server/src/templates/armorChest.js';
import { ARMOR_ARMS_TEMPLATES, ARMOR_ARMS_COLOR_SCHEMES } from '../mcp-server/src/templates/armorArms.js';
import { ARMOR_LEGS_TEMPLATES, ARMOR_LEGS_COLOR_SCHEMES } from '../mcp-server/src/templates/armorLegs.js';
import { ARMOR_SHIELDS_TEMPLATES, ARMOR_SHIELDS_COLOR_SCHEMES } from '../mcp-server/src/templates/armorShields.js';

// Bundle 18: Super UI/UX
import { SUPER_UI_BATCH1_TEMPLATES, SUPER_UI_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/superUiVariety.js';
import { SUPER_UI_BATCH2_TEMPLATES, SUPER_UI_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/superUiVariety2.js';
import { SUPER_UI_BATCH3_TEMPLATES, SUPER_UI_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/superUiVariety3.js';
import { SUPER_UI_BATCH4_TEMPLATES, SUPER_UI_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/superUiVariety4.js';
import { SUPER_UI_BATCH5_TEMPLATES, SUPER_UI_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/superUiVariety5.js';

// Bundle 19: Bakery & Pastry
import { BAKERY_BATCH1_TEMPLATES, BAKERY_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/bakeryVariety.js';
import { BAKERY_BATCH2_TEMPLATES, BAKERY_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/bakeryVariety2.js';
import { BAKERY_BATCH3_TEMPLATES, BAKERY_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/bakeryVariety3.js';
import { BAKERY_BATCH4_TEMPLATES, BAKERY_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/bakeryVariety4.js';
import { BAKERY_BATCH5_TEMPLATES, BAKERY_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/bakeryVariety5.js';

// Bundle 20: Fruits & Vegetables
import { FRUITS_BATCH1_TEMPLATES, FRUITS_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/fruitsVariety.js';
import { FRUITS_BATCH2_TEMPLATES, FRUITS_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/fruitsVariety2.js';
import { VEGGIES_BATCH1_TEMPLATES, VEGGIES_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/veggiesVariety.js';
import { VEGGIES_BATCH2_TEMPLATES, VEGGIES_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/veggiesVariety2.js';
import { VEGGIES_BATCH3_TEMPLATES, VEGGIES_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/veggiesVariety3.js';

// Bundle 21: Yatai Simulator
import { YATAI_BATCH1_TEMPLATES, YATAI_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/yataiVariety.js';
import { YATAI_BATCH2_TEMPLATES, YATAI_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/yataiVariety2.js';
import { YATAI_BATCH3_TEMPLATES, YATAI_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/yataiVariety3.js';
import { YATAI_BATCH4_TEMPLATES, YATAI_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/yataiVariety4.js';
import { YATAI_BATCH5_TEMPLATES, YATAI_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/yataiVariety5.js';

// Bundle 22: Mangaka Simulator
import { MANGAKA_BATCH1_TEMPLATES, MANGAKA_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/mangakaVariety.js';
import { MANGAKA_BATCH2_TEMPLATES, MANGAKA_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/mangakaVariety2.js';
import { MANGAKA_BATCH3_TEMPLATES, MANGAKA_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/mangakaVariety3.js';
import { MANGAKA_BATCH4_TEMPLATES, MANGAKA_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/mangakaVariety4.js';
import { MANGAKA_BATCH5_TEMPLATES, MANGAKA_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/mangakaVariety5.js';

// Bundle 23: Tokyo Life (batch 2-6 only, NOT batch 1)
import { TOKYO_BATCH2_TEMPLATES, TOKYO_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/tokyoCityVariety2.js';
import { TOKYO_BATCH3_TEMPLATES, TOKYO_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/tokyoCityVariety3.js';
import { TOKYO_BATCH4_TEMPLATES, TOKYO_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/tokyoCityVariety4.js';
import { TOKYO_BATCH5_TEMPLATES, TOKYO_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/tokyoCityVariety5.js';
import { TOKYO_BATCH6_TEMPLATES, TOKYO_BATCH6_COLOR_SCHEMES } from '../mcp-server/src/templates/tokyoCityVariety6.js';

// Bundle 24: Pixel Arsenal
import { GUNS_BATCH1_TEMPLATES, GUNS_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/gunsVariety.js';
import { GUNS_BATCH2_TEMPLATES, GUNS_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/gunsVariety2.js';
import { GUNS_BATCH3_TEMPLATES, GUNS_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/gunsVariety3.js';
import { GUNS_BATCH4_TEMPLATES, GUNS_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/gunsVariety4.js';
import { GUNS_BATCH5_TEMPLATES, GUNS_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/gunsVariety5.js';

// Bundle 25: Medieval Scholar
import { LIBERAL_ARTS_BATCH1_TEMPLATES, LIBERAL_ARTS_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArtsVariety.js';
import { LIBERAL_ARTS_BATCH2_TEMPLATES, LIBERAL_ARTS_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArtsVariety2.js';
import { LIBERAL_ARTS_BATCH3_TEMPLATES, LIBERAL_ARTS_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArtsVariety3.js';
import { LIBERAL_ARTS_BATCH4_TEMPLATES, LIBERAL_ARTS_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArtsVariety4.js';
import { LIBERAL_ARTS_BATCH5_TEMPLATES, LIBERAL_ARTS_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArtsVariety5.js';

// Bundle 30: Dungeon Tileset
import { DUNGEON_TILES_BATCH1_TEMPLATES, DUNGEON_TILES_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonTilesVariety.js';
import { DUNGEON_TILES_BATCH2_TEMPLATES, DUNGEON_TILES_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonTilesVariety2.js';
import { DUNGEON_TILES_BATCH3_TEMPLATES, DUNGEON_TILES_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonTilesVariety3.js';
import { DUNGEON_TILES_BATCH4_TEMPLATES, DUNGEON_TILES_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonTilesVariety4.js';
import { DUNGEON_TILES_BATCH5_TEMPLATES, DUNGEON_TILES_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonTilesVariety5.js';

// ─── 32x32 bundle imports ────────────────────────────────────

// Bundle 26: Roguelike Weapons 32
import { ROGUELIKE_SWORDS_32_TEMPLATES, ROGUELIKE_SWORDS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/roguelikeWeapons32.js';
import { ROGUELIKE_SHIELDS_32_TEMPLATES, ROGUELIKE_SHIELDS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/roguelikeShields32.js';
import { ROGUELIKE_BOWS_32_TEMPLATES, ROGUELIKE_BOWS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/roguelikeBows32.js';
import { ROGUELIKE_STAFFS_32_TEMPLATES, ROGUELIKE_STAFFS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/roguelikeStaffs32.js';
import { ROGUELIKE_EXOTIC_32_TEMPLATES, ROGUELIKE_EXOTIC_32_COLOR_SCHEMES } from '../mcp-server/src/templates/roguelikeExotic32.js';

// Bundle 27: Dungeon Props 32
import { DUNGEON_STORAGE_32_TEMPLATES, DUNGEON_STORAGE_32_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonStorage32.js';
import { DUNGEON_LIGHTS_32_TEMPLATES, DUNGEON_LIGHTS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonLights32.js';
import { DUNGEON_PICKUPS_32_TEMPLATES, DUNGEON_PICKUPS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonPickups32.js';
import { DUNGEON_INTERACTIVE_32_TEMPLATES, DUNGEON_INTERACTIVE_32_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonInteractive32.js';
import { DUNGEON_DECOR_32_TEMPLATES, DUNGEON_DECOR_32_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonDecor32.js';

// Bundle 28: Cozy Consumables 32
import { COZY_POTIONS_32_TEMPLATES, COZY_POTIONS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyPotions32.js';
import { COZY_BOOKS_32_TEMPLATES, COZY_BOOKS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyBooks32.js';
import { COZY_COFFEE_32_TEMPLATES, COZY_COFFEE_32_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyCoffee32.js';
import { COZY_RAMEN_32_TEMPLATES, COZY_RAMEN_32_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyRamen32.js';
import { COZY_FOOD_32_TEMPLATES, COZY_FOOD_32_COLOR_SCHEMES } from '../mcp-server/src/templates/cozyFood32.js';

// Bundle 29: RPG UI 32
import { RPG_BARS_32_TEMPLATES, RPG_BARS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/rpgBars32.js';
import { RPG_STATUS_32_TEMPLATES, RPG_STATUS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/rpgStatus32.js';
import { RPG_SLOTS_32_TEMPLATES, RPG_SLOTS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/rpgSlots32.js';
import { RPG_BUTTONS_32_TEMPLATES, RPG_BUTTONS_32_COLOR_SCHEMES } from '../mcp-server/src/templates/rpgButtons32.js';
import { RPG_HUD_32_TEMPLATES, RPG_HUD_32_COLOR_SCHEMES } from '../mcp-server/src/templates/rpgHud32.js';

// Bundle 31: Medieval Scholar 32
import { LIBERAL_ARTS_32_BATCH1_TEMPLATES, LIBERAL_ARTS_32_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArts32.js';
import { LIBERAL_ARTS_32_BATCH2_TEMPLATES, LIBERAL_ARTS_32_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArts32v2.js';
import { LIBERAL_ARTS_32_BATCH3_TEMPLATES, LIBERAL_ARTS_32_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArts32v3.js';
import { LIBERAL_ARTS_32_BATCH4_TEMPLATES, LIBERAL_ARTS_32_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArts32v4.js';
import { LIBERAL_ARTS_32_BATCH5_TEMPLATES, LIBERAL_ARTS_32_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/liberalArts32v5.js';

// Bundle 32: Game Icons 32
import { GAME_ICONS_32_BATCH1_TEMPLATES, GAME_ICONS_32_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/gameIcons32.js';
import { GAME_ICONS_32_BATCH2_TEMPLATES, GAME_ICONS_32_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/gameIcons32v2.js';
import { GAME_ICONS_32_BATCH3_TEMPLATES, GAME_ICONS_32_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/gameIcons32v3.js';
import { GAME_ICONS_32_BATCH4_TEMPLATES, GAME_ICONS_32_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/gameIcons32v4.js';
import { GAME_ICONS_32_BATCH5_TEMPLATES, GAME_ICONS_32_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/gameIcons32v5.js';

// Bundle 33: Retro Computing 32
import { RETRO_COMPUTING_32_BATCH1_TEMPLATES, RETRO_COMPUTING_32_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/retroComputing32.js';
import { RETRO_COMPUTING_32_BATCH2_TEMPLATES, RETRO_COMPUTING_32_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/retroComputing32v2.js';
import { RETRO_COMPUTING_32_BATCH3_TEMPLATES, RETRO_COMPUTING_32_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/retroComputing32v3.js';
import { RETRO_COMPUTING_32_BATCH4_TEMPLATES, RETRO_COMPUTING_32_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/retroComputing32v4.js';
import { RETRO_COMPUTING_32_BATCH5_TEMPLATES, RETRO_COMPUTING_32_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/retroComputing32v5.js';
import { RETRO_COMPUTING_32_FIX_TEMPLATES, RETRO_COMPUTING_32_FIX_COLOR_SCHEMES } from '../mcp-server/src/templates/retroComputingFix32.js';

// Bundle 34: Dungeon Creatures 32
import { DUNGEON_CREATURES_32_BATCH1_TEMPLATES, DUNGEON_CREATURES_32_BATCH1_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonCreatures32.js';
import { DUNGEON_CREATURES_32_BATCH2_TEMPLATES, DUNGEON_CREATURES_32_BATCH2_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonCreatures32v2.js';
import { DUNGEON_CREATURES_32_BATCH3_TEMPLATES, DUNGEON_CREATURES_32_BATCH3_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonCreatures32v3.js';
import { DUNGEON_CREATURES_32_BATCH4_TEMPLATES, DUNGEON_CREATURES_32_BATCH4_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonCreatures32v4.js';
import { DUNGEON_CREATURES_32_BATCH5_TEMPLATES, DUNGEON_CREATURES_32_BATCH5_COLOR_SCHEMES } from '../mcp-server/src/templates/dungeonCreatures32v5.js';

// ─── Template filtering helpers (mirrors exportBundles.ts) ──────

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

// ─── Curated key lists for mixed files (mirrors exportBundles.ts) ──

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

const UI_ELEMENTS_PURE_KEYS = [
  'health_bar_16', 'button_16', 'cursor_16', 'speech_bubble_16', 'coin_icon_16', 'star_icon_16',
];

const UI_ELEMENTS_COZY_KEYS = [
  'cozy_calendar_16', 'recipe_card_16', 'tea_cup_icon_16', 'knitting_icon_16',
];

const COZY_SHOP_GAMING_KEYS = [
  'game_box_ui_16', 'cartridge_ui_16', 'controller_ui_16',
];

// Bakery curated picks from existing food/cozy files
const EXISTING_BAKERY_FOOD_KEYS = ['bread_16', 'pie_16'];
const EXISTING_BAKERY_FOOD1_KEYS = ['bread_loaf_16', 'cake_slice_16', 'pretzel_16', 'donut_16'];
const EXISTING_BAKERY_FOOD2_KEYS = ['croissant_16', 'cupcake_16', 'baguette_16', 'pancake_stack_16', 'cookie_16', 'waffle_16'];
const EXISTING_BAKERY_FOOD4_KEYS = ['french_toast_16', 'cinnamon_roll_16', 'bao_bun_16', 'cheesecake_16', 'brownie_16', 'garlic_bread_16'];
const EXISTING_BAKERY_FOOD5_KEYS = ['pita_bread_16', 'tiramisu_16', 'fruit_tart_16', 'pretzel_soft_16', 'gingerbread_man_16', 'fortune_cookie_16', 'waffle_cone_16'];
const EXISTING_BAKERY_COZY1_KEYS = ['mixing_bowl_16', 'rolling_pin_16', 'oven_mitt_16'];
const EXISTING_BAKERY_COZY2_KEYS = ['bread_basket_16', 'cookie_jar_16'];
const EXISTING_BAKERY_COZY3_KEYS = ['pie_cooling_16'];

// ─── Category definitions — exactly mirrors itch.io bundles ──────

interface CatDef {
  label: string;
  emoji: string;
  templates: Record<string, any>;
  schemes: Record<string, any>;
}

const CATEGORIES: CatDef[] = [
  // ── 16x16 bundles ──────────────────────────────────────────────

  // 1. RPG Weapons & Gear
  {
    label: 'RPG Weapons & Gear',
    emoji: '\u{2694}\u{FE0F}',
    templates: {
      ...ITEM_TEMPLATES,
      ...pick(ITEM_VARIETY_TEMPLATES, ITEMS_VARIETY_RPG_KEYS),
      ...ITEM_BATCH2_TEMPLATES,
      ...EQUIPMENT_TEMPLATES, ...EQUIPMENT_VARIETY_TEMPLATES, ...EQUIPMENT_BATCH2_TEMPLATES,
      ...WEAPONS_CLASSIC_TEMPLATES,
    },
    schemes: {
      ...ITEM_COLOR_SCHEMES, ...ITEM_VARIETY_COLOR_SCHEMES, ...ITEM_BATCH2_COLOR_SCHEMES,
      ...EQUIPMENT_COLOR_SCHEMES, ...EQUIPMENT_VARIETY_COLOR_SCHEMES, ...EQUIPMENT_BATCH2_COLOR_SCHEMES,
      ...WEAPONS_CLASSIC_COLOR_SCHEMES,
    },
  },

  // 2. Food & Consumables
  {
    label: 'Food & Consumables',
    emoji: '\u{1F356}',
    templates: {
      ...FOOD_TEMPLATES, ...FOOD_BATCH1_TEMPLATES, ...FOOD_BATCH2_TEMPLATES, ...FOOD_BATCH3_TEMPLATES, ...FOOD_BATCH4_TEMPLATES, ...FOOD_BATCH5_TEMPLATES,
      ...pick(ITEM_VARIETY_TEMPLATES, ITEMS_VARIETY_FOOD_KEYS),
    },
    schemes: {
      ...FOOD_COLOR_SCHEMES, ...FOOD_BATCH1_COLOR_SCHEMES, ...FOOD_BATCH2_COLOR_SCHEMES, ...FOOD_BATCH3_COLOR_SCHEMES, ...FOOD_BATCH4_COLOR_SCHEMES, ...FOOD_BATCH5_COLOR_SCHEMES,
      ...ITEM_VARIETY_COLOR_SCHEMES,
    },
  },

  // 3. Cozy Life-Sim
  {
    label: 'Cozy Life-Sim',
    emoji: '\u{2615}',
    templates: {
      ...omit(COZY_SHOP_UI_TEMPLATES, COZY_SHOP_GAMING_KEYS),
      ...pick(UI_TEMPLATES, UI_ELEMENTS_COZY_KEYS),
      ...pick(ITEM_VARIETY_TEMPLATES, ITEMS_VARIETY_COZY_KEYS),
      ...FURNITURE_BATCH3_TEMPLATES,
      ...COZY_BATCH1_TEMPLATES, ...COZY_BATCH2_TEMPLATES, ...COZY_BATCH3_TEMPLATES, ...COZY_BATCH4_TEMPLATES,
    },
    schemes: {
      ...COZY_SHOP_UI_COLOR_SCHEMES, ...UI_COLOR_SCHEMES, ...ITEM_VARIETY_COLOR_SCHEMES,
      ...FURNITURE_BATCH3_COLOR_SCHEMES,
      ...COZY_BATCH1_COLOR_SCHEMES, ...COZY_BATCH2_COLOR_SCHEMES, ...COZY_BATCH3_COLOR_SCHEMES, ...COZY_BATCH4_COLOR_SCHEMES,
    },
  },

  // 4. Botanical Plants
  {
    label: 'Botanical Plants',
    emoji: '\u{1F331}',
    templates: { ...PLANT_TEMPLATES, ...PLANT_BATCH1_TEMPLATES },
    schemes: { ...PLANT_COLOR_SCHEMES, ...PLANT_BATCH1_COLOR_SCHEMES },
  },

  // 5. World Builder
  {
    label: 'World Builder',
    emoji: '\u{1F3F0}',
    templates: {
      ...ENVIRONMENT_TEMPLATES, ...ENVIRONMENT_VARIETY_TEMPLATES,
      ...BIOME_TEMPLATES, ...BIOME_VARIETY_TEMPLATES,
      ...NATURE_TEMPLATES, ...NATURE_VARIETY_TEMPLATES,
      ...PLANT_TEMPLATES,
      ...BUILDING_TEMPLATES, ...BUILDING_BATCH1_TEMPLATES, ...BUILDING_BATCH2_TEMPLATES, ...BUILDING_BATCH3_TEMPLATES, ...BUILDING_BATCH4_TEMPLATES, ...BUILDING_BATCH5_TEMPLATES,
    },
    schemes: {
      ...ENVIRONMENT_COLOR_SCHEMES, ...ENVIRONMENT_VARIETY_COLOR_SCHEMES,
      ...BIOME_COLOR_SCHEMES, ...BIOME_VARIETY_COLOR_SCHEMES,
      ...NATURE_COLOR_SCHEMES, ...NATURE_VARIETY_COLOR_SCHEMES,
      ...PLANT_COLOR_SCHEMES,
      ...BUILDING_COLOR_SCHEMES, ...BUILDING_BATCH1_COLOR_SCHEMES, ...BUILDING_BATCH2_COLOR_SCHEMES, ...BUILDING_BATCH3_COLOR_SCHEMES, ...BUILDING_BATCH4_COLOR_SCHEMES, ...BUILDING_BATCH5_COLOR_SCHEMES,
    },
  },

  // 6. Dungeon & Adventure
  {
    label: 'Dungeon & Adventure',
    emoji: '\u{1F5DD}\u{FE0F}',
    templates: {
      ...DUNGEON_TEMPLATES, ...DUNGEON_BATCH1_TEMPLATES, ...DUNGEON_BATCH2_TEMPLATES,
      ...PROP_TEMPLATES,
      ...FURNITURE_TEMPLATES, ...FURNITURE_BATCH1_TEMPLATES, ...FURNITURE_BATCH2_TEMPLATES,
    },
    schemes: {
      ...DUNGEON_COLOR_SCHEMES, ...DUNGEON_BATCH1_COLOR_SCHEMES, ...DUNGEON_BATCH2_COLOR_SCHEMES,
      ...PROP_COLOR_SCHEMES,
      ...FURNITURE_COLOR_SCHEMES, ...FURNITURE_BATCH1_COLOR_SCHEMES, ...FURNITURE_BATCH2_COLOR_SCHEMES,
    },
  },

  // 7. UI Toolkit
  {
    label: 'UI Toolkit',
    emoji: '\u{1F5A5}\u{FE0F}',
    templates: {
      ...pick(UI_TEMPLATES, UI_ELEMENTS_PURE_KEYS),
      ...UI_VARIETY_TEMPLATES,
      ...RPG_UI_TEMPLATES, ...RPG_UI_VARIETY_TEMPLATES,
      ...UI_BARS_TEMPLATES,
    },
    schemes: {
      ...UI_COLOR_SCHEMES, ...UI_VARIETY_COLOR_SCHEMES,
      ...RPG_UI_COLOR_SCHEMES, ...RPG_UI_VARIETY_COLOR_SCHEMES,
      ...UI_BARS_COLOR_SCHEMES,
    },
  },

  // 8. VFX & Magic
  {
    label: 'VFX & Magic',
    emoji: '\u{2728}',
    templates: {
      ...EFFECT_TEMPLATES, ...EFFECT_BATCH1_TEMPLATES, ...EFFECT_BATCH2_TEMPLATES,
      ...EFFECT_BATCH3_TEMPLATES, ...EFFECT_BATCH4_TEMPLATES, ...EFFECT_BATCH5_TEMPLATES,
      ...EFFECT_BATCH6_TEMPLATES,
    },
    schemes: {
      ...EFFECT_COLOR_SCHEMES, ...EFFECT_BATCH1_COLOR_SCHEMES, ...EFFECT_BATCH2_COLOR_SCHEMES,
      ...EFFECT_BATCH3_COLOR_SCHEMES, ...EFFECT_BATCH4_COLOR_SCHEMES, ...EFFECT_BATCH5_COLOR_SCHEMES,
      ...EFFECT_BATCH6_COLOR_SCHEMES,
    },
  },

  // 9. Vehicles & Transport
  {
    label: 'Vehicles & Transport',
    emoji: '\u{1F697}',
    templates: {
      ...VEHICLE_TEMPLATES, ...VEHICLE_BATCH1_TEMPLATES, ...VEHICLE_BATCH2_TEMPLATES,
      ...VEHICLE_BATCH3_TEMPLATES, ...VEHICLE_BATCH4_TEMPLATES, ...VEHICLE_BATCH5_TEMPLATES,
    },
    schemes: {
      ...VEHICLE_COLOR_SCHEMES, ...VEHICLE_BATCH1_COLOR_SCHEMES, ...VEHICLE_BATCH2_COLOR_SCHEMES,
      ...VEHICLE_BATCH3_COLOR_SCHEMES, ...VEHICLE_BATCH4_COLOR_SCHEMES, ...VEHICLE_BATCH5_COLOR_SCHEMES,
    },
  },

  // 10. Modern Tech
  {
    label: 'Modern Tech',
    emoji: '\u{1F4BB}',
    templates: {
      ...MODERN_TECH_TEMPLATES,
      ...MODERN_TECH_BATCH1_TEMPLATES, ...MODERN_TECH_BATCH2_TEMPLATES,
      ...MODERN_TECH_BATCH3_TEMPLATES, ...MODERN_TECH_BATCH4_TEMPLATES,
    },
    schemes: {
      ...MODERN_TECH_COLOR_SCHEMES,
      ...MODERN_TECH_BATCH1_COLOR_SCHEMES, ...MODERN_TECH_BATCH2_COLOR_SCHEMES,
      ...MODERN_TECH_BATCH3_COLOR_SCHEMES, ...MODERN_TECH_BATCH4_COLOR_SCHEMES,
    },
  },

  // 11. Retro Tech
  {
    label: 'Retro Tech',
    emoji: '\u{1F4FA}',
    templates: {
      ...RETRO_TECH_TEMPLATES,
      ...RETRO_TECH_BATCH1_TEMPLATES, ...RETRO_TECH_BATCH2_TEMPLATES,
      ...RETRO_TECH_BATCH3_TEMPLATES, ...RETRO_TECH_BATCH4_TEMPLATES,
      ...pick(COZY_SHOP_UI_TEMPLATES, COZY_SHOP_GAMING_KEYS),
    },
    schemes: {
      ...RETRO_TECH_COLOR_SCHEMES,
      ...RETRO_TECH_BATCH1_COLOR_SCHEMES, ...RETRO_TECH_BATCH2_COLOR_SCHEMES,
      ...RETRO_TECH_BATCH3_COLOR_SCHEMES, ...RETRO_TECH_BATCH4_COLOR_SCHEMES,
      ...COZY_SHOP_UI_COLOR_SCHEMES,
    },
  },

  // 12. Library Cozy
  {
    label: 'Library Cozy',
    emoji: '\u{1F4DA}',
    templates: { ...LIBRARY_BATCH1_TEMPLATES, ...LIBRARY_BATCH2_TEMPLATES, ...LIBRARY_BATCH3_TEMPLATES, ...LIBRARY_BATCH4_TEMPLATES, ...LIBRARY_BATCH5_TEMPLATES },
    schemes: { ...LIBRARY_BATCH1_COLOR_SCHEMES, ...LIBRARY_BATCH2_COLOR_SCHEMES, ...LIBRARY_BATCH3_COLOR_SCHEMES, ...LIBRARY_BATCH4_COLOR_SCHEMES, ...LIBRARY_BATCH5_COLOR_SCHEMES },
  },

  // 13. Lo-Fi Study
  {
    label: 'Lo-Fi Study',
    emoji: '\u{1F3A7}',
    templates: { ...LOFI_BATCH1_TEMPLATES, ...LOFI_BATCH2_TEMPLATES, ...LOFI_BATCH3_TEMPLATES },
    schemes: { ...LOFI_BATCH1_COLOR_SCHEMES, ...LOFI_BATCH2_COLOR_SCHEMES, ...LOFI_BATCH3_COLOR_SCHEMES },
  },

  // 14. Music & Instruments
  {
    label: 'Music & Instruments',
    emoji: '\u{1F3B5}',
    templates: { ...MUSIC_BATCH1_TEMPLATES, ...MUSIC_BATCH2_TEMPLATES, ...MUSIC_BATCH3_TEMPLATES, ...MUSIC_BATCH4_TEMPLATES, ...MUSIC_BATCH5_TEMPLATES },
    schemes: { ...MUSIC_BATCH1_COLOR_SCHEMES, ...MUSIC_BATCH2_COLOR_SCHEMES, ...MUSIC_BATCH3_COLOR_SCHEMES, ...MUSIC_BATCH4_COLOR_SCHEMES, ...MUSIC_BATCH5_COLOR_SCHEMES },
  },

  // 15. Crafting & Workshop
  {
    label: 'Crafting & Workshop',
    emoji: '\u{2697}\u{FE0F}',
    templates: { ...CRAFTING_BATCH1_TEMPLATES, ...CRAFTING_BATCH2_TEMPLATES, ...CRAFTING_BATCH3_TEMPLATES, ...CRAFTING_BATCH4_TEMPLATES, ...CRAFTING_BATCH5_TEMPLATES },
    schemes: { ...CRAFTING_BATCH1_COLOR_SCHEMES, ...CRAFTING_BATCH2_COLOR_SCHEMES, ...CRAFTING_BATCH3_COLOR_SCHEMES, ...CRAFTING_BATCH4_COLOR_SCHEMES, ...CRAFTING_BATCH5_COLOR_SCHEMES },
  },

  // 16. Weapons, Staffs & Bows
  {
    label: 'Weapons, Staffs & Bows',
    emoji: '\u{1F5E1}\u{FE0F}',
    templates: { ...WEAPON_STAFF_BATCH1_TEMPLATES, ...WEAPON_STAFF_BATCH2_TEMPLATES, ...WEAPON_STAFF_BATCH3_TEMPLATES, ...WEAPON_STAFF_BATCH4_TEMPLATES, ...WEAPON_STAFF_BATCH5_TEMPLATES },
    schemes: { ...WEAPON_STAFF_BATCH1_COLOR_SCHEMES, ...WEAPON_STAFF_BATCH2_COLOR_SCHEMES, ...WEAPON_STAFF_BATCH3_COLOR_SCHEMES, ...WEAPON_STAFF_BATCH4_COLOR_SCHEMES, ...WEAPON_STAFF_BATCH5_COLOR_SCHEMES },
  },

  // 17. Armor & Equipment
  {
    label: 'Armor & Equipment',
    emoji: '\u{1F6E1}\u{FE0F}',
    templates: { ...ARMOR_HELMETS_TEMPLATES, ...ARMOR_CHEST_TEMPLATES, ...ARMOR_ARMS_TEMPLATES, ...ARMOR_LEGS_TEMPLATES, ...ARMOR_SHIELDS_TEMPLATES },
    schemes: { ...ARMOR_HELMETS_COLOR_SCHEMES, ...ARMOR_CHEST_COLOR_SCHEMES, ...ARMOR_ARMS_COLOR_SCHEMES, ...ARMOR_LEGS_COLOR_SCHEMES, ...ARMOR_SHIELDS_COLOR_SCHEMES },
  },

  // 18. Super UI/UX
  {
    label: 'Super UI/UX',
    emoji: '\u{1F3A8}',
    templates: { ...SUPER_UI_BATCH1_TEMPLATES, ...SUPER_UI_BATCH2_TEMPLATES, ...SUPER_UI_BATCH3_TEMPLATES, ...SUPER_UI_BATCH4_TEMPLATES, ...SUPER_UI_BATCH5_TEMPLATES },
    schemes: { ...SUPER_UI_BATCH1_COLOR_SCHEMES, ...SUPER_UI_BATCH2_COLOR_SCHEMES, ...SUPER_UI_BATCH3_COLOR_SCHEMES, ...SUPER_UI_BATCH4_COLOR_SCHEMES, ...SUPER_UI_BATCH5_COLOR_SCHEMES },
  },

  // 19. Bakery & Pastry (new batches + curated picks from food/cozy)
  {
    label: 'Bakery & Pastry',
    emoji: '\u{1F9C1}',
    templates: {
      ...BAKERY_BATCH1_TEMPLATES, ...BAKERY_BATCH2_TEMPLATES, ...BAKERY_BATCH3_TEMPLATES, ...BAKERY_BATCH4_TEMPLATES, ...BAKERY_BATCH5_TEMPLATES,
      ...pick(FOOD_TEMPLATES, EXISTING_BAKERY_FOOD_KEYS),
      ...pick(FOOD_BATCH1_TEMPLATES, EXISTING_BAKERY_FOOD1_KEYS),
      ...pick(FOOD_BATCH2_TEMPLATES, EXISTING_BAKERY_FOOD2_KEYS),
      ...pick(FOOD_BATCH4_TEMPLATES, EXISTING_BAKERY_FOOD4_KEYS),
      ...pick(FOOD_BATCH5_TEMPLATES, EXISTING_BAKERY_FOOD5_KEYS),
      ...pick(COZY_BATCH1_TEMPLATES, EXISTING_BAKERY_COZY1_KEYS),
      ...pick(COZY_BATCH2_TEMPLATES, EXISTING_BAKERY_COZY2_KEYS),
      ...pick(COZY_BATCH3_TEMPLATES, EXISTING_BAKERY_COZY3_KEYS),
    },
    schemes: {
      ...BAKERY_BATCH1_COLOR_SCHEMES, ...BAKERY_BATCH2_COLOR_SCHEMES, ...BAKERY_BATCH3_COLOR_SCHEMES, ...BAKERY_BATCH4_COLOR_SCHEMES, ...BAKERY_BATCH5_COLOR_SCHEMES,
      ...FOOD_COLOR_SCHEMES, ...FOOD_BATCH1_COLOR_SCHEMES, ...FOOD_BATCH2_COLOR_SCHEMES, ...FOOD_BATCH4_COLOR_SCHEMES, ...FOOD_BATCH5_COLOR_SCHEMES,
      ...COZY_BATCH1_COLOR_SCHEMES, ...COZY_BATCH2_COLOR_SCHEMES, ...COZY_BATCH3_COLOR_SCHEMES,
    },
  },

  // 20. Fruits & Vegetables
  {
    label: 'Fruits & Vegetables',
    emoji: '\u{1F34E}',
    templates: { ...FRUITS_BATCH1_TEMPLATES, ...FRUITS_BATCH2_TEMPLATES, ...VEGGIES_BATCH1_TEMPLATES, ...VEGGIES_BATCH2_TEMPLATES, ...VEGGIES_BATCH3_TEMPLATES },
    schemes: { ...FRUITS_BATCH1_COLOR_SCHEMES, ...FRUITS_BATCH2_COLOR_SCHEMES, ...VEGGIES_BATCH1_COLOR_SCHEMES, ...VEGGIES_BATCH2_COLOR_SCHEMES, ...VEGGIES_BATCH3_COLOR_SCHEMES },
  },

  // 21. Yatai Simulator
  {
    label: 'Yatai Simulator',
    emoji: '\u{1F35C}',
    templates: { ...YATAI_BATCH1_TEMPLATES, ...YATAI_BATCH2_TEMPLATES, ...YATAI_BATCH3_TEMPLATES, ...YATAI_BATCH4_TEMPLATES, ...YATAI_BATCH5_TEMPLATES },
    schemes: { ...YATAI_BATCH1_COLOR_SCHEMES, ...YATAI_BATCH2_COLOR_SCHEMES, ...YATAI_BATCH3_COLOR_SCHEMES, ...YATAI_BATCH4_COLOR_SCHEMES, ...YATAI_BATCH5_COLOR_SCHEMES },
  },

  // 22. Mangaka Simulator
  {
    label: 'Mangaka Simulator',
    emoji: '\u{270F}\u{FE0F}',
    templates: { ...MANGAKA_BATCH1_TEMPLATES, ...MANGAKA_BATCH2_TEMPLATES, ...MANGAKA_BATCH3_TEMPLATES, ...MANGAKA_BATCH4_TEMPLATES, ...MANGAKA_BATCH5_TEMPLATES },
    schemes: { ...MANGAKA_BATCH1_COLOR_SCHEMES, ...MANGAKA_BATCH2_COLOR_SCHEMES, ...MANGAKA_BATCH3_COLOR_SCHEMES, ...MANGAKA_BATCH4_COLOR_SCHEMES, ...MANGAKA_BATCH5_COLOR_SCHEMES },
  },

  // 23. Tokyo Life (batch 2-6 only)
  {
    label: 'Tokyo Life',
    emoji: '\u{1F5FC}',
    templates: { ...TOKYO_BATCH2_TEMPLATES, ...TOKYO_BATCH3_TEMPLATES, ...TOKYO_BATCH4_TEMPLATES, ...TOKYO_BATCH5_TEMPLATES, ...TOKYO_BATCH6_TEMPLATES },
    schemes: { ...TOKYO_BATCH2_COLOR_SCHEMES, ...TOKYO_BATCH3_COLOR_SCHEMES, ...TOKYO_BATCH4_COLOR_SCHEMES, ...TOKYO_BATCH5_COLOR_SCHEMES, ...TOKYO_BATCH6_COLOR_SCHEMES },
  },

  // 24. Pixel Arsenal
  {
    label: 'Pixel Arsenal',
    emoji: '\u{1F3F9}',
    templates: { ...GUNS_BATCH1_TEMPLATES, ...GUNS_BATCH2_TEMPLATES, ...GUNS_BATCH3_TEMPLATES, ...GUNS_BATCH4_TEMPLATES, ...GUNS_BATCH5_TEMPLATES },
    schemes: { ...GUNS_BATCH1_COLOR_SCHEMES, ...GUNS_BATCH2_COLOR_SCHEMES, ...GUNS_BATCH3_COLOR_SCHEMES, ...GUNS_BATCH4_COLOR_SCHEMES, ...GUNS_BATCH5_COLOR_SCHEMES },
  },

  // 25. Medieval Scholar
  {
    label: 'Medieval Scholar',
    emoji: '\u{1F4D6}',
    templates: { ...LIBERAL_ARTS_BATCH1_TEMPLATES, ...LIBERAL_ARTS_BATCH2_TEMPLATES, ...LIBERAL_ARTS_BATCH3_TEMPLATES, ...LIBERAL_ARTS_BATCH4_TEMPLATES, ...LIBERAL_ARTS_BATCH5_TEMPLATES },
    schemes: { ...LIBERAL_ARTS_BATCH1_COLOR_SCHEMES, ...LIBERAL_ARTS_BATCH2_COLOR_SCHEMES, ...LIBERAL_ARTS_BATCH3_COLOR_SCHEMES, ...LIBERAL_ARTS_BATCH4_COLOR_SCHEMES, ...LIBERAL_ARTS_BATCH5_COLOR_SCHEMES },
  },

  // 26. Dungeon Tileset (16x16)
  {
    label: 'Dungeon Tileset',
    emoji: '\u{1F9F1}',
    templates: { ...DUNGEON_TILES_BATCH1_TEMPLATES, ...DUNGEON_TILES_BATCH2_TEMPLATES, ...DUNGEON_TILES_BATCH3_TEMPLATES, ...DUNGEON_TILES_BATCH4_TEMPLATES, ...DUNGEON_TILES_BATCH5_TEMPLATES },
    schemes: { ...DUNGEON_TILES_BATCH1_COLOR_SCHEMES, ...DUNGEON_TILES_BATCH2_COLOR_SCHEMES, ...DUNGEON_TILES_BATCH3_COLOR_SCHEMES, ...DUNGEON_TILES_BATCH4_COLOR_SCHEMES, ...DUNGEON_TILES_BATCH5_COLOR_SCHEMES },
  },

  // ── 32x32 bundles ─────────────────────────────────────────────

  // 27. Roguelike Weapons 32
  {
    label: 'Roguelike Weapons 32',
    emoji: '\u{2694}\u{FE0F}',
    templates: { ...ROGUELIKE_SWORDS_32_TEMPLATES, ...ROGUELIKE_SHIELDS_32_TEMPLATES, ...ROGUELIKE_BOWS_32_TEMPLATES, ...ROGUELIKE_STAFFS_32_TEMPLATES, ...ROGUELIKE_EXOTIC_32_TEMPLATES },
    schemes: { ...ROGUELIKE_SWORDS_32_COLOR_SCHEMES, ...ROGUELIKE_SHIELDS_32_COLOR_SCHEMES, ...ROGUELIKE_BOWS_32_COLOR_SCHEMES, ...ROGUELIKE_STAFFS_32_COLOR_SCHEMES, ...ROGUELIKE_EXOTIC_32_COLOR_SCHEMES },
  },

  // 28. Dungeon Props 32
  {
    label: 'Dungeon Props 32',
    emoji: '\u{1F3DB}\u{FE0F}',
    templates: { ...DUNGEON_STORAGE_32_TEMPLATES, ...DUNGEON_LIGHTS_32_TEMPLATES, ...DUNGEON_PICKUPS_32_TEMPLATES, ...DUNGEON_INTERACTIVE_32_TEMPLATES, ...DUNGEON_DECOR_32_TEMPLATES },
    schemes: { ...DUNGEON_STORAGE_32_COLOR_SCHEMES, ...DUNGEON_LIGHTS_32_COLOR_SCHEMES, ...DUNGEON_PICKUPS_32_COLOR_SCHEMES, ...DUNGEON_INTERACTIVE_32_COLOR_SCHEMES, ...DUNGEON_DECOR_32_COLOR_SCHEMES },
  },

  // 29. Cozy Consumables 32
  {
    label: 'Cozy Consumables 32',
    emoji: '\u{1F9EA}',
    templates: { ...COZY_POTIONS_32_TEMPLATES, ...COZY_BOOKS_32_TEMPLATES, ...COZY_COFFEE_32_TEMPLATES, ...COZY_RAMEN_32_TEMPLATES, ...COZY_FOOD_32_TEMPLATES },
    schemes: { ...COZY_POTIONS_32_COLOR_SCHEMES, ...COZY_BOOKS_32_COLOR_SCHEMES, ...COZY_COFFEE_32_COLOR_SCHEMES, ...COZY_RAMEN_32_COLOR_SCHEMES, ...COZY_FOOD_32_COLOR_SCHEMES },
  },

  // 30. RPG UI 32
  {
    label: 'RPG UI 32',
    emoji: '\u{1F5BC}\u{FE0F}',
    templates: { ...RPG_BARS_32_TEMPLATES, ...RPG_STATUS_32_TEMPLATES, ...RPG_SLOTS_32_TEMPLATES, ...RPG_BUTTONS_32_TEMPLATES, ...RPG_HUD_32_TEMPLATES },
    schemes: { ...RPG_BARS_32_COLOR_SCHEMES, ...RPG_STATUS_32_COLOR_SCHEMES, ...RPG_SLOTS_32_COLOR_SCHEMES, ...RPG_BUTTONS_32_COLOR_SCHEMES, ...RPG_HUD_32_COLOR_SCHEMES },
  },

  // 31. Medieval Scholar 32
  {
    label: 'Medieval Scholar 32',
    emoji: '\u{1F393}',
    templates: { ...LIBERAL_ARTS_32_BATCH1_TEMPLATES, ...LIBERAL_ARTS_32_BATCH2_TEMPLATES, ...LIBERAL_ARTS_32_BATCH3_TEMPLATES, ...LIBERAL_ARTS_32_BATCH4_TEMPLATES, ...LIBERAL_ARTS_32_BATCH5_TEMPLATES },
    schemes: { ...LIBERAL_ARTS_32_BATCH1_COLOR_SCHEMES, ...LIBERAL_ARTS_32_BATCH2_COLOR_SCHEMES, ...LIBERAL_ARTS_32_BATCH3_COLOR_SCHEMES, ...LIBERAL_ARTS_32_BATCH4_COLOR_SCHEMES, ...LIBERAL_ARTS_32_BATCH5_COLOR_SCHEMES },
  },

  // 32. Game Icons 32
  {
    label: 'Game Icons 32',
    emoji: '\u{1F3AE}',
    templates: { ...GAME_ICONS_32_BATCH1_TEMPLATES, ...GAME_ICONS_32_BATCH2_TEMPLATES, ...GAME_ICONS_32_BATCH3_TEMPLATES, ...GAME_ICONS_32_BATCH4_TEMPLATES, ...GAME_ICONS_32_BATCH5_TEMPLATES },
    schemes: { ...GAME_ICONS_32_BATCH1_COLOR_SCHEMES, ...GAME_ICONS_32_BATCH2_COLOR_SCHEMES, ...GAME_ICONS_32_BATCH3_COLOR_SCHEMES, ...GAME_ICONS_32_BATCH4_COLOR_SCHEMES, ...GAME_ICONS_32_BATCH5_COLOR_SCHEMES },
  },

  // 33. Retro Computing 32
  {
    label: 'Retro Computing 32',
    emoji: '\u{1F4BE}',
    templates: { ...RETRO_COMPUTING_32_BATCH1_TEMPLATES, ...RETRO_COMPUTING_32_BATCH2_TEMPLATES, ...RETRO_COMPUTING_32_BATCH3_TEMPLATES, ...RETRO_COMPUTING_32_BATCH4_TEMPLATES, ...RETRO_COMPUTING_32_BATCH5_TEMPLATES, ...RETRO_COMPUTING_32_FIX_TEMPLATES },
    schemes: { ...RETRO_COMPUTING_32_BATCH1_COLOR_SCHEMES, ...RETRO_COMPUTING_32_BATCH2_COLOR_SCHEMES, ...RETRO_COMPUTING_32_BATCH3_COLOR_SCHEMES, ...RETRO_COMPUTING_32_BATCH4_COLOR_SCHEMES, ...RETRO_COMPUTING_32_BATCH5_COLOR_SCHEMES, ...RETRO_COMPUTING_32_FIX_COLOR_SCHEMES },
  },

  // 34. Dungeon Creatures 32
  {
    label: 'Dungeon Creatures 32',
    emoji: '\u{1F432}',
    templates: { ...DUNGEON_CREATURES_32_BATCH1_TEMPLATES, ...DUNGEON_CREATURES_32_BATCH2_TEMPLATES, ...DUNGEON_CREATURES_32_BATCH3_TEMPLATES, ...DUNGEON_CREATURES_32_BATCH4_TEMPLATES, ...DUNGEON_CREATURES_32_BATCH5_TEMPLATES },
    schemes: { ...DUNGEON_CREATURES_32_BATCH1_COLOR_SCHEMES, ...DUNGEON_CREATURES_32_BATCH2_COLOR_SCHEMES, ...DUNGEON_CREATURES_32_BATCH3_COLOR_SCHEMES, ...DUNGEON_CREATURES_32_BATCH4_COLOR_SCHEMES, ...DUNGEON_CREATURES_32_BATCH5_COLOR_SCHEMES },
  },
];

// ─── Helpers ─────────────────────────────────────────────────

function slugify(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function uniqueRoles(t: any): string[] {
  const roles = new Set<string>();
  for (const r of t.regions ?? []) roles.add(r.role);
  return [...roles];
}

// ─── Main ────────────────────────────────────────────────────

const outBase = path.resolve(__dirname, '..', 'public', 'sprites');
const atlasDir = path.join(outBase, 'atlases');
const dataDir = path.join(outBase, 'data');

// Clean
if (fs.existsSync(outBase)) fs.rmSync(outBase, { recursive: true });
fs.mkdirSync(atlasDir, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

const ATLAS_COLS = 10;
const SCALE_16 = 4; // 16x16 → 64x64 thumb
const SCALE_32 = 2; // 32x32 → 64x64 thumb
const THUMB_SIZE = 64;

let totalTemplates = 0;
let totalErrors = 0;

interface CatalogCategory {
  slug: string;
  label: string;
  emoji: string;
  count: number;
  sizes: number[];
}

interface CatalogTemplate {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  roles: string[];
  description: string;
}

const catalogCategories: CatalogCategory[] = [];
const catalogTemplates: CatalogTemplate[] = [];

for (const cat of CATEGORIES) {
  const slug = slugify(cat.label);
  const names = Object.keys(cat.templates);
  if (names.length === 0) continue;

  console.log(`\n[${cat.emoji} ${cat.label}] ${names.length} templates...`);

  const sizes = new Set<number>();
  const catTemplateData: Record<string, any> = {};
  const catSchemeData: Record<string, any> = {};

  // Collect schemes relevant to this category's templates
  for (const name of names) {
    const t = cat.templates[name];
    const w = t.width ?? 16;
    sizes.add(w);

    catTemplateData[name] = t;

    // Find scheme with fallback chain
    const d1 = name.replace(/_\d+$/, '_default');
    const d2 = name.replace(/_(walk|idle|attack|hurt)_\d+$/, '_default');
    for (const key of [d1, d2, name + '_default', name]) {
      if (cat.schemes[key]) catSchemeData[key] = cat.schemes[key];
    }

    catalogTemplates.push({
      id: name,
      name: t.name ?? name,
      category: slug,
      width: w,
      height: t.height ?? w,
      roles: uniqueRoles(t),
      description: t.description ?? '',
    });
  }

  catalogCategories.push({
    slug,
    label: cat.label,
    emoji: cat.emoji,
    count: names.length,
    sizes: [...sizes].sort(),
  });

  // Write category data JSON
  fs.writeFileSync(
    path.join(dataDir, `${slug}.json`),
    JSON.stringify({ templates: catTemplateData, schemes: catSchemeData }),
  );

  // Generate atlas PNG
  const rows = Math.ceil(names.length / ATLAS_COLS);
  const atlasWidth = ATLAS_COLS * THUMB_SIZE;
  const atlasHeight = rows * THUMB_SIZE;
  const png = new PNG({ width: atlasWidth, height: atlasHeight });

  const atlasLayout: Array<{ id: string; x: number; y: number; w: number; h: number }> = [];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const t = cat.templates[name];
    const w = t.width ?? 16;
    const h = t.height ?? w;
    const scale = w >= 32 ? SCALE_32 : SCALE_16;

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
        totalErrors++;
        deleteProject(project.id);
        continue;
      }

      const composited = compositeProject(project);
      const col = i % ATLAS_COLS;
      const row = Math.floor(i / ATLAS_COLS);
      const ox = col * THUMB_SIZE;
      const oy = row * THUMB_SIZE;

      // Nearest-neighbor upscale into atlas
      for (let py = 0; py < h * scale; py++) {
        for (let px = 0; px < w * scale; px++) {
          const srcX = Math.floor(px / scale);
          const srcY = Math.floor(py / scale);
          const pixel = composited.getPixel(srcX, srcY);
          if (pixel.a === 0) continue;

          const dx = ox + px;
          const dy = oy + py;
          if (dx >= atlasWidth || dy >= atlasHeight) continue;

          const idx = (dy * atlasWidth + dx) * 4;
          png.data[idx] = pixel.r;
          png.data[idx + 1] = pixel.g;
          png.data[idx + 2] = pixel.b;
          png.data[idx + 3] = pixel.a;
        }
      }

      atlasLayout.push({ id: name, x: ox, y: oy, w: THUMB_SIZE, h: THUMB_SIZE });
      deleteProject(project.id);
      totalTemplates++;
      process.stdout.write('.');
    } catch (err: any) {
      totalErrors++;
      process.stdout.write('!');
    }
  }

  // Write atlas PNG
  fs.writeFileSync(path.join(atlasDir, `${slug}.png`), PNG.sync.write(png));
  // Write atlas layout JSON
  fs.writeFileSync(path.join(atlasDir, `${slug}.json`), JSON.stringify(atlasLayout));
}

// Write catalog.json
fs.writeFileSync(
  path.join(outBase, 'catalog.json'),
  JSON.stringify({ categories: catalogCategories, templates: catalogTemplates }),
);

console.log(`\n\n✅ Done! ${totalTemplates} templates exported, ${totalErrors} errors`);
console.log(`📁 Output: public/sprites/`);
console.log(`   catalog.json (${catalogCategories.length} categories, ${catalogTemplates.length} templates)`);
console.log(`   atlases/ (${catalogCategories.length} PNGs + JSONs)`);
console.log(`   data/ (${catalogCategories.length} category data files)`);
