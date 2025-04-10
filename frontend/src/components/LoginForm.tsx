'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store.ts";
import { useForm } from "react-hook-form";
import { loginSchema, LoginUser } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/features/auth/auth.actions.ts";
import { toast } from "sonner";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginUser>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginUser) => {
        try {
            await dispatch(loginUser(data)).unwrap();

            toast.success('Tu es connecté !');
            navigate("/home");
        } catch (err: any) {
            // err est typé avec ton RegisterUserError
            console.log(err);
            toast.error("Erreur inconnue");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Connexion</CardTitle>
                    <CardDescription>
                        Entrer votre email ci-dessous pour vous connecter à votre compte.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Adresse Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@ceseat.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500">{errors.email.message}</p>
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
                                    <p className="text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <Button type="submit" effect="shineHover" className="w-full">
                                Se connecter
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Pas encore de compte?{" "}
                            <Link to="/register" className="underline underline-offset-4">
                                Créer un compte
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
