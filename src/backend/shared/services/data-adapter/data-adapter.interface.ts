export default interface IDataAdapter<T = any> {

    convert(data: any): T;
}
