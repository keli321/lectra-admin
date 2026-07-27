const DeleteClassModal = ({selectedClass, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (

    <div className="modal" onClick={onclose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>
          Are you sure you want to delete {selectedClass?.course} ?
        </h3>

        <div className="modal-btn">
          <button onClick={onClose}>
            Cancel
          </button>
          <button onClick={() => {
            console.log('Deleted:', selectedClass);
            onClose();}}> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteClassModal;