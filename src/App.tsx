import React, {useEffect} from 'react';
import './App.scss';
import HeaderComponent from "./components/header/header";
import SankeyChartComponent from "./components/sankey-chart/sankey-chart";
import {useDispatch} from "react-redux";
import mockData from './data/mock-data-file.json';
import {addSankeyData} from "./store/reducers/sankey-data/sankey-data.action";
import SourceDataComponent from "./components/source-data/source-data";

function App() {
	let timer: any = null;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(addSankeyData(mockData));
		return () => clearTimeout(timer);
	});
	return (
		<div className="App container-fluid g-0">
			<HeaderComponent/>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 align-self-center">
						<SankeyChartComponent/>
						<SourceDataComponent/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
