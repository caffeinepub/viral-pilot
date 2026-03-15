import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ContactSubmission,
  SavedContent,
  ToolUsageStats,
  UserStats,
} from "../backend.d";
import { useAuth } from "../context/AuthContext";
import { useActor } from "./useActor";

export function useSavedContent() {
  const { actor, isFetching } = useActor();
  const { isAuthenticated } = useAuth();
  return useQuery<SavedContent[]>({
    queryKey: ["savedContent"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSavedContent();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useFavoriteTools() {
  const { actor, isFetching } = useActor();
  const { isAuthenticated } = useAuth();
  return useQuery<string[]>({
    queryKey: ["favoriteTools"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavoriteTools();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useSavedContentCount() {
  const { actor, isFetching } = useActor();
  const { isAuthenticated } = useAuth();
  return useQuery<bigint>({
    queryKey: ["savedContentCount"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getSavedContentCount();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });
}

export function useSaveContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: SavedContent) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveContent(content);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["savedContent"] });
      qc.invalidateQueries({ queryKey: ["savedContentCount"] });
    },
  });
}

export function useDeleteContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteContent(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["savedContent"] });
      qc.invalidateQueries({ queryKey: ["savedContentCount"] });
    },
  });
}

export function useFavoriteTool() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (toolId: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.favoriteTool(toolId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["favoriteTools"] }),
  });
}

export function useUnfavoriteTool() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (toolId: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.unfavoriteTool(toolId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["favoriteTools"] }),
  });
}

export function useRecordToolUsage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (toolName: string) => {
      if (!actor) return;
      await actor.recordToolUsage(toolName);
    },
  });
}

export function useAdminUsers() {
  const { actor, isFetching } = useActor();
  return useQuery<UserStats[]>({
    queryKey: ["adminUsers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminContacts() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactSubmission[]>({
    queryKey: ["adminContacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlatformStats() {
  const { actor, isFetching } = useActor();
  return useQuery<ToolUsageStats[]>({
    queryKey: ["platformStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPlatformToolUsageStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTotalUserCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["totalUserCount"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getTotalUserCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTotalUsageStats() {
  const { actor, isFetching } = useActor();
  return useQuery<{ breakdown: ToolUsageStats[]; totalUses: bigint }>({
    queryKey: ["totalUsageStats"],
    queryFn: async () => {
      if (!actor) return { breakdown: [], totalUses: 0n };
      return actor.getTotalUsageStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(name, email, message);
    },
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: import("../backend.d").UserProfile) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}
