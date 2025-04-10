import {
  LogOut,
  ReceiptText,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/auth.slice.ts";
import { useGetUserDetailsQuery } from "@/services/auth.service";

export function DropdownNavbar() {
  const dispatch = useDispatch();
  const { data } = useGetUserDetailsQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="navbar" effect="shineHover" className="">
          <User />
          {data?.name || "Mon compte"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/profile">
            <DropdownMenuItem>
              <User />
              <span>Profil</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/orders">
            <DropdownMenuItem>
              <ReceiptText />
              <span>Mes commandes</span>
            </DropdownMenuItem>
          </Link>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => dispatch(logout())}>
          <LogOut />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
