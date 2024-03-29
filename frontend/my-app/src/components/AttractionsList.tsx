import {DataGrid, GridColDef, GridEventListener} from '@mui/x-data-grid';
import { AttractionShortType } from "../types/AttractionShortType"
import { useEffect, useState } from "react";
import { Autocomplete, MenuItem, Select, Stack, TextField } from "@mui/material";
import AddPlaceForm from "./AddPlaceForm";
import TopBar from "./Bar";
import MakeMap from "./MakeMap";
import {useNavigate} from "react-router-dom";


const cols: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        type: "string",
        width: 250
    },
    {
        field: 'address',
        headerName: 'Address',
        type: "string",
        width: 300,
    },
    {
        field: 'short_description',
        headerName: 'Description',
        type: 'string',
        width: 400,
    },
    {
        field: 'type_name',
        headerName: 'Category',
        type: "string",
        width: 200
    }
];


export default function AttractionsList() {
    const url = `${process.env.REACT_APP_API_URL}/place/`;
    const [data, setData] = useState<AttractionShortType[]>([]);
    const [name, setName] = useState<string | null>()
    const [category, setCategory] = useState<string>('All')

    const rows = data.filter(e => (e.type_name == category || category == 'All') && (name == null || e.name == name))

    const availableTypes: string[] = Array.from(new Set(data.map(e => e.type_name)))
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [url]);

    const handleClick: GridEventListener<'rowClick'> = (
        params
    ) => {
        const clicked_id = params.id;
        navigate(`/place/${clicked_id}/`)
        console.log(clicked_id);
    };

    return <>
        <TopBar />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div style={{ width: '60%' }}>
                <Stack spacing={4}>
                    <MakeMap />
                    <Stack direction="row" spacing={2}>
                        <Autocomplete
                            sx={{ width: "50%" }}
                            options={data.map(e => e.name)}
                            value={name}
                            renderInput={(params) => <TextField {...params} label="Name" />}
                            onChange={(event: any, newValue: string | null) => {
                                setName(newValue);
                            }}
                        />
                        <Select
                            value={category}
                            sx={{ width: "50%" }}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem
                                key="All"
                                value="All"
                            >
                                All
                            </MenuItem>
                            {availableTypes.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <DataGrid
                        rows={rows}
                        columns={cols}
                        onRowClick={handleClick}
                        disableRowSelectionOnClick
                    />
                    <AddPlaceForm />
                </Stack>
            </div>
        </div>
    </>;
}