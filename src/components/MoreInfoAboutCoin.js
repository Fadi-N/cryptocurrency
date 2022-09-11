import React, {useEffect, useState} from 'react';
import axios from "axios";
import LineChartForMoreInfo from "./LineChartForMoreInfo";
import Sidebar from "./Sidebar";
import "../CSS/moreInfoAboutCoin.scss"

function MoreInfoAboutCoin({passedCoinName}) {
    const [data, setData] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://coingecko.p.rapidapi.com/coins/${passedCoinName}`,
            params: {
                localization: 'true',
                tickers: 'true',
                market_data: 'true',
                community_data: 'true',
                developer_data: 'true',
                sparkline: 'false'
            },
            headers: {
                'X-RapidAPI-Key': 'a81410a48fmshde406f56ec3622ep12f667jsnf6d259e85b24',
                'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setData(response.data)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    const description = Object.assign([], data.description)
    const image = Object.assign([], data.image)
    const marketData = Object.assign([], data.market_data)

    return (
        <>
            <Sidebar/>
            <div className="main-content position-relative my-3">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card more-info-card">
                                <div className="card-body more-info-card-body">
                                    <div className="display-chart mb-4">
                                        <LineChartForMoreInfo coinName={passedCoinName}/>
                                    </div>
                                    <img src={`${image.small}`} alt=""/>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>7 days</th>
                                            <th>14 days</th>
                                            <th>30 days</th>
                                            <th>1 year</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                {
                                                    marketData.price_change_percentage_7d > 0 ?
                                                        <p style={{color: "green"}}>{Number(marketData.price_change_percentage_7d).toFixed(2)} %</p> :
                                                        <p style={{color: "red"}}>{Number(marketData.price_change_percentage_7d).toFixed(2)} %</p>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    marketData.price_change_percentage_14d > 0 ?
                                                        <p style={{color: "green"}}>{Number(marketData.price_change_percentage_14d).toFixed(2)} %</p> :
                                                        <p style={{color: "red"}}>{Number(marketData.price_change_percentage_14d).toFixed(2)} %</p>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    marketData.price_change_percentage_30d > 0 ?
                                                        <p style={{color: "green"}}>{Number(marketData.price_change_percentage_30d).toFixed(2)} %</p> :
                                                        <p style={{color: "red"}}>{Number(marketData.price_change_percentage_30d).toFixed(2)} %</p>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    marketData.price_change_percentage_1y > 0 ?
                                                        <p style={{color: "green"}}>{Number(marketData.price_change_percentage_1y).toFixed(2)} %</p> :
                                                        <p style={{color: "red"}}>{Number(marketData.price_change_percentage_1y).toFixed(2)} %</p>
                                                }
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                    <div dangerouslySetInnerHTML={{__html: description.en}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default MoreInfoAboutCoin;