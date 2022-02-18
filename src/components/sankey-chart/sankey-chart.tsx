import React, {useEffect, useState} from 'react';
import Chart, {ChartWrapperOptions} from "react-google-charts";
import {useSelector} from "react-redux";
import {IStore} from "../../store/store";

const SankeyChartComponent = () => {
	const sankey = useSelector((store: IStore) => store.sankeyReducer);
	const options: ChartWrapperOptions['options'] = {
		is3D: true,
		title: 'Expenditure Chart'
	};
	const [chartData, setChartData] = useState<Array<any>>([]);

	return (
		<div className='sankey-chart__component'>
			<Chart
				chartType="Sankey"
				width="100%"
				height="300px"
				data={sankey.dataStore}
				options={options}
			/>
			{/*<button onClick={clickHandler}>Push value</button>*/}
		</div>
	);
};

export default SankeyChartComponent;
