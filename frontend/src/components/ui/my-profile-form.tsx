'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useGetUserDetailsQuery } from "@/services/auth.service"

export function MyProfileForm() {

  const { data } = useGetUserDetailsQuery();


  const [firstName, setFirstName] = useState(data?.name)
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("06.12.34.56.78")
  const [email, setEmail] = useState(data?.email)
  const [role, setRole] = useState(data?.role)

  const [openPopover, setOpenPopover] = useState(false)
  const [openDeletePopover, setOpenDeletePopover] = useState(false)


  return (

    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Mon profil</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Rôle</Label>
            <Input
              id="role"
              value={role}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Numéro de téléphone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Adresse mail</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-start gap-4">
          <Popover open={openDeletePopover} onOpenChange={setOpenDeletePopover}>
            <PopoverTrigger asChild>
              <Button
                variant="destructive"
                effect="shineHover"
                onClick={() => setOpenDeletePopover(true)}
              >
                Supprimer le compte
              </Button>
            </PopoverTrigger>
            <PopoverContent className="text-sm">
              ⚠️ Êtes-vous sûr de vouloir supprimer votre compte ?
              <div className="mt-2 flex justify-end gap-2">
                <Button size="sm" variant="ghost" onClick={() => setOpenDeletePopover(false)}>
                  Annuler
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    // Action réelle de suppression ici
                    setOpenDeletePopover(false)
                  }}
                >
                  Confirmer
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
              <Button
                variant="success"
                effect="shineHover"
                onClick={() => {
                  setOpenPopover(true)
                  setTimeout(() => setOpenPopover(false), 1500)
                }}
              >
                Sauvegarder les modifications
              </Button>
            </PopoverTrigger>
            <PopoverContent className="text-sm">
              ✅ Modifications sauvegardées !
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
    </div>
  )
}
