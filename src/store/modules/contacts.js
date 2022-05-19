import apiContacts from '@/api/contacts'

const state = {
    all: []
}

const getters = {
    haveContacts(state) {
        return state.all.length > 0
    }
}

const actions = {
    fetchContacts({ commit }) {
        const contactsList = apiContacts.getContacts()
        if (contactsList) {			
            commit('setContacts', contactsList)     
        }
    },
    updateContacts({ dispatch }, payload) {
        const apiResponse = apiContacts.updateContacts(payload)
		
        apiResponse.then(response => {
            dispatch('fetchContacts')
        })
    }
}

const mutations = {
    setContacts(state, contacts) {
        state.all = contacts
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}