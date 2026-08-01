import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteBox from "./DeleteBox";

export default function Table({ deleteFunc, info, id, one, two, three, four, five }) {

    const [showDelete, setShowDelete] = useState(false);

    return (
        <>
            <tr key={id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                <td className="px-5 py-4">{one}</td>
                <td className="px-5 py-4">{two}</td>
                <td className="px-5 py-4">{three}</td>
                <td className="px-5 py-4">{four}</td>
                {five && <td className="px-5 py-4">{five}</td>}
                <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                        <button className="rounded-md p-2 hover:bg-blue-100"><FontAwesomeIcon icon={faPencil} /></button>
                        <button className="rounded-md p-2 hover:bg-red-100"
                            onClick={() => setShowDelete(prev => !prev)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </td>
            </tr>
            {showDelete && <DeleteBox info={info} deleteFunc={deleteFunc} closeFunc={() => setShowDelete(false)} />}
        </>
    )
}