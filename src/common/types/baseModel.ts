import "reflect-metadata";
import { container } from "tsyringe";
import {
  AbstractModel,
  ErrorModel as FWErrorModel,
} from "../../../framework/types/abstractModel";
import { LanguageService } from "../../services/languageService";
import { BaseList, SafeAny } from "./baseType";
import { ConstantValue } from "../constants/constantValue";
import { ObjectHelper } from "../functions/objectHelper";

/**
 * Model for showing error
 */
export interface ErrorModel extends FWErrorModel {
  property: string;
  error: string;
}

/**
 * Abstract for model
 */
export abstract class BaseModel extends AbstractModel<ErrorModel> {
  public readonly languageService = container.resolve(LanguageService);

  [key: string]: number | string | SafeAny;
  public errors: ErrorModel[] = [];

  public checkError(prop: string): boolean {
    const me = this;
    if (me.errors.findIndex((a) => a.property === prop) != -1) {
      return true;
    }
    return false;
  }

  public getError(prop: string): string {
    const me = this;
    let errorMessage = "";
    if (me.errors.length > 0) {
      for (const error of me.errors) {
        if (error.property === prop) {
          errorMessage +=
            '<span class="label-text text-danger">' + error.error + "</span>";
        }
      }
    }
    return (
      '<label class="label flex-col items-start">' + errorMessage + "</label>"
    );
  }
}

/**
 * Abastract for model on create/update
 */
export abstract class BaseInfoModel<T> extends BaseModel {
  public id = "";

  /** To validate model valid */
  public abstract isValid(): boolean;

  /** To apply data for editing */
  public abstract applyData(objectEdit: T): void;
}

/**
 * Abstract for model paging listing
 */
export abstract class BaseModelList<T> extends BaseModel {
  public dataList: BaseList<T>;
  public maxPageList: number;
  public pagingList: number[];

  /**
   * Constructor
   */
  constructor(maxPageList = 5) {
    super();
    this.maxPageList = maxPageList;
    this.pagingList = [];
    for (let i = 1; i <= maxPageList; i++) {
      this.pagingList.push(i);
    }
    this.dataList = {
      data: [],
      pageIndex: ConstantValue.pageIndex,
      pageSize: ConstantValue.pageSize,
      totalPage: 0,
      totalRecord: 0,
      hasMore: false,
      hasPrevious: false,
    } as BaseList<T>;
  }

  /**
   * Get current page
   * @returns
   */
  public getCurrentPage(): number {
    const pageParam = ObjectHelper.getURLParam("page");
    if (pageParam != null) {
      return parseInt(pageParam);
    }
    return 0;
  }

  /**
   * Update paging after loading data
   * @param pageIndex
   * @param isNext
   */
  public updatePaging(pageIndex: number, isNext = false): void {
    const me = this;
    if (isNext) {
      let lastPage = me.pagingList[me.maxPageList - 1];
      if (pageIndex > lastPage && lastPage < me.dataList.totalPage) {
        if (pageIndex > lastPage + me.maxPageList) {
          lastPage = pageIndex;
          if (lastPage >= me.dataList.totalPage - 1) {
            lastPage = me.dataList.totalPage - me.maxPageList;
          }
        } else {
          me.maxPageList = pageIndex - me.maxPageList;
        }
        me.addValuesToPageList(lastPage, true);
      }
    } else {
      const lastPage = me.pagingList[0];
      if (pageIndex < lastPage - 1 && pageIndex > 0) {
        me.addValuesToPageList(lastPage, false);
      }
    }

    if (me.dataList.pageIndex == ConstantValue.pageIndex) {
      if (me.maxPageList >= me.dataList.totalPage) {
        me.maxPageList = me.dataList.totalPage;
      }
      me.addValuesToPageList(ConstantValue.pageIndex - 1, true);
    }
    ObjectHelper.setURLParam("page", pageIndex.toString());
  }

  /**
   * Update paging list
   * @param lastPage
   * @param isNext
   */
  public addValuesToPageList(lastPage: number, isNext: boolean): void {
    const me = this;
    me.pagingList = [];
    if (isNext) {
      for (let i = 1; i <= me.maxPageList; i++) {
        me.pagingList.push(lastPage + i);
      }
    } else {
      for (let i = me.maxPageList; i >= 1; i--) {
        me.pagingList.push(lastPage - i);
      }
    }
  }
}
