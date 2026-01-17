import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./pages/ContactPage";
import NotePage from "./pages/NotePage";
import ReminderPage from "./pages/ReminderPage";
import EmergencyPage from "./pages/EmergencyPage";
import SettingPage from "./pages/SettingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="" element={<DashboardPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/reminder" element={<ReminderPage />} />
          <Route path="/notes" element={<NotePage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/settings" element={<SettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
