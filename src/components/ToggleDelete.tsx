type Props = {
  onToggle: () => void;
  onDelete: () => void;
};

const ToggleDelete = ({ onToggle, onDelete }: Props) => {
  return (
    <div
      className="fixed left-0 top-0 z-20 h-full w-full bg-black/50"
      onClick={onToggle}
    >
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-white p-12">
        <h2 className="text-xl">
          Are you sure you want to delete this product?
        </h2>
        <h3 className="text-sm text-red-500">
          If you do this, the product will be permanently deleted.
        </h3>
        <div className="flex gap-4 self-end">
          <button
            className="rounded-md bg-black px-4 py-2 text-sm text-white"
            onClick={() => onToggle()}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="rounded-md bg-red-500 px-4 py-2 text-sm text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleDelete;
