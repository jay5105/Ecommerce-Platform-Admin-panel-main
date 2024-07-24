// AdminPanel.js
import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Category from './Product';
import AddCategory from "./AddProduct";
import Home from "./Home";
import AddSCategory from "./AddSCategory";
import SubCategory from "./SubCategory";
import Users from "./Users";
import ProductList from "./ProductList";
import OrderList from "./OrderList";
import Sellers from './Sellers';
 
function AdminPanel() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 10 }}>
        <Routes>
          {/* Simple Dashboard */}
          <Route exact path="/" element={<Home />} />
          {/* Admin Category Routes */}
          <Route  path="/category" element={<Category />} />
          {/* Add Category */}
          <Route path="/addcategory" element={<AddCategory />} />
          {/* Update Category */}

          {/* Sub Category */}
          <Route path="/subcategory" element={<SubCategory />} />
          {/* Add SubCategory */}
          <Route path="/addsubcategory" element={<AddSCategory />} />
          {/* Update Subcategory */}

          {/* Seller List */}
          <Route path="/seller" element={<Sellers />} />
          {/* User List */}
          <Route path="/user" element={<Users />} />
          {/* Product List */}
          <Route path="/product" element={<ProductList />} />
          {/* Order List */}
          <Route path="/order" element={<OrderList />} />

        </Routes>
      </main>
    </>
  );
}

export default AdminPanel;
