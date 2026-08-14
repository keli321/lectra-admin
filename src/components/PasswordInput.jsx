import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function PasswordInput({ ...props }) {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className="relative">
            <input {...props} type={isHidden ? "password" : "text"}  />
            <button type="button" className="absolute top-1/5 right-1/20"
                onClick={() => setIsHidden(prev => !prev)}>
                {isHidden ? <EyeOff /> : <Eye />}
            </button>
        </div>
    );
}