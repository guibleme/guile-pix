/**
 * Batch-export ALL 16x16 MCP templates as PNG files for visual review.
 *
 * Usage: cd mcp-server && npx tsx scripts/exportAllTemplates.ts
 *
 * Output: mcp-server/output/template-gallery/
 *   ├── 16x16/
 *   │   ├── knight_16.png
 *   │   └── ...
 *   └── index.html   (visual gallery page)
 */

import * as fs from 'fs';
import * as path from 'path';
import { createProject, deleteProject } from '../src/project.js';
import { handleDrawTemplate } from '../src/tools/templateTools.js';
import { renderProjectToPng } from '../src/render.js';

// Import ALL 16x16 template registries
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
import { DUNGEON_BATCH1_TEMPLATES } from '../src/templates/dungeonVariety.js';
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
import { CHARACTER_BATCH2_TEMPLATES } from '../src/templates/charactersVariety2.js';
import { CHARACTER_BATCH3_TEMPLATES } from '../src/templates/charactersVariety3.js';
import { GAME_INSPIRED_BATCH1_TEMPLATES } from '../src/templates/gameInspiredVariety.js';
import { CHAR_VARIANT_BATCH1_TEMPLATES } from '../src/templates/charVariantsNew.js';
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
import { FOOD_BATCH5_TEMPLATES } from '../src/templates/foodVariety5.js';
import { COZY_BATCH3_TEMPLATES } from '../src/templates/cozyVariety3.js';
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
import { TOKYO_BATCH1_TEMPLATES } from '../src/templates/tokyoCityVariety.js';
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
import { PRO_SHOWCASE_TEMPLATES } from '../src/templates/_proShowcase.js';
import { PRO_PROPS_TEMPLATES } from '../src/templates/_proProps.js';
import { RPG_TEST_TEMPLATES } from '../src/templates/_rpgTest.js';
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

