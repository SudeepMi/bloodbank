import React from "react";
import { Link } from "react-router-dom";
import Api from "../../utils/Api";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";

function Index() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleDelete = (id) => {
    setLoading(true);
    const intToast = toast.loading("Deleting....");
    Api.delete("/events/" + id).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        toast.dismiss(intToast);
        toast.success("Deleted", {
          closeButton: false,
        });
      }
    });
  };

  const columns = [
    {
      name: "Notfication",
      selector: (row) => (
         <Link to={`${JSON.parse(row.message).url}`}>{JSON.parse(row.message).title}</Link>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.createdAt,
    },
  ];

  React.useEffect(() => {
    setLoading(true);
    Api.get("/notifications")
      .then((res) => {
        setEvents(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="container-fluid p-5">
      <ToastContainer />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-12 d-flex">
          <h2 className="flex-grow-1">Notification</h2>
          <Link to="/events" className="ml-auto link">
            Events
          </Link>
          <Link to="/dashboard" className="ml-auto link">
            Back to Dashboard
          </Link>
        </div>
        <div className="col-8 m-auto">
          {loading && <div className="alert alert-info">Loading...</div>}
          {!loading && events.length === 0 && (
            <div className="alert alert-info">No Notifications found</div>
          )}
          {!loading && events.length > 0 && (

            <DataTable
              columns={columns}
              data={events}
              pagination={true}
              responsive={true}
                paginationRowsPerPageOptions={[5, 10, 20, 50, 100]}

            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
