import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { addUserAction, updateUserAction } from '../../store/actions/userAction';



class RegisterForm extends Component {
    idInputRef = createRef();
    hoTenInputRef = createRef();
    sdtInputRef = createRef();
    emailInputRef = createRef();

    state = {
        id: "",
        hoTen: "",
        sdt: "",
        email: "",

    }
    static getDerivedStateFromProps(nextProps, currentState) {
        if (nextProps.selectedUser && nextProps.selectedUser.key !== currentState.key) {
           
            currentState = nextProps.selectedUser;
        }

        return currentState;

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };
   
    validateCheckId = (value, ref, mes, list) => {
        let isExist = false;
        for (let i = 0; i < list.length; i++) {
            const data = list[i];
            if (data.id === value) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            ref.innerHTML = mes;
            return false;
        }
        ref.innerHTML = "";
        return true;
    }
    validateCheck = (value, ref, mes, letter) => {
        if (letter.test(value)) {
            ref.innerHTML = "";
            return true;
        }
        ref.innerHTML = mes;
        return false;
    }
    validateCheckName = (value, ref, mes) => {
        if (value.match("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")) {
            ref.innerHTML = "";
            return true;
        }
        ref.innerHTML = mes;
        return false;
    }

    validateRequired = (value, ref, mes) => {
        if (value) {
            ref.innerHTML = "";
            return true;
        }
        ref.innerHTML = mes;
        return false;
    };

    handleSubmit = (event) => {
        document.getElementById("button").innerHTML = "Thêm Sinh Viên";
        document.getElementById("id").disabled = false;

        event.preventDefault();

        let isValid = true;

        if (this.state.key) { }
        else {
            document.getElementById("idError").style.display = "block";
            isValid &= this.validateRequired(this.state.id, this.idInputRef.current, "(*)Vui lòng nhập mã sinh viên")
                && this.validateCheck(this.state.id, this.idInputRef.current, "(*)Vui lòng nhập kí tự số", /^[0-9]+$/)
                && this.validateCheckId(this.state.id, this.idInputRef.current, "(*)Mã sinh viên đã tồn tại", this.props.userList);
        }

        isValid &= this.validateRequired(this.state.hoTen, this.hoTenInputRef.current, "(*)Vui lòng nhập họ tên")
            && this.validateCheckName(this.state.hoTen, this.hoTenInputRef.current, "(*)Nhập đúng định dạng họ tên");

        isValid &= this.validateRequired(this.state.sdt, this.sdtInputRef.current, "(*)Vui lòng nhập số điện thoại")
            && this.validateCheck(this.state.sdt, this.sdtInputRef.current, "(*)Vui lòng nhập kí tự số", /^[0-9]+$/)
           

        isValid &= this.validateRequired(this.state.email, this.emailInputRef.current, "(*)Vui lòng nhập email")
            && this.validateCheck(this.state.email, this.emailInputRef.current, "(*)Nhập email đúng định dạng", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

        if (isValid) {

            if (this.state.key) {
                this.props.dispatch(updateUserAction(this.state));
            } else {
                this.props.dispatch(addUserAction(this.state));
            }
            this.setState({
                id: "",
                hoTen: "",
                sdt: "",
                email: "",
                key: "",
            })

        }


    }

    render() {

        return (
            <div className="card p-0">
                <div className="card-header bg-dark text-white font-weight-bold">
                    Thông tin sinh viên
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Mã SV</label>
                                    <input
                                        id='id'
                                        value={this.state.id}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control"
                                        name="id"
                                    />
                                    <span
                                        id='idError'
                                        ref={this.idInputRef}
                                        className="text-danger"
                                    ></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Họ tên</label>
                                    <input
                                        value={this.state.hoTen}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control"
                                        name='hoTen'
                                    />
                                    <span
                                        ref={this.hoTenInputRef}
                                        className="text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        value={this.state.sdt}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control"
                                        name='sdt'
                                    />
                                    <span
                                        ref={this.sdtInputRef}
                                        className="text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        type="text"
                                        className="form-control"
                                        name='email'
                                    />
                                    <span
                                        ref={this.emailInputRef}
                                        className="text-danger"></span>
                                </div>
                            </div>
                        </div>

                        <button id='button' className="btn btn-success mr-2">Thêm sinh viên</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedUser: state.userReducer.selectedUser,
        userList: state.userReducer.userList,
    }
}


export default connect(mapStateToProps)(RegisterForm);