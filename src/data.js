export const API_KEY = "AIzaSyCd5bAQYP9cFpYHvhJdd73TVz69wHxs5pI"

export const value_converter = (value) =>{
    if (value>=1000000) {
     {
        return Math.floor(value/1000000)+"M"
     }   
    } else if(value>=1000){
        return Math.floor(value/1000)+"k"
    }
    else{
        return value;
    }
}