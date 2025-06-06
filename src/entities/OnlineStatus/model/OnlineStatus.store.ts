import { debug } from 'patronum';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

const OnlineStatusGate = createGate();

const setOnlineStatusEv = createEvent<boolean>();

const $isOnline = createStore<boolean>(navigator.onLine);

const subscribeToOnlineStatusFx = createEffect(async () => {
  window.addEventListener('online', () => {
    setOnlineStatusEv(true);
  });

  window.addEventListener('offline', () => {
    setOnlineStatusEv(false);
  });
});

sample({
  clock: OnlineStatusGate.open,
  target: subscribeToOnlineStatusFx,
});

sample({
  clock: setOnlineStatusEv,
  target: $isOnline,
});

debug($isOnline);

export { $isOnline, OnlineStatusGate };
