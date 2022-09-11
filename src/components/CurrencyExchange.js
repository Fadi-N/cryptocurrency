import React, {useState} from 'react';
import axios from "axios";
import Sidebar from "./Sidebar";
import "../CSS/currencyExchange.scss"

//input&select stretching link: https://getbootstrap.com/docs/5.0/utilities/flex/

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
                setFinalAmountFromTo((exchangeRate * e.target.value).toFixed(3))
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
                setFinalAmountToFrom((exchangeRate * e.target.value).toFixed(3))
            }).catch((error) => {
                console.error(error)
            })
        )
    }

    return (
        <>
            <Sidebar image={''}/>
            <div className="main-content">
                <div className="card exchange-card position-fixed my-3 me-3">
                    <div className="card-body exchange-card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="d-flex bd-highlight buttons-for-exchange">
                                        <div className="p-2 flex-shrink1 bd-highlight">
                                            <input className="form-control" type="number" value={finalAmountToFrom}
                                                   onChange={(e) => convertFromTo(e)} placeholder="from"/>
                                        </div>
                                        <div className="p-2 bd-highlight">
                                            <select className="form-select" name="from" onChange={
                                                (e) => e.target.value === "None" ? setExchangeFrom(null) : setExchangeFrom(e.target.value)
                                            }>
                                                {
                                                    currenciesSymbols.map((currencySymbol, index) => {
                                                        return (
                                                            exchangeTo === currencySymbol ?
                                                                <option key={index} style={{display: "none"}}
                                                                        disabled>{currencySymbol}</option> : (
                                                                    <option key={index}>{currencySymbol}</option>
                                                                )
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className="d-flex bd-highlight buttons-for-exchange">
                                        <div className="p-2 flex-shrink-1 bd-highlight">
                                            <input className="form-control" type="number" value={finalAmountFromTo}
                                                   onChange={(e) => convertToFrom(e)} placeholder="to"/>
                                        </div>
                                        <div className="p-2 bd-highlight">
                                            <select className="form-select" name="to" onChange={
                                                (e) => e.target.value === "None" ? setExchangeTo(null) : setExchangeTo(e.target.value)
                                            }>
                                                {
                                                    currenciesSymbols.map((currencySymbol, index) => {
                                                        return (
                                                            exchangeFrom === currencySymbol ?
                                                                <option key={index} style={{display: "none"}}
                                                                        disabled>{currencySymbol}</option> : (
                                                                    <option key={index}>{currencySymbol}</option>
                                                                )
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    place for news
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default CurrencyExchange;