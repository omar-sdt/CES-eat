import { MyProfileForm } from "@/components/ui/my-profile-form"
import { SecurityForm } from "@/components/ui/security-form"

const Profile = () => {
    return (
      <>
        <div className="flex w-full justify-center">
          <div className="w-full max-w-7xl mt-4 flex gap-4 px-4">
            <div className="flex-1">
              <MyProfileForm />
            </div>
            <div className="flex-1">
              <SecurityForm />
            </div>
          </div>
        </div>
      </>
    )
  }
  

export default Profile