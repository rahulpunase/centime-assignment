import React, {useEffect, useState} from 'react';
import './editable-row.scss';
import {useDispatch} from 'react-redux';
import {deleteSankeyData, updateSankeyData} from '../../../store/reducers/sankey-data/sankey-data.action';
import {translate} from "../../../i18n/translate";

export interface IEditableColumn {
	defaultData: Array<string | number>;
	rowIndex: number;
	deleteEntryHandler: (rowIndex: number) => void;
}

const EditableRow = ({defaultData, rowIndex, deleteEntryHandler}: IEditableColumn) => {
	const [isEditModeActive, setIsEditMode] = useState(false);
	const [rowData, setRowData] = useState(defaultData);
	const dispatch = useDispatch();
	const onEditHandler = () => {
		setIsEditMode(true)
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
		}))
	}
	const onSaveHandler = (rowIndex: number) => {
		setIsEditMode(false);
		dispatch(updateSankeyData({
			index: rowIndex,
			newRow: rowData
		}));
	}

	const onInputChangeHandler = (event: React.FormEvent<HTMLInputElement>, index: number) => {
		const data = rowData;
		data[index] = event.currentTarget.value;
		setRowData([...data]);
	}
	useEffect(() => {
		if (!rowData.join('')) {
			setIsEditMode(true);
		}
	}, []);
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
					{!isEditModeActive && <button data-testid='edit' onClick={onEditHandler} className='btn btn-sm btn-primary'>{translate('Edit')}</button>}
					{isEditModeActive && <button data-testid='cancel' onClick={() => onCancelHandler(rowIndex)} className='btn btn-sm btn-danger'>{translate('Cancel')}</button>}
					{!isEditModeActive && <button data-testid='delete' className='btn btn-sm btn-danger' onClick={() => onDeleteRowHandler(rowIndex)}>{translate('Delete')}</button>}
					{isEditModeActive && <button data-testid='save' className='btn btn-sm btn-success' onClick={() => onSaveHandler(rowIndex)}>{translate('Save')}</button>}
				</td>
			</tr>}
		</React.Fragment>
	);
};

export default EditableRow;
