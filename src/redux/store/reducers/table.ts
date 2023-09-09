import { createAction, createReducer } from '@reduxjs/toolkit';

interface TableState {
  showTable: boolean;
  tool: string | null;
}

const initialState: TableState = {
  showTable: false,
  tool: '',
};

export const showTable = createAction<boolean>('table/Show table');
export const getToolName = createAction<string>('tool/Get tool name');

const tableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showTable, (state, action) => {
      state.showTable = action.payload;
    })
    .addCase(getToolName, (state, action) => {
      state.tool = action.payload;
    });
});

export default tableReducer;
