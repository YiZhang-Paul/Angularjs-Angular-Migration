import IProjection from './IProjection.interface';

export default interface IQueryOption {

    projection?: IProjection;
    select?: string[];
}
