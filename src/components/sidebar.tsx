import React from "react";
import { Laptop, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <SidebarProvider>
      <ShadcnSidebar className="flex-shrink-0 w-64 h-full border-r border-gray-200">
        <SidebarHeader className="p-4">
          <h2 className="text-xl font-bold">Manage Deployments</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {/* Deployed Models Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/deployed-models")}
              >
                <Link
                  to="/dashboard/deployed-models"
                  className={`flex items-center ${
                    isActive("/dashboard/deployed-models")
                      ? "font-bold text-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  <Laptop className="mr-2 w-4 h-4" />
                  <span>Deployed Models</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Create Model Link */}
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/dashboard/create-model")}
              >
                <Link
                  to="/dashboard/create-model"
                  className={`flex items-center ${
                    isActive("/dashboard/create-model")
                      ? "font-bold text-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  <Plus className="mr-2 w-4 h-4" />
                  <span>Create New Model</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </ShadcnSidebar>
    </SidebarProvider>
  );
}
