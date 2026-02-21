import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Project, uploadTypes } from "../types";

// ==========================================
// ➕ CREATE
// ==========================================
export function useAddProjectQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: uploadTypes) => {
      const res = await axios.post("/api/project", data);
      console.log(res.data);

      return res.data as { message: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
}

// ==========================================
// 📖 READ (Admin)
// ==========================================
export function useGetAdminProject() {
  return useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const res = await axios.get("/api/project/admin");
      return res.data as Project[];
    },
  });
}

// ==========================================
// 📖 READ (Public)
// ==========================================
export function useGetAllProject(limit?: number) {
  return useQuery({
    queryKey: ["projects", limit],
    queryFn: async () => {
      const res = await axios.get(`/api/project?limit=${limit}`);
      return res.data as Project[];
    },
  });
}

// ==========================================
// 📢 PUBLISH
// ==========================================
export function usePublishProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const res = await axios.put(`/api/project/publish/${projectId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
}

// ==========================================
// ✏️ EDIT
// ==========================================
export function useEditProject() {
  const queryClient = useQueryClient();

  return useMutation({
    // We pass both the ID to find the project, and the new data to update it
    mutationFn: async ({ projectId, data }: { projectId: string; data: uploadTypes }) => {
      const res = await axios.put(`/api/project/${projectId}`, data);
      return res.data as { message: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
}

// ==========================================
// 🗑️ DELETE
// ==========================================
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const res = await axios.delete(`/api/project/${projectId}`);
      return res.data as { message: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
}