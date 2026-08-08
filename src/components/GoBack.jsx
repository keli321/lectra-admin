import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function GoBack({ title }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-3 md:hidden py-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
                onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
        </div>
    );
}