import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { removeLastString } from "../utils/functions";

export default function Top({ page, formControl, readInput }) {
    return (
        <>
            <h1 className="font-bold text-xl mb-4">{page}</h1>
            <div className="mb-6 flex flex-wrap justify-between gap-4">
                <search className="flex items-center relative ">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute ml-2 " />
                    <input type="search" placeholder="Search..."
                        className="border rounded-xl w-[15em] h-8 pl-8 md:pr-2"
                        onChange={readInput} />
                </search>
                <button className="bg-[#FFC107] px-2 rounded-md cursor-pointer"
                    onClick={formControl}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add {removeLastString(page)}
                </button>
            </div>
        </>
    )
}