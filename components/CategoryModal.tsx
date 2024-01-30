import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { useCreateCategory } from "@/store/create-cat-modal"


export default function CategoryModal() {

  const close = useCreateCategory((state) => state.onClose);
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="category-name">
                Category Name
              </Label>
              <Input className="col-span-3" id="category-name" placeholder="Enter category name" />
            </div>
          </div>
          <DialogFooter>
            <div>
              <Button onClick={close} variant="outline">Cancel</Button>
            </div>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}