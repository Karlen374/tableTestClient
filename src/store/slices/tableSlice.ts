import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useTableServices from 'src/services/useTableService';
import { ITableData, ITableDataService } from 'src/types/ITableData';

interface TableState {
  createModal:boolean;
  tableData:ITableData[] | null;
  pagesCount: number;
  sortParam: 'default' | 'asc_count' | 'asc_name' | 'asc_distance' | 'desc_count' | 'desc_name' | 'desc_distance';
  activePage:number;
}

const initialState:TableState = {
  createModal: false,
  tableData: null,
  sortParam: 'default',
  activePage: 1,
  pagesCount: 0,
};

export const createRow = createAsyncThunk(
  'table/createRow',
  async (data:ITableDataService) => {
    const { create } = useTableServices();
    const response = await create(data);
    return response;
  },
);
export const getTableRowsCount = createAsyncThunk(
  'table/getTableRowsCount',
  async (authorId:string) => {
    const { getCount } = useTableServices();
    const response = await getCount(authorId);
    return response;
  },
);
interface IGetFilteredTableRows{
  authorId:string;
  rowParam:'name' | 'count' | 'distance';
  comparisonParam:'equal' |'contain'|'more'|'less';
  value:string;
}
export const getFilteredTableRows = createAsyncThunk(
  'table/getFilteredTableRows',
  async (data:IGetFilteredTableRows) => {
    const { getFilteredTable } = useTableServices();
    const response = await getFilteredTable(data.authorId, data.rowParam, data.comparisonParam, data.value);
    return response;
  },
);
interface IGetTableRowsData{
  authorId:string;
  page:number;
  sortParam:'default' | 'asc_count' | 'asc_name' | 'asc_distance' | 'desc_count' | 'desc_name' | 'desc_distance';
}
export const getTableRows = createAsyncThunk(
  'table/getTableRows',
  async (data:IGetTableRowsData) => {
    const { getTable } = useTableServices();
    const response = await getTable(data.authorId, data.page, data.sortParam);
    return response;
  },
);
const TableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.createModal = true;
    },
    closeCreateModal: (state) => {
      state.createModal = false;
    },
    changeActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    changeSortParam: (state, action) => {
      state.sortParam = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getTableRowsCount.fulfilled, (state, action) => {
        state.pagesCount = action.payload;
      })
      .addCase(getTableRows.fulfilled, (state, action) => {
        state.tableData = action.payload;
      })
      .addCase(createRow.fulfilled, (state, action) => {
        if (state.tableData) state.tableData = [...state.tableData, action.payload];
        else state.tableData = [action.payload];
      })
      .addCase(getFilteredTableRows.fulfilled, (state, action) => {
        state.tableData = action.payload;
      });
  },
});

const { actions, reducer } = TableSlice;

export default reducer;

export const {
  openCreateModal,
  closeCreateModal,
  changeActivePage,
  changeSortParam,
} = actions;
