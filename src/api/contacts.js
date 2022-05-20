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
    async updateContacts(payload) {
        try {	
            const response = await new Promise(resolve => {
                const payloadString = JSON.stringify(payload)
                localStorage.setItem('contacts', payloadString)	
            	resolve()
            })
			
            return response
        } catch (error) {
            console.error(error)
        }
    }
}