import React, { Component } from 'react'
import axios from 'axios'

class UsersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/v1/users.json')
    .then(response => {
      console.log(response)
      this.setState({users: response.data})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => {
          return(
            <div className="tile" key={user.id} >
              <h4>{user.first_name + " " + user.last_name}</h4>
              <p>{user.title}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default UsersContainer