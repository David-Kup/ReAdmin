

const data = {
    currentUser: null,
    menu_active: 1,
    page_title: 'Info Cards',
};

// eslint-disable-next-line default-param-last
export default function authReducer(state = data, action) {
    const temp = { ...state };
    switch (action.type) {
        case "setUser":
            temp.currentUser = action.data;
            return temp;
        case "setMenu":
            temp.menu_active = action.data.menu_active;
            temp.page_title = action.data.title;
            return temp;
        default:
            return temp;
    }
}
