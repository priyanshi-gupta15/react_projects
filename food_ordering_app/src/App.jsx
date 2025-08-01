
import './App.css'
import Header from './Component/Header'
import Body from './Component/Body'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import About from './Component/About'
import Contact from './Component/Contact'
import Cart from './Component/Cart'
import RestaurantMenu from './Component/RestaurantMenu.jsx'

//header


//  -logo
//  -nav item
//body
//  -search 
//    -restaurant caontainer
//      -resaturant card
//        -img
//        -name of resaturant
// footer
//   -copyright
//   -links
//   -address

const AppLayout = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};
  
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      { path: "/",
        element: <Body/>,},
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu/>,
      },

    ],
  },
]);




export default function App() {
  return <RouterProvider router={appRouter}></RouterProvider>
};
