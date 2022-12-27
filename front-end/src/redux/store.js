import { configureStore } from '@reduxjs/toolkit'
import userDataHandler from './UserReducers'
import StudentsAccountsReducer from './StudentsAccountsReducer'
import LevelsHandlerReducer from './LevelsReducer'
import ClassroomsHandlerReducer from './ClassroomsReducer'
import tasksReducer from './tasksReducer'
import NotifyerReducer from './NotifyerReducer'
import NotifyerByRoleReducer from './NotifRoleReducer'

export const Store = configureStore({
  reducer: {
    newUserReducer: userDataHandler,
    StudentsAccountsHandler : StudentsAccountsReducer,
    LevelsReducer: LevelsHandlerReducer,
    ClassroomsReducer: ClassroomsHandlerReducer,
    TaskReduder: tasksReducer,
    NotifyerReducer: NotifyerReducer,
    NotifyerByRoleReducer: NotifyerByRoleReducer,


  },
})

export default Store