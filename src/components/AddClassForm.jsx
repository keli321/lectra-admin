import { useState } from "react";

const AddClassForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    week: "",
    course: "",
    day: "",
    startTime: "",
    endTime: "",
    venue: ""
  });
  if (!isOpen) return null; //hides it when not clicked

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose(); // close modal after save
  };

  return(

    <div className="modal" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>

    <form onSubmit={handleSubmit}>
      <input type="text" name="week" value={formData.week} placeholder="Week" onChange={handleChange}/>
      <input type="text" name="day" value={formData.day} placeholder="Day" onChange={handleChange}/>
      <input type="text" name="course" value={formData.course}  placeholder="Course" onChange={handleChange}/>
      <input type="text" name="startTime" value={formData.startTime} placeholder="startTime" onChange={handleChange}/>
      <input type="text" name="endTime" value={formData.endTime} placeholder="endTime" onChange={handleChange}/>
      <input type="text" name="venue" value={formData.venue}  placeholder="Venue" onChange={handleChange}/>

      <button type="button" onClick={onClose}>Cancel</button>
      <button type="submit">Add Class</button>
    </form>

    </div>
    </div>
  );
};
export default AddClassForm;