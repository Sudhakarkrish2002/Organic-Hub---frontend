export const isEmail = (value) => /.+@.+\..+/.test(String(value || '').toLowerCase())
export const isRequired = (value) => value !== undefined && value !== null && String(value).trim().length > 0
export const minLength = (value, len) => String(value || '').trim().length >= len


