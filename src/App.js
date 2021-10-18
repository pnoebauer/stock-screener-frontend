import React from 'react';

import {Switch, Route} from 'react-router-dom';

import Header from './components/header/header.component';

import RadarscreenPage from './pages/radarscreen/radarscreen.component';
import ChartPage from './pages/chart/chart.component';

import {UNIVERSES, SYMBOLS} from './assets/constants';

import './App.css';

class App extends React.Component {
	async componentDidMount() {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/universes`, {});

			let universe = await response.json();

			SYMBOLS.splice(0);

			const allStocks = [
				...new Set([...universe.SP500, ...universe.NAS100, ...universe.DJ30]),
			];

			for (let i = 0; i < allStocks.length; i++) {
				SYMBOLS[i] = allStocks[i];
			}

			UNIVERSES.SP500 = universe.SP500;
			UNIVERSES.NAS100 = universe.NAS100;
			UNIVERSES.DJ30 = universe.DJ30;
		} catch (e) {
			console.log('Error fetching data from backend universe endpoint');
		}
	}

	render() {
		return (
			<div className='App'>
				<Header />
				<Switch>
					<Route exact path='/' component={ChartPage} />
					<Route exact path='/screen' component={RadarscreenPage} />
					<Route exact path='/chart' component={ChartPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
