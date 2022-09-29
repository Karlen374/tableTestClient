import { useHttp } from 'src/hooks/useHttp';
import { ITableDataService } from 'src/types/ITableData';

const useTableServices = () => {
  const _apiBase = 'http://localhost:5000/tableRow';
  const { request } = useHttp();

  const create = async (data:ITableDataService) => {
    const res = await request(`${_apiBase}/create`, 'POST', JSON.stringify(data));
    return res;
  };
  const getCount = async (authorid:string) => {
    const header = { authorid, 'Content-Type': 'application/json' };
    const res = await request(`${_apiBase}/getCount`, 'GET', null, header);
    return res;
  };
  const getTable = async (
    authorid:string,
    page:number,
    sortParam:'default' | 'asc_count' | 'asc_name' | 'asc_distance' | 'desc_count' | 'desc_name' | 'desc_distance',
  ) => {
    const header = { authorid, 'Content-Type': 'application/json' };
    const res = await request(`${_apiBase}/get?page=${page}&sortParam=${sortParam}`, 'GET', null, header);
    return res;
  };

  const getFilteredTable = async (
    authorid:string,
    rowParam:'name' | 'count' | 'distance',
    comparisonParam:'equal' |'contain'|'more'|'less',
    value:string | number,
  ) => {
    const header = { authorid, 'Content-Type': 'application/json' };
    const requestLink = `
      ${_apiBase}/getFiltered?rowParam=${rowParam}&comparisonParam=${comparisonParam}&value=${value}`;
    const res = await request(requestLink, 'GET', null, header);
    return res;
  };

  return {
    create,
    getCount,
    getTable,
    getFilteredTable,
  };
};

export default useTableServices;
