import { InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from '@material-ui/core'
import {PeopleOutlineTwoTone, Search } from '@material-ui/icons'
import React, { useState } from 'react'
import { Controls } from '../components/controls/Controls'
import EmployeeForm from '../components/EmployeeForm'
import PageHeader from '../components/PageHeader'
import useTable from '../components/useTable'
import * as EmployeeService from '../services/EmployeeService'

const useStyles = makeStyles(theme =>({
    pageContent:{
        margin: theme.spacing(4),
        padding: theme.spacing(2)
    }
}))

const headCells=[
    {id:'fullName', label:'Employee Name'},
    {id:'email', label:'Email Address (Personal)'},
    {id:'mobile',label:'Mobile'},
    {id: 'department',label:'Department'}
]

export default function Employee() {
    const classes = useStyles()
    const [records, setRecords] = useState(EmployeeService.getAllEmployees())
    const [filterFn, setFilterFnc] = useState({Fnc:items=>{return items}})

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records,headCells,filterFn)

    const handleSearch = e =>{
        let target = e.target;
        setFilterFnc({
            Fnc: items => {
                if(target.value == ""){
                    return items;
                }
                else{
                    return items.filter(x => x.mobile.includes(target.value))
                }
            }
        })
    }

    return (
        <>
            <PageHeader 
                title="User Registration"
                subTitle="User Creation form for application."
                icon={<PeopleOutlineTwoTone />}
            />
            <Paper className={classes.pageContent} elevation={3}>
                {/* <EmployeeForm /> */}
                <Toolbar>
                    <Controls.Input 
                        label='Search'
                        size="small"
                        InputProps={{
                            startAdornment:(
                            <InputAdornment position="start">
                                <Search/>
                            </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                </TableRow>)
                                )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>

        </>
    )
}
