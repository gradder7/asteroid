import SetDate from "./SetDate";
import { fetchData } from "./utils/fetchData";
function App() {
  

  const getData= async()=>{
    let data=await fetchData("2022-01-07", "2022-01-08");
    console.log(data);
  }
  getData();
  return (
    <div className="App">
      <h1>Welocme to NASA</h1>
      <SetDate/>
    </div>
  );
}

export default App;
