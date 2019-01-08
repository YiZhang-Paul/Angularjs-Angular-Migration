export default interface IQueryOption {

    projection?: { [field: string]: 0 | 1 };
    select?: string[];
}
