
import { XCircle } from "lucide-react";

import * as z from 'zod';

import { useCreateCategory } from "@/store/create-cat-modal";
import { useState } from "react";
import { useCategoryStore } from "@/store/create-cat-modal";

export const CategoryModal = () => {

  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const { addCategory } = useCategoryStore();

  const formSchema = z.object({
    category: z.string().min(2, {
      message: 'category must be a minimum of 2 characters'
    }).max(12, {
      message: 'category name has to be less than 12 characters'
    }),
  });

  const { onClose } = useCreateCategory();
  
  const close = useCreateCategory((state) => state.onClose);

  const handleSubmit = async () => {
    try {
      const data = formSchema.parse({ category });
      addCategory(data);
      onClose();
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    }
  };


  return (
   <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 m-4 max-w-md w-full">
        <div className="flex justify-end mb-4">
          <button
            className="text-gray-700 hover:text-red-600"
            onClick={close}
          >
            <XCircle />
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter category..."
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-200"
          />
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={close}
            className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black rounded-lg transition duration-200"
          >
            Close Modal
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
 
  )
};