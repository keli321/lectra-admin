import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashCard({
    title,
    value,
    icon,
    text
}) {

    return (
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between sm:last:col-span-2 xl:last:col-span-1">
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-slate-500">{title}</span>
                <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <FontAwesomeIcon icon={icon} className="text-lg sm:text-xl text-violet-600" />
                </div>
            </div>
            <div class="mt-1">
                <div class="text-2xl font-bold text-slate-800">{value}</div>
                <p class="text-xs text-slate-400 mt-1">{text}</p>
            </div>
        </div>
    );
}