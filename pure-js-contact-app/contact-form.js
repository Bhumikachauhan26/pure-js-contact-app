
// Contact List  adding detail
class Contact {
    constructor(name, mobileNumber, email) {
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.id = Date.now();
    }
}

// Name Validation
function validateName(name) {
    if (name) return true;
    const selector = 'input[name="name"]';
    manageError(selector,'Name is Required');
    return false
}

// mobile validation
function validateMobileNumber(mobileNumber) {
    const selector = 'input[name="mobileNumber"]';
    const mobileNumberRegex = /^[0-9]{10}/;  
    if (!mobileNumber) {
        manageError(selector,'Mobile number is Required');
        return false;
    } 
    if(mobileNumberRegex.test(mobileNumber)) return true;
    manageError(selector,'Mobile number is invalid');
    return false;
}

// Email validation
function validateEmailAddress() {
    const selector = 'input[name="email"]';
    const emailRegex = /^([\w\\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;
    if (!email) {
        manageError(selector, 'Email is Required');
        return false;
    }

    if (emailRegex.test(email)) return true;
    manageError(selector, 'Email is Invalid');
    return false;
}

function manageError(selector,message) {
    const inputEL = document.querySelector(selector);
    inputEL.style.border = '1px solid red';
    inputEL.setCustomValidity(message);
    inputEL.reportValidity();
    inputEL.addEventListener('keydown', (evet) => {
        console.log('keydown')
        inputEL.style.border = 'none';
        inputEL.setCustomValidity("");
        inputEL.reportValidity();
    }, {
        once: true
    })
}

function isFormValid(contact) {
    return validateName(contact.name) && validateMobileNumber(contact.mobileNumber)
}

function updateStore(newStoreValue) {
    localStorage.setItem('store',JSON.stringify(newStoreValue))
}

function addContact(contact) {
    const contacts = getAllContact();
    contacts.push(contact);
    updateStore(contacts);
}

// Update contact 
function updateContactById(id,values) {  
    const contact = getContactById(id);
    contact.name = values.name;
    contact.mobileNumber = values.mobileNumber;
    contact.email = values.email;
    deleteContactById(id);
    addContact(contact);
}

// Delete Contact
function deleteContactById(id) {
    const contacts = getAllContact();
    const idx = contacts.findIndex(contact => contact.id == id);
    contacts.splice(idx,1);
    updateStore(contacts)
}

function getContactById(id) {
    const contacts = getAllContact();
    return contacts.find(contact => contact.id == id);
}

// Show all store contact
function getAllContact() {
    return JSON.parse(localStorage.getItem('store')) || [];
}

// search contact
function searchContact(search) {
    const contacts =  getAllContact();
    return contacts.filter(c => `${c.name} ${c.email} ${c.mobileNumber}`.includes(search));
}



