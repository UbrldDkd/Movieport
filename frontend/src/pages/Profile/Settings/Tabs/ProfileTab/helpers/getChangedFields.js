export function getChangedFields(original, updated) {
  if (!original || !updated) return {};

  const changes = {};

  for (const key in updated) {
    if (updated[key] !== original[key]) {
      changes[key] = updated[key];
    }
  }

  return changes;
}
