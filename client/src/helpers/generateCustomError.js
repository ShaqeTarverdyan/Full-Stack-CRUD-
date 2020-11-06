export const generateCustomError = (errors, fieldName) => {
    let errorName = '';
    if(errors.length < 0) {
        return
    }
    errors.map(error => {
       if((Object.keys(error) == fieldName)) {
        errorName = Object.values(error);
       }
    })
    return errorName;
}