import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
   state = {
      username: '',
      description: '',
      duration: 0,
      data: new Date(),
      users: []
   };

   componentDidMount() {
      axios.get('http://localhost:5000/users/')
         .then(res => {
            if (res.data && res.data.length) {
               this.setState({
                  users: res.data,
                  username: res.data[0].username
               })
            }
         });
   };

   onChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   onChangeDate = (date) => {
      this.setState({
         date: date
      });
   };

   onSubmit = (e) => {
      e.preventDefault();

      const exercise = {
         username: this.state.username,
         description: this.state.description,
         duration: this.state.duration,
         date: this.state.date
      };

      console.log(exercise);

      axios.post('http://localhost:5000/exercises/add', exercise)
         .then(res => console.log(res.data));

      window.location = '/';
   };
   
   render() {
      return (
         <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
               <div className="form-group">
                  <label>Username: </label>
                  <select 
                     // ref="userInput" 
                     required 
                     className="form-control" 
                     value={this.state.username}
                     name="username"
                     onChange={this.onChange}
                  >
                     {
                        this.state.users.map(user => {
                           return (
                              <option
                                 key={user.username} 
                                 value={user.username}
                              >
                                 {user.username}
                              </option>
                           )
                        })
                     }
                  </select>
               </div>
               <div className="form-group">
                  <label>Description: </label>
                  <input 
                     type="text" 
                     required
                     name="description"
                     className="form-control" 
                     value={this.state.description}
                     onChange={this.onChange}
                  />
               </div>
               <div className="form-group">
                  <label>Duration: </label>
                  <input 
                     type="text" 
                     required
                     name="duration"
                     className="form-control" 
                     value={this.state.duration}
                     onChange={this.onChange}
                  />
               </div>
               <div className="form-group">
                  <label>Date: </label>
                  <div>
                     <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                     />
                  </div>
               </div>
               <div className="form-group">
                  <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
               </div>
            </form>
         </div>
      )
   };
};