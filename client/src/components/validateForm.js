// Fron-end Validation Function


const validateForm = (fields,isRegestring) => {

    let errors = [];
    let formIsValid = true;

    console.log(fields)

    if (!fields.email) {
        formIsValid = false;
        errors.push("*Please enter your email.");
    }

    if (!fields.password) {
        formIsValid = false;
        errors.push("*Please enter your Password.");
    }

    if (typeof fields.email !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields.email)) {
            formIsValid = false;
            errors.push("*Please enter a valide email .");
        }
    }

    if(isRegestring){
        if (fields.password && !fields.password2) {
            formIsValid = false;
            errors.push("**Please confirme your password .");
        }


        if (fields.password2 && fields.password2 !== fields.password) {
            formIsValid = false;
            errors.push("*Passwords does not match !!.");
        }
    }

    

    return {formIsValid , errors };
}
 

export default validateForm ;
