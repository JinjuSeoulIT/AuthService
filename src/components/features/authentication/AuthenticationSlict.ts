import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthenticationResponse} from "../Authentication/AuthenticationType";
import { AuthenticationRequest } from "./AuthenticationType";

type AuthenticationState = {
  loading: boolean;
  authentication: AuthenticationResponse | null;
  error: string | null;
  lastReq: AuthenticationRequest | null;

  createSuccess: boolean;
  deleteSuccess: boolean;
};

const initialState: AuthenticationState = {
  lastReq: null,
  loading: false,
  authentication: null,
  error: null,

  createSuccess: false,
  deleteSuccess: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
  


        createAuthenticationRequest(state, action: PayloadAction<AuthenticationRequest>) {
        state.loading = true;
        state.error = null;
        state.lastReq = action.payload;
      
        },
        createAuthenticationSuccess(state, action: PayloadAction<AuthenticationResponse>) {
        state.loading = false;
        state.authentication = action.payload;
        state.createSuccess = true;
        },
        createAuthenticationFail(state, action: PayloadAction<string>) {
        state.loading = false;
        state.error = action.payload;
        },
    
    



// //     // 상세
// //     fetchAuthenticationByIdRequest(state, action: PayloadAction<number>) {
// //       state.loading = true;
// //       state.lastReq = action.payload;
// //       state.error = null;
// //     },
// //     fetchAuthenticationSuccess(state, action: PayloadAction<AuthenticationResponse>) {
// //       state.loading = false;
// //       state.authentication = action.payload;
// //     },
// //     fetchAuthenticationFail(state, action: PayloadAction<string>) {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },

// //     updateAuthenticationRequest(state, action: PayloadAction<AuthenticationUpdateRequest>) {
// //       state.loading = true;
// //       state.error = null;
// //       state.lastReq = action.payload;
// //       state.deleteSuccess = false;
// //     },
// //     updateAuthenticationSuccess(state, action: PayloadAction<AuthenticationResponse>) {
// //       state.loading = false;
// //       state.authentication = action.payload;
// //     },
// //     updateAuthenticationFail(state, action: PayloadAction<string>) {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },

// //     deleteAuthenticationRequest(state, action: PayloadAction<AuthenticationDeleteRequest>) {
// //       state.loading = true;
// //       state.error = null;
// //       state.lastReq = action.payload;
// //       state.deleteSuccess = false;
// //     },
// //     deleteAuthenticationSuccess(state) {
// //       state.loading = false;
// //       state.authentication = null;
// //       state.deleteSuccess = true;
// //     },
// //     deleteAuthenticationFail(state, action: PayloadAction<string>) {
// //       state.loading = false;
// //       state.error = action.payload;
// //       state.deleteSuccess = false;
// //     },
// //   },
// // });

},
});

export const {
createAuthenticationRequest,
createAuthenticationSuccess,
createAuthenticationFail,




} = authenticationSlice.actions;

export default authenticationSlice.reducer;
