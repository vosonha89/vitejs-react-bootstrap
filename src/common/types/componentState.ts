import 'reflect-metadata';
import { container } from 'tsyringe';
import { ObjectHelper } from '../functions/objectHelper';
import { AuthService } from '../../services/authService';
import { AuthProfileObject } from '../../types/authType';
import { ComponentState as FWComponentState } from '../../../framework/types/componentState';
import { LanguageService } from '../../services/languageService';
import { AlertService } from '../../services/alertService';
import { AlertType } from '../constants/alertType';
import { LoadingService } from '../../services/loadingService';
import { BaseInfoModel } from './baseModel';

export abstract class ComponentState extends FWComponentState {
    public languageService: LanguageService = container.resolve(LanguageService);
    public loadingService = container.resolve(LoadingService);
    public alertService: AlertService = container.resolve(AlertService);
    public alertType = new AlertType();

    public authService?: AuthService;
    public currentUser?: AuthProfileObject;

    /**
     * App on init
     */
    public abstract init(): void;

    constructor() {
        super();
        this.authService = container.resolve(AuthService);
        this.loadUserInfo();
    }

    /**
     * Deep copy current state
     * @returns 
     */
    public copy<TObject>(): TObject {
        return ObjectHelper.deepCopy(this) as unknown as TObject;
    }

    /**
     * Load userInfo
     */
    public loadUserInfo(): void {
        const me = this;
        const localUserInformation = me.authService?.getUserInformationLocal();
        me.currentUser = localUserInformation;
    }
}

export abstract class InformationComponentState<TDetail, TModel extends BaseInfoModel<TDetail>> extends ComponentState {
    public id = '';
    public abstract model: TModel;
    public abstract modelPropName: string;

    public abstract createRequest<T>(): T;
    public abstract saveData(): void;
}