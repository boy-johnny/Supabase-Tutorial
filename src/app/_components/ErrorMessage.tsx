import { TiDelete } from "react-icons/ti";

export const ErrorMessage = ({error}: {error: string}) => {
return (
    error ? <div className="rounded-md bg-red-50 p-4">
    <div className="flex">
        <div className="flex-shrink-0">
            <TiDelete className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
        </div>
    </div>
    </div> : null
)}