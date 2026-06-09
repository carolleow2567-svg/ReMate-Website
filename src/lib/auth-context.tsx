import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type User = { name: string; email: string };

type AuthContextValue = {
  isAuthenticated: boolean;
  user: User | null;
  register: (user: User) => void;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "remate.auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    try {
      if (u) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const value: AuthContextValue = {
    isAuthenticated: !!user,
    user,
    register: (u) => {
      // Mock: store pending registration; do not auto-login
      try {
        window.localStorage.setItem("remate.pendingUser", JSON.stringify(u));
      } catch {
        // ignore
      }
    },
    login: (email) => {
      let name = email.split("@")[0] ?? "Member";
      try {
        const raw = window.localStorage.getItem("remate.pendingUser");
        if (raw) {
          const pending = JSON.parse(raw) as User;
          if (pending.email === email) name = pending.name;
        }
      } catch {
        // ignore
      }
      persist({ name, email });
    },
    logout: () => persist(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
