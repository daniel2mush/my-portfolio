import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Project, uploadTypes } from "../types";

export function useAddProjectQuery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: uploadTypes) => {
      const res = await axios.post("/api/product", data);
      console.log(res.data);

      return res.data as { message: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });
}

export function useGetAdminProject() {
  return useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const res = await axios.get("/api/product/admin");
      return res.data as Project[];
    },
  });
}

export function useGetroject() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axios.get("/api/product");
      return res.data as Project[];
    },
  });
}
