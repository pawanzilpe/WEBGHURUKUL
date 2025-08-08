import React, { useEffect, useState } from "react";
import { userdata } from "../data";
import "./Datatable.css";
const Datatable = () => {
  const [data, setData] = useState(userdata);
  const [search, setSearch] = useState("");
  // pagination
  const [perPageRecord, setPerPageRecord] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBtn, setPageBtn] = useState([]);
  // it create pagination button count
  const handlePaginationBtn = () => {
    let res = [];
    for (let i = 1; i <= Math.ceil(1000 / perPageRecord); i++) {
      res.push(i);
    }
    setPageBtn(res);
  };
  // it slice the array
  const handlePaginationRecord = () => {
    let last = currentPage * perPageRecord;
    let first = last - perPageRecord;

    let result = userdata.slice(first, last);
    setData(result);
  };

  useEffect(() => {
    handlePaginationBtn();
    handlePaginationRecord();
  }, [currentPage, perPageRecord]);

  // pagination: javascript
  const handleSearch = () => {
    let res = userdata.filter((item) => {
      if (
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.gender.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setData(res);
  };

  return (
    <div>
      <h2 align="center">Datatable</h2>
      <p align="center">
        Search :{" "}
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button className="btn" onClick={handleSearch}>
          Search
        </button>
      </p>
      <p align="center">
        {pageBtn.map((item, index) => {
          return (
            <button key={index} onClick={() => setCurrentPage(item)}>
              {item}
            </button>
          );
        })}
      </p>
      <p align="center">
        <select onChange={(e) => setPerPageRecord(e.target.value)}>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={500}>500</option>
        </select>
      </p>
      <table
        border="2"
        cellPadding={5}
        cellSpacing={5}
        rules="all"
        align="center"
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Ip Addresss</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.ip_address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
