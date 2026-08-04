import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function DashCard({
    title,
    value,
    icon,
    color = "bg-violet-100",
    iconColor = "text-violet-600",
    chartColor = "#8b5cf6",
}) {

    return (
        <div className="relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${color}`}>
                    <FontAwesomeIcon icon={icon} className={`text-lg sm:text-xl ${iconColor}`} />
                </div>
                <button className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>
            </div>
            <div className="mt-3">
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 truncate">{value}</h2>
                <p className="mt-1 text-xs flex flex-wrap items-center gap-1">
                    <span className="inline-flex items-center gap-1 font-semibold text-green-600">
                        <FontAwesomeIcon icon={faArrowUp} className="text-[10px]" />
                        10%
                    </span>
                    <span className="text-gray-500">from last check</span>
                </p>
            </div>
            {/* <div className="mt-3 h-10 sm:h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 2, left: 0 }}>
                        <defs>
                            <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="y" stroke={chartColor}
                            strokeWidth={2} fill={`url(#grad-${title})`} isAnimationActive={true}
                            animationDuration={400} />
                    </AreaChart>
                </ResponsiveContainer>
            </div> */}
        </div>
    );
}