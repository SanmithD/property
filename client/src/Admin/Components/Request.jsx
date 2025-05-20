import axios from "axios";
import { useEffect, useState } from "react";

function Request() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/api/buy/owner/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(res.data.response || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch requests");
    }
  };

  const handleDecision = async (buyId, action) => {
    try {
      const res = await axios.patch(
        `http://localhost:7000/api/buy/${buyId}?action=${action}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
      fetchRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to update request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Pending Buy Requests
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <p className="text-gray-700 font-medium mb-2">
                <strong>{req.customerName}</strong> requested to buy
                <strong>{req.propertyTitle}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Requested on: {new Date(req.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleDecision(req._id, "accept")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecision(req._id, "reject")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Request;
