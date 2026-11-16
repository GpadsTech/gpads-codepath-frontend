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
      
      // Busca o avatar salvo localmente no navegador para o usuário logado
      const savedAvatar = localStorage.getItem(`user_avatar_${current.uid}`);
      const userWithAvatar = { 
        ...profile, 
        uid: current.uid, 
        avatarId: savedAvatar || profile.avatarId || profile.avatar || 'nova' 
      };

      if (currentVersion === version) {
        emit({ user: userWithAvatar, loading: false, error: null });
      }
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
    const avatarId = data.avatarId || data.avatar;

    // 1. Salva a escolha do avatar no localStorage associado ao UID
    if (uid && avatarId) {
      localStorage.setItem(`user_avatar_${uid}`, avatarId);
    }

    // 2. Atualiza imediatamente o estado global reativo (Header e Perfil mudam na hora)
    const updatedUser = { 
      ...snapshot.user, 
      ...data, 
      avatarId: avatarId || snapshot.user?.avatarId 
    };

    emit({ ...snapshot, user: updatedUser });
    return updatedUser;
  };

  return { ...state, isAuthenticated: !!state.user, login, logout, updateUserAvatar };
}