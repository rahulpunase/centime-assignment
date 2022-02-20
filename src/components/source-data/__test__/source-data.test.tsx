import React, {ReactNode} from 'react';
import {render as rtlRender, screen, fireEvent} from '@testing-library/react';
import {Provider} from "react-redux";
import store from "../../../store/store";
import {I18nProvider} from "../../../i18n/i18n.provider";
import SourceDataComponent from "../source-data";


const render = (component: ReactNode) => rtlRender(
	<Provider store={store}>
		<I18nProvider>
			{component}
		</I18nProvider>
	</Provider>
);

const mockFirstHeaderValue = ['From', 'To', 'Weight'];
describe('Source Data Component should', () => {
	it('render correctly', () => {
		render(<SourceDataComponent/>);
	});

	it('should have table and header row', () => {
		render(<SourceDataComponent/>);
		const table = screen.getByTestId('content-table');
		const headerRows = screen.getAllByTestId('c-head-row');
		expect(table).toBeInTheDocument();
		headerRows.forEach((element, index) => {
			expect(element).toBeInTheDocument();
			expect(element).toHaveTextContent(mockFirstHeaderValue[index]);
		});
	});

	it('should have Entry button and should be disabled', () => {
		render(<SourceDataComponent/>);
		const addEntryButton = screen.getByTestId('add-entry-button');
		expect(addEntryButton).toBeInTheDocument();
		expect(addEntryButton).toBeDisabled();
	});

	it('entry button work as expected', () => {
		render(<SourceDataComponent/>);
		const addEntryButton = screen.getByTestId('add-entry-button');
		fireEvent.click(addEntryButton);
		expect(addEntryButton).toBeInTheDocument();
		// to edit
	});
});
