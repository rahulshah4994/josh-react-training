import {isValidEmail} from '../emailRegEx'

describe('isValidRegEx', () => {
    it('a@b.com must be valid email',() => {
        expect(isValidEmail('a@babel.com')).toBe(true)
    })
    it('a must be invalid email', () => {
        expect(isValidEmail('a')).toBe(false)
    })
    it('b@ must be invalid email', () => {
        expect(isValidEmail('b@')).toBe(false)
    })
    it('kiran@jsoh.ac.in must be valid email', () => {
        expect(isValidEmail('kiran@jsoh.ac.in')).toBe(true)
    })
    it('email must not start with .', () => {
        expect(isValidEmail('.')).toBe(false)
    })
})