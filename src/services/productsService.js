import axios from '../helpers/axios';
import { BASE_URL } from '../constants/constant';
class ProductsService {
    static instance;

     static getInstance() {
        if (!ProductsService.instance) {
            ProductsService.instance = new ProductsService();
        }

        return ProductsService.instance;
    }

     createProducts(data) {
        const option = {
            url: `${BASE_URL}/products`,
            data,
        };

        return axios.post(option);
    }

     getAllProducts() {
        const option = {
            url: `${BASE_URL}/products`,
        };

        return axios.get(option);
    }
}

export default ProductsService.getInstance();

