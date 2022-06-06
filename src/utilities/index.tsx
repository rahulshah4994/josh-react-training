export const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const emailValid = (value: string) => emailRegEx.test(value)
