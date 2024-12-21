import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "@router/layouts/RootLayout";
import HomeLayout from "@router/layouts/HomeLayout";
import DashboardLayout from "@router/layouts/DashboardLayout";
import ProfileLayout from "@router/layouts/ProfileLayout";
import SettingLayout from "@router/layouts/SettingLayout";
import RegistrationLayout from "@router/layouts/RegistrationLayout";
import ChatLayout from "@router/layouts/ChatLayout";
import TournamentLayout from "./layouts/TournamentLayout";
import NotFoundLayout from "./layouts/NotFoundLayout";

// pages
import Home from "@publicPages/Home";
import SignUp from "@publicPages/not-signed-in/SignUp";
import SignIn from "@publicPages/not-signed-in/SignIn";
import AboutUs from "@publicPages/AboutUs";
import Team from "@publicPages/Team";
import Contact from "@publicPages/Contact";
import Profile from "@privatePages/Profile";
import Chat from "@privatePages/Chat";
import Game from "@privatePages/Game";
import Recent from "@privatePages/Recent";
import Friends from "@privatePages/Friends";
import SettingProfile from "../pages/private/SettingProfile";
import SettingPassword from "@/src/pages/private/SettingPassword";
import ChatArea from "@privatePages/ChatArea";

// routers protection
import PrivateRoutes from "@router/PrivateRoutes";
import AuthorizationRoutes from "@router/AuthorizationRoutes";

const routingTree: RouteObject[] = createRoutesFromElements(
  <Route element={<RootLayout />}>
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Home />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="team" element={<Team />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route element={<AuthorizationRoutes />}>
      <Route element={<RegistrationLayout />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Route>
    <Route element={<PrivateRoutes />}>
      <Route element={<DashboardLayout />}>
        <Route path="game" element={<Game />} />
        <Route path="profile">
          <Route element={<ProfileLayout />}>
            <Route index element={<Navigate to="details" replace />} />
            <Route path="details" element={<Profile />} />
            <Route path="recent" element={<Recent />} />
            <Route path="friends" element={<Friends />} />
            <Route path=":userName">
              <Route index element={<Navigate to="details" replace />} />
              <Route path="details" element={<Profile />} />
              <Route path="recent" element={<Recent />} />
            </Route>
          </Route>
        </Route>
        <Route path="chat" element={<ChatLayout />}>
          <Route index element={<Chat />} />
          <Route path=":userName" element={<ChatArea />} />
        </Route>
        <Route path="tournament" element={<TournamentLayout />}></Route>
        <Route path="setting" element={<SettingLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<SettingProfile />} />
          <Route path="password" element={<SettingPassword />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<NotFoundLayout />}></Route>
  </Route>
);

const router = createBrowserRouter(routingTree, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const MainRoutingComponent = () => {
  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  );
};

export default MainRoutingComponent;
