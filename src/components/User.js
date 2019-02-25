import React, { Component } from 'react'

class User extends Component {
  handleClick = () => {
    this.props.onClick(this.props.user.id)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.user.id)
  }

  render () {
    return(
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>
          x
        </span>
        <h4>
          {this.props.user.first_name + " " + this.props.user.last_name}
        </h4>
        <p>{this.props.user.title}</p>
        <button onClick={this.handleClick}>Edit</button>
      </div>
    )
  }
}

export default User