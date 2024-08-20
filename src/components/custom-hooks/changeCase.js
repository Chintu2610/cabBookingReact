export function useSentenseCase(str)
{
    let firstLetter=str.charAt(0);
    let remainingLetter=str.substring(1).toLowerCase();
    let convertedLetter=`${firstLetter.toUpperCase()}${remainingLetter}`;
    return convertedLetter;
}