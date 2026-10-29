import { useSyncExternalStore } from 'react';
import { loginUser as login, logoutUser as logout, observeAuthState } from '../infrastructure/firebase/firebaseAuth.js';
import { ApiClient } from '../infrastructure/api/apiClient.js';
const api = new ApiClient();
let snapshot = { user: null, loading: true, error: null };
const listeners = new Set();
const emit = (data) => { snapshot = data; listeners.forEach(fn => fn(snapshot)); };
let started = false;
function start() {
  if (started) return;
  started = true;
  let version = 0;
  observeAuthState(async current => {
    const currentVersion = ++version;
    emit({ user: null, loading: !!current, error: null });
    if (!current) return;
    try {
      const profile = await api.get('/auth/me/');
      if (currentVersion === version) emit({ user: { ...profile, uid: current.uid }, loading: false, error: null });
    } catch (error) {
      if (currentVersion === version) emit({ user: null, loading: false, error });
    }
  });
}
const subscribe = listener => { listeners.add(listener); start(); return () => listeners.delete(listener); };
export function useAuth() {
  const state = useSyncExternalStore(subscribe, () => snapshot);
  const updateUserAvatar = async data => {
    const uid = snapshot.user?.uid;
    const user = await api.patch('/users/' + uid + '/', data);
    if (snapshot.user?.uid === uid) emit({ ...snapshot, user });
    return user;
  };
  return { ...state, isAuthenticated: !!state.user, login, logout, updateUserAvatar };
}
