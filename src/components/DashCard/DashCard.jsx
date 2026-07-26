import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function DashCard({ headerIcon, heading, number, iconBgColor, smallText, trend, note}) {
    return (
        <div className="flex h-30 items-center overflow-hidden rounded-lg bg-white shadow-[0_0_5px_1px_rgb(173,149,149)]">
            <div className="flex h-full flex-1 items-start justify-center pt-4 max-w-[25%]">
                <div className="grid h-10 w-10 place-items-center rounded-full p-1 text-2xl"
                    style={iconBgColor ? { background: iconBgColor } : {}}>
                    <FontAwesomeIcon icon={headerIcon} />
                </div>
            </div>
            <div className="flex h-full min-w-[70%] flex-[2] flex-col justify-center gap-2">
                <span className="font-bold">{heading}</span>
                <span className="text-[1.2em] font-bold">{number}</span>
                {smallText ? (
                    <span className="flex text-green-600">
                        +{smallText} this month

                        <span className="ml-auto mr-4">
                            <FontAwesomeIcon icon={trend} />
                        </span>
                    </span>
                ) : (
                    <span className="text-gray-600">
                        {note}
                    </span>
                )}
            </div>
        </div>
    );
}