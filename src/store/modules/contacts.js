import apiContacts from '@/api/contacts'

const state = {
    all: []
}

const actions = {
    fetchContacts({ commit }) {
        const contactsList = apiContacts.getContacts()
        if (contactsList) {			
            commit('setContacts', contactsList)     
        }
    },
    updateContacts({ dispatch }, payload) {
        apiContacts.updateContacts(payload)
        dispatch('fetchContacts')
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