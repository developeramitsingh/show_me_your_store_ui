let backendUrl = "http://localhost:5000";
if (process.env.REACT_APP_ENV === "production") {
  backendUrl = "https://service-backend.myhousecallspro.com";
}

const BASE_URL = backendUrl;

const STATE_LIST = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"];

const STORE_TYPES = [{ label: 'Retailer', value: 'retailer' }, { label: 'Whole Seller', value: 'wholeSeller'}, { label: 'Distributor', value: 'distributor'}];


const STORE_CATEGORY = [{ label: 'Electrical', value: 'electrical' }, { label: 'Grocery', value: 'grocery'}, { label: 'Hardware', value: 'hardware'}];

const ROLES = {
  SA: 'SA',
  CA: 'CA',
  UA: 'UA',
};

export { STATE_LIST, STORE_TYPES, STORE_CATEGORY, BASE_URL, ROLES }