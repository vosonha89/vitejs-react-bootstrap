import React from 'react';
import './Home.scss';
import HomeHook from './HomeHook';
import NotReady from '../../common/components/notReady/NotReady';
import languageHook from '../../common/hooks/languageHook';

function Home(): React.JSX.Element {
    const elHook = HomeHook();
    const { text: language } = languageHook();

    if (elHook) {
        return (
            <div className="home-page w-100">
                {language.menu.home}
            </div>
        );
    }
    else {
        return (
            <NotReady></NotReady>
        );
    }
}

export default Home;
