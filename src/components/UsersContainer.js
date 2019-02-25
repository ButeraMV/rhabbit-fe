import React, { Component } from 'react'
import User from './User'
import UserForm from './UserForm'
import axios from 'axios'
import update from 'immutability-helper'

class UsersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      editingUserId: null
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

  addNewUser = () => {
    axios.post(
      'http://localhost:3000/api/v1/users',
      { user:
        {
          first_name: '',
          last_name: '',
          title: '',
          manager_id: ''
        }
      }
    )
    .then(response => {
      console.log(response)
      const users = update(this.state.users, {
        $splice: [[0, 0, response.data]]
      })
      this.setState({
        users: users,
        editingUserId: response.data.id
      })
    })
    .catch(error => console.log(error))
  }

  updateUser = (user) => {
    const userIndex = this.state.users.findIndex(x => x.id === user.id)
    const users = update(this.state.users, {
      [userIndex]: { $set: user }
    })
    this.setState({
      users: users,
      editingUserId: null
    })
  }

  enableEditing = (id) => {
    this.setState({editingUserId: id},
      () => { this.first_name.focus() })
  }

  deleteUser = (id) => {
    axios.delete(`http://localhost:3000/api/v1/users/${id}`)
    .then(response => {
      const userIndex = this.state.users.findIndex(x => x.id === id)
      const users = update(this.state.users, { $splice: [[userIndex, 1]]})
      this.setState({users: users})
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <button className="newUserButton" onClick={this.addNewUser} >
          New User
        </button>

        {this.state.users.map((user) => {
          if(this.state.editingUserId === user.id) {
            return(<UserForm user={user} key={user.id}
                    updateUser={this.updateUser}
                    firstNameRef= {input => this.first_name = input} />)
          } else {
            return (<User user={user} key={user.id}
                    onClick={this.enableEditing}
                    onDelete={this.deleteUser} />)
          }
        })}
      </div>
    )
  }
}

export default UsersContainer