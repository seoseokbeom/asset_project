import TradingViewWidget, { Themes } from "react-tradingview-widget";

// const StockChart = () => <TradingViewWidget symbol="AAPL" />;
const StockChart = ({ ticker }) => (
    <TradingViewWidget
        symbol={ticker && ticker.length ? ticker : "NASDAQ:QQQ"}
        // theme={Themes.DARK}
        locale="kr"
        autosize
    />
);

export default StockChart;
