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
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Organizer",
      selector: (row) => row.organizer,
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
    {
      name: "Note",
      selector: (row) => row.note,
    },
    {
      name: "Date",
      selector: (row) => row.time,
    },
    {
      name: "Action",
      selector: (row) => row.id,
      cell: (row) => (
        <>
          <Link to={`/events/${row._id}/edit`} className="mx__2 link">
            Edit
          </Link>
          <span className="mx__2 link" onClick={() => handleDelete(row._id)}>
            Delete
          </span>
          <Link to={`/events/view/${row._id}`} className="mx__2 link">
            View
          </Link>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    setLoading(true);
    Api.get("/events")
      .then((res) => {
        setEvents(res.data.event);
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
          <h2 className="flex-grow-1">Events</h2>
          <Link to="/create-event" className="ml-auto link">
            Create a new event
          </Link>
          <Link to="/dashboard" className="ml-auto link">
            Back to Dashboard
          </Link>
        </div>
        <div className="col-12">
          {loading && <div className="alert alert-info">Loading...</div>}
          {!loading && events.length === 0 && (
            <div className="alert alert-info">No events found</div>
          )}
          {!loading && events.length > 0 && (
            // <table className='table table-striped custom_table'>
            //     <thead>
            //         <tr>
            //             <th>Name</th>
            //             <th>Description</th>
            //             <th>Date</th>
            //             <th>Location</th>
            //             <th>Status</th>
            //             <th>Actions</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {events.map(event => (
            //             <tr key={event._id}>
            //                 <td>{event.name}</td>
            //                 <td>{event.desc}</td>
            //                 <td>{event.time}</td>
            //                 <td>{event.location}</td>
            //                 <td>{event.status}</td>
            //                 <td className='d-flex'>
            //                     <Link to={`/events/${event._id}`} className='btn btn-info link'>View</Link>
            //                     <Link to={`/events/${event._id}/edit`} className='btn btn-primary link'>Edit</Link>
            //                 </td>
            //             </tr>
            //         ))}
            //     </tbody>
            // </table>
            <DataTable
              columns={columns}
              data={events}
              pagination={true}
              responsive={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
