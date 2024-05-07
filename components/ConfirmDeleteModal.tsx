import { Button } from "./ui/button";
import { XCircle } from "lucide-react";

type Props = {
    handleDelete: () => void;
    closeModal: () => void;
};

const ConfirmDeleteModal = ({ handleDelete, closeModal }: Props) => {


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 m-4 max-w-md w-full">
                <div className="flex justify-end mb-4">
                    <button
                        className="text-gray-700 hover:text-red-600"
                        onClick={closeModal}
                    >
                        <XCircle />
                    </button>
                </div>
                <div className="mb-4">
                    Deleting this category will delete all associated accounts. Still delete?
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmDeleteModal;