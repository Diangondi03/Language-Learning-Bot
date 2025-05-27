

const DeleteModal = () => {


    const handleDelete = () => {
        //
    }
    return (
        <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box dark:bg-neutral-800">
                <p className="py-4">Are you sure you want to delete this chat?</p>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn btn-error mx-2" onClick={handleDelete}>Delete</button>
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteModal