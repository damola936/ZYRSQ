import LoaderSpinner from "@/components/Global/LoaderSpinner";

function loading() {
    return (
        <div className="grid place-items-center h-screen">
            <LoaderSpinner />
        </div>
    )
}
export default loading