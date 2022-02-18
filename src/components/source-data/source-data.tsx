import React, {useEffect, useState} from 'react';
import './source-data.scss'
import {useSelector} from "react-redux";
import {IStore} from "../../store/store";
import EditableRow from "./editable-row/editable-row";

const SourceDataComponent = () => {
	const sankey = useSelector((store: IStore) => store.sankeyReducer);
	const [tableData, setTableData] = useState(sankey.dataStore);

	useEffect(() => {
		setTableData(sankey.dataStore);
	}, [sankey.dataStore]);

	const addEntryHandler = () => {
		const _tableData = [...tableData];
		_tableData.push(['', '', '']);
		setTableData(_tableData);
	}

	const deleteEntryHandler = (rowIndex: number) => {
		const _tableData = tableData;
		_tableData.splice(rowIndex, 1);
		setTableData([..._tableData]);
	}

	return (
		<div className='source-data__component'>
			<table className='table'>
				<thead>
				<tr>
					{tableData[0].map(heading => <th key={heading}>{heading}</th>)}
					<th/>
				</tr>
				</thead>
				<tbody>
				{
					tableData.map((rowData, index) => <EditableRow
						defaultData={rowData}
						rowIndex={index}
						deleteEntryHandler={deleteEntryHandler}
					/>)
				}
				<tr>
					<td colSpan={4}>
						<button onClick={addEntryHandler} className="btn btn-primary">Add Entry</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	);
};

export default SourceDataComponent;



