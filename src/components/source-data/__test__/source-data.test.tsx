import React, {ReactNode} from 'react';
import {render as rtlRender, screen, fireEvent, RenderResult} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../../../store/store';
import {I18nProvider} from '../../../i18n/i18n.provider';
import SourceDataComponent from '../source-data';


const render = (component: ReactNode) => rtlRender(
	<Provider store={store}>
		<I18nProvider>
			{component}
		</I18nProvider>
	</Provider>
);

const mockFirstHeaderValue = ['From', 'To', 'Weight'];
describe('Source Data Component should', () => {
	let wrapper: RenderResult;
	beforeEach(() => {
		wrapper = render(<SourceDataComponent/>);
	});

	it('render correctly', () => {
		expect(wrapper).not.toBeNull()
	});

	it('should render loading', () => {
		const loading = wrapper.getByText(/Loading item lists.../i);
		expect(loading).toBeInTheDocument();
	});

	it('should have table and header row', () => {
		const table = wrapper.queryByTestId('content-table');
		const headerRows = wrapper.queryAllByTestId('c-head-row');
		expect(table).not.toBeInTheDocument();
		headerRows.forEach((element, index) => {
			expect(element).not.toBeInTheDocument();
		});
	});

	it('should have Entry button and should be disabled', () => {
		const addEntryButton = wrapper.queryByTestId('add-entry-button');
		expect(addEntryButton).not.toBeInTheDocument();
	});

});
