import { Dish } from "@/schemas/dishSchema";
import { useAppDispatch } from "@/store.ts";
import React from "react";
import { addToCart } from "@/features/cart-slice.ts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";


export function DialogChooseMenu({ dish }: { dish: Dish; }) {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const formRef = React.useRef<HTMLFormElement>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const quantity = Number(formData.get("quantity"));

        if (!quantity || quantity < 1) return;

        dispatch(addToCart({ dish, quantity }));

        // Optionnel : Reset le form et ferme le modal
        formRef.current?.reset();

        setModalOpen(false);
    };

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <TooltipProvider>
                <Tooltip>
                    <DialogTrigger asChild>
                        <TooltipTrigger asChild>
                            <button className="z-2 absolute bottom-2 right-2 bg-white border border-green-primary
                                    rounded-full p-2 cursor-pointer transition-all duration-300
                                    group-hover:bottom-1/2 group-hover:translate-y-1/2">
                                <Plus size={20} className="text-black" />
                            </button>
                        </TooltipTrigger>
                    </DialogTrigger>
                    <TooltipContent side="top" align="end">
                        <p>Ajouter ce menu au panier</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter {dish.name} au panier</DialogTitle>
                </DialogHeader>

                <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Quantité</Label>
                        <Input
                            id="quantity"
                            name="quantity"
                            type="number"
                            defaultValue={1}
                            min={1}
                            max={99}
                            step={1}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Ajouter au panier
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}