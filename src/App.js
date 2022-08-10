import CurrencyTracker from "./components/CurrencyTracker";
import MoreInfoAboutCoin from "./components/MoreInfoAboutCoin";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";
import CurrencyExchange from "./components/CurrencyExchange";
import LineChartForMoreInfo from "./components/LineChartForMoreInfo";

const App = () => {
    const[coinName ,setCoinName] = useState('')

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CurrencyTracker getCoinName={setCoinName}/>}/>
                <Route path="/exchange" element={<CurrencyExchange/>}/>
                <Route path={`/moreInfo/${coinName}`} element={<MoreInfoAboutCoin passedCoinName={coinName}/>}/>
                <Route path={`/lineChart`} element={<LineChartForMoreInfo/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
