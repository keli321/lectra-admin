import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="h-full flex flex-col gap-4 border justify-center items-center">
            Page Not Found
            <p className="block">This page is still in development, please go back🥲</p>
            <div className="flex gap-4">
                <button onClick={() => navigate(-1)}
                    className="bg-blue-600 cursor-pointer">Go Back</button>
                <button onClick={()=> navigate("/dashboard")}
                className="bg-blue-600 cursor-pointer">Go to Dashboard</button>
            </div>
        </div>
    )
}