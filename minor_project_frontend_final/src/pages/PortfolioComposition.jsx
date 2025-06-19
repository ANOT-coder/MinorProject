import React, { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip } from 'chart.js';
import { Pie } from "react-chartjs-2";
import axios from "axios";
import "./PortfolioComposition.css";
import Navbar from "../components/Navbar";

Chart.register(ArcElement, Tooltip);

const Portfolio = () => {
    const [portfolioData, setPortfolioData] = useState(null);
  
    useEffect(() => {
        // Fetch portfolio composition from backend
        const token = localStorage.getItem('token');  // Retrieve the JWT token

        axios.get("http://localhost:8000/api/portfolio/get_portfolio/", {
            headers: {
                'Authorization': `Bearer ${token}`,  // Include the JWT token
            },
        })
            .then((response) => {
                console.log("Response Data:", response.data);  // Debugging print statement
                setPortfolioData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching portfolio data:", error);
            });

        // Cleanup function to destroy the chart instance
        return () => {
            if (Chart.instances.length > 0) {
                Chart.instances.forEach(chart => chart.destroy());
            }
        };
    }, []);

    if (!portfolioData) {
        return <p>Loading portfolio data...</p>;
    }

    // Round the values to two decimal places
    const roundedData = {
        stocks: portfolioData.stocks.toFixed(2),
        bonds: portfolioData.bonds.toFixed(2),
        cash: portfolioData.cash.toFixed(2),
        fd: portfolioData.fd.toFixed(2),
        sips: portfolioData.sips.toFixed(2),
        commodities: portfolioData.commodities.toFixed(2),
    };

    const data = {
        labels: ["Stocks", "Bonds/Debentures", "Cash", "FD", "SIP", "Commodities"],
        datasets: [
            {
                data: [
                    roundedData.stocks,
                    roundedData.bonds,
                    roundedData.cash,
                    roundedData.fd,
                    roundedData.sips,
                    roundedData.commodities
                ],
                backgroundColor: ["#41826E", "#FFD700", "#FF5733", "#3498db", "#9B59B6", "#E67E22"],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw;
                        return `${label}: ${value}%`; // Custom tooltip to display category and percentage
                    },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: 'white',
                bodyColor: 'white',
            },
        },
        animation: {
            animateScale: true, // Scale animation when clicking/hovering
            animateRotate: true, // Rotate animation when clicking/hovering
        },
    };

  return (
    <div className="portfolio-container">
      <Navbar />
      <div className="portfolio-content">
        <h2>Your Ideal Portfolio Allocation</h2>
        <div className="chart-container">
          <Pie data={data} options={options} />
        </div>
        
        {/* Description of the Pie Chart */}
        <div className="chart-description">
          <p><strong>Portfolio Breakdown:</strong></p>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Asset Class</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="color-box" style={{ backgroundColor: "#41826E" }}></span> Stocks</td>
                <td>{roundedData.stocks}%</td>
              </tr>
              <tr>
                <td><span className="color-box" style={{ backgroundColor: "#FFD700" }}></span> Bonds/Debentures</td>
                <td>{roundedData.bonds}%</td>
              </tr>
              <tr>
                <td><span className="color-box" style={{ backgroundColor: "#FF5733" }}></span> Cash</td>
                <td>{roundedData.cash}%</td>
              </tr>
              <tr>
                <td><span className="color-box" style={{ backgroundColor: "#3498db" }}></span> FD</td>
                <td>{roundedData.fd}%</td>
              </tr>
              <tr>
                <td><span className="color-box" style={{ backgroundColor: "#9B59B6" }}></span> SIP</td>
                <td>{roundedData.sips}%</td>
              </tr>
              <tr>
                <td><span className="color-box" style={{ backgroundColor: "#E67E22" }}></span> Commodities</td>
                <td>{roundedData.commodities}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
