import "./App.css";
import Header from "./Component/Header";
// import Body from './Component/Body'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
// import About from './Component/About'
// import Contact from './Component/Contact'
// import Cart from './Component/Cart'
// import RestaurantMenu from './Component/RestaurantMenu.jsx'

const Body = lazy(() => import("./Component/Body"));
const About = lazy(() => import("./Component/About"));
const Contact = lazy(() => import("./Component/Contact"));
const Cart = lazy(() => import("./Component/Cart"));
const RestaurantMenu = lazy(() => import("./Component/RestaurantMenu"));

//chunking
//lazy loading
// dynamic loading

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
    <Provider store={appStore}>
      <div className="App">
        <Header />
        <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
          <Outlet />
        </Suspense>
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/restaurant/:id", element: <RestaurantMenu /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}
