import Link from "next/link"

export default async function Classes() {
    return (
        <div className="flex flex-col items-center justify-center mt-[35vh]">
            <h1 className="font-bold text-gray-600 text-8xl">Page not yet Implemented!</h1>
            <Link className="mt-5 text-lg border-black hover:border-b-2 active:translate-y-1" href="/dashboard">
                Return to dashboard
            </Link>
        </div>
    )
}
