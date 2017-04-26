import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Glyphicon, Label } from 'react-bootstrap'
import { createConfirmation } from 'react-confirm';
import { map } from 'lodash'

import UsersActions, { ACTIVE, INACTIVE } from '../redux/user'
import Confirmation from './Confirmation';

const confirmationDialog = createConfirmation(Confirmation);

@connect(mapStateToProps, mapDispatchToProps)
export default class TableList extends Component {
  static defaultProps: {
    user: {
      loading: false,
      data: []
    }
  }

  componentDidMount () {
    this.props.getUsersList();
  }

  handleEditUser = (id) => {
    const { router } = this.props;
    router.push(`/edit/${id}`)
  }

  handleRemoveUser = (id) => {
    confirmationDialog({
      confirmation: 'Are you sure?'
    }).then(() => {
      this.props.removeUser(id)
    });
  }

  renderRow = (item, index) => {
    return (
      <tr key={index}>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.phone}</td>
        <td>
          { item.state === ACTIVE && (<Label bsStyle="success">Active</Label>)}
          { item.state === INACTIVE && (<Label bsStyle="danger">Inactive</Label>)}
        </td>
        <td style={{ textAlign: 'right' }}>
          <Button
            onClick={() => this.handleEditUser(item._id || item.id)}
            style={{
              marginRight: 10
            }}
          >
            <Glyphicon glyph="pencil" />
          </Button>

          <Button onClick={() => this.handleRemoveUser(item._id || item.id)}>
            <Glyphicon glyph={item.state === ACTIVE ? 'trash' : 'repeat'} />
          </Button>
        </td>
      </tr>
    )
  }

  render () {
    const { users: { loading, data }, router } = this.props;

    console.log('props', this.props, data);

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div className="row header-table-list">
          <div className="col-md-8">
            <h3>Users table</h3>
          </div>
          <div className="col-md-4" style={{ textAlign: 'right' }}>
            <Button bsStyle="primary" onClick={() => router.push('/create')} style={{ marginTop: 20 }}>
              Create user
            </Button>
          </div>
        </div>

        <hr />

        <Table responsive>
          <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>State</th>
            <th />
          </tr>
          </thead>
          <tbody>
          {map(data, this.renderRow)}
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { users } = state;

  return {
    users
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUsersList: (page = 1) => dispatch(UsersActions.usersListRequest(page)),
    removeUser: (id) => dispatch(UsersActions.removeUserRequest(id))
  }
}