import { Map, Placemark } from '@pbe/react-yandex-maps';
import { useState } from 'react';

export const ReceiptsMap = () => {
  const [coordinates, setCoordinates] = useState([55.751574, 37.573856]); // Москва по умолчанию

  // useEffect(() => {
  //   const getCoordinates = async () => {
  //     const response = await fetch(
  //       'https://geocode-maps.yandex.ru/1.x/?apikey=da69f6d8-f14f-4c6a-a65a-8093a117cfef&geocode=Москва+Красная+Площадь&format=json'
  //     );
  //     const result = await response.json();
  //     console.log(
  //       result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
  //         .split(' ')
  //         .reverse()
  //     );
  //     setCoordinates(
  //       result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
  //         .split(' ')
  //         .reverse()
  //     );
  //   };

  //   getCoordinates();
  // }, []);

  return (
    <Map
      className="flex-1"
      defaultState={{
        center: [55.751574, 37.573856],
        zoom: 11,
      }}
    >
      <Placemark
        geometry={coordinates}
        options={{
          iconColor: 'red',
          preset: 'islands#blueMoneyCircleIcon',
          balloonMinWidth: 200,
          openBalloonOnClick: true,
        }}
        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
        defaultProperties={{
          hintContent: 'Заголовок метки',
          iconCaption: 'Магазин',
          balloonContentHeader: 'Заголовок метки',
          balloonContentBody: `
              <div>
                <p>Описание метки</p>
                <button onClick={console.log('test')} id="myButton" style="padding: 5px 10px; background: blue; color: white; border: none; cursor: pointer;">
                  Нажми меня
                </button>
              </div>
            `,

          balloonContentFooter: 'Дополнительная информация',
        }}
      />
      <Placemark
        geometry={[55.784758, 37.738521]}
        options={{
          iconColor: 'red',
          preset: 'islands#blueMoneyCircleIcon',
          balloonMinWidth: 200,
          openBalloonOnClick: true,
        }}
        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
        defaultProperties={{
          hintContent: 'Заголовок метки',
          balloonContentHeader: 'Заголовок метки',
          balloonContentBody: 'Описание метки',
          balloonContentFooter: 'Дополнительная информация',
        }}
      />
    </Map>
  );
};
