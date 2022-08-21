import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2'
import {Chart, registerables} from 'chart.js';
import axios from "axios";

Chart.register(...registerables);


function LineChartForMoreInfo({coinName}) {
    const [pricesData, setPricesData] = useState([])

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://coingecko.p.rapidapi.com/coins/${coinName}/market_chart`,
            params: {vs_currency: 'pln', days: '1'},
            headers: {
                'X-RapidAPI-Key': 'a81410a48fmshde406f56ec3622ep12f667jsnf6d259e85b24',
                'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            //console.log(response.data.prices);
            setPricesData(response.data.prices)
        }).catch(function (error) {
            console.error(error);
        });
    }, [])

    let data = {
        labels: pricesData.map(price => new Intl.DateTimeFormat('eu-Eu', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).format(price[0]).slice(0, 10)
        ),
        datasets: [
            {
                label: `${coinName}`,
                data: pricesData.map(price => price[1]),
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }

    return (
        <div>
            <Line data={data}/>
        </div>
    );
}

export default LineChartForMoreInfo;