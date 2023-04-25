import { decodeToken } from "@/utils/jwt"
import { cookies } from "next/headers"
import { IoSchoolOutline } from "react-icons/io5"
import Link from "next/link"

export default async function studentDashboard() {
    const session = decodeToken(cookies().get("jwt_token")?.value)

    return (
        <main className="">
            <div className="mb-[13vh]">&nbsp;</div>

            <div className="flex items-center justify-center gap-28">
                <Link
                    href="/profile"
                    className="flex flex-col items-center justify-center rounded-md bg-gray-200 w-72 h-80 border-2 border-gray-300 py-5 px-16 cursor-pointer"
                >
                    <h1 className="font-semibold text-xl">Profile</h1>
                    <h2 className="flex items-center justify-center rounded-full bg-gray-300 w-36 h-36 text-gray-400 text-8xl font-bold my-6">
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
                    href="/classes"
                    className="text-center rounded-md bg-gray-200 w-72 h-80 border-2 border-gray-300 py-5 cursor-pointer"
                >
                    <h1 className="font-semibold text-xl">Manage Classes</h1>

                    <IoSchoolOutline className="text-gray-400 font-bold text-9xl mt-10 mx-auto" />
                </Link>
            </div>
        </main>
    )
}