// Group templates by category
const CATEGORIES: Record<string, Record<string, any>> = {
  'Characters': { ...TEMPLATES, ...CHARACTER_BATCH1_TEMPLATES, ...CHARACTER_BATCH2_TEMPLATES, ...CHARACTER_BATCH3_TEMPLATES },
  'Character Variants': { ...CHARACTER_VARIANT_TEMPLATES, ...CHAR_VARIANT_BATCH1_TEMPLATES },
  'NPCs': NPC_TEMPLATES,
  'Creatures': { ...CREATURE_TEMPLATES, ...CREATURE_BATCH1_TEMPLATES, ...CREATURE_BATCH2_TEMPLATES, ...CREATURE_BATCH3_TEMPLATES },
  'Enemies': { ...ENEMY_TEMPLATES, ...ENEMY_BATCH1_TEMPLATES, ...ENEMY_BATCH2_TEMPLATES, ...ENEMY_BATCH3_TEMPLATES },
  'Bosses': { ...BOSS_TEMPLATES, ...BOSS_BATCH1_TEMPLATES, ...BOSS_BATCH2_TEMPLATES },
  'Game-Inspired': { ...GAME_TEMPLATES, ...GAME_INSPIRED_BATCH1_TEMPLATES },
  'Animation Frames': ANIMATION_16_TEMPLATES,
  'Items': { ...ITEM_TEMPLATES, ...ITEM_VARIETY_TEMPLATES, ...ITEM_BATCH2_TEMPLATES },
  'Equipment': { ...EQUIPMENT_TEMPLATES, ...EQUIPMENT_VARIETY_TEMPLATES, ...EQUIPMENT_BATCH2_TEMPLATES, ...WEAPONS_CLASSIC_TEMPLATES },
  'Food': { ...FOOD_TEMPLATES, ...FOOD_BATCH1_TEMPLATES, ...FOOD_BATCH2_TEMPLATES, ...FOOD_BATCH3_TEMPLATES, ...FOOD_BATCH4_TEMPLATES, ...FOOD_BATCH5_TEMPLATES },
  'Plants': { ...PLANT_TEMPLATES, ...PLANT_BATCH1_TEMPLATES },
  'Buildings': { ...BUILDING_TEMPLATES, ...BUILDING_BATCH1_TEMPLATES, ...BUILDING_BATCH2_TEMPLATES, ...BUILDING_BATCH3_TEMPLATES, ...BUILDING_BATCH4_TEMPLATES, ...BUILDING_BATCH5_TEMPLATES },
  'Environment': { ...ENVIRONMENT_TEMPLATES, ...ENVIRONMENT_VARIETY_TEMPLATES },
  'Biomes': { ...BIOME_TEMPLATES, ...BIOME_VARIETY_TEMPLATES },
  'Dungeon': { ...DUNGEON_TEMPLATES, ...DUNGEON_BATCH1_TEMPLATES, ...DUNGEON_BATCH2_TEMPLATES },
  'Dungeon Tiles': { ...DUNGEON_TILES_BATCH1_TEMPLATES, ...DUNGEON_TILES_BATCH2_TEMPLATES, ...DUNGEON_TILES_BATCH3_TEMPLATES, ...DUNGEON_TILES_BATCH4_TEMPLATES, ...DUNGEON_TILES_BATCH5_TEMPLATES },
  'Furniture': { ...FURNITURE_TEMPLATES, ...FURNITURE_BATCH1_TEMPLATES, ...FURNITURE_BATCH2_TEMPLATES, ...FURNITURE_BATCH3_TEMPLATES },
  'Props': PROP_TEMPLATES,
  'Nature': { ...NATURE_TEMPLATES, ...NATURE_VARIETY_TEMPLATES },
  'Vehicles': { ...VEHICLE_TEMPLATES, ...VEHICLE_BATCH1_TEMPLATES, ...VEHICLE_BATCH2_TEMPLATES, ...VEHICLE_BATCH3_TEMPLATES, ...VEHICLE_BATCH4_TEMPLATES, ...VEHICLE_BATCH5_TEMPLATES },
  'UI Elements': { ...UI_TEMPLATES, ...COZY_SHOP_UI_TEMPLATES, ...UI_VARIETY_TEMPLATES },
  'RPG UI': { ...RPG_UI_TEMPLATES, ...RPG_UI_VARIETY_TEMPLATES, ...UI_BARS_TEMPLATES },
  'Cozy Life-Sim': { ...COZY_BATCH1_TEMPLATES, ...COZY_BATCH2_TEMPLATES, ...COZY_BATCH3_TEMPLATES, ...COZY_BATCH4_TEMPLATES },
  'Library Cozy': { ...LIBRARY_BATCH1_TEMPLATES, ...LIBRARY_BATCH2_TEMPLATES, ...LIBRARY_BATCH3_TEMPLATES, ...LIBRARY_BATCH4_TEMPLATES, ...LIBRARY_BATCH5_TEMPLATES },
  'Lo-Fi Study Cofi': { ...LOFI_BATCH1_TEMPLATES, ...LOFI_BATCH2_TEMPLATES, ...LOFI_BATCH3_TEMPLATES },
  'Effects': { ...EFFECT_TEMPLATES, ...EFFECT_BATCH1_TEMPLATES, ...EFFECT_BATCH2_TEMPLATES, ...EFFECT_BATCH3_TEMPLATES, ...EFFECT_BATCH4_TEMPLATES, ...EFFECT_BATCH5_TEMPLATES, ...EFFECT_BATCH6_TEMPLATES },
  'Modern Tech': { ...MODERN_TECH_TEMPLATES, ...MODERN_TECH_BATCH1_TEMPLATES, ...MODERN_TECH_BATCH2_TEMPLATES, ...MODERN_TECH_BATCH3_TEMPLATES, ...MODERN_TECH_BATCH4_TEMPLATES },
  'Retro Tech': { ...RETRO_TECH_TEMPLATES, ...RETRO_TECH_BATCH1_TEMPLATES, ...RETRO_TECH_BATCH2_TEMPLATES, ...RETRO_TECH_BATCH3_TEMPLATES, ...RETRO_TECH_BATCH4_TEMPLATES },
  'Music & Instruments': { ...MUSIC_BATCH1_TEMPLATES, ...MUSIC_BATCH2_TEMPLATES, ...MUSIC_BATCH3_TEMPLATES, ...MUSIC_BATCH4_TEMPLATES, ...MUSIC_BATCH5_TEMPLATES },
  'Crafting & Workshop': { ...CRAFTING_BATCH1_TEMPLATES, ...CRAFTING_BATCH2_TEMPLATES, ...CRAFTING_BATCH3_TEMPLATES, ...CRAFTING_BATCH4_TEMPLATES, ...CRAFTING_BATCH5_TEMPLATES },
  'Weapons Staffs & Bows': { ...WEAPON_STAFF_BATCH1_TEMPLATES, ...WEAPON_STAFF_BATCH2_TEMPLATES, ...WEAPON_STAFF_BATCH3_TEMPLATES, ...WEAPON_STAFF_BATCH4_TEMPLATES, ...WEAPON_STAFF_BATCH5_TEMPLATES },
  'Armor Helmets': ARMOR_HELMETS_TEMPLATES,
  'Armor Chest': ARMOR_CHEST_TEMPLATES,
  'Armor Arms': ARMOR_ARMS_TEMPLATES,
  'Armor Legs': ARMOR_LEGS_TEMPLATES,
  'Armor Shields & Accessories': ARMOR_SHIELDS_TEMPLATES,
  'Super UI/UX': { ...SUPER_UI_BATCH1_TEMPLATES, ...SUPER_UI_BATCH2_TEMPLATES, ...SUPER_UI_BATCH3_TEMPLATES, ...SUPER_UI_BATCH4_TEMPLATES, ...SUPER_UI_BATCH5_TEMPLATES },
  'Bakery & Pastry': { ...BAKERY_BATCH1_TEMPLATES, ...BAKERY_BATCH2_TEMPLATES, ...BAKERY_BATCH3_TEMPLATES, ...BAKERY_BATCH4_TEMPLATES, ...BAKERY_BATCH5_TEMPLATES },
  'Fruits & Vegetables': { ...FRUITS_BATCH1_TEMPLATES, ...FRUITS_BATCH2_TEMPLATES, ...VEGGIES_BATCH1_TEMPLATES, ...VEGGIES_BATCH2_TEMPLATES, ...VEGGIES_BATCH3_TEMPLATES },
  'Yatai Simulator': { ...YATAI_BATCH1_TEMPLATES, ...YATAI_BATCH2_TEMPLATES, ...YATAI_BATCH3_TEMPLATES, ...YATAI_BATCH4_TEMPLATES, ...YATAI_BATCH5_TEMPLATES },
  'Mangaka Simulator': { ...MANGAKA_BATCH1_TEMPLATES, ...MANGAKA_BATCH2_TEMPLATES, ...MANGAKA_BATCH3_TEMPLATES, ...MANGAKA_BATCH4_TEMPLATES, ...MANGAKA_BATCH5_TEMPLATES },
  'Tokyo City': { ...TOKYO_BATCH1_TEMPLATES, ...TOKYO_BATCH2_TEMPLATES, ...TOKYO_BATCH3_TEMPLATES, ...TOKYO_BATCH4_TEMPLATES, ...TOKYO_BATCH5_TEMPLATES, ...TOKYO_BATCH6_TEMPLATES },
  'Pixel Arsenal': { ...GUNS_BATCH1_TEMPLATES, ...GUNS_BATCH2_TEMPLATES, ...GUNS_BATCH3_TEMPLATES, ...GUNS_BATCH4_TEMPLATES, ...GUNS_BATCH5_TEMPLATES },
  'Medieval Scholar': { ...LIBERAL_ARTS_BATCH1_TEMPLATES, ...LIBERAL_ARTS_BATCH2_TEMPLATES, ...LIBERAL_ARTS_BATCH3_TEMPLATES, ...LIBERAL_ARTS_BATCH4_TEMPLATES, ...LIBERAL_ARTS_BATCH5_TEMPLATES },
  'Pro 32x32': { ...PRO_SHOWCASE_TEMPLATES, ...PRO_PROPS_TEMPLATES, ...RPG_TEST_TEMPLATES },
  'Roguelike Weapons 32x32': { ...ROGUELIKE_SWORDS_32_TEMPLATES, ...ROGUELIKE_SHIELDS_32_TEMPLATES, ...ROGUELIKE_BOWS_32_TEMPLATES, ...ROGUELIKE_STAFFS_32_TEMPLATES, ...ROGUELIKE_EXOTIC_32_TEMPLATES },
  'Dungeon Props 32x32': { ...DUNGEON_STORAGE_32_TEMPLATES, ...DUNGEON_LIGHTS_32_TEMPLATES, ...DUNGEON_PICKUPS_32_TEMPLATES, ...DUNGEON_INTERACTIVE_32_TEMPLATES, ...DUNGEON_DECOR_32_TEMPLATES },
  'Cozy Consumables 32x32': { ...COZY_POTIONS_32_TEMPLATES, ...COZY_BOOKS_32_TEMPLATES, ...COZY_COFFEE_32_TEMPLATES, ...COZY_RAMEN_32_TEMPLATES, ...COZY_FOOD_32_TEMPLATES },
  'RPG UI 32x32': { ...RPG_BARS_32_TEMPLATES, ...RPG_STATUS_32_TEMPLATES, ...RPG_SLOTS_32_TEMPLATES, ...RPG_BUTTONS_32_TEMPLATES, ...RPG_HUD_32_TEMPLATES },
  'Medieval Scholar 32x32': { ...LIBERAL_ARTS_32_BATCH1_TEMPLATES, ...LIBERAL_ARTS_32_BATCH2_TEMPLATES, ...LIBERAL_ARTS_32_BATCH3_TEMPLATES, ...LIBERAL_ARTS_32_BATCH4_TEMPLATES, ...LIBERAL_ARTS_32_BATCH5_TEMPLATES },
  'Game Icons 32x32': { ...GAME_ICONS_32_BATCH1_TEMPLATES, ...GAME_ICONS_32_BATCH2_TEMPLATES, ...GAME_ICONS_32_BATCH3_TEMPLATES, ...GAME_ICONS_32_BATCH4_TEMPLATES, ...GAME_ICONS_32_BATCH5_TEMPLATES },
  'Retro Computing 32x32': { ...RETRO_COMPUTING_32_BATCH1_TEMPLATES, ...RETRO_COMPUTING_32_BATCH2_TEMPLATES, ...RETRO_COMPUTING_32_BATCH3_TEMPLATES, ...RETRO_COMPUTING_32_BATCH4_TEMPLATES, ...RETRO_COMPUTING_32_BATCH5_TEMPLATES, ...RETRO_COMPUTING_32_FIX_TEMPLATES },
  'Dungeon Creatures 32x32': { ...DUNGEON_CREATURES_32_BATCH1_TEMPLATES, ...DUNGEON_CREATURES_32_BATCH2_TEMPLATES, ...DUNGEON_CREATURES_32_BATCH3_TEMPLATES, ...DUNGEON_CREATURES_32_BATCH4_TEMPLATES, ...DUNGEON_CREATURES_32_BATCH5_TEMPLATES },
};

