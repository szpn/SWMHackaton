import './App.css';
import AttractionsList from './components/AttractionsList';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import TopBar from './components/TopBar';
import React from 'react';

const Place = () => {
  const { id } = useParams();
  return <TopBar id={id} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AttractionsList />
  },
  {
    path: "place/:id",
    element: <Place />,
  },
]);


export default function App() {
  return <>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </>
}