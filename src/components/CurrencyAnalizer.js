import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Chart, registerables} from "chart.js";
import {Line} from 'react-chartjs-2'

Chart.register(...registerables);


function CurrencyAnalizer() {
    const initialValues = {
        coinName: '',
        days: 1,
        currencyShortcut: ''
    }

    const [values, setValues] = useState(initialValues)
    let data = {
        labels: '',
        datasets: []
    };

    const [chartData, setChartData] = useState(data)

    const handleChanges = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleClick = () =>{
        const options = {
            method: 'GET',
            url: `https://coingecko.p.rapidapi.com/coins/${values.coinName}/market_chart`,
            params: {vs_currency: `${values.currencyShortcut}`, days: `${values.days}`},
            headers: {
                'X-RapidAPI-Key': 'a81410a48fmshde406f56ec3622ep12f667jsnf6d259e85b24',
                'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            //console.log(response.data.prices);
            chartData.labels = response.data.prices.map(price => new Intl.DateTimeFormat('eu-Eu', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(price[0]).slice(0, 10)
            )
            chartData.datasets.push({
                label: `${values.coinName}`,
                data: response.data.prices.map(price => price[1]),
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            })

            setChartData({
                labels: chartData.labels,
                datasets: [...chartData.datasets]
            })
        }).catch(function (error) {
            console.error(error);
        });
    }

    console.log(JSON.stringify(chartData))
    return (
        <div>

            <Line data={chartData}/>

            <input type="text" name="coinName" value={values.coinName} onChange={handleChanges}/>
            <input type="text" name="days" value={values.days} onChange={handleChanges}/>
            <p>days</p>
            <p>currency</p>
            <input type="text" name="currencyShortcut" value={values.currencyShortcut} onChange={handleChanges}/>
            <button onClick={() => handleClick()}>+</button>

        </div>
    );
}

export default CurrencyAnalizer;