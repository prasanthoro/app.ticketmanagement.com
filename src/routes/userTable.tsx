import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/userTable")({
  component: RouteComponent,
});
function RouteComponent() {
  const [cpage, setCpage] = useState(1);
  const [totalPages, setTpages] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");
  // const [filterTimeout, setFilterTimeout] = useState(null);
  const [filterTimeout, setFilterTimeout] = useState<number | null>(null);
  const limit = 20;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  if (!token) {
    alert(
      "No access token found in local storage. Please login to view the tickets data"
    );
    navigate({ to: "/signIn" });
  }
  const fetchTickets = async (page, filter) => {
    const res = await fetch(
      `https://api-ticketmanagement.onrender.com/v1.0/tickets?page=${page}&limit=${limit}&searchstring=${filter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch the tickets data");
    }
    const data = await res.json();
    setTpages(data.pagination_details.total_pages);
    return data;
  };
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tickets", cpage, globalFilter],
    queryFn: () => fetchTickets(cpage, globalFilter),
    placeholderData: keepPreviousData,
  });
  const deleteTicket = async (ticketId) => {
    const res = await fetch(
      `https://api-ticketmanagement.onrender.com/v1.0/tickets/${ticketId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete the ticket");
    }
    const data = await res.json();
    return data;
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(["tickets", cpage, globalFilter]);
      alert("Ticket deleted successfully!");
    },
    onError: () => {
      alert("Failed to delete the ticket. Please try again.");
    },
  });
  const handlePageChange = (direction) => {
    if (direction === "prev" && cpage > 1) {
      setCpage(cpage - 1);
    } else if (direction === "next" && cpage < totalPages) {
      setCpage(cpage + 1);
    }
  };

  const handleFilterChange = (e: React.FormEvent) => {
    const value = e.target.value;
    setGlobalFilter(value);

    if (filterTimeout) {
      clearTimeout(filterTimeout);
    }

    // Debounce filter updates to avoid making too many API requests
    // setFilterTimeout(
    //   setTimeout(() => {
    //     queryClient.invalidateQueries(["tickets", cpage, value]);
    //   }, 500)
    // );
    const newTimeout = setTimeout(() => {
      queryClient.invalidateQueries(["tickets", cpage, value]);
    }, 500);

    setFilterTimeout(newTimeout);
  };
  console.log(data);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Ticket Management</h1>
      {/* Global Filter */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search tickets..."
          value={globalFilter}
          onChange={handleFilterChange}
          style={{ padding: "5px", width: "300px" }}
        />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <table border="4" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Ticket sID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Requested By</th>
                <th>Update</th>
                <th>Delete</th>
                <th>comments</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.status || "Not Assigned"}</td>
                  <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                  <td>{ticket.requested_by}</td>
                  {/* <td>
                    <Link to={"/updateticket/" + ticket.id}>Update</Link>
                  </td> */}
                  <td>
                    <Link
                      to={"/updateticket/" + ticket.id}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={() => deleteMutation.mutate(ticket.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/getallcomments/${ticket.id}?requestedBy=${encodeURIComponent(ticket.requested_by)}`}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              onClick={() => handlePageChange("prev")}
              disabled={cpage === 1}
            >
              Previous
            </button>
            <span>
              Page {cpage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={cpage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
