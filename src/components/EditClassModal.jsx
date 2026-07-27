const EditClassModal = ({ selectedClass, isOpen, onClose })=> {
  if (!isOpen) return null;
  
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
      <h2>Edit Class</h2>
      <form>
      <input type="text" defaultValue={selectedClass?.course}/>
      <input type="text" defaultValue={selectedClass?.day}/>
      <input type="text" defaultValue={selectedClass?.time}/>
      <input type="text" defaultValue={selectedClass?.venue}/>

      <div className="modal-btn">
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="submit">Save Changes</button>
      </div>
      </form>

      </div>
    </div>
  );
};
export default EditClassModal;