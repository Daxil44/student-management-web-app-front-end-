import React, { useState } from 'react';
import './index.css';
import './CustomerList.css'

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editInputValue, setEditInputValue] = useState('');

  const handleAddCustomer = () => {
    if (inputValue.trim() !== '') {
      setCustomers([...customers, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteCustomer = (index) => {
    const newCustomers = [...customers];
    newCustomers.splice(index, 1);
    setCustomers(newCustomers);
  };

  const handleEditCustomer = (index) => {
    setEditingIndex(index);
    setEditInputValue(customers[index]);
  };

  const handleSaveEdit = () => {
    const newCustomers = [...customers];
    newCustomers[editingIndex] = editInputValue;
    setCustomers(newCustomers);
    setEditingIndex(null);
    setEditInputValue('');
  };

  return (
    <div className="mt-75 layout-column align-items-center justify-content-center">
      <section className="layout-row align-items-center justify-content-center">
        <input
          type="text"
          className="large"
          placeholder="Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="ml-30"
          onClick={handleAddCustomer}
        >
          Add Customer
        </button>
      </section>
      {customers.length > 0 && (
        <ul className="styled mt-50">
          {customers.map((customer, index) => (
            <li key={index} className="slide-up-fade-in">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                  />
                  <button
                    type="button"
                    className="ml-10"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {customer}
                  <button
                    type="button"
                    className="ml-10"
                    onClick={() => handleEditCustomer(index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="ml-10"
                    onClick={() => handleDeleteCustomer(index)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomerList;
