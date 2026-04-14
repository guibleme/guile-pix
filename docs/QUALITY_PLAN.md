# SpriteAI Quality Plan (LibreSprite-inspired)

Objetivo: llevar SpriteAI a calidad de editor profesional, manteniendo el enfoque local-first/offline.

## Patrones observados en LibreSprite

Referencias revisadas en `_reference/LibreSprite`:
- `src/app/commands/command.h`: comandos con `isEnabled`, `isChecked`, `execute`.
- `src/app/transaction.h`: operaciones atomicas agrupadas con commit/rollback.
- `src/app/document_undo.h`: historial con estado guardado y etiquetas de undo/redo.
- `src/app/crash/backup_observer.h`: backup/recovery en background.
- `src/doc/document_observer.h`: eventos finos por tipo de cambio.

## Aplicado en SpriteAI (esta iteracion)

- Capa central de comandos de editor:
  - `src/lib/editor/editorCommands.ts`
  - Unifica menu + atajos + precondiciones.
- Menu conectado a comandos centralizados:
  - `src/components/editor/MenuBar.tsx`
- Atajos conectados a la misma capa de comandos:
  - `src/hooks/useKeyboardShortcuts.ts`

Resultado: menos logica duplicada, menos riesgo de regresiones y mejor base para escalar funcionalidades.

## Proxima fase (prioridad alta)

1. Transacciones de edicion:
   - Introducir operaciones compuestas (e.g., duplicar capa + copiar datos + seleccionar) como una sola unidad de undo.
2. Dirty state real:
   - Estado `saved/modified` visible en UI y confirmacion al cerrar/cargar/nuevo proyecto.
3. Observadores/eventos:
   - Emitir eventos granulares para cambios (pixel, layer, frame, palette) y reducir renders completos.
4. Recovery robusto:
   - Versionar autosave, mantener multiples snapshots y fallback en corrupcion.

## Fase media

1. Test suite de nucleo:
   - tests de pixel transforms, exporters, undo/redo y compatibilidad de proyecto.
2. Compatibilidad de formatos:
   - import de metadata spritesheet Aseprite/LibreSprite + PNG (implementado como path estable en carga de proyecto).
3. Precision de timeline:
   - duracion por frame real en playback y export GIF.

## KPI de calidad sugeridos

- Cero errores en `npx tsc --noEmit`.
- Build estable en `npm run build`.
- Cobertura minima del nucleo (export, undo, transforms).
- Operaciones principales sin side effects (menu y atajos ejecutan el mismo comando).
