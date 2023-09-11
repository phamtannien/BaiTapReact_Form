import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteUserAction, setSelectedUserAction } from '../../store/actions/userAction';


import "../BaiTapReactForm/stylecss/style.css";

class UserManagement extends Component {
    state = {
        keyword: "",
    }


    renderContent = () => {
        const data = this.props.userList.filter(element => {
            return element.hoTen && element.hoTen.toLowerCase().indexOf(this.state.keyword.toLocaleLowerCase()) !== -1;
        });


        return data.map((element, idx) => {
            return (
                <tr key={idx}>
                    <th>{element.id}</th>
                    <th>{element.hoTen} </th>
                    <th>{element.sdt}</th>
                    <th>{element.email}</th>
                    <th>
                        <button onClick={() => this.props.dispatch(setSelectedUserAction(element))} className="button btn btn-warning">Sửa</button>
                        <button onClick={() => this.props.dispatch(deleteUserAction(element))} className='btn btn-danger'>Xóa</button>
                    </th>
                </tr>
            )


        })
    };

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            keyword: event.target.value,
        });

    }

    render() {
        return (
            <div className="card p-0 mt-3">
                <div className="row mt-4 px-3 ">
                    <div className="col-4">
                        <div className="form-group mb-0">
                            <input
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Tìm kiếm theo họ tên..."
                                className="form-control"
                            />
                        </div>
                    </div>

                </div>
                <div className="card-body fixTableHead">
                    <table className="table ">
                        <thead className='bg-dark text-white'>
                            <tr>
                                <th>Mã SV</th>
                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderContent()}
                        </tbody>
                    </table>


                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userList: state.userReducer.userList,
    };
};

export default connect(mapStateToProps)(UserManagement);