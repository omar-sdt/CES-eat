'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function SecurityForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [newPassword, setNewPassword] = useState("Mot de passe")
  const [confirmPassword, setConfirmPassword] = useState("Mot de passe")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const getInputType = (value: string, isVisible: boolean) => {
    if (value === "Mot de passe") return "text"
    return isVisible ? "text" : "password"
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sécurité</CardTitle>
          <CardDescription>
            Votre mot de passe doit comporter au moins 8 caractères, dont au moins un chiffre et un caractère non numérique :
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-2 relative">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={getInputType(newPassword, showNewPassword)}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => {
                  if (newPassword === "Mot de passe") setNewPassword("")
                }}
                className="pr-10"
              />
              <div className="absolute right-3 inset-y-0 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="text-black"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="confirmPassword">Confirmation du nouveau mot de passe</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={getInputType(confirmPassword, showConfirmPassword)}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => {
                  if (confirmPassword === "Mot de passe") setConfirmPassword("")
                }}
                className="pr-10"
              />
              <div className="absolute right-3 inset-y-0 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-black"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-start">
          <Button variant="success" effect="shineHover">Mettre à jour</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