// ─── Main ───────────────────────────────────────────────────

const SCALE = 8;
const outBase = path.resolve(import.meta.dirname, '..', 'output', 'template-gallery');
const dir16 = path.join(outBase, '16x16');
const dir32 = path.join(outBase, '32x32');

// Clean previous output
if (fs.existsSync(outBase)) fs.rmSync(outBase, { recursive: true });
fs.mkdirSync(dir16, { recursive: true });
fs.mkdirSync(dir32, { recursive: true });

let totalExported = 0;
const errors: string[] = [];

interface GalleryEntry {
  category: string;
  name: string;
  file: string;
}
const gallery: GalleryEntry[] = [];

for (const [category, templates] of Object.entries(CATEGORIES)) {
  const names = Object.keys(templates);
  console.log(`\n[${category}] ${names.length} templates...`);

  for (const name of names) {
    const t = templates[name];
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
        errors.push(`${name}: ${(result.content[0] as any).text}`);
        deleteProject(project.id);
        continue;
      }

      const pngBuffer = renderProjectToPng(project, SCALE);
      const sizeDir = w >= 32 ? '32x32' : '16x16';
      const outFile = path.join(outBase, sizeDir, `${name}.png`);
      fs.writeFileSync(outFile, pngBuffer);

      gallery.push({ category, name, file: `${sizeDir}/${name}.png` });
      totalExported++;
      process.stdout.write('.');

      deleteProject(project.id);
    } catch (err: any) {
      errors.push(`${name}: ${err.message}`);
    }
  }
}

