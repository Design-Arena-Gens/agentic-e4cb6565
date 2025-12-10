// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ForecastLedger {
    event ForecastStored(uint256 indexed timestamp, int256 prediction, address indexed publisher);

    struct Forecast {
        uint256 timestamp;
        int256 prediction;
        address publisher;
    }

    Forecast[] public forecasts;

    function storeForecast(uint256 timestamp, int256 prediction) public {
        forecasts.push(Forecast(timestamp, prediction, msg.sender));
        emit ForecastStored(timestamp, prediction, msg.sender);
    }

    function getForecast(uint256 index) public view returns (Forecast memory) {
        require(index < forecasts.length, "Index out of bounds");
        return forecasts[index];
    }

    function getLatest() public view returns (Forecast memory) {
        require(forecasts.length > 0, "No forecasts stored");
        return forecasts[forecasts.length - 1];
    }

    function count() public view returns (uint256) {
        return forecasts.length;
    }
}
