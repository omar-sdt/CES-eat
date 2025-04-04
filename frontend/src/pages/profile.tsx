import { MyProfileForm } from "@/components/ui/my-profile-form"
import { SecurityForm } from "@/components/ui/security-form"

const Profile = () => {
    return (
        <>

                    <div className="flex w-full justify-center">
                        <div className="w-full max-w-3xl mt-4">
                            
                            <SecurityForm/>
                        </div>
                    </div>
        </>
    )
}

export default Profile