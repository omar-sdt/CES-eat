import { MyProfileForm } from "@/components/ui/my-profile-form"
import { SecurityForm } from "@/components/ui/security-form"

import {useGetUserDetailsQuery} from "@/services/auth.service.ts";

const Profile = () => {
    const { data } = useGetUserDetailsQuery();

    return (
      <>
        <div className="flex w-full justify-center">
          <div className="w-full max-w-7xl mt-4 flex gap-4 px-4">
            <div className="flex-1">
              <MyProfileForm 
                name={data?.name}
                email={data?.email}/>
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