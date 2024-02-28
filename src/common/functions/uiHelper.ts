import { UIHelper as FWUIHelper } from '../../../framework/functions/uiHelper';

export class UIHelper extends FWUIHelper {
}

declare global {
    interface Window {
        zoom: (event: MouseEvent) => void;
    }
}