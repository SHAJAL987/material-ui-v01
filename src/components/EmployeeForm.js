import { Grid} from '@material-ui/core'
import React from 'react'
import { UserForm, Form } from './userForm'
import { Controls } from './controls/Controls'
import * as EmployeeService from '../services/EmployeeService'

const genderItems = [
    {
        id: 'male',
        title: 'Male'
    },
    {
        id: 'female',
        title: 'Female'
    },
    {
        id: 'others',
        title: 'Others'
    },

]
const initialFormValue = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isParmanent: false
}



export default function EmployeeForm() {


    const validate = (fieldValues = values) =>{
        let temp = {...errors}
        if('fullName' in fieldValues){
            temp.fullName = values.fullName?"":"Full Name is Required."
        }
        if('email' in fieldValues){
            temp.email = (/$^|.+@.+..+/).test(values.email)?"":"Email is Not Valid."
        }
        if('mobile' in fieldValues){
            temp.mobile = values.mobile.length > 10?"":"Minimum 11 Numbers is Required."
        }
        if('departmentId' in fieldValues){
            temp.departmentId = values.departmentId != 0 ?"":"Department Name is Required."
        }

        setErrors({
            ...temp
        })

        if(fieldValues == values){
            return Object.values(temp).every(x=> x == "")
        }
        
    }

    const { 
        values, 
        setValues, 
        errors,
        setErrors,
        handleInputChange,
        resetForm } = UserForm(initialFormValue,true,validate)

    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){
            EmployeeService.insertEmployee(values)
            resetForm()
        }
            
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                    <Controls.Input
                        name="mobile"
                        label="Mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
                    <Controls.Input
                        name="city"
                        label="City"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                        name="gender"
                        label="Gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        items={genderItems}
                    />
                    <Controls.Select
                        name="departmentId"
                        label="Department Name"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={EmployeeService.getDepartmentCollection()}
                        error={errors.departmentId}
                        
                    />
                    <Controls.DatePicker
                        name="hireDate"
                        label="Hire Date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                        name="isParmanent"
                        label="Parmanent Employee"
                        value={values.isParmanent}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit"

                        />
                        <Controls.Button
                            text="Clear"
                            color="default"
                            onClick={resetForm}
                        />

                    </div>

                </Grid>
            </Grid>
        </Form>
    )
}
