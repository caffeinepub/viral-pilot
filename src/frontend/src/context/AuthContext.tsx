import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { UserProfile } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
  principal: string | null;
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  plan: string;
  loginStatus: string;
  loginError?: Error;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isLoading: true,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  principal: null,
  profile: null,
  refreshProfile: async () => {},
  plan: "free",
  loginStatus: "idle",
  loginError: undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, clear, loginStatus, identity, isInitializing, loginError } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const isAuthenticated = loginStatus === "success";
  const isLoading = isInitializing || isFetching;
  const principal = identity?.getPrincipal().toString() ?? null;

  const refreshProfile = useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    try {
      const [p, adminCheck] = await Promise.all([
        actor.getCallerUserProfile(),
        actor.isCallerAdmin(),
      ]);
      if (p) setProfile(p);
      setIsAdmin(adminCheck);
    } catch (e) {
      console.error("Failed to load profile", e);
    }
  }, [actor, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && actor && !isFetching) {
      refreshProfile();
    } else if (!isAuthenticated) {
      setProfile(null);
      setIsAdmin(false);
    }
  }, [isAuthenticated, actor, isFetching, refreshProfile]);

  const logout = () => {
    clear();
    setProfile(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isAdmin,
        login,
        logout,
        principal,
        profile,
        refreshProfile,
        plan: profile?.plan ?? "free",
        loginStatus,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
