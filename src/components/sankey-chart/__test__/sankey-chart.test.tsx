import React, {ReactNode} from 'react';
import {render, screen} from "@testing-library/react";
import SankeyChartComponent, {ISankeyChartComponent} from "./sankey-chart";
import store from "../../store/store";
import {Provider} from "react-redux";
import {I18nProvider} from "../../i18n/i18n.provider";
//
// const render = (component: ReactNode) => rtlRender(
// 	<Provider store={store}>
// 		<I18nProvider>
// 			{component}
// 		</I18nProvider>
// 	</Provider>
// );

describe('Sankey Chart Component should', () => {
	it('render correctly', () => {
		const mockProps: ISankeyChartComponent = {
			options: {},
			heading: 'Expenditure Chart'
		}
		render(
			<Provider store={store}>
				<I18nProvider>
					<SankeyChartComponent {...mockProps} />
				</I18nProvider>
			</Provider>);
	});
});
