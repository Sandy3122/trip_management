import { ApiClient } from "../network/apiClient";
import { tripEndpoints } from "../api/endPoints";
import { toast } from 'react-toastify'; // Import toast

class TripRepository {
  // Function to handle the createTrip endpoint call
  createTrip = async (tripData) => {
    try {
      const url = tripEndpoints.createTrip(); // a function in tripEndpoints for creating trips
      const response = await ApiClient.post(url, tripData);  // Send POST request
      return response;
    } catch (error) {
      console.error("Error during trip creation:", error);
      toast.error(error.message || "Trip creation failed");
      throw error;
    }
  };
}

const tripRepository = new TripRepository();
export { tripRepository as TripRepository };
