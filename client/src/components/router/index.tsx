import { Routes, Route } from "react-router-dom";
import {
  AddArticlePage,
  DetailArticlePage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "src/pages";

import { AppLayout, AuthLayout } from "src/components";

export const router = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/addArticle" element={<AddArticlePage />} />
        <Route path="/article/:id" element={<DetailArticlePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
