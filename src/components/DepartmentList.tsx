import React, { useState } from 'react';
import { List, ListItem, Collapse, Checkbox, FormControlLabel, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// this define what tyoe of array is department array
interface Department {
    department: string;
    sub_departments: string[];
    selected: boolean;
    subDepartmentsSelected: boolean[];
}
const departmentData = [
    {
        department: "customer_service",
        sub_departments: [
            "support",
            "customer_success"
        ],
        selected: false,
        subDepartmentsSelected: [false, false],
    },
    {
        department: "design",
        sub_departments: [
            "graphic_design",
            "product_design",
            "web_design"
        ],
        selected: false,
        subDepartmentsSelected: [false, false, false],
    }
]


const DepartmentList: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>(departmentData);
    const [open, setOpen] = useState<number | null>(null);

    // this funtion will change the current selected department index
    const handleDepartmentClick = (index: number) => {
        setOpen(open === index ? null : index);
    };

    // this function change the head department which are selected
    const handleDepartmentChange = (index: number) => {
        const newDepartments = [...departments];
        const department = newDepartments[index];
        department.selected = !department.selected;
        department.subDepartmentsSelected = department.subDepartmentsSelected.map(() => department.selected);
        setDepartments(newDepartments);
    };

    // this function change the sub department which are selected
    const handleSubDepartmentChange = (deptIndex: number, subIndex: number) => {
        const newDepartments = [...departments];
        const department = newDepartments[deptIndex];
        department.subDepartmentsSelected[subIndex] = !department.subDepartmentsSelected[subIndex];
        department.selected = department.subDepartmentsSelected.every((selected) => selected);
        setDepartments(newDepartments);
    };

    return (
        <List>
            {/* map on the departments */}
            {departments.map((department, deptIndex) => (
                
                <div key={deptIndex} >
                    {/* this is the parent of subdepartments */}
                    <ListItem  onClick={() => handleDepartmentClick(deptIndex)}>
                        <FormControlLabel control={
                                <Checkbox style={{display:'flex',}}
                                    checked={department.selected}
                                    indeterminate={
                                        !department.selected && department.subDepartmentsSelected.some((selected) => selected)
                                    }
                                    // every time we click this checkbox the handleDepartmentChange function will work
                                    onChange={() => handleDepartmentChange(deptIndex)}
                                />
                            }
                            label=""
                        />
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:4}}>
                            {department.department}
                            <p>({department.sub_departments.length})</p>
                            </div>
                        {/* this opens the that particular depatment which is selected */}
                        {open === deptIndex ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    {/* this is hidden but when the parent department is selected then this section shows itself  */}
                    <Collapse in={open === deptIndex} timeout="auto" unmountOnExit>
                        <Box sx={{ pl: 4 }}>
                            {/* for very subdepartment  */}
                            {department.sub_departments.map((subDept, subIndex) => (
                                <ListItem key={subIndex}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={department.subDepartmentsSelected[subIndex]}
                                                onChange={() => handleSubDepartmentChange(deptIndex, subIndex)}
                                            />
                                        }
                                        label={subDept}
                                    />
                                </ListItem>
                            ))}
                        </Box>
                    </Collapse>
                </div>
            ))}
        </List>
    );
};

export default DepartmentList;

