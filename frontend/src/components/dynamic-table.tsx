
"use client";
import { isNotEmptyArray } from './common/utils/main-utils';
import { FaPeopleArrows } from 'react-icons/fa6';
import * as xlsx from "xlsx";
import { saveAs } from "file-saver";
import { MdOutlineFileDownload, MdRefresh } from 'react-icons/md';
import { PiTextColumnsDuotone } from 'react-icons/pi';
import { useState } from 'react';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
// import "../css/dynamic-table.scss"

interface ColumsType {
    field: string,
    header: string;
}
interface rowsType {
    [key: string]: unknown;
}
interface TableType {
    columns: ColumsType[],
    rows: rowsType[],
}
const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

export default function DynamicTable({ columns, rows }: TableType) {
    const [isColumnsSiderOpen, setIsColumsSidebarOpen] = useState(false);
    const [dates, setDates] = useState(null);
    const saveAsExcelFile = (buffer: any, fileName: string) => {
        const data = new Blob([buffer], { type: EXCEL_TYPE });
        saveAs(data, `${fileName}.xlsx`);
    };
    const exportExcel = () => {
        const worksheet = xlsx.utils.json_to_sheet(rows);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });
        saveAsExcelFile(excelBuffer, 'products');
    };
    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center py-2 px-1">
                <div className='flex gap-2 items-center'>
                    <div className='w-[50px] h-[50px] p-2 rounded bg-base flex justify-center items-center'>
                        <FaPeopleArrows className='text-3xl  text-[#fff]' />
                    </div>
                    <div className='flex flex-col '>
                        <p>Customer</p>
                        <span className='font-medium text-base'>Manage all you customers</span>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <div className="p-inputgroup flex w-[220px] h-[40px]">
                        <InputText
                            placeholder="Search..."
                            className="outline-none focus:outline-none ring-0 border-secondary-white text-[14px]"
                        />
                        <Button icon="pi pi-search" className="bg-base text-[#fff] w-[40px]" />
                    </div>
                    <div className=" p-inputgroup flex w-[220px] h-[40px]">
                        <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" hideOnRangeSelection  className="outline-none focus:outline-none ring-0 border-secondary-white" placeholder='All Dsates' />
                        <Button icon="pi pi-clock" className="bg-base text-[#fff] w-[40px]" />
                    </div>
                    <div className='flex justify-center items-center rounded-full bg-base  h-[40px] w-[40px] shadow cursor-pointer '>
                        <IoMdAdd className=' w-[26px] h-[26px]  text-[#fff]' />
                    </div>
                    <div className='flex justify-center items-center rounded-full bg-base  h-[40px] w-[40px] shadow cursor-pointer '>
                        <RiUploadCloud2Line className=' w-[26px] h-[26px]  text-[#fff]' />
                    </div>
                    <div className='flex justify-center items-center rounded bg-secondary h-[40px] w-[53px] shadow cursor-pointer ' onClick={exportExcel}>
                        <MdOutlineFileDownload className='text-white w-[26px] h-[26px] hover:text-second-white' />
                    </div>

                    <div className='flex justify-center items-center rounded bg-secondary h-[40px] w-[53px] shadow cursor-pointer ' onClick={() => setIsColumsSidebarOpen(true)}>
                        <PiTextColumnsDuotone className='text-white w-[26px] h-[26px] hover:text-second-white' />
                    </div>
                    <div className='flex justify-center items-center rounded bg-secondary h-[40px] w-[53px] shadow cursor-pointer '>
                        <MdRefresh className='text-white w-[26px] h-[26px] hover:text-second-white' />
                    </div>
                </div>


            </div>
        );
    };


    const header = renderHeader();
    return (
        <div className="card p-2 shadow w-full overflow-hidden">
            <Sidebar visible={isColumnsSiderOpen} position="right" onHide={() => setIsColumsSidebarOpen(false)}>
                <h2>Colums setting</h2>
                <p>
                    for select  or un select the colums from the table
                </p>
            </Sidebar>
            <DataTable value={rows}  columnResizeMode="expand" resizableColumns  scrollable scrollHeight='500px' header={header} rows={10} size='small' removableSort dataKey="id"
                filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                emptyMessage="No customers found.">
                {isNotEmptyArray(columns) && columns.map((col) => (
                    <Column key={col.field} field={col.field} header={<span style={{fontWeight:'600'}}>{col?.header}</span>} sortable  style={{fontSize:'14px'}}/>
                ))}
            </DataTable>
        </div>
    );
}
