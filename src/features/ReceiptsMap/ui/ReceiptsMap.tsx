import { Map, Placemark } from '@pbe/react-yandex-maps';
import { useUnit } from 'effector-react';
import { $placeMarks, $center, $zoom } from '../model/ReceiptsMap.store';

export const ReceiptsMap = () => {
  const placeMarks = useUnit($placeMarks);
  const center = useUnit($center);
  const zoom = useUnit($zoom);

  return (
    <Map
      className="flex-1"
      state={{
        center: center,
        zoom,
      }}
    >
      {placeMarks.map((mark) => {
        const coords = mark.shop.coordinates.split(',');
        const shopName = mark.shop.name;
        const ballonContentBody = `
          <div>
          ${mark.items
            .map(
              (item) =>
                `<p>${item.name}; Кол-во/кг: ${item.quantity}; Цена: ${(item.sum / 100).toFixed(
                  0
                )}₽</p>`
            )
            .join('<p>-----</p>')}
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
