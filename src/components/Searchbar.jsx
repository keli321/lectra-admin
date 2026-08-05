import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

export default function Searchbar({setSearchToggle}) {
    return (
        <div className="">
            <div className="relative">
                <FontAwesomeIcon icon={faMagnifyingGlass}
                onClick={setSearchToggle}
                className="absolute top-1/4 translate-x-1.5" />
                <input className="w-full border rounded-2xl py-1 pl-8 max-w-50" />
            </div>
        </div>
    )
}