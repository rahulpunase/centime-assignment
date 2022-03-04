import React from 'react';
import {render, RenderResult, fireEvent} from '@testing-library/react';
import * as redux from "react-redux";
import {I18nProvider} from '../../../../i18n/i18n.provider';
import EditableRow from '../editable-row';
import store from "../../../../store/store";


describe('Editable Row component', () => {
	let wrapper: RenderResult;

	beforeEach(() => {
		const mockDefaultData = ['Income', 'Bills', 5];
		const rowIndex = 1;
		const deleteEntryHandler = jest.fn();
		const setIsEditingRow = jest.fn();
		wrapper = render(
			<redux.Provider store={store}>
				<I18nProvider>
					<table>
						<tbody>
						<EditableRow defaultData={mockDefaultData} rowIndex={rowIndex}
						             deleteEntryHandler={deleteEntryHandler} setIsEditingRow={setIsEditingRow}
						             disableEdit={false}/>
						</tbody>
					</table>
				</I18nProvider>
			</redux.Provider>
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
		const {getByTestId, queryByTestId, queryAllByTestId} = wrapper;
		const editButton = getByTestId('edit');
		const deleteButton = getByTestId('delete');
		fireEvent.click(editButton);
		const cancel = queryByTestId('cancel');
		const saveButton = queryByTestId('save');
		const getAllOtherEdits = queryAllByTestId('edit');
		const getAllOtherDelete = queryAllByTestId('delete');
		getAllOtherEdits.forEach(editButton => expect(editButton).toBeDisabled());
		getAllOtherDelete.forEach(deleteButton => expect(deleteButton).toBeDisabled());
		expect(deleteButton).not.toBeInTheDocument();
		expect(editButton).not.toBeInTheDocument();
		expect(saveButton).toBeInTheDocument();
		expect(cancel).toBeInTheDocument();
	});

	it('the last row shouldn\'t be deleted', async () => {
		const {queryAllByTestId, queryAllByRole} = wrapper;
		const getAllOtherDelete = queryAllByTestId('delete');
		getAllOtherDelete.forEach(deleteButton => {
			fireEvent.click(deleteButton);
			const trs = queryAllByRole('tr');
			expect(trs).not.toHaveLength(1);
		});
	});


	describe('Should test the form inputs', () => {
		it('should have inputs in the document', () => {
			const {getByTestId, queryByTestId, queryAllByTestId, queryAllByLabelText} = wrapper;
			const editButton = getByTestId('edit');
			fireEvent.click(editButton);
			const inputs = queryAllByTestId('form-input');
			expect(inputs).toHaveLength(3);
			inputs.forEach(input => expect(input).toBeInTheDocument());
		});

		it('should have correct input value', () => {
			const {getByTestId, queryAllByTestId} = wrapper;
			const editButton = getByTestId('edit');
			const columnData = queryAllByTestId('column-data');
			const actualColumnData = columnData.map(column => column.textContent);
			fireEvent.click(editButton);
			const inputs: Array<HTMLInputElement> = queryAllByTestId('form-input') as Array<HTMLInputElement>;
			inputs.forEach((input: HTMLInputElement, index) => {
				// fireEvent.change(input, {target: {value: columnData[index]}});
				expect(input.value).toBe(actualColumnData[index]);
			});
		});

		it('should disable the save button', () => {
			const {getByTestId, queryByTestId, queryAllByTestId, queryAllByLabelText} = wrapper;
			const editButton = getByTestId('edit');
			fireEvent.click(editButton);
			const inputs: Array<HTMLInputElement> = queryAllByTestId('form-input') as Array<HTMLInputElement>;
			const saveButton = queryByTestId('save');
			if (inputs.map(input => input.value).join('').trim() === '') {
				expect(saveButton).toBeDisabled()
			} else {
				expect(saveButton).not.toBeDisabled();
			}
		});

		it('should display alert if wrong value', () => {
			const {getByTestId, queryAllByTestId, queryByTestId} = wrapper;
			const editButton = getByTestId('edit');
			fireEvent.click(editButton);
			const inputs: Array<HTMLInputElement> = queryAllByTestId('form-input') as Array<HTMLInputElement>;
			const saveButton = queryByTestId('save');
			if (saveButton) {
				// Triggering the submit
				fireEvent.click(saveButton);
				const condition = Number(inputs[2].value) > 0;
				jest.spyOn(window, 'alert').mockImplementation(() => {});
				if (!condition) {
					expect(window.alert).toBeCalledWith("Data should be appropriate");
				}
			}
		});

		it('should submit with all the values', () => {
			const {getByTestId, queryAllByTestId, queryByTestId} = wrapper;
			const editButton = getByTestId('edit');
			fireEvent.click(editButton);
			const inputs: Array<HTMLInputElement> = queryAllByTestId('form-input') as Array<HTMLInputElement>;
			const mockData = ["Income", "Bills", "5"];
			inputs.forEach((input, index) => {
				fireEvent.change(input, { target: { value: mockData[index] } });
				expect(input.value).toBe(mockData[index]);
			});
		});
	});
});
