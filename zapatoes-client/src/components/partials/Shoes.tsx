import { useEffect, useState } from "react";
import axios from "axios";
import ShoeList from "../ShoeList";
import Navbar from "./navbar";

export default function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getShoes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/shoes/get`
        );
        console.log(response);
        const filteredShoes = response.data.shoes.filter((shoe: any) => {
          return shoe.name.toLowerCase().includes(search.toLowerCase());
        });

        setShoes(filteredShoes);
        // console.log(response.data)
      } catch (err) {
        console.warn(err);
      }
    };
    getShoes();
  }, [search]);

  //   console.log(shoes);
  const shoeListComponents = shoes.map((shoe: any) => {
    return <ShoeList shoe={shoe} key={shoe._id} />;
  });
  return (
    <div>
      <header className="text-center">
        <Navbar />
      </header>
      <div className="p-10">
        <h1>All Shoes</h1>
        {/* <ShoeSearch search={search} setSearch={setSearch} /> */}
        <div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-sm text-gray-700 bg-white border rounded-full shadow-sm overflow-visible focus:text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="Search for some Shoes"
            aria-label="Search"
          />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-8">
          {shoeListComponents}
        </div>
      </div>
    </div>
  );
}