// ─── Generate HTML gallery ──────────────────────────────────

const htmlSections = Object.keys(CATEGORIES).map(cat => {
  const entries = gallery.filter(g => g.category === cat);
  if (entries.length === 0) return '';
  const cards = entries.map(e => `
      <div class="card">
        <img src="${e.file}" alt="${e.name}" loading="lazy">
        <span class="label">${e.name}</span>
      </div>`).join('');
  return `
    <h2>${cat} (${entries.length})</h2>
    <div class="grid">${cards}
    </div>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DogSprite MCP Template Gallery — 16x16</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #1a1a2e; color: #e0e0e0; font-family: system-ui, sans-serif; padding: 2rem; }
    h1 { text-align: center; margin-bottom: 0.5rem; color: #f0c040; font-size: 2rem; }
    .subtitle { text-align: center; margin-bottom: 2rem; color: #888; }
    h2 { margin: 2rem 0 1rem; color: #90b0ff; border-bottom: 1px solid #333; padding-bottom: 0.5rem; }
    .grid { display: flex; flex-wrap: wrap; gap: 1rem; }
    .card {
      background: #252540;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      transition: border-color 0.2s;
    }
    .card:hover { border-color: #f0c040; }
    .card img {
      image-rendering: pixelated;
      width: 128px; height: 128px;
      object-fit: contain;
      background: repeating-conic-gradient(#333 0% 25%, #2a2a2a 0% 50%) 50% / 16px 16px;
      border-radius: 4px;
    }
    .card .label { font-size: 0.75rem; font-weight: 600; text-align: center; word-break: break-all; }
    .errors { background: #3a1515; padding: 1rem; border-radius: 8px; margin-top: 2rem; }
    .errors h3 { color: #ff6666; }
    .errors pre { font-size: 0.8rem; color: #cc8888; white-space: pre-wrap; }
  </style>
</head>
<body>
  <h1>DogSprite MCP Template Gallery — 16x16 Only</h1>
  <p class="subtitle">${totalExported} templates exported at ${SCALE}x scale · Focus: coherence & quality</p>
  ${htmlSections}
  ${errors.length > 0 ? `
  <div class="errors">
    <h3>${errors.length} errors:</h3>
    <pre>${errors.join('\\n')}</pre>
  </div>` : ''}
</body>
</html>`;

fs.writeFileSync(path.join(outBase, 'index.html'), html);

console.log(`\n\n✓ Exported ${totalExported} templates to ${outBase}`);
if (errors.length > 0) {
  console.log(`✗ ${errors.length} errors:`);
  errors.forEach(e => console.log(`  - ${e}`));
}
console.log(`\nOpen: ${path.join(outBase, 'index.html')}`);
