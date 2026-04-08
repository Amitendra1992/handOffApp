import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import HandoffProvider from './components/HandoffProvider';
import AppHandoff from './components/AppHandoff';
import { RouterProvider, createBrowserRouter } from 'react-router';
import CreateHandoff from "./components/CreateHandoff";
import HandOffList from './components/HandOffList';
import HandOffDetail from './components/HandOffDetail';

const appRoute = createBrowserRouter([
  {
      path: "/",
      element: <AppHandoff />,
      children: [
        {
          path: "/create",
          element: <CreateHandoff />,
        },
        {
          path: "/handofflist",
          element: <HandOffList />
        },
        {
          path: "/handOff/:id",
          element: <HandOffDetail />
        }
      ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HandoffProvider>
      <RouterProvider router={appRoute} />
    </HandoffProvider>
  </StrictMode>
)
