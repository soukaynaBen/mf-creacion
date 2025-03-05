 
 export function formatCurrency(
    amount: number,
    currencyCode: string = "EUR"
 ) {

    try {
        return new Intl.NumberFormat("fr-FR",{
            style: "currency",
            currency: currencyCode.toLowerCase()
        }).format(amount)
    } catch (error) {
        console.error("Invalid currency code:", currencyCode, error)
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`
    }

 }
 
