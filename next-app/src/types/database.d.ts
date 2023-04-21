interface PersonalInfo {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    gender?: string
    dateOfBirth: string
}

interface Address {
    street: string
    street2?: string
    street3?: string
    city: string
    state: string
    zipCode: string
}