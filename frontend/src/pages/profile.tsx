import {useGetUserDetailsQuery} from "@/services/auth.service.ts";

const Profile = () => {
    const { data } = useGetUserDetailsQuery();

    return (
        <>
            <div>Mon compte</div>
            <div>
                data:
                {JSON.stringify(data, null, 2)}
            </div>
        </>
    )
}

export default Profile