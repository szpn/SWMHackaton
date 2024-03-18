// import './App.css';
import AttractionsList from './components/AttractionsList';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import React from 'react';
import DetailsCard from './components/Details';

const Place = () => {
  const { id } = useParams();
  return <DetailsCard id={id} />;
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