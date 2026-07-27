import axios from "axios";

const API = axios.create({
  baseURl: "https:/api",
});

export const getClasses = ()=> {
  return API.get("/timetable");
};

export const addClass = (data) => {
  return API.post("/timetable", data);
};

export const updateClass = (id, data) => {
  return API.put('/timetable/ ${id}', data);
};

export const deleteClass = (id) => {
  return API.delete('/timetable/${id}',id);
};

