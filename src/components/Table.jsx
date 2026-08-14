export default function Table({
    headArray,
    children,
    ...props
}) {

    return (
        <table className="w-full border-collapse bg-white shadow-sm rounded overflow-hidden">
            {headArray &&
                <>
                    <thead>
                        <tr {...props}>
                            {headArray.map(arr => <th className="p-3">{arr}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </>}
        </table>
    )
}