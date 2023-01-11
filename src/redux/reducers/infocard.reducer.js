

const data = {
    infocardlist: [],
};

// eslint-disable-next-line default-param-last
export default function infocardReducer(state = data, action) {
    const temp = { ...state };
    switch (action.type) {
        case "setInfocardAll":
            temp.infocardlist = action.data;
            return temp;
        default:
            return temp;
    }
}
