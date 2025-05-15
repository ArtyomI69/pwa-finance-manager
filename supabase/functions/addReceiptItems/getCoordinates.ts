export const getCoordinates = async (geocode: string) => {
  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=${Deno.env.get(
      'YA_MAP_API_KEY'
    )}&geocode=${geocode}&format=json`
  );
  const result = await response.json();

  return {
    coordinates:
      result?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos
        ?.split(' ')
        .reverse() ?? null,
    address:
      result?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.text.replaceAll(
        'Россия, '
      ) ?? geocode.replaceAll('+', ' '),
  };
};
