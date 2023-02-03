import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SaveName from './components/SaveName';
import ScoreTable from './components/ScoreTable';
import HomePage from './views/front/HomePage';
import QuizManager from './views/front/QuizManager';
import Login from './views/admin/Login';
import Questions from './views/admin/Questions';
import QuestionDetailed from './views/admin/QuestionDetailed';
import EditPage from './views/admin/EditPage';
import AddQuestion from './views/admin/AddQuestion';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Recap from './components/Recap';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <ScoreTable />
      },
      {
        path: "save-name",
        element: <SaveName />
      },
      {
        path: "recap",
        element: <Recap />
      }
    ],
  },
  {
    path: "/admin",
    element: <HomePage />,
    children: [
      {
        path: "",
        element : <Login />
      },
      {
        path:"questions",
        element : <Questions />
      },
      {
        path:"questions/:position",
        element : <QuestionDetailed />
      },
      {
        path:"questions/:position/edit",
        element : <EditPage />
      },
      {
        path:"questions/add",
        element : <AddQuestion />
      }
    ]
  },
  {
    path : "/quiz",
    element : <QuizManager />,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

