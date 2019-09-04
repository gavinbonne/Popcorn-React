import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.currentUser,
});

class User extends React.Component<any, any> {

    render() {
        let userData;
        if (this.props.currentUser) {
            userData = <div>
                <div>First Name: {this.props.currentUser.firstName}</div>
                <div>Last Name: {this.props.currentUser.lastName}</div>
                <div>Address: {this.props.currentUser.address}</div>
                <div>City: {this.props.currentUser.city}</div>
                <div>State: {this.props.currentUser.state}</div>
                <div>Zip: {this.props.currentUser.zip}</div>
                <div>Phone: {this.props.currentUser.phone}</div>
                <div>Email: {this.props.currentUser.email}</div>
            </div>
        }

        return (<Fragment>{userData}</Fragment>);
    };
}

export default connect(mapStateToProps)(User);
