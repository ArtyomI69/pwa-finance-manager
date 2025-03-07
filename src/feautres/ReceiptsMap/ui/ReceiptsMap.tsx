import { Map, Placemark } from '@pbe/react-yandex-maps';

export const ReceiptsMap = () => {
  return (
    <Map
      className="flex-1"
      defaultState={{
        center: [55.751574, 37.573856],
        zoom: 11,
      }}
    >
      <Placemark
        geometry={[55.684758, 37.738521]}
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
