import { useEffect, useState } from 'react';
import { HomeState } from './HomeState';

function HomeHook() {
    const [componentState, setComponentState] = useState(new HomeState());

    /**
     * Load page
     */
    async function loadPage(): Promise<void> {
        const pageState: HomeState = componentState.copy();
        await pageState.init();
        setComponentState(pageState);
    }

    useEffect(() => {
        // userEffect implement here
        loadPage();
    }, []);
    return {
        componentState
    };
}

export default HomeHook;