import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SongDetails } from './components/SongDetails/SongDetails';
import { SongListContainer } from './components/SongsListContainer/SongsListContainer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SongListContainer />,  // Update this line
  },
  {
    path: "/song/:id",
    element: <SongDetails />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
