import { GroupedShop } from '@/shared/types/shopGroup';
import { createEvent, createStore, sample } from 'effector';
import { debug } from 'patronum/debug';

const setPlaceMarks = createEvent<GroupedShop[]>();
const setCenterMapEv = createEvent<number[]>();
const setZoomMapEv = createEvent();

const $placeMarks = createStore<GroupedShop[]>([]);
const $center = createStore<number[]>([56.861346, 35.774553]);
const $zoom = createStore<number>(11);

sample({
  clock: setPlaceMarks,
  target: $placeMarks,
});

sample({
  clock: setCenterMapEv,
  target: $center,
});

sample({
  clock: setZoomMapEv,
  fn: () => 17 + Math.random(),
  target: $zoom,
});

debug($center, $zoom);

export { $placeMarks, setPlaceMarks, $center, setCenterMapEv, $zoom, setZoomMapEv };
