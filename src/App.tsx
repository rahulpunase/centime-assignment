import React, {useEffect} from 'react';
import './App.scss';
import HeaderComponent from './components/header/header';
import SankeyChartComponent from './components/sankey-chart/sankey-chart';
import {useDispatch} from 'react-redux';
import mockData from './data/mock-data-file.json';
import {addSankeyData} from './store/reducers/sankey-data/sankey-data.action';
import SourceDataComponent from './components/source-data/source-data';
import {ChartWrapperOptions} from 'react-google-charts';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// mocking api call
		let timer = setTimeout(function () {
			dispatch(addSankeyData(mockData));
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	const options: ChartWrapperOptions['options'] = {
		title: 'Expenditure Chart',
		sankey: {
			node: {colors: ['#0d6efd']},
			link: {color: {stroke: 'black', strokeWidth: 1}},
		},
	};

	return (
		<div className='App container-fluid g-0'>
			<HeaderComponent/>
			<div className='container'>
				<div className='row justify-content-center'>
					<div className='col-md-6 align-self-center'>
						<SankeyChartComponent options={options} heading={'Expenditure Chart'}/>
						<SourceDataComponent/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
