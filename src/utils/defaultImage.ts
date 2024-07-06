import dotenv from 'dotenv'
dotenv.config();

export const generateDefault = (name : string) => {
    const [firstName , lastName] = name.split(' ');
    const initials = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ''}`.toUpperCase();
    return `${process.env.DEFAULT_IMAGE_URL}${initials}`;
}