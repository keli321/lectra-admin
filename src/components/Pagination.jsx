export default function Pagination({ start, end, howMany, reducePage, goToPage, addPage, currentPage, lastPage, setThisEnd }) {
    return (
        <div className="flex justify-between mt-6 font-semibold">
            <span>Results: {start} - {end} of {howMany}</span>
            <div className="flex gap-4">
                <div className="flex gap-6 text-gray-500">
                    <button onClick={reducePage}
                        className="cursor-pointer">&lt;</button>
                    <button onClick={goToPage}
                        className={`cursor-pointer ${1 === currentPage ? "text-black" : ""}`}>1</button>
                    <span className="text-black flex items-center">{currentPage}</span>
                    <span className="flex items-center">...</span>
                    <button onClick={goToPage}
                        className={`cursor-pointer ${lastPage === currentPage ? "text-black" : ""}`}>{lastPage}</button>
                    <button onClick={addPage}
                        className="cursor-pointer">&gt;</button>
                </div>
                <select name="page" id="page" onChange={setThisEnd}
                    className="hidden md:flex bg-gray-200 font-normal p-2 focus:outline-0">
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="15">15 per page</option>
                    <option value="20">20 per page</option>
                </select>
            </div>
        </div>
    )
}