export function ensureExists(entity, name) {
  if (!entity) throw new Error(`${name} no encontrado`);
  return entity;
}
