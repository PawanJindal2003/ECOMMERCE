import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import ProductDetails from "./component/Product/ProductDetails";
import React, { useEffect, useState } from "react";
import Footer from "./component/layout/Footer/Footer";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import { loadUser } from "./actions/userActions";
import store from "./store";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import NewProduct from "./component/Admin/NewProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          element={
            window.location.pathname === "/process/payment" ? null : (
              <NotFound />
            )
          }
        />

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route
            exact
            path="/process/payment"
            element={
              stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )
            }
          />
        </Route>
        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/products" element={<ProductList />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/users" element={<UsersList />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAdmin={true} isAuthenticated={isAuthenticated} />
          }
        >
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
