import { on, createReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { UserMaskToggle } from './user.actions';

export interface UserState {
    maskUserName: boolean;
}

/**
 * SELECTORS
 */

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const userReducer = createReducer(
    { maskUserName: true },
    on(UserMaskToggle, state => {
        return {
            ...state,
            maskUserName: !state.maskUserName,
        }
    })
)