import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        <Button variant="ghost" size="sm" className="flex items-center">
          <UserCircle className="mr-2 w-5 h-5" />
          <span>Profile</span>
        </Button>
      </div>
    </header>
  );
}
