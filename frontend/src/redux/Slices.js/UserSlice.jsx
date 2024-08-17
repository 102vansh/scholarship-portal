import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    user: null,
    applications: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        getapplications:(state, action) => {
            state.applications = action.payload
    }
}
})

export const {login, logout, getapplications} = userSlice.actions
export default userSlice.reducer