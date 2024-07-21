//items
export interface Item {
    _id : string,
    name : string,
    description : string,
    price : string | number,
    ratingAndReviews : RatingAndReview[],
    averageRating : string,
    soldCount : string | number,
    mainImage : string,
    images : string[],
    stockAvailable : number | string,
    deleted : boolean
}
//user 
export interface UserToken {
    _id : string,
    email : string,
    name : string,
    accountType : string,
    myCart : string,
    myOrders : string[],
    additionalInfo : Profile,
    profilePhoto : string
    chat : string[] 
}

export interface User {
    _id : string,
    name : string,
    email : string,
    password : string,
    additionalInfo : Profile,
    accountType : string,
    myOrders : Order[],
    myCart : Cart,
    deleteAccountDate : Date | null,
    chat : Chat[]
}
//order
export interface Order {
    _id : string,
    items : Item[],
    quantityOfItem : Quantity[],
    orderBy : User,
    orderId : string | number,
    orderTo : string[],
    orderedOn : Date | string,
    amount: string,
    status: string,
    deliveryPrice: string,
    shippingAddress: Address,
    acceptedOn: Date | string,
    acceptedBy: User | string,
    rejectedOn: Date | string,
    rejectedBy: User | string,
    cancelledOn: Date | string,
    cancelledBy: User | string,
    deliveredOn: Date | string,
    deliveredBy: User | string

}
//profile
export interface Profile {
    createdAt : string | Date ,
    updatedAt : string | Date,
    _id : string,
    phoneNumber : string | number | null,
    profilePhoto : string,
    addresses : Address[] | string[],
    defaultAddress : Address | null | string,
    dob : string | Date | null,
    gender : string | null
}
//address
export interface Address {
    _id : string,
    name: string,
    phoneNumber : string,
    houseNo: string,
    landmark: string,
    city: string,
    state: string,
    pincode: string | number,
    deleted : boolean
}
//rating and reviews
export interface RatingAndReview {
    _id : string,
    postedBy: User,
    item: Item ,
    ratingStars: number | string,
    reviewDescription: string,
    verifiedPurchase : boolean | string
}
//quantity
export interface Quantity {
    _id : string,
    item : Item,
    quantity : number | string
}
//cart
export interface Cart {
    _id : string,
    items: Item[],
    totalAmount: number | string,
    quantityOfItem: Quantity[]
}
//chat
export interface Chat {
    _id : string,
    messages : Message[]
}
//message
export interface Message {
    _id : string,
    user : User,
    description : string,
    maxDeleteDate : Date | string,
    deleteType : string,
    deletedBy : User
}
//login
export interface Login {
    email : string,
    password : string
}
//signUp
export interface SignUp {
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    confirmPassword : string,
    accountType : string
}