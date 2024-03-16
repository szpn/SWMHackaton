import DetailsCard from './components/Details';
import React, { useState, useEffect } from 'react';
function App() {
    const url = "http://192.168.123.92:5000/place/3/";
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
  
      fetchData(); 
    }, [url]); 
  return data ? (
    <DetailsCard name={data['name']} description={data['short_description']}
     address="Kraków" link={data['contact_link']} phone={data['contact_phone']}/>
  ):(
    <p>Błąd wczytywania danych</p>
  );
}

export default App;
