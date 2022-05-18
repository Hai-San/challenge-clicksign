import Inputmask from 'inputmask/dist/inputmask.es6'

class Masks {
    formatPhone(phone) {
        return Inputmask.format(phone, { mask: '(99) 99999-999[9]', greedy: false })
    }
}

const masks = new Masks()

export default masks