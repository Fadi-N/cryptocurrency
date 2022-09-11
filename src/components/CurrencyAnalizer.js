import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Chart, registerables} from "chart.js";
import {Line} from 'react-chartjs-2'
import Sidebar from "./Sidebar";
import "../CSS/currencyAnalizer.scss"

Chart.register(...registerables);


function CurrencyAnalizer() {

    const initialValues = {
        coinName: '',
        days: 1,
        currencyShortcut: '',
        fill: false,
        color: ''
    }

    const [values, setValues] = useState(initialValues)
    let data = {
        labels: '',
        datasets: []
    };

    const [chartData, setChartData] = useState(data)

    const handleChanges = (e) => {
        const {name, value} = e.target;

        e.target.name === "fill" ?
            setValues(prevState => ({
                ...values,
                [name]: !prevState.fill,
            }))
            :
            setValues({
                ...values,
                [name]: value,
            })
    }

    const handleFillAllChanges = (e) => {
        chartData.datasets.map(mappedData => {
            console.log(mappedData)
            mappedData.fill = !mappedData.fill

        })
        setChartData({
            labels: chartData.labels,
            datasets: [...chartData.datasets]
        })
    }

    const handleClick = () => {
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
                fill: values.fill,
                borderColor: `${values.color}`,
                backgroundColor: `${values.color}50`,
            })

            setChartData({
                labels: chartData.labels,
                datasets: [...chartData.datasets]
            })
        }).catch(function (error) {
            console.error(error);
        });
    }

    //console.log(JSON.stringify(chartData))
    console.log(values)
    return (
        <>
            <Sidebar/>
            <div className="main-content">
                <div className="card analizer-card position-fixed my-3 me-3">
                    <div className="card-body analizer-card-body">
                        <div className="display-chart mb-4">
                            <Line data={chartData}/>
                        </div>
                        <div className="buttons-for-chart">
                            <input className="form-control form-control-sm" type="text" name="coinName"
                                   value={values.coinName} placeholder="coin" onChange={handleChanges}/>
                            <input className="form-control form-control-sm" type="text" name="days" value={values.days}
                                   placeholder="days" onChange={handleChanges}/>
                            <input className="form-control form-control-sm" type="text" name="currencyShortcut"
                                   value={values.currencyShortcut} placeholder="currency"
                                   onChange={handleChanges}/>
                            <input className="form-control form-control-sm form-control-color input-color" type="color"
                                   name="color"
                                   value={values.color}
                                   placeholder="color" onChange={handleChanges}/>
                            <button className="btn btn-default" onClick={() => handleClick()}><i
                                className="bi bi-plus-circle"></i></button>
                            <div className="form-check form-switch fillCheck">
                                <input className="form-check-input" id="flexSwitchCheckDefault" type="checkbox"
                                       name="fill"
                                       onChange={handleChanges}
                                       value={values.fill}/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Fill</label>
                            </div>
                            <div className="form-check form-switch fillCheck">
                                <input className="form-check-input" id="flexSwitchCheckDefault" type="checkbox"
                                       name="fill"
                                       onChange={handleFillAllChanges}
                                       value={values.fill}/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Fill all</label>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>

    );
}

export default CurrencyAnalizer;