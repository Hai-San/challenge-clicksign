import Inputmask from 'inputmask/dist/inputmask.es6'

class Masks {
    constructor() {
        this.phoneMask = '(99) 99999-999[9]'
    }

    formatPhone(phone) {
        return phone ? Inputmask.format(phone, { mask: this.phoneMask }) : ''
    }
	
    inputPhone(input) {
        Inputmask({ 
            mask: this.phoneMask,
            greedy: false,
            clearIncomplete: true,
            showMaskOnHover: false
		 }).mask(input)
    }
}

const masks = new Masks()

export default masks