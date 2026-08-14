import { useState } from "react"
import Searchbar from "./Searchbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { addS } from "../utils/functions";

export default function Top({ name, openAddModal, search }) {

    const [searchToggle, setSearchToggle] = useState(false)

    return (
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{addS(name)}</h1>
            <div className="flex gap-2 items-center">
                {search ?
                    searchToggle ? (
                        <Searchbar page={"Departments"} setSearchToggle={() => setSearchToggle(prev => !prev)}
                            setSearch={(e) => setSearch(e.target.value)} />
                    ) : (
                        <div className="relative">
                            <button className="before:block before:absolute before:bg-gray-400 before:transition-all before:duration-600 hover:before:content-['Search'] before:-top-6 before:-left-4
                                    before:text-white before:opacity-0 hover:before:opacity-100 before:px-2 py-1"
                                onClick={() => setSearchToggle(prev => !prev)}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    ) : ""}
                <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                    onClick={openAddModal}>+ Add {name}</button>
            </div>
        </div>
    )
}