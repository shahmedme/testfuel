import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	workspaceId: null,
};

const miscSlice = createSlice({
	name: "misc",
	initialState,
	reducers: {
		setWorkspaceId: (state, action) => {
			state.workspaceId = action.payload;
		},
	},
});

export const { setWorkspaceId } = miscSlice.actions;

export default miscSlice.reducer;
