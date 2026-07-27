const TimetableTable = ({ classes, onEditClick,  onDeleteClick }) =>
{

  return(
    <div  className="table-container">

      <table>
        <thead>
          <th>Week</th>
          <th>Day</th>
          <th>Course</th>
          <th>Time</th>
          <th>Venue</th>
          <th>Actions</th>
        </thead>

        <tbody>
          {classes.map((item) => (

          <tr className="table-row" key ={item.id}>
            <td>{item.week}</td>
            <td>{item.day}</td>
            <td >{item.course}</td>
            <td>{item.time}</td>
            <td>{item.venue}</td>
            <td className="action-btns">
              <button onClick={() => onEditClick(item)}>Edit</button>
              <button onClick={() => onDeleteClick(item)}>Delete</button>
            </td>
          </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};
export default TimetableTable;