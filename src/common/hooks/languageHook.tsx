import 'reflect-metadata';
import { container } from 'tsyringe';
import { useEffect, useState } from 'react';
import { LanguageText } from '../../types/languageText';
import { GlobalEventValue } from '../constants/eventValue';
import { LanguageService } from '../../services/languageService';

/**
 * For transtate language globally
 * @returns 
 */
function languageHook() {
    const languageService = container.resolve(LanguageService);
    const [text, setText] = useState(languageService.text as LanguageText);
    useEffect(() => {
        function onLanguageChanged(e: CustomEvent<string>): void {
            const value = e.detail;
            languageService.setLanguage(value);
            const languageText = languageService.text;
            setText(languageText);
        }
        window.addEventListener(GlobalEventValue.languageChanged, (e) => { onLanguageChanged(e as CustomEvent<string>); }, false);

        return () => {
            window.addEventListener(GlobalEventValue.languageChanged, (e) => { onLanguageChanged(e as CustomEvent<string>); }, false);
        };
    }, []);
    return { text, trans: languageService.trans.bind(languageService) };
}

export default languageHook;