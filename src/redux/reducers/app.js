export default function appReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_VISIBILITY_FILTER' : return setVisibilityFilter(state, action);
        case 'ADD_TODO' : return addTodo(state, action);
        case 'TOGGLE_TODO' : return toggleTodo(state, action);
        case 'EDIT_TODO' : return editTodo(state, action);
        default : return state;
    }
}
