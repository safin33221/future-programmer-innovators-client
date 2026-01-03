"use client";

import LogoutBtn from "@/components/shared/LogoutBtn";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IUserInfo } from "@/types/user/user.interface";
import { Lock, User, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserDropdown({ userInfo }: { userInfo: IUserInfo | null }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">
            {userInfo?.name || "User"}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* User info */}
        <DropdownMenuLabel className="text-sm">
          <div className="font-semibold">{userInfo?.name || "User"}</div>
          <div className="text-xs text-gray-500">{userInfo?.email}</div>
          <div className="text-xs text-blue-500">{userInfo?.role}</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2"
        >
          <User2 className="w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/change-password")}
          className="flex items-center gap-2"
        >
          <Lock className="w-4" />
          Change Password
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem className="p-0 w-full ">
          <LogoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
