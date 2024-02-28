import React, { useEffect } from 'react';
import './App.scss';
import globalHook from './common/hooks/globalHook';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import Home from './views/home/Home';

function App(): React.JSX.Element {
  const appHook = globalHook();
  const router = createBrowserRouter([
    {
      path: AppRouter.noMatch,
      element: <Navigate to={AppRouter.default} replace />,
    },
    {
      path: AppRouter.default,
      element: <Home />,
    },
  ]);

  async function loadScript(): Promise<void> {
    // global script load here
    await appHook.addScript('bootstrap', '/assets/js/bootstrap.bundle.min.js', 'bootstrapFinish', 20);
    appHook.libraryLoaded();
  }

  useEffect(() => {
    window.parent.document.title = import.meta.env.VITE_APP_TITLE;
    loadScript();
    // userEffect implement here
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
