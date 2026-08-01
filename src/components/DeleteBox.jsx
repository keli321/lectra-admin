import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function DeleteBox({ info, deleteFunc, closeFunc }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white px-7 border border-gray-300 max-w-xs rounded-md h-60 flex flex-col items-center justify-center gap-3 shadow-lg">
                <div className="w-fit h-fit bg-amber-200 rounded-full p-2">
                    <FontAwesomeIcon icon={faTriangleExclamation} color="#FFC107" className="text-4xl" />
                </div>
                <h1 className="font-bold">Delete {info}?</h1>
                <p className="text-xs text-center font-semibold text-gray-600">
                    Are you sure you want to delete this {info.toLowerCase()}? This action cannot be undone.
                </p>
                <div className="w-full flex justify-around gap-4 mt-2">
                    <button
                        className=" cursor-pointer w-[50%] px-4 border border-gray-300 text-[12px] font-bold rounded h-8 hover:bg-gray-50"
                        onClick={closeFunc}>Cancel</button>
                    <button className=" cursor-pointer w-[50%] text-white px-4 bg-red-600 text-[12px] font-bold rounded hover:bg-red-700"
                        onClick={() => { deleteFunc(); closeFunc(); }}>Delete</button>
                </div>
            </div>
        </div>
    );
}
