import React, {ReactNode} from 'react';
import {render, RenderResult, screen} from '@testing-library/react';
import SankeyChartComponent, {ISankeyChartComponent} from './../sankey-chart';
import store from '../../../store/store';
import {Provider, shallowEqual} from 'react-redux';
import {I18nProvider} from '../../../i18n/i18n.provider';


const mockProps: ISankeyChartComponent = {
	options: {},
	heading: 'Expenditure Chart'
}

describe('Sankey Chart Component should', () => {
	let wrapper: RenderResult;
	beforeEach(() => {
		wrapper = render(<Provider store={store}>
			<I18nProvider>
				<SankeyChartComponent {...mockProps} />
			</I18nProvider>
		</Provider>)
	});

	it('render correctly', () => {
		expect(wrapper).not.toBeNull();
	});

	it('should have loading text', () => {
		const loadingElement = wrapper.getByText(/Loading Data.../i);
		expect(loadingElement).toBeInTheDocument();
	});

	it('should have heading', () => {
		const h2 = wrapper.getByTestId('heading');
		expect(h2).toHaveTextContent(mockProps.heading);
	});
});
