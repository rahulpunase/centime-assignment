import React, {useEffect, useState} from 'react';
import './editable-row.scss';
import {useDispatch, useSelector} from 'react-redux';
import {deleteSankeyData, updateSankeyData} from '../../../store/reducers/sankey-data/sankey-data.action';
import {translate} from "../../../i18n/translate";
import {IStore} from "../../../store/store";

export interface IEditableRow {
	defaultData: Array<string | number>;
	rowIndex: number;
	deleteEntryHandler: (rowIndex: number) => void;
	setIsEditingRow: (index: number) => void;
	disableEdit: any;
}

const EditableRow = ({defaultData, rowIndex, deleteEntryHandler, setIsEditingRow, disableEdit}: IEditableRow) => {
	const [isEditModeActive, setIsEditMode] = useState(false);
	const [rowData, setRowData] = useState(defaultData);
	const sankeyDataReducer = useSelector((store: IStore) => store.sankeyReducer);
	const shouldSaveDisable = rowData.includes('');

	const dispatch = useDispatch();

	useEffect(() => {
		if (!rowData.join('')) {
			setIsEditMode(true);
		}
		setIsEditingRow(isEditModeActive ? rowIndex : -1);
	}, [isEditModeActive]);

	const onEditHandler = () => {
		setIsEditMode(true);
	}
	const onCancelHandler = (rowIndex: number) => {
		if (!rowData.join('')) {
			deleteEntryHandler(rowIndex);
		}
		setIsEditMode(false);
	}
	const onDeleteRowHandler = (rowIndex: number) => {
		dispatch(deleteSankeyData({
			index: rowIndex
		}));
	}
	const onSaveHandler = (rowIndex: number) => {
		const isValid = Number(rowData[2]) > 0;
		if (!isValid) {
			alert("Data should be appropriate");
			return;
		} else {
			rowData[2] = Number(rowData[2]);
			dispatch(updateSankeyData({
				index: rowIndex,
				newRow: rowData
			}));
			setIsEditMode(false);
			// setIsEditingRow(-1);
		}
	}

	const onInputChangeHandler = (event: React.FormEvent<HTMLInputElement>, index: number) => {
		const data = [...rowData];
		data[index] = event.currentTarget.value;
		setRowData(data);
	}

	return (
		<React.Fragment>
			{!!rowIndex && <tr className='editable-row__component' data-testid='editable-row'>
				{rowData.map((columnData, index) => {
					return (<td key={index}>
						{!isEditModeActive && <div>{columnData}</div>}
						{isEditModeActive &&
							<input className='form-control'onChange={(event) => onInputChangeHandler(event, index)} value={columnData} type='text'/>}
					</td>)
				})}
				<td className='actions'>
					{!isEditModeActive && <button data-testid='edit' disabled={disableEdit} onClick={onEditHandler} className='btn btn-sm btn-primary'>{translate('Edit')}</button>}
					{isEditModeActive && <button data-testid='cancel' onClick={() => onCancelHandler(rowIndex)} className='btn btn-sm btn-danger'>{translate('Cancel')}</button>}
					{!isEditModeActive && <button data-testid='delete' disabled={sankeyDataReducer.dataStore.length === 2 || disableEdit} className='btn btn-sm btn-danger' onClick={() => onDeleteRowHandler(rowIndex)}>{translate('Delete')}</button>}
					{isEditModeActive && <button data-testid='save' disabled={shouldSaveDisable} className='btn btn-sm btn-success' onClick={() => onSaveHandler(rowIndex)}>{translate('Save')}</button>}
				</td>
			</tr>}
		</React.Fragment>
	);
};

export default EditableRow;
