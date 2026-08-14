import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashCard({
    title,
    value,
    icon,
    text
}) {
    const [number, setNumber] = useState(0);

    const MAX = 10;
    const MIN = 1;

    useEffect(() => {
        const interval = setInterval(() => {
            setNumber(Math.floor(Math.random() * (MAX - MIN) + MIN))
        }, 10000);

        return () => clearInterval(interval)
    })

    return (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between sm:last:col-span-2 xl:last:col-span-1">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{title}</span>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <FontAwesomeIcon icon={icon} className="text-lg sm:text-xl text-violet-600" />
                </div>
            </div>
            <div className="mt-1">
                <div className="text-2xl font-bold text-slate-800">{title.toLowerCase().includes("notification") ? number : value}</div>
                <p className="text-xs text-slate-400 mt-1">{text}</p>
            </div>
        </div>
    );
}