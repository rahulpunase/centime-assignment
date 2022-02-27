import React, {useEffect, useState} from 'react';
import './source-data.scss'
import {useSelector} from 'react-redux';
import {IStore} from '../../store/store';
import EditableRow from './editable-row/editable-row';
import {translate} from '../../i18n/translate';

const SourceDataComponent = () => {
	const sankey = useSelector((store: IStore) => store.sankeyReducer);
	const [tableData, setTableData] = useState(sankey.dataStore);
	const [isEditingRow, setIsEditingRow] = useState(-1);
	useEffect(() => {
		setTableData([...sankey.dataStore]);
	}, [sankey.dataStore]);

	const addEntryHandler = () => {
		const _tableData = [...tableData];
		const indexOfRowOfEmptyCell = _tableData.findIndex(rowData => rowData.includes(''));
		if (indexOfRowOfEmptyCell > -1) {
			alert('Please complete all the cells first');
		} else {
			_tableData.push(['', '', '']);
			setTableData(_tableData);
		}
	}

	const deleteEntryHandler = (rowIndex: number) => {
		const _tableData = [...tableData];
		_tableData.splice(rowIndex, 1);
		setTableData(_tableData);
	}

	return (
		<div className='source-data__component'>
			{!sankey.dataLoaded && <p>Loading item lists...</p>}
			{sankey.dataLoaded && <table className='table' data-testid='content-table'>
				<thead>
				<tr>
					{tableData[0].map(heading => <th data-testid='c-head-row' key={heading}>{translate(heading)}</th>)}
				</tr>
				</thead>
				<tbody>
				{
					tableData.map((rowData, index) => <EditableRow
						key={JSON.stringify(rowData)}
						defaultData={rowData}
						rowIndex={index}
						deleteEntryHandler={deleteEntryHandler}
						setIsEditingRow={setIsEditingRow}
						disableEdit={isEditingRow !== -1 && isEditingRow !== index}
					/>)
				}
				<tr>
					<td colSpan={4}>
						<button data-testid='add-entry-button' onClick={addEntryHandler}
								disabled={isEditingRow > -1}
								className='btn btn-primary'>{translate('Add Entry')}</button>
					</td>
				</tr>
				</tbody>
			</table>}
		</div>
	);
};

export default SourceDataComponent;



