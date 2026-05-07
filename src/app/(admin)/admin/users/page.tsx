"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, UserCheck, UserX, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { apiGet, apiPatch } from "@/lib/api";
import { StatusBadge }      from "@/components/shared/StatusBadge";
import { formatDate }       from "@/utils/format";
import type { ApiResponse, User } from "@/types";

export default function AdminUsersPage() {
  const qc      = useQueryClient();
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "users", search],
    queryFn:  () => apiGet<ApiResponse<User[]>>("/admin/users", { search: search || undefined }),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "ACTIVE" | "SUSPENDED" }) =>
      apiPatch(`/admin/users/${id}/status`, { status }),
    onSuccess: (_, vars) => {
      toast.success(`User ${vars.status === "ACTIVE" ? "activated" : "suspended"}`);
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const users = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground">Manage platform users</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-lg border pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="noor-card overflow-hidden">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              {["User", "Role", "Status", "Joined", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">
                          {u.name[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{u.name}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs capitalize bg-muted rounded-md px-2 py-1">
                        {u.role.toLowerCase().replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3">
                      {u.role !== "ADMIN" && (
                        <button
                          onClick={() => toggleMutation.mutate({
                            id: u.id,
                            status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
                          })}
                          disabled={toggleMutation.isPending}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                            u.status === "ACTIVE"
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          }`}
                        >
                          {toggleMutation.isPending
                            ? <Loader2 className="h-3 w-3 animate-spin" />
                            : u.status === "ACTIVE"
                              ? <UserX className="h-3 w-3" />
                              : <UserCheck className="h-3 w-3" />
                          }
                          {u.status === "ACTIVE" ? "Suspend" : "Activate"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {users.length === 0 && !isLoading && (
          <div className="px-6 py-12 text-center text-muted-foreground text-sm">No users found.</div>
        )}
      </div>
    </div>
  );
}
