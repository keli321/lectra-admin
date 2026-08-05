export default function Pagination({ reducePage, addPage, goToPage, currentPage, lastPage }) {
    return (
        <div className="justify-self-center flex gap-2 text-white mt-6 font-semibold">
            <button className="bg-gray-500 w-6 flex justify-center cursor-pointer"
                onClick={reducePage}>&lt;</button>
            <button className="bg-gray-500 w-6 flex justify-center cursor-pointer"
                onClick={goToPage}>1</button>
            <span className="text-black">{currentPage}</span>
            <button className="bg-gray-500 w-6 flex justify-center cursor-pointer"
                onClick={goToPage}>{lastPage}</button>
            <button className="bg-gray-500 w-6 flex justify-center cursor-pointer"
                onClick={addPage}>&gt;</button>
        </div>
    )
}