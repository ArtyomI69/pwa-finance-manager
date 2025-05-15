export const formatCoordinatesForDb = (coords: [string, string]) => {
  if (!coords) return null;

  return coords.join(', ');
};
