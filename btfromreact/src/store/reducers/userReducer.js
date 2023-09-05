import { ADD_USER, DELETE_USER, SET_SELECTED_USER, UPDATE_USER } from "../types/userType";


const DEFAULT_STATE = {
    userList: [],
    selectedUser: null,
}


const stringify = localStorage.getItem("USER_LIST");
if (stringify) {
    DEFAULT_STATE.userList = JSON.parse(stringify);
}

export const userReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_USER: {
            action.payload.key = Date.now();

            state.userList = [...state.userList, action.payload];
            localStorage.setItem("USER_LIST", JSON.stringify(state.userList));

            break;
        }
        case SET_SELECTED_USER: {
            document.getElementById("button").innerHTML = "Cập nhật";
            document.getElementById("id").disabled = true;
            document.getElementById("idError").style.display = "none";

            state.selectedUser = action.payload;

            break;
        }
        case UPDATE_USER: {
            const data = [...state.userList];
            const index = data.findIndex((element) => element.id === action.payload.id);

            data[index] = action.payload;

            state.selectedUser = null;
            state.userList = data;

            localStorage.setItem("USER_LIST", JSON.stringify(state.userList));

            break;
        }
        case DELETE_USER: {
            const data = [...state.userList];

            const index = data.findIndex((element) => element.id === action.payload.id);
            data.splice(index, 1);

            state.userList = data;
            localStorage.setItem("USER_LIST", JSON.stringify(state.userList));

            break;
        }

    }

    return { ...state };
}