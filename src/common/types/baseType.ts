import { ConstantValue } from '../constants/constantValue';

export class BaseList<T>{
    public pageSize: number = ConstantValue.pageSize;
    public pageIndex: number = ConstantValue.pageIndex;
    public totalPage = 0;
    public totalRecord = 0;
    public data: T[] = [];
    public hasMore: boolean = false;
    public hasPrevious: boolean = false;
}

export type SafeAny = any;