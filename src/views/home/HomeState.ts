import 'reflect-metadata';
import { HomeModel } from './HomeModel';
import { ComponentState } from '../../common/types/componentState';

export class HomeState extends ComponentState {
    public model = new HomeModel();
    public modelPropName = 'model';

    public async init(): Promise<void> {
        const me = this;
        me.model = new HomeModel();
        me.loadingService.show();
        setInterval(() => {
            me.loadingService.hide();
        }, 1000);
    }
}