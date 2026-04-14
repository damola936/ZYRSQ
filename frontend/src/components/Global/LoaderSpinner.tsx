import { Loader2 } from "lucide-react"

function LoaderSpinner() {
    return (
        <div className="flex items-center justify-center">
            <Loader2 className="animate-spin size-10 text-primary" />
        </div>
    )
}
export default LoaderSpinner