import React, { Component } from 'react'
import axios from 'axios'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      title: this.props.user.title,
      manager_id: this.props.user.manager_id
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})

  }

  handleClick = (e) => {
    e.preventDefault()
    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      title: this.state.title,
      manager_id: this.state.manager_id
    }

    axios.put(
      `http://localhost:3000/api/v1/users/${this.props.user.id}`,
      {
        user: user
      })
    .then(response => {
      console.log(response)
      this.props.updateUser(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="tile">
        <form>
          <input className='input' type="text"
            name="first_name" placeholder='First Name'
            value={this.state.first_name} onChange={this.handleInput}
            ref={this.props.firstNameRef} />
          <input className='input' type="text"
            name="last_name" placeholder='Last Name'
            value={this.state.last_name} onChange={this.handleInput} />
          <input className='input' type="text"
            name="title" placeholder='Title'
            value={this.state.title} onChange={this.handleInput} />
          <input className='input' type="text"
            name="manager_id" placeholder='Manager ID'
            value={this.state.manager_id} onChange={this.handleInput} />
          <button onClick={this.handleClick}>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserForm