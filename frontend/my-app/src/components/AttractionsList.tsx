import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { AttractionShortType } from "../types/AttractionShortType"
import { useEffect, useState } from "react";
import { Autocomplete, MenuItem, Select, Stack, TextField } from "@mui/material";


const data : AttractionShortType[] = 
    [
        {
            address: "Z\u0142otoryja 23-232, \u015aliska 8b",
            id: 1,
            location_lat: 50.22351,
            location_lon: 17.33286,
            name: "stolowka 1",
            short_description: "dobre jedzenie",
            type : "Muzeum"
        },
        {
            address: "aaaaaaaaahhhhhka 8b",
            id: 2,
            location_lat: 50.22351,
            location_lon: 17.33286,
            name: "stolowka 2",
            short_description: "darmowe gratisy",
            type : "Restaurant"
        }
    ]

const cols : GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        type: "string",
        width: 250,
    },
    {
        field: 'address',
        headerName: 'Address',
        type: "string",
        width: 400,
    },
    {
        field: 'short_description',
        headerName: 'Description',
        type: 'string',
        width: 500,
    },
    {
        field: 'type',
        headerName: 'Category',
        type: "string",
        width: 200
    }
];

const availableTypes : string[] = Array.from(new Set(data.map(e => e.type)))

export default function AttractionsList(){
    const url = `http://192.168.123.92:5000/place/`;
    const [data, setData] = useState<AttractionShortType[]>([]);
    const [category, setCategory] = useState<string | null>('All')
    const [name, setName] = useState<string | null>(null)
    const rows = data.filter(e => (e.type == category || category == 'All') && (name == null || e.name == name))
    const [selectedId, setSelectedId] = useState<number | null>(null)

    return <>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div style={{ width: '60%' }}>
                <Stack spacing = {4}>
                    <Stack direction = "row" spacing = {2}>
                        <Autocomplete
                            sx={{width: "50%"}}
                            options = {data.map(e => e.name)}
                            value = {name}
                            renderInput = {(params) => <TextField {...params} label = "Name"/>}
                            onChange={(event: any, newValue: string | null) => {
                                setName (newValue);
                            }}
                        />

                        <Select
                            value = {category}
                            sx = {{width:"50%"}}
                            onChange = {(e) => setCategory(e.target.value)}
                        >    
                            <MenuItem 
                                key = "All"
                                value = "All"
                            >
                                All
                            </MenuItem>
                            {availableTypes.map((name) => (
                                <MenuItem
                                    key = {name}
                                    value = {name}
                                >
                                    {name}
                                </MenuItem> 
                            ))}
                        </Select>
                    </Stack>
                    <DataGrid
                        rows={rows}
                        columns={cols}
                        disableRowSelectionOnClick
                    />
                </Stack>
            </div>
        </div>
    </>;
}