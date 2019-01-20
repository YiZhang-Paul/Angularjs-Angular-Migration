import IProjection from './projection.interface';

export default interface IQueryOption {

    projection?: IProjection;
    select?: string[];
}
