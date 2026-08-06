import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function DashCard({
    title,
    value,
    icon
}) {

    return (
        <div className=" flex gap-4 rounded-xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-violet-100">
                <FontAwesomeIcon icon={icon} className="text-lg sm:text-xl text-violet-600" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 truncate">{value}</h2>
            </div>
        </div>
    );
}