import { MoveRight } from "lucide-react"
import { Button } from "./ui/button"

interface SponsorshipSectionProps {
    titleText: string;
    btnText: string;
}


const SponsorshipSection = ({ titleText, btnText }: SponsorshipSectionProps) => {
    return (
        <div className="w-full flex flex-row gap2 justify-center items-center mt-4">
            <div className="flex flex-col gap-2 items-end">
                <h2 className="text-xl font-bold mb-4 text-right">{titleText}</h2>
                <Button variant="secondary" size="navbar" effect="shineHover">
                    {btnText}
                    <MoveRight />
                </Button>
            </div>

            <img
                src="/gift-card.svg"
                alt="Sponsorship img"
                className="w-[24rem] h-auto mt-4"
            />
        </div>
    )
}

export default SponsorshipSection