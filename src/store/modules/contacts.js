import apiContacts from '@/api/contacts'

const state = {
    all: []
}

const actions = {
    fetchContacts({ commit }) {
        const contactsList = apiContacts.getContacts()
        contactsList.then(response => {
            commit('setContacts', response)
        })       
    },
    addNewContact({ commit }) {
        const apiResponse = apiContacts.addNewContact()

        apiResponse.then(response => {
            commit('setContacts', response)
        })  
    }
}

const mutations = {
    setContacts(state, contacts) {
        state.all.push(contacts)   
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}