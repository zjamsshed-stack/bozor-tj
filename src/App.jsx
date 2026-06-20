import { useState } from "react";

// Contexts
import { LangProvider } from "./context/LangContext";
import { RouterProvider, useRouter } from "./context/RouterContext";

// Components
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import CreateModal from "./components/CreateModal";
import Toast from "./components/Toast";

// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import AdPage from "./pages/AdPage";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Help from "./pages/Help";
import Map from "./pages/Map";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Category from "./pages/Category";

// ===== ROUTER (inside providers) =====
function AppRouter() {
  const { page, goTo } = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState(null);
  const [unread, setUnread] = useState(3);
  const [key, setKey] = useState(0);

  const navigate = (p) => {
    if (p === "notifications") setUnread(0);
    goTo(p);
    setKey(k => k + 1);
  };

  window.goTo = navigate;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const renderPage = () => {
    const pages = {
      home:          <Home />,
      search:        <Search />,
      ad:            <AdPage />,
      profile:       <Profile />,
      chat:          <Chat />,
      shop:          <Shop />,
      admin:         <Admin />,
      auth:          <Auth />,
      about:         <About />,
      help:          <Help />,
      map:           <Map />,
      notifications: <Notifications />,
      messages:      <Messages />,
      category:      <Category />,
    };
    return pages[page] || <Home />;
  };

  return (
    <div>
      <Header
        unread={unread}
        onNotifClick={() => navigate("notifications")}
      />

      <main style={{
        paddingTop: "var(--header-h)",
        paddingBottom: "var(--nav-h)",
        minHeight: "100vh",
      }}>
        <div key={key} className="anim-fade">
          {renderPage()}
        </div>
      </main>

      <BottomNav onCreateClick={() => setShowCreate(true)} />

      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onSelect={(opt) => showToast("✅ " + opt.title)}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}

// ===== ROOT APP (providers) =====
export default function App() {
  return (
    <LangProvider>
      <RouterProvider>
        <AppRouter />
      </RouterProvider>
    </LangProvider>
  );
}
