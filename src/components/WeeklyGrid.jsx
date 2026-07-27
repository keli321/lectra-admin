const WeeklyGrid = () => {

  return(
    <div className="weekly-grid-container">

           <h2>Weekly Timetable</h2>

        <div className="weekly-grid">
           <div className="cell-header">Time</div> 
           <div className="cell-header">Mon</div>
           <div className="cell-header">Tue</div>
           <div className="cell-header">Wed</div>
           <div className="cell-header">Thur</div>
           <div className="cell-header">Fri</div>

           <div className="cell">08AM - 10AM</div> 
           <div className="cell">COM211</div>
           <div className="cell">COM215</div>
           <div className="cell">COM218</div>
           <div className="cell">GNS201</div>
           <div className="cell">COM215</div>

           <div className="cell">10AM - 12PM</div> 
           <div className="cell">EED216</div>
           <div className="cell">GNS201</div>
           <div className="cell">COM212</div>
           <div className="cell">-</div>
           <div className="cell">EED216</div>

           <div className="cell">12PM - 02PM</div> 
           <div className="cell">COM218</div>
           <div className="cell">COM214</div>
           <div className="cell">C0M212</div>
           <div className="cell">COM211</div>
           <div className="cell">C0M214</div>
        </div>

    </div>
  );
};
export default WeeklyGrid;