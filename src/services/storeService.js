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

     getAllStores() {
        const option = {
            url: `${BASE_URL}/store`,
        };

        return axios.get(option);
    }
}

export default StoreService.getInstance();

