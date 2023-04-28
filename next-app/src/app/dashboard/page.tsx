import { decodeToken } from "@/utils/jwt"
import { cookies } from "next/headers"
import { IoSchoolOutline } from "react-icons/io5"
import Link from "next/link"

export default async function studentDashboard() {
    const session = decodeToken(cookies().get("jwt_token")?.value)

    return (
        <main className="">
            <div className="mb-[13vh] border-t-2 border-gray-400 w-full">&nbsp;</div>

            <div className="flex items-center justify-center gap-28">
                <Link
                    href="/profile"
                    className="flex flex-col items-center justify-center px-16 py-5 bg-gray-200 border-2 border-gray-300 rounded-md cursor-pointer w-72 h-80"
                >
                    <h1 className="text-xl font-semibold">Profile</h1>
                    <h2 className="flex items-center justify-center my-6 font-bold text-gray-400 bg-gray-300 rounded-full w-36 h-36 text-8xl">
                        <span className="">{session!.data.firstName.charAt(0)}</span>
                        <span className="">{session!.data.lastName.charAt(0)}</span>
                    </h2>
                    <h3 className="text-lg">
                        <span className="">{session!.data.firstName}</span>
                        <span className=""> </span>
                        <span className="">{session!.data.lastName}</span>
                    </h3>
                    <h3 className="text-sm">{session!.data.id}</h3>
                </Link>

                <Link
                    href="/dashboard/classes"
                    className="py-5 text-center bg-gray-200 border-2 border-gray-300 rounded-md cursor-pointer w-72 h-80"
                >
                    <h1 className="text-xl font-semibold">Manage Classes</h1>

                    <IoSchoolOutline className="mx-auto mt-10 font-bold text-gray-400 text-9xl" />
                </Link>
            </div>
        </main>
    )
}
