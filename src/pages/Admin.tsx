import { useState, useEffect, createContext, useContext, useCallback } from "react";
import FleetAdmin from "./admin/FleetAdmin";
import ServicesAdmin from "./admin/ServicesAdmin";
import ContactAdmin from "./admin/ContactAdmin";
import GalleryAdmin from "./admin/GalleryAdmin";
import {
  Ship, Wrench, Phone, Image, LogOut, Menu, X, LayoutDashboard, ChevronRight,
  Link,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// Config — sama dengan php-server yang sudah ada
// ─────────────────────────────────────────────
export const API_URL = import.meta.env.VITE_API_URL || "https://rental-boat.gt.tc/php-server";

// ─────────────────────────────────────────────
// Auth Context
// ─────────────────────────────────────────────
interface AuthCtx {
  token: string | null;
  username: string | null;
  logout: () => void;
}
export const AuthContext = createContext<AuthCtx>({
  token: null, username: null, logout: () => { }
});
export const useAuth = () => useContext(AuthContext);

// ─────────────────────────────────────────────
// API Helper
// ─────────────────────────────────────────────
export async function apiFetch(
  path: string,
  options: RequestInit = {},
  token?: string | null
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  // Baca sebagai text dulu, baru parse — aman untuk response kosong
  const text = await res.text();
  const data = text.trim() ? JSON.parse(text) : {};

  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}
// ─────────────────────────────────────────────
// Login Form
// ─────────────────────────────────────────────
function LoginPage({ onLogin }: { onLogin: (token: string, username: string) => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const data = await apiFetch("/login.php", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      onLogin(data.token, data.username);
    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4 shadow-lg shadow-blue-500/30">
            <Ship className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-1">Rental Boat Batam</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600
                           text-white placeholder-slate-400 focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:border-transparent transition"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600
                           text-white placeholder-slate-400 focus:outline-none focus:ring-2
                           focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white
                         font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : "Masuk"}
            </button>
          </form>
        </div>

        <button onClick={() => navigate("/")} className="text-white mt-4 flex items-center gap-2 hover:text-blue-500 transition">
          <ArrowLeft />Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sidebar nav items
// ─────────────────────────────────────────────
const NAV = [
  { key: "fleet", label: "Armada Kapal", icon: Ship },
  { key: "services", label: "Layanan", icon: Wrench },
  { key: "contact", label: "Kontak", icon: Phone },
  { key: "gallery", label: "Galeri", icon: Image },
];

// ─────────────────────────────────────────────
// Main Admin Layout
// ─────────────────────────────────────────────
function AdminLayout({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [active, setActive] = useState("fleet");
  const [sidebarOpen, setSidebar] = useState(false);

  const current = NAV.find(n => n.key === active);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col
          bg-slate-900 border-r border-slate-800
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Ship className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm leading-tight truncate">Rental Boat Batam</p>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
          <button
            onClick={() => setSidebar(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActive(key); setSidebar(false); }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all group
                ${active === key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {active === key && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold uppercase flex-shrink-0">
              {username[0]}
            </div>
            <span className="text-sm text-slate-300 truncate flex-1">{username}</span>
            <button
              onClick={onLogout}
              title="Logout"
              className="text-slate-500 hover:text-red-400 transition flex-shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 flex items-center gap-4 px-6 bg-slate-900 border-b border-slate-800">
          <button
            onClick={() => setSidebar(true)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="font-semibold text-slate-100">{current?.label}</h2>
          <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Admin
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {active === "fleet" && <FleetAdmin />}
          {active === "services" && <ServicesAdmin />}
          {active === "contact" && <ContactAdmin />}
          {active === "gallery" && <GalleryAdmin />}
        </main>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Root Admin Page
// ─────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  // Restore session dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("rbb_admin_token");
    const savedUser = localStorage.getItem("rbb_admin_user");
    if (saved && savedUser) {
      // Verify token masih valid
      apiFetch("/login.php", {}, saved)
        .then(() => { setToken(saved); setUsername(savedUser); })
        .catch(() => { localStorage.removeItem("rbb_admin_token"); localStorage.removeItem("rbb_admin_user"); })
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  const handleLogin = useCallback((t: string, u: string) => {
    localStorage.setItem("rbb_admin_token", t);
    localStorage.setItem("rbb_admin_user", u);
    setToken(t); setUsername(u);
  }, []);

  const handleLogout = useCallback(async () => {
    try { await apiFetch("/login.php", { method: "DELETE" }, token); } catch { }
    localStorage.removeItem("rbb_admin_token");
    localStorage.removeItem("rbb_admin_user");
    setToken(null); setUsername(null);
  }, [token]);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!token) return <LoginPage onLogin={handleLogin} />;

  return (
    <AuthContext.Provider value={{ token, username, logout: handleLogout }}>
      <AdminLayout username={username!} onLogout={handleLogout} />
    </AuthContext.Provider>
  );
}
