import { GroupedShop } from '@/shared/types/shopGroup';
import { createEvent, createStore, sample } from 'effector';

const setPlaceMarks = createEvent<GroupedShop[]>();

const $placeMarks = createStore<GroupedShop[]>([]);

sample({
  clock: setPlaceMarks,
  target: $placeMarks,
});

export { $placeMarks, setPlaceMarks };
