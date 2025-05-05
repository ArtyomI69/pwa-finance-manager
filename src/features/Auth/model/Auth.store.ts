import { createStore, createEffect, sample, createEvent, scopeBind } from 'effector';
import { Session } from '@supabase/supabase-js';
import { getSession, onAuthStateChange } from '@/shared/API/supabase';
import { createGate } from 'effector-react';
import { debug } from 'patronum/debug';

const AuthGate = createGate();

const onAuthStateChangeEv = createEvent<Session | null>();

const $inited = createStore<Boolean>(false);
const $session = createStore<Session | null>(null);

const getSessionFx = createEffect(async () => {
  return await getSession();
});

const onAuthStateChangeFx = createEffect(async () => {
  const sciopeOnAuthStateChangeEv = scopeBind(onAuthStateChangeEv);

  onAuthStateChange((_, session) => {
    console.log(session);
    sciopeOnAuthStateChangeEv(session);
  });
});

sample({ clock: AuthGate.open, target: [getSessionFx, onAuthStateChangeFx] });

sample({
  clock: getSessionFx.done,
  target: $session,
  fn: ({
    result: {
      data: { session },
    },
  }) => session,
});

sample({
  clock: getSessionFx.done,
  target: $inited,
  fn: () => true,
});

sample({
  clock: onAuthStateChangeEv,
  target: $session,
});

debug($session, getSessionFx, onAuthStateChangeEv);

export { $inited, $session, AuthGate };
