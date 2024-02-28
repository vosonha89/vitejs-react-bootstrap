import { useEffect, useState } from 'react';
import { GlobalEventValue } from '../constants/eventValue';
import { SafeAny } from '../types/baseType';

/**
 * To use for all screen
 * @returns 
 */
function globalHook() {
    const [appGlobalReady, setAppGlobalReady] = useState(false);

    const appVersion = import.meta.env.VITE_APP_VERSION;
    const appName = import.meta.env.VITE_APP_TITLE;
    const appEnv = import.meta.env.VITE_APP_ENV;

    /**
     * add script to page
     * @param id 
     * @param link 
     */
    function addScript(id: string, link: string, checkerName: string, maxCheck: number) {
        return new Promise<boolean>((resolve, reject) => {
            try {
                const scripts = Array.from(document.scripts);
                if (scripts.findIndex(a => a.id == id) == -1) {
                    const script = document.createElement('script');
                    script.id = id;
                    script.src = link;
                    script.async = true;
                    script.onload = () => {
                        console.log('loaded');
                    };
                    document.body.appendChild(script);
                    let checkTime = 0;
                    const intervalChecker = setInterval(() => {
                        checkTime++;
                        console.log('checking ' + id + ' at ' + checkTime);
                        if (checkTime < maxCheck) {
                            const checker = (window as SafeAny)[checkerName];
                            if (checker) {
                                clearInterval(intervalChecker);
                                resolve(true);
                            }
                        }
                        else {
                            clearInterval(intervalChecker);
                            resolve(false);
                        }
                    }, 200);
                }
            }
            catch (ex) {
                console.log(ex);
                reject();
            }
        });
    }

    /**
     * On error image load
     * @param imgEl 
     */
    function onImageError(imgEl: HTMLImageElement) {
        if (imgEl.src.includes(import.meta.env.VITE_IMAGENOSSL)) {
            imgEl.src = imgEl.src.replace(import.meta.env.VITE_IMAGENOSSL, import.meta.env.VITE_IMAGESSL);
        }
    }

    /**
     * Library load finished event
     */
    function libraryLoaded(): void {
        const event = new Event(GlobalEventValue.libraryLoaded);
        window.dispatchEvent(event);
    }

    useEffect(() => {
        function onLibraryLoaded(): void {
            setAppGlobalReady(true);
        }
        window.addEventListener(GlobalEventValue.libraryLoaded, () => { onLibraryLoaded(); }, false);

        return () => {
            window.addEventListener(GlobalEventValue.libraryLoaded, () => { onLibraryLoaded(); }, false);
        };
    }, []);

    return { addScript, onImageError, appVersion, appName, appEnv, appGlobalReady, libraryLoaded };
}

export default globalHook;