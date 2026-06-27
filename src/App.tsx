import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Dashboard } from "@/pages/admin/Dashboard";
import { RestaurantsPage } from "@/pages/admin/restaurants/RestaurantsPage.tsx";
import { Categories } from "@/pages/admin/Categories";
import { Dishes } from "@/pages/admin/Dishes";
import { Orders } from "@/pages/admin/Orders";
import { Home } from "@/pages/marketplace/Home";
import { RestaurantDetail } from "@/pages/marketplace/RestaurantDetail";
import {AdminLayout} from "@/layout/AdminLayout.tsx";
import {MarketplaceLayout} from "@/layout/MarketplaceLayout.tsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="restaurants" element={<RestaurantsPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="dishes" element={<Dishes />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Marketplace Routes */}
          <Route path="/" element={<MarketplaceLayout />}>
            <Route index element={<Home />} />
            <Route path="restaurant/:id" element={<RestaurantDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;