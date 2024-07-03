import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { authActions } from "./actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  validationErrors: null
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({ ...state, isSubmitting: true, validationErrors: null })),
    on(authActions.registerSuccess, (state, action) => ({ ...state, isSubmitting: false, currentUser: action.currentUser })),
    on(authActions.registerFailure, (state, action) => ({ ...state, isSubmitting: false, validationErrors: action.errors })),
  ),
});
export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting, selectIsLoading, selectValidationErrors, selectCurrentUser } = authFeature;