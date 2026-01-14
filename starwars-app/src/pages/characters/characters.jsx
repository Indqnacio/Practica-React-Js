import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Characters_table from "../../components/table";

export default function Characters() {
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://swapi.info/api/");
        setData(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  */

  return (
    <Characters_table />
  );
}
