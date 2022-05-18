export default {
    async getContacts() {		
        try {           
            const response = await localStorage.getItem('contacts')			
			
            if (response) {
                return response
            } else {
                throw new Error('Contacts not found')
            }
        } catch (error) {
            console.error(error)
        }
    },
    async addNewContact() {
        try {			
            const response = await localStorage.setItem('contacts', 'red')		
			
            if (response) {
                return response
            } else {
                throw new Error('Error on try add a new contact')
            }
        } catch (error) {
            console.error(error)
        }
    }
}