import React, {useState} from 'react';
import axios from "axios";

function CurrencyExchange() {

    const currenciesSymbols = ['None', 'PLN', 'EUR', 'USD']
    const [exchangeFrom, setExchangeFrom] = useState(null)
    const [exchangeTo, setExchangeTo] = useState(null)
    const [finalAmountFromTo, setFinalAmountFromTo] = useState('')
    const [finalAmountToFrom, setFinalAmountToFrom] = useState('')

    const convertFromTo = (e) => {
        setFinalAmountToFrom(e.target.value)
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

        e.target.value === '' ? setFinalAmountFromTo('') : (
            axios.request(options).then((response) => {
                let exchangeRate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
                setFinalAmountFromTo(exchangeRate * e.target.value)
            }).catch((error) => {
                console.error(error)
            }))
    }

    const convertToFrom = (e) => {
        setFinalAmountFromTo(e.target.value)
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                from_currency: `${exchangeTo}`,
                function: 'CURRENCY_EXCHANGE_RATE',
                to_currency: `${exchangeFrom}`
            },
            headers: {
                'X-RapidAPI-Key': 'a81410a48fmshde406f56ec3622ep12f667jsnf6d259e85b24',
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
        }
        e.target.value === '' ? setFinalAmountToFrom('') : (
            axios.request(options).then((response) => {
                let exchangeRate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
                setFinalAmountToFrom(exchangeRate * e.target.value)
            }).catch((error) => {
                console.error(error)
            })
        )
    }

    return (
        <div>
            <input type="number" value={finalAmountToFrom} onChange={(e) => convertFromTo(e)} placeholder="from"/>
            <select name="from" onChange={
                (e) => e.target.value === "None" ? setExchangeFrom(null) : setExchangeFrom(e.target.value)
            }>
                {
                    currenciesSymbols.map((currencySymbol, index) => {
                        return (
                            exchangeTo === currencySymbol ?
                                <option key={index} style={{display: "none"}} disabled>{currencySymbol}</option> : (
                                    <option key={index}>{currencySymbol}</option>
                                )
                        )
                    })
                }
            </select>
            <input type="number" value={finalAmountFromTo} onChange={(e) => convertToFrom(e)} placeholder="to"/>
            <select name="to" onChange={
                (e) => e.target.value === "None" ? setExchangeTo(null) : setExchangeTo(e.target.value)
            }>
                {
                    currenciesSymbols.map((currencySymbol, index) => {
                        return (
                            exchangeFrom === currencySymbol ?
                                <option key={index} style={{display: "none"}} disabled>{currencySymbol}</option> : (
                                    <option key={index}>{currencySymbol}</option>
                                )
                        )
                    })
                }
            </select>
        </div>
    );
}

export default CurrencyExchange;