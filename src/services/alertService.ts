import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import { LanguageService } from './languageService';
import { AlertType } from '../common/constants/alertType';

@singleton()
export class AlertService {
    private language: LanguageService = container.resolve(LanguageService);
    private alertTypes: AlertType = new AlertType();

    /**
     * Add alert box
     * @param alertType
     * @param message
     */
    public addAlert(alertType: string, message: string, timeout = 2000): void {
        const me = this;
        let alertTypeValue = '';
        let className = '';
        switch (alertType) {
            case me.alertTypes.error.toString():
                alertTypeValue = me.language.text.label.error;
                className = 'bs-toast toast fade show bg-danger mt-3';
                break;
            case me.alertTypes.warning.toString():
                alertTypeValue = me.language.text.label.warning;
                className = 'bs-toast toast fade show bg-warning mt-3';
                break;
            case me.alertTypes.success.toString():
                alertTypeValue = me.language.text.label.success;
                className = 'bs-toast toast fade show bg-success mt-3';
                break;
            case me.alertTypes.info.toString():
                alertTypeValue = me.language.text.label.information;
                className = 'bs-toast toast fade show bg-info mt-3';
                break;
        }
        const mainContainer = document.getElementById('alertContainer');
        const alertBox = document.createElement('div');
        alertBox.setAttribute('role', 'alert');
        alertBox.setAttribute('aria-live', 'assertive');
        alertBox.setAttribute('aria-atomic', 'true');
        alertBox.className = className;
        const html = `<div class="toast-header">
                        <i class="bx bx-bell me-2"></i>
                        <div class="me-auto fw-semibold">` + alertTypeValue + `</div>
                        <small>1 mins ago</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div class="toast-body text-white">
                    ` + message + `
                    </div>`;
        alertBox.innerHTML = html;
        mainContainer?.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, timeout);
    }
}