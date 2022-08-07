import React, {useEffect, useState} from 'react';
import axios from "axios";

function CurrencyTracker() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://coingecko.p.rapidapi.com/coins/markets',
            params: {vs_currency: 'pln', page: '1', per_page: '20', order: 'market_cap_desc'},
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

    const searchChangeState = (e) =>{
        setSearch(e.target.value)
    }

    const ASCSort = (e) => {
        if (e.target.name == 'name'){
            setData([...data].sort((coinA, coinB) => coinA.name > coinB.name ? 1 : -1))
        }else if (e.target.name == 'price'){
            setData([...data].sort((coinA, coinB) => coinA.current_price > coinB.current_price ? 1 : -1))
        }else if (e.target.name == 'day'){
            setData([...data].sort((coinA, coinB) => coinA.price_change_percentage_24h > coinB.price_change_percentage_24h ? 1 : -1))
        }else if (e.target.name == 'cap'){
            setData([...data].sort((coinA, coinB) => coinA.market_cap > coinB.market_cap ? 1 : -1))
        }
    }

    const DESCSort = (e) => {
        if (e.target.name == 'name'){
            setData([...data].sort((coinA, coinB) => coinA.name > coinB.name ? -1 : 1))
        }else if (e.target.name == 'price'){
            setData([...data].sort((coinA, coinB) => coinA.current_price > coinB.current_price ? -1 : 1))
        }else if (e.target.name == 'day'){
            setData([...data].sort((coinA, coinB) => coinA.price_change_percentage_24h > coinB.price_change_percentage_24h ? -1 : 1))
        }else if (e.target.name == 'cap'){
            setData([...data].sort((coinA, coinB) => coinA.market_cap > coinB.market_cap ? -1 : 1))
        }
    }

    return (
        <div>
            <input type="text" onChange={(e) => searchChangeState(e)} placeholder="Search"/>
            <table>
                <thead>
                <tr>
                    <th>
                        Coin
                        <button name="name" onClick={(e) => ASCSort(e)}>ASC</button>
                        <button name="name" onClick={(e) => DESCSort(e)}>DESC</button>
                    </th>
                    <th>
                        Symbol
                        <button name="name" onClick={(e) => ASCSort(e)}>ASC</button>
                        <button name="name" onClick={(e) => DESCSort(e)}>DESC</button>
                    </th>
                    <th>
                        Price
                        <button name="price" onClick={(e) => ASCSort(e)}>ASC</button>
                        <button name="price" onClick={(e) => DESCSort(e)}>DESC</button>
                    </th>
                    <th>
                        24h
                        <button name="day" onClick={(e) => ASCSort(e)}>ASC</button>
                        <button name="day" onClick={(e) => DESCSort(e)}>DESC</button>
                    </th>
                    <th>
                        Market Cap
                        <button name="cap" onClick={(e) => ASCSort(e)}>ASC</button>
                        <button name="cap" onClick={(e) => DESCSort(e)}>DESC</button>
                    </th>
                </tr>
                </thead>
                {
                    data.map(coin => {
                        return (

                            <tbody key={coin.id}>
                            <tr>
                                <td><img src={`${coin.image}`}/> <p>{coin.name}</p></td>
                                <td>{coin.symbol}</td>
                                <td>{coin.current_price}</td>
                                {
                                    coin.price_change_percentage_24h > 0 ?
                                        <td style={{color: "green"}}>{coin.price_change_percentage_24h.toFixed(2)} %</td> :
                                        <td style={{color: "red"}}>{coin.price_change_percentage_24h.toFixed(2)} %</td>
                                }
                                <td>{coin.market_cap}</td>
                            </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </div>
    );
}

export default CurrencyTracker;