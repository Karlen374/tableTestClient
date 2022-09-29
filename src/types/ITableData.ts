export interface ITableData {
  date:string;
  name:string;
  count:number;
  distance:number;
  _id:string;
}
export interface ITableDataService extends ITableData{
  authorId:string;
}
