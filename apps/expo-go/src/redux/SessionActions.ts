import { SessionObject } from './SessionReducer';
import { AppDispatch, AppThunk } from './Store.types';
import ApolloClient from '../api/ApolloClient';
import AuthApi from '../api/AuthApi';
import LocalStorage from '../storage/LocalStorage';

export default {
  setSession(session: SessionObject): AppThunk {
    return async (dispatch: AppDispatch) => {
      await LocalStorage.saveSessionAsync(session);
      return dispatch({
        type: 'setSession',
        payload: session,
      });
    };
  },

  signOut(): AppThunk {
    return async (dispatch: AppDispatch) => {
      const session = await LocalStorage.getSessionAsync();
      if (session) {
        try {
          await AuthApi.signOutAsync(session.sessionSecret);
        } catch (e) {
          // continue to clear out session in redux and local storage even if API logout fails
          console.error('Something went wrong when signing out:', e);
        }
        await LocalStorage.removeSessionAsync();
      }

      await LocalStorage.clearHistoryAsync();

      ApolloClient.resetStore();

      return dispatch({
        type: 'signOut',
        payload: null,
      });
    };
  },

  clearCookies(): AppThunk {
    return async (dispatch: AppDispatch) => {
      try {
        // Clear all cookies and stored data
        await LocalStorage.clearCookiesAsync();
        
        // Reset Apollo client store
        ApolloClient.resetStore();

        return dispatch({
          type: 'clearCookies',
          payload: null,
        });
      } catch (e) {
        console.error('Something went wrong when clearing cookies:', e);
        throw e;
      }
    };
  },
};
