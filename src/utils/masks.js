import Inputmask from 'inputmask/dist/inputmask.es6'

class Masks {
    formatPhone(phone) {
        return phone ? Inputmask.format(phone, { mask: '(99) 99999-999[9]' }) : ''
    }
}

const masks = new Masks()

export default masks