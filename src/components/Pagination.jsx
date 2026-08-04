export default function Pagination({lastPage}) {
    return (
        <div className="justify-self-center flex gap-2 text-white mt-6 font-semibold">
            <button className="bg-gray-500 w-6 flex justify-center cursor-pointer">&lt;</button>
            <button className="bg-gray-500 w-6 flex justify-center cursor-pointer">1</button>
            <button className="bg-gray-500 w-6 flex justify-center cursor-pointer">{lastPage}</button>
            <button className="bg-gray-500 w-6 flex justify-center cursor-pointer">&gt;</button>
        </div>
    )
}