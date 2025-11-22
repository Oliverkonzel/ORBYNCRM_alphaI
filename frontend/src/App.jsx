import { useEffect, useState } from "react";
import { getCustomers, addCustomer } from "./services/api";
import "./index.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    address: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCustomer(form);
    setForm({
      name: "",
      email: "",
      phone: "",
      company_name: "",
      address: "",
    });
    loadCustomers();
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="header">
          <h1>ORBYN CRM</h1>
          <p>Customers</p>
        </header>

        <section className="card card-glow">
          <h2>Add Customer</h2>
          <form className="form-row" onSubmit={handleSubmit}>
            <input
              placeholder="Name"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
            <input
              placeholder="Email"
              value={form.email}
              onChange={handleChange("email")}
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange("phone")}
            />
            <input
              placeholder="Company"
              value={form.company_name}
              onChange={handleChange("company_name")}
            />
            <input
              placeholder="Address"
              value={form.address}
              onChange={handleChange("address")}
            />
            <button type="submit">Add Customer</button>
          </form>
        </section>

        <section className="card">
          <h2>Customer List</h2>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.company_name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.address}</td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", opacity: 0.7 }}>
                      No customers yet. Add one above ✨
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
