

const data = {
    userlist: [],
};

// eslint-disable-next-line default-param-last
export default function engageReducer(state = data, action) {
    const temp = { ...state };
    switch (action.type) {
        case "setUserlist":
            temp.userlist = action.data;
            return temp;
        default:
            return temp;
    }
}
