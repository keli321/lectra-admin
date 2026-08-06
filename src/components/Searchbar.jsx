import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function Searchbar({ setSearchToggle, page }) {
    return (
        <div className="">
            <div className="relative">
                <input className="w-full border rounded-sm px-4 py-2 pr-8 max-w-50 bg-white"
                    placeholder={`Search ${page}`} />
                <FontAwesomeIcon icon={faMagnifyingGlass}
                    onClick={setSearchToggle}
                    className="absolute top-[30%] -translate-x-7" />
            </div>
        </div>
    )
}