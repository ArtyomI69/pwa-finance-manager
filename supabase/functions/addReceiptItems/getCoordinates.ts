export const getCoordinates = async (geocode: string) => {
  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${Deno.env.get(
      'YA_API_KEY'
    )}&geocode=${geocode}&format=json`
  );
  const result = await response.json();

  return result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
    .split(' ')
    .reverse();
};
