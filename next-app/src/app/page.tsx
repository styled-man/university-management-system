import { FaSchool } from "react-icons/fa"

export default async function Home() {
    return (
        <main className="flex mx-10 justify-between">
            <div className="mt-[35vh] text-4xl font-semibold">
                <h1>University Management System</h1>
            </div>
            <div className="text-slate-400 text-[30vw] mt-[10vh] mr-[5vw]">
                <FaSchool />
            </div>
        </main>
    )
}
