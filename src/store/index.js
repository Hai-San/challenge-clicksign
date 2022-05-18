import { createStore } from 'vuex'
import contacts from './modules/contacts'

export default createStore({
    modules: {
        contacts
    }
})