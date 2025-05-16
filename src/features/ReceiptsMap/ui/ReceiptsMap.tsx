import { Map, Placemark } from '@pbe/react-yandex-maps';
import { useUnit } from 'effector-react';
import { $placeMarks } from '../model/ReceiptsMap.store';

export const ReceiptsMap = () => {
  const placeMarks = useUnit($placeMarks);

  return (
    <Map
      className="flex-1"
      defaultState={{
        center: [56.861346, 35.774553],
        zoom: 11,
      }}
    >
      {placeMarks.map((mark) => {
        const coords = mark.shop.coordinates.split(',');
        const shopName = mark.shop.name;
        const ballonContentBody = `
          <div>
          <p>Описание метки</p>
          <button onClick={console.log('test')} id="myButton" style="padding: 5px 10px; background: blue; color: white; border: none; cursor: pointer;">
          Нажми меня
          </button>
          </div>
          `;

        return (
          <Placemark
            key={shopName + coords}
            geometry={coords}
            options={{
              iconColor: 'red',
              preset: 'islands#blueMoneyCircleIcon',
              balloonMinWidth: 200,
              openBalloonOnClick: true,
            }}
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            defaultProperties={{
              hintContent: shopName,
              iconCaption: shopName,
              balloonContentHeader: shopName,
              balloonContentBody: ballonContentBody,

              balloonContentFooter: 'Дополнительная информация',
            }}
          />
        );
      })}
      {/* <Placemark
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
      /> */}
    </Map>
  );
};
