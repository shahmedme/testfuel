import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "services";
import { fetchAccount } from "services/auth";
import { IUser, IWorkspace } from "types";

export interface AuthState {
	user?: IUser;
	authRequired: boolean;
	workspaces?: IWorkspace[];
}

const initialState: AuthState = {
	user: undefined,
	authRequired: false,
	workspaces: [],
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<any>) => {
			state.user = action.payload;
		},
		requireAuth: (state, action: PayloadAction<boolean>) => {
			state.authRequired = action.payload;
		},
		setWorkspaces: (state, action) => {
			state.workspaces = action.payload;
			storage.set("workspaces", state.workspaces);
		},
		setBetaMode: (state, action) => {
			// @ts-ignore
			state.user.isBeta = action.payload;
		},
	},
});

export const { setUser, requireAuth, setWorkspaces, setBetaMode } =
	authSlice.actions;

export default authSlice.reducer;

export const loadUser = (): any => async (dispatch: any) => {
	try {
		const { data } = await fetchAccount();
		dispatch(setUser(data.user));
		dispatch(setWorkspaces(data.workspace));
	} catch (err) {
		return;
	}
};
