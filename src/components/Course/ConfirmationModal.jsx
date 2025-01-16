const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <p className="text-lg mb-4">{message}</p>
      <div className="flex justify-end space-x-4">
        <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;
