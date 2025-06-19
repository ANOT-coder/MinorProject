import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Chart, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import './Home.css';

Chart.register(ArcElement);

const Home = () => {
    const [portfolioData, setPortfolioData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');  // Get token from localStorage
        
        if (token) {
            // First, check if the portfolio exists
            axios.get("http://localhost:8000/api/portfolio/get_portfolio/", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("Portfolio data:", response.data);
                setPortfolioData(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    // If no portfolio exists, create one
                    axios.post("http://localhost:8000/api/portfolio/generate_portfolio/", {}, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    .then((createResponse) => {
                        console.log("Portfolio created:", createResponse.data);
                        setPortfolioData(createResponse.data);
                    })
                    .catch((createError) => {
                        console.error("Error creating portfolio:", createError);
                    });
                } else {
                    console.error("Error fetching portfolio data:", error);
                }
            });
        } else {
            console.error("No token found, user is not authenticated");
        }

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

    // Prepare chart data
    const data = {
        labels: ["Stocks", "Bonds/Debentures", "Cash", "FD", "SIP", "Commodities"],
        datasets: [
            {
                data: [
                    portfolioData.stocks,
                    portfolioData.bonds,
                    portfolioData.cash,
                    portfolioData.fd,
                    portfolioData.sips,
                    portfolioData.commodities
                ],
                backgroundColor: ["#41826E", "#FFD700", "#FF5733", "#3498db", "#9B59B6", "#E67E22"],
            },
        ],
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="home-content">
                <h2>Welcome to Your Financial Advisor</h2>
                <div className="card-container">
                    <div className="card1">
                        <h2>Ideal Portfolio</h2>
                        <p>Find the ideal investment portfolio based on your financial goals and risk profile.</p>
                        <Link to="/ideal-portfolio">
                            <button className="card-button">Go to Ideal Portfolio</button>
                        </Link>
                    </div>
                    <div className="card2">
                        <h2>Your Portfolio Composition</h2>
                        <p>Here’s a visual breakdown of your investment portfolio allocation.</p>
                        <div className="chart-container">
                            <Pie data={data} />
                        </div>
                        <Link to="/portfolio-composition">
                            <button className="card-button">Expand</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
