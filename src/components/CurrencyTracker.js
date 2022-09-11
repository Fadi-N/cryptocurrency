import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import Sidebar from "./Sidebar";
import "../CSS/currencyTracker.scss"

function CurrencyTracker({getCoinName}) {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://coingecko.p.rapidapi.com/coins/markets',
            params: {vs_currency: 'pln', page: '1', per_page: '100', order: 'market_cap_desc'},
            headers: {
                'X-RapidAPI-Key': 'a81410a48fmshde406f56ec3622ep12f667jsnf6d259e85b24',
                'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            //console.log(response.data);
            setData(response.data.filter(coin => coin.id.includes(search.toLowerCase())))
        }).catch(function (error) {
            console.error(error);
        });
    }, [search])

    const searchChangeState = (e) => {
        setSearch(e.target.value)
    }

    const ASCSort = (e) => {
        if (e.target.name == 'name') {
            setData([...data].sort((coinA, coinB) => coinA.name > coinB.name ? 1 : -1))
        } else if (e.target.name == 'price') {
            setData([...data].sort((coinA, coinB) => coinA.current_price > coinB.current_price ? 1 : -1))
        } else if (e.target.name == 'day') {
            setData([...data].sort((coinA, coinB) => coinA.price_change_percentage_24h > coinB.price_change_percentage_24h ? 1 : -1))
        } else if (e.target.name == 'cap') {
            setData([...data].sort((coinA, coinB) => coinA.market_cap > coinB.market_cap ? 1 : -1))
        }
    }

    const DESCSort = (e) => {
        if (e.target.name == 'name') {
            setData([...data].sort((coinA, coinB) => coinA.name > coinB.name ? -1 : 1))
        } else if (e.target.name == 'price') {
            setData([...data].sort((coinA, coinB) => coinA.current_price > coinB.current_price ? -1 : 1))
        } else if (e.target.name == 'day') {
            setData([...data].sort((coinA, coinB) => coinA.price_change_percentage_24h > coinB.price_change_percentage_24h ? -1 : 1))
        } else if (e.target.name == 'cap') {
            setData([...data].sort((coinA, coinB) => coinA.market_cap > coinB.market_cap ? -1 : 1))
        }
    }

    return (
        <>
            <Sidebar image={''}/>
            <div className="main-content position-relative my-3">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card tracker-card">
                                <div className="card-header">
                                    <div>
                                        <input className="form-control" type="text"
                                               onChange={(e) => searchChangeState(e)}
                                               placeholder="Search"/>
                                    </div>
                                </div>
                                <div className="card-body tracker-card-body">
                                    <div className="table-responsive">
                                        <table className="table align-items-center">
                                            <thead>
                                            <tr className="head-sort-buttons">
                                                <th className="text-uppercase text-secondary">
                                                    Coin
                                                    <button className="btn btn-default" name="name"
                                                            onClick={(e) => ASCSort(e)}><i
                                                        className="bi bi-sort-alpha-down"></i></button>
                                                    <button className="btn btn-default" name="name"
                                                            onClick={(e) => DESCSort(e)}><i
                                                        className="bi bi-sort-alpha-up"></i>
                                                    </button>
                                                </th>
                                                <th className="text-uppercase text-secondary align-middle text-center">
                                                    Symbol
                                                    <button className="btn btn-default" name="name"
                                                            onClick={(e) => ASCSort(e)}><i
                                                        className="bi bi-sort-alpha-down"></i></button>
                                                    <button className="btn btn-default" name="name"
                                                            onClick={(e) => DESCSort(e)}><i
                                                        className="bi bi-sort-alpha-up"></i>
                                                    </button>
                                                </th>
                                                <th className="text-uppercase text-secondary align-middle text-center">
                                                    Price
                                                    <button className="btn btn-default" name="price"
                                                            onClick={(e) => ASCSort(e)}><i
                                                        className="bi bi-sort-numeric-down"></i></button>
                                                    <button className="btn btn-default" name="price"
                                                            onClick={(e) => DESCSort(e)}><i
                                                        className="bi bi-sort-numeric-up"></i>
                                                    </button>
                                                </th>
                                                <th className="text-uppercase text-secondary align-middle text-center">
                                                    24h
                                                    <button className="btn btn-default" name="day"
                                                            onClick={(e) => ASCSort(e)}><i
                                                        className="bi bi-sort-numeric-down"></i></button>
                                                    <button className="btn btn-default" name="day"
                                                            onClick={(e) => DESCSort(e)}><i
                                                        className="bi bi-sort-numeric-up"></i>
                                                    </button>
                                                </th>
                                                <th className="text-uppercase text-secondary align-middle text-center">
                                                    Market Cap
                                                    <button className="btn btn-default btn-sm" name="cap"
                                                            onClick={(e) => ASCSort(e)}><i
                                                        className="bi bi-sort-numeric-down"></i></button>
                                                    <button className="btn btn-default btn-sm" name="cap"
                                                            onClick={(e) => DESCSort(e)}><i
                                                        className="bi bi-sort-numeric-up"></i>
                                                    </button>
                                                </th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            {
                                                data.map(coin => {
                                                    return (

                                                        <tbody key={coin.id}>
                                                        <tr>
                                                            <td>
                                                                <div className="d-flex px-2 py-1 coin-img">
                                                                    <div className="me-2">
                                                                        <img src={`${coin.image}`}/>
                                                                    </div>
                                                                    <p className="text-center">{coin.name}</p>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle text-center">{coin.symbol}</td>
                                                            <td className="align-middle text-center">{coin.current_price} zł</td>
                                                            {
                                                                coin.price_change_percentage_24h > 0 ?
                                                                    <td className="align-middle text-center"
                                                                        style={{color: "green"}}>{coin.price_change_percentage_24h.toFixed(2)} %</td> :
                                                                    <td className="align-middle text-center"
                                                                        style={{color: "red"}}>{coin.price_change_percentage_24h.toFixed(2)} %</td>
                                                            }
                                                            <td className="align-middle text-center">{coin.market_cap}</td>
                                                            <td className="align-middle text-center">
                                                                <Link to={`/moreInfo/${coin.id}`}>
                                                                    <button className="btn btn-default btn-sm more-info"
                                                                            onClick={() => getCoinName(coin.id)}><i
                                                                        className="bi bi-info-circle"></i>
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    )
                                                })
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default CurrencyTracker;