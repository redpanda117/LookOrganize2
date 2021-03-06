import axios from "axios";

export default {
  // Gets all notes
  getNotes: function() {
    return axios.get("/api/notes");
  },
  // Gets the note with the given id
  getNote: function(id) {
    return axios.get("/api/notes/" + id);
  },
  // Deletes the note with the given id
  deleteNote: function(id) {
    return axios.delete("/api/notes/" + id);
  },
  // Saves a note to the database
  saveNote: function(noteData, id) {
    return axios.post("/api/notes/" + id, noteData);
  },

    // Gets all 
    getEvents: function() {
      return axios.get("/api/events");
    },
    // Gets the note with the given id
    getEvent: function(id) {
      return axios.get("/api/events/" + id);
    },
    // Deletes the note with the given id
    deleteEvent: function(id) {
      return axios.delete("/api/events/" + id);
    },
    // Saves a note to the database
    saveEvent: function(eventData, id) {
      return axios.post("/api/events/" + id, eventData);
    },

        // Gets all 
        getFinances: function() {
          return axios.get("/api/finance");
        },
        // Gets the note with the given id
        getFinance: function(id) {
          return axios.get("/api/finance/" + id);
        },
        // Deletes the note with the given id
        deleteFinance: function(id) {
          return axios.delete("/api/finance/" + id);
        },
        // Saves a note to the database
        saveFinance: function(financeData, id) {
          return axios.post("/api/finance/" + id, financeData);
        },

  login: function(userData) {
    return axios.post("/api/auth/login", userData);
  },
  logout: function() {
    return axios.get("/api/auth/logout");
  },
  register: function(userData) {
    return axios.post("/api/auth/register", userData);
  },
};
