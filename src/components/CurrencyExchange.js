import React, {useState} from 'react';
import axios from "axios";

function CurrencyExchange() {

    const currenciesSymbols = ['None', 'PLN', 'EUR', 'USD']
    const [exchangeFrom, setExchangeFrom] = useState(null)
    const [exchangeTo, setExchangeTo] = useState(null)
    const [amountFrom, setAmountFrom] = useState(1)
    const [amountTo, setAmountTo] = useState(0)
    const [finalAmount, setFinalAmount] = useState(0)
    /*
    console.log(exchangeFrom)
    console.log(exchangeTo)
    console.log(amountFrom)
    console.log(amountTo)
    */

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                from_currency: `${exchangeFrom}`,
                function: 'CURRENCY_EXCHANGE_RATE',
                to_currency: `${exchangeTo}`
            },
            headers: {
                'X-RapidAPI-Key': 'a81410a48fmshde406f56ec3622ep12f667jsnf6d259e85b24',
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
        }

        axios.request(options).then((response) => {
            let exchangeRate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
            setFinalAmount(exchangeRate * amountFrom)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div>
            <input type="number" value={amountFrom} onChange={(e) => setAmountFrom(e.target.value)} placeholder="from"/>
            <select name="from" onChange={
                (e) => e.target.value === "None" ? setExchangeFrom(null) : setExchangeFrom(e.target.value)
            }>
                {
                    currenciesSymbols.map((currencySymbol, index) => {
                        return (
                            <option key={index}>{currencySymbol}</option>
                        )
                    })
                }
            </select>
            <input type="number" value={finalAmount} onChange={(e) => setAmountTo(e.target.value)} placeholder="to"/>
            <select name="to" onChange={
                (e) => e.target.value === "None" ? setExchangeTo(null) : setExchangeTo(e.target.value)
            }>
                {
                    currenciesSymbols.map((currencySymbol, index) => {
                        return (
                            <option key={index}>{currencySymbol}</option>
                        )
                    })
                }
            </select>
            <button onClick={convert}>Convert</button>
        </div>
    );
}

export default CurrencyExchange;