'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUser, registerUserSchema } from "@/schemas/userSchema";
import { useDispatch } from "react-redux";
import { registerUser } from "@/features/auth/auth.actions.ts";
import { AppDispatch } from "@/store.ts";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Controller } from "react-hook-form"

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control, // Ajouté pour le Select
        formState: { errors },
    } = useForm<RegisterUser>({
        resolver: zodResolver(registerUserSchema)
    });

    const onSubmit = async (data: RegisterUser) => {
        try {
            const user = await dispatch(registerUser(data)).unwrap();
            toast.success(`Ton compte a été créé, ${user.name} !`);
            navigate("/login");
        } catch (err: any) {
            console.log(err);
            toast.error("Erreur inconnue");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Créer un compte</CardTitle>
                    <CardDescription>
                        Entrer votre email ci-dessous pour créer un compte.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Nom</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Adresse Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@ceseat.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <a
                                        href="#"
                                        className="text-green-primary ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Mot de passe oublié?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="role">Rôle</Label>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Sélectionner un rôle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="USER">Utilisateur</SelectItem>
                                                    <SelectItem value="RESTAURANT">Restaurateur</SelectItem>
                                                    <SelectItem value="DELIVERY">Livreur</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.role && (
                                    <p className="text-red-500 text-sm">{errors.role.message}</p>
                                )}
                            </div>

                            <Button type="submit" effect="shineHover" className="w-full">
                                Créer un compte
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Vous avez déjà un compte?{" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Se connecter
                            </Link>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    {/* Footer content */}
                </CardFooter>
            </Card>
        </div>
    )
}