// Defining your API endpoints here
export const userCreation = {
    registerUser: () => "/api/users/register",
    loginUser: () => "/api/users/login",
    placesApi: (input) => `/api/autocomplete/places/?input=${input}`
};


export const tripEndpoints = {
    createTrip: () => "/api/trip/create",
}