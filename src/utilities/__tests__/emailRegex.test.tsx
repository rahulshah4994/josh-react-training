import {emailValid} from "../index"

describe('emailValid', () =>{
    it(" a@b.com must be a valid email ", () =>{
        expect(emailValid("a@b.com")).toBe(true)
    })
    it('a must be an invalid email', ()=>{
        expect(emailValid("a")).toBe(false)
    })
    it('b@ is invalid', ()=>{
        expect(emailValid("b@")).toBe(false)
    } )
    it('kiran@josh.ac.in must be a valid email', () =>{
        expect(emailValid("kiran@josh.ac.in")).toBe(true)
    })
    it('email must not start with .', ()=>{
        expect(emailValid('.')).toBe(false)
    })
})