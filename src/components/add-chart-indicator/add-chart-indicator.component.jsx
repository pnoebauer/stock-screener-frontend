import React from 'react';

import {connect} from 'react-redux';

import {doAddChartIndicator} from '../../redux/chart/chart.actions';

import Tooltip from '../tooltip/tooltip.component';

import './add-chart-indicator.styles.css';

import {CHART_INDICATORS} from '../../assets/constants';

const chartIndicatorsList = Object.keys(CHART_INDICATORS);

class AddChartIndicator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			shownValue: '',
			indicator: chartIndicatorsList[0],
		};
	}

	handleAddIndicator = e => {
		const {doAddIndicator} = this.props;
		const {indicator} = this.state;

		doAddIndicator(indicator);
	};

	onChange = e => {
		// console.log(e.target.value, 'change');
		this.setState({shownValue: e.target.value});
	};

	onKeyUp = e => {
		// console.log(e.nativeEvent, this.state.shownValue, 'nativeEvent');
		// console.log(e.keyCode, 'target');

		if (e.nativeEvent.type === 'keyup' && e.keyCode === undefined) {
			// console.log('blurring');
			this.handleBlur(e);
		}

		if (e.keyCode === 13) {
			if (chartIndicatorsList.includes(this.state.shownValue.toLowerCase())) {
				this.setState({indicator: this.state.shownValue.toLowerCase()});
				e.target.blur();
			}
		}
	};

	handleBlur = e => {
		e.preventDefault();
		// console.log('blur', this.state.shownValue);

		if (chartIndicatorsList.includes(this.state.shownValue.toLowerCase())) {
			this.setState({indicator: this.state.shownValue.toLowerCase()});
			e.target.blur();
		} else {
			e.target.focus();
		}
	};

	render() {
		return (
			<div className='add-chart-indicators-container'>
				<input
					list='indicators'
					name='added-indicator'
					id='added-indicator'
					onChange={this.onChange}
					placeholder={'Add chart indicator'}
					onKeyUp={this.onKeyUp}
					onBlur={this.handleBlur}
				/>
				<datalist id='indicators'>
					{chartIndicatorsList.map(indicatorName => (
						<option key={indicatorName} value={indicatorName.toUpperCase()}>
							{indicatorName.toUpperCase()}
						</option>
					))}
				</datalist>
				<button
					onClick={this.handleAddIndicator}
					className='add-indicator-button tooltip'
				>
					+
					<Tooltip tooltipText={'Click to add indicator'} position={'left'} />
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	doAddIndicator: indicatorType => dispatch(doAddChartIndicator(indicatorType)),
});

export default connect(null, mapDispatchToProps)(AddChartIndicator);
