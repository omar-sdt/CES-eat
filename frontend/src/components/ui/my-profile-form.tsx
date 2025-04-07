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
import { cn } from "@/lib/utils"
import { useState } from "react"

type MyProfileFormProps = {
  name?: string
  email?: string
} & React.ComponentPropsWithoutRef<"div">

export function MyProfileForm({
  className,
  name: nameProp,
  email: emailProp,
  ...props
}: MyProfileFormProps) {

  const [firstName, setFirstName] = useState(nameProp || "")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("06.12.34.56.78")
  const [email, setEmail] = useState(emailProp || "")

  return (

    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
            <Button variant="destructive" effect="shineHover">Supprimer le compte</Button>
            <Button variant="success" effect="shineHover">Sauvegarder les modifications</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
