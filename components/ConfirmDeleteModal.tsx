import { Button } from "./ui/button";

type Props = {
    handleDelete: () => void;
};

const ConfirmDeleteModal = ({ handleDelete }: Props) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 m-4 max-w-md w-full">
                Deleting this category will delete all associated accounts. Still delete?
                <div>
                    <Button onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmDeleteModal;