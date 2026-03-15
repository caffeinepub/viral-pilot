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
  login: () => void;
  logout: () => void;
  principal: string | null;
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  plan: string;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  principal: null,
  profile: null,
  refreshProfile: async () => {},
  plan: "free",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const isAuthenticated = loginStatus === "success";
  const isLoading = isInitializing || isFetching;
  const principal = identity?.getPrincipal().toString() ?? null;

  const refreshProfile = useCallback(async () => {
    if (!actor || !isAuthenticated) return;
    try {
      const p = await actor.getCallerUserProfile();
      if (p) setProfile(p);
    } catch (e) {
      console.error("Failed to load profile", e);
    }
  }, [actor, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && actor && !isFetching) {
      refreshProfile();
    } else if (!isAuthenticated) {
      setProfile(null);
    }
  }, [isAuthenticated, actor, isFetching, refreshProfile]);

  const logout = () => {
    clear();
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        principal,
        profile,
        refreshProfile,
        plan: profile?.plan ?? "free",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
