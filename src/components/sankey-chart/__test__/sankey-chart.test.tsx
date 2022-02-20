import React, {ReactNode} from 'react';
import {render as rtlRender, screen} from "@testing-library/react";
import SankeyChartComponent, {ISankeyChartComponent} from "./../sankey-chart";
import store from "../../../store/store";
import {Provider} from "react-redux";
import {I18nProvider} from "../../../i18n/i18n.provider";

const render = (component: ReactNode) => rtlRender(
	<Provider store={store}>
		<I18nProvider>
			{component}
		</I18nProvider>
	</Provider>
);

const mockProps: ISankeyChartComponent = {
	options: {},
	heading: 'Expenditure Chart'
}

describe('Sankey Chart Component should', () => {
	it('render correctly', () => {
		render(<SankeyChartComponent {...mockProps} />);
	});

	it('should have heading', () => {
		render(<SankeyChartComponent {...mockProps} />);
		const h2 = screen.getByTestId('heading');
		expect(h2).toHaveTextContent(mockProps.heading);
	});
});
