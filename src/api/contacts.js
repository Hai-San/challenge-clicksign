export default {
    getContacts() {		
        try {           
            const contacts = localStorage.getItem('contacts')		
            if (contacts) {
                return JSON.parse(contacts)
            } 
        } catch (error) {
            console.error(error)
        }
    },
    updateContacts(payload) {
        try {			
            localStorage.setItem('contacts', payload)	
        } catch (error) {
            console.error(error)
        }
    }
}