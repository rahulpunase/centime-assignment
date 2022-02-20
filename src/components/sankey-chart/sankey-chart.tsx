import React from 'react';
import Chart, {ChartWrapperOptions} from 'react-google-charts';
import {useSelector} from 'react-redux';
import {IStore} from '../../store/store';
import {translate} from "../../i18n/translate";

export interface ISankeyChartComponent {
	options: ChartWrapperOptions['options'];
	heading: string;
}

const SankeyChartComponent = (props: ISankeyChartComponent) => {
	const sankey = useSelector((store: IStore) => store.sankeyReducer);
	return (
		<div className='sankey-chart__component'>
			<h2 data-testid='heading' className='heading'>{translate(props.heading)}</h2>
			<Chart
				data-testid='chart-component'
				chartType='Sankey'
				width='100%'
				height='300px'
				data={sankey.dataStore}
				options={props.options}
			/>
		</div>
	);
};

export default SankeyChartComponent;
