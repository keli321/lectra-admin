export default function Pagination({ start, end, howMany, reducePage, goToPage, addPage, currentPage, lastPage }) {
    return (
        <div className="flex justify-between mt-6 font-semibold">
            <span>Results: {start} - {end} of {howMany}</span>
            <div className="flex gap-6 text-gray-500">
                <button onClick={reducePage}
                    className="cursor-pointer">&lt;</button>
                <button onClick={goToPage}
                    className="cursor-pointer">1</button>
                <span className="text-black">{currentPage}</span>
                <span className="block place-items-center">...</span>
                <button onClick={goToPage}
                    className="cursor-pointer">{lastPage}</button>
                <button onClick={addPage}
                    className="cursor-pointer">&gt;</button>
            </div>
        </div>
    )
}