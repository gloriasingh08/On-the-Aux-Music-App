/*
    Author:     Web of Lies
    Subject:    INFO6150 - Web Design and UX
    Purpose:    JSX file for AccountSetting
*/
import React from "react";
import Toggle from "../../Utils/js/toggle";
import './AccountSetting.scss'
import { Link } from "react-router-dom";
import axios from 'axios';
import { decodeToken } from "react-jwt";
//Define the state of the forms
class AccountSetting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            passwordUpdate: {
                password: '',
                repassword: ''

            },
            pDetails: {
                name: '',
                contactNo: ''
            },
            passwordMsg: '',
            pDetailsMsg: ''
        }

    }
    //Detect the password change condition and state the update details

    //Detect the personal details
    submitPasswordUpdate = (e) => {
        this.setState({ passwordMsg: "" })
        e.preventDefault()
        const token = localStorage.getItem("token");
        !token ? this.history.push("/login") : console.log(`Token Present`)
        const myDecodedToken = decodeToken(localStorage.getItem("token"));
        const userId = myDecodedToken.userId;
        // let emailID = sessionStorage.getItem('userID')
        if (this.state.passwordUpdate.password == this.state.passwordUpdate.repassword) {
            let body = { password: this.state.passwordUpdate.password }
            axios.put('http://localhost:9008/user/' + userId, body).then(res => {
                // this.handleChangePassword(h)
                this.setState({ passwordMsg: "Password Updated Successfully" })
            }).catch(err => {
                this.setState({ passwordMsg: "Server Error!" })
            })

        } else {
            this.setState({ passwordMsg: "Password Miss Match!" })
        }
    }
    //Submit function for personal details updation form
    submitPDetailsUpdate = (e) => {
        e.preventDefault()
        if (this.state.pDetailsMsg == "") {
            const token = localStorage.getItem("token");
            !token ? this.history.push("/login") : console.log(`Token Present`)
            const myDecodedToken = decodeToken(localStorage.getItem("token"));
            const userId = myDecodedToken.userId;
            // let emailID = sessionStorage.getItem('userID')
            let body = { ...this.state.pDetails }
            axios.put('http://localhost:9008/user/' + userId, body).then(res => {
                this.setState({ pDetailsMsg: "Personal Details Updated Successfully" })
            }).catch(err => {
                this.setState({ pDetailsMsg: "Server Error!" })
                this.setTimeout(() => {
                    this.setState({ pDetailsMsg: "" })
                }, 500);
            })
        }
    }
    //fucntion defined for change password
    handleChangePassword = (event) => {
        let newState = { ...this.state.passwordUpdate }
        newState[event.target.name] = event.target.value
        this.setState({ passwordUpdate: newState });
        console.log(this.state.passwordUpdate)
    };
    //fucntion defined for change personal details  
    handleChangePDetails = (event) => {
        let newState = { ...this.state.pDetails }
        if (event.target.name === 'contactNo') {
            let pattern = /[0-9]{10}/
            if (!event.target.value.match(pattern)) {
                this.setState({ pDetailsMsg: "Please Enter Valid Contact No!" })
            } else {
                this.setState({ pDetailsMsg: "" })
            }
        }
        newState[event.target.name] = event.target.value
        this.setState({ pDetails: newState });
    };


    render() {
        return <React.Fragment>
            <div className="main col-md-12">
                <div className="AccSetting col-md-6" >
                    {/* Entire form of password change */}
                    <div>
                        <h4 className="col-md-12 float-left mb-4" >Change Password</h4>
                        <form onSubmit={this.submitPasswordUpdate} className="changePasswordForm form-inline">
                            <div className="form-group mb-2">
                                <label className="col-md-4"  >Enter New Password</label>
                                <input onChange={this.handleChangePassword} className=" form-control" type="password" name="password" value={this.state.passwordUpdate.password} placeholder="Password" />
                            </div>
                            <div className="form-group mb-2">
                                <label className="col-md-4"  >Renter New Password</label>
                                <input onChange={this.handleChangePassword} className=" form-control" type="password" name="repassword" value={this.state.passwordUpdate.repassword} placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-block btn-primary mb-2">Submit</button>
                        </form>
                        <span className="text-success"><b>{this.state.passwordMsg}</b></span>
                    </div>
                    <hr className="seperator"></hr>
                    {/*  Entire form of personal details change */}
                    <div >
                        <h4 className="col-md-12 float-left mb-4" >Update Personal Details</h4>
                        <form onSubmit={this.submitPDetailsUpdate} className="changePasswordForm form-inline">
                            <div className="form-group mb-2">
                                <label className="col-md-4"  >Full Name</label>
                                <input onChange={this.handleChangePDetails} className=" form-control" name="name" type="text" value={this.state.pDetails.name} placeholder="Enter Name" />
                            </div>
                            <div className="form-group mb-2">
                                <label className="col-md-4"  >Contact Nmber</label>
                                <input onChange={this.handleChangePDetails} className=" form-control" name="contactNo" type="text" value={this.state.pDetails.contactNo} placeholder="Enter Contact Number" />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2 lg">Submit</button>
                        </form>
                        <span className="text-success"><b>{this.state.pDetailsMsg}</b></span>
                    </div>
                    <hr className="seperator"></hr>
                    <div>

                        <div className="changeTheme">
                            <h4 className="col-md-8  mb-4" >Color Theme</h4>
                            <Toggle></Toggle>
                        </div>
                    </div>

                </div>
            </div>

        </React.Fragment>
    }
}
export default AccountSetting
