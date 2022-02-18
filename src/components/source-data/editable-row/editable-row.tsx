import React, {useEffect, useState} from 'react';
import './editable-row.scss';
import {useDispatch} from "react-redux";
import {updateSankeyData} from "../../../store/reducers/sankey-data/sankey-data.action";

export interface IEditableColumn {
	defaultData: Array<string | number>;
	rowIndex: number;
	deleteEntryHandler: (rowIndex: number) => void;
}

const EditableRow = ({defaultData, rowIndex, deleteEntryHandler}: IEditableColumn) => {
	const [isEditModeActive, setIsEditMode] = useState(false);
	const [rowData, setRowData] = useState(defaultData);
	const [isAvailableToSave, setIsAvailableToSave] = useState(false);
	const dispatch = useDispatch();
	const onEditHandler = () => {
		setIsEditMode(true)
	}
	const onCancelHandler = (rowIndex: number) => {
		if (!rowData.join('')) {
			deleteEntryHandler(rowIndex);
		} else {
			// delete reducer entry
		}
		setIsEditMode(false);

	}
	const onDeleteRowHandler = () => {

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
			{!!rowIndex && <tr className='editable-row__component'>
				{rowData.map((columnData, index) => {
					return (<td>
						{!isEditModeActive && <div>{columnData}</div>}
						{isEditModeActive && <input className='form-control' onChange={(event) => onInputChangeHandler(event, index)} value={columnData} type="text"/>}
					</td>)
				})}
				<td className='actions'>
					{!isEditModeActive && <button onClick={onEditHandler} className='btn btn-sm btn-primary'>Edit</button>}
					{isEditModeActive && <button onClick={() => onCancelHandler(rowIndex)} className='btn btn-sm btn-danger'>Cancel</button>}
					{!isEditModeActive && <button className='btn btn-sm btn-danger' onClick={onDeleteRowHandler}>Delete</button>}
					{isEditModeActive && <button className='btn btn-sm btn-success' onClick={() => onSaveHandler(rowIndex)}>Save</button>}
				</td>
			</tr>}
		</React.Fragment>
	);
};

export default EditableRow;
