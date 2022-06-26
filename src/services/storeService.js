import axios from '../helpers/axios';
import { BASE_URL } from '../constants/constant';
class StoreService {
    static instance;

     static getInstance() {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService();
        }

        return StoreService.instance;
    }

     createStore(data) {
        const option = {
            url: `${BASE_URL}/store`,
            data,
        };

        return axios.post(option);
    }

    updateStore(data) {
        const option = {
            url: `${BASE_URL}/store`,
            data,
        };

        return axios.put(option);
    }

     getAllStores(query) {
        const option = {
            url: `${BASE_URL}/store?query=${JSON.stringify(query)}`,
        };

        return axios.get(option);
    }

    getAllStoresUnassigned(query) {
        const option = {
            url: `${BASE_URL}/store-unassigned?query=${JSON.stringify(query)}`,
        };

        return axios.get(option);
    }

    getStoreById(storeId) {
        const option = {
            url: `${BASE_URL}/store/${storeId}`,
        }

        return axios.get(option);
    }
}

export default StoreService.getInstance();

