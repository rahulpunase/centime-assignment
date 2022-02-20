import React from 'react';
import {render, RenderResult, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../../../../store/store';
import {I18nProvider} from '../../../../i18n/i18n.provider';
import EditableRow from '../editable-row';


describe('Editable Row component', () => {
	let wrapper: RenderResult;

	beforeEach(() => {
		const mockDefaultData = ['Income', 'Bills', 5];
		const rowIndex = 1;
		const mockFn = jest.fn();
		wrapper = render(
			<Provider store={store}>
				<I18nProvider>
					<table>
						<tbody>
							<EditableRow defaultData={mockDefaultData} rowIndex={rowIndex} deleteEntryHandler={mockFn}/>
						</tbody>
					</table>
				</I18nProvider>
			</Provider>
		);
	});

	it('should render correctly', () => {
		expect(wrapper).not.toBeNull();
	});


	it('should have necessary buttons', () => {
		const {getByTestId, queryByTestId} = wrapper;
		const editButton = getByTestId('edit');
		const deleteButton = getByTestId('delete');
		const saveButton = queryByTestId('save');
		const cancel = queryByTestId('cancel');
		expect(editButton).toBeInTheDocument();
		expect(deleteButton).toBeInTheDocument();
		expect(saveButton).not.toBeInTheDocument();
		expect(cancel).not.toBeInTheDocument();
	});

	it('Edit Button should work when clicked', async () => {
		const {getByTestId, queryByTestId} = wrapper;
		const editButton = getByTestId('edit');
		const deleteButton = getByTestId('delete');
		fireEvent.click(editButton);
		const cancel = queryByTestId('cancel');
		const saveButton = queryByTestId('save');
		expect(deleteButton).not.toBeInTheDocument();
		expect(editButton).not.toBeInTheDocument();
		expect(saveButton).toBeInTheDocument();
		expect(cancel).toBeInTheDocument();
	});
})
