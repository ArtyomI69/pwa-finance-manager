import { createStore, createEffect, sample, createEvent, scopeBind } from 'effector';
import { Session } from '@supabase/supabase-js';
import { getSession, onAuthStateChange } from '@/shared/API/supabase';
import { createGate } from 'effector-react';

const AuthGate = createGate();

const onAuthStateChangeEv = createEvent<Session | null>();

const $session = createStore<Session | null>(null);

const getSessionFx = createEffect(async () => {
  return await getSession();
});

const onAuthStateChangeFx = createEffect(async () => {
  const sciopeOnAuthStateChangeEv = scopeBind(onAuthStateChangeEv);

  onAuthStateChange((_event, session) => {
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
  clock: onAuthStateChangeEv,
  target: $session,
});

export { $session, AuthGate };
