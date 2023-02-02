export default function mapArrToString(arr){
    return arr
        .filter(item => Number.isInteger(item))
        .map(String)
}