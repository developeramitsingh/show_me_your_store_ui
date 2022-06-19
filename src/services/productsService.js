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

    getProductById(productId) {
        const option = {
            url: `${BASE_URL}/products/${productId}`,
        }

        return axios.get(option);
    }

    searchProduct(storeId, searchString) {
        const option = {
            url: `${BASE_URL}/products/search/query?storeId=${storeId}&searchString=${searchString}`,
        }

        return axios.get(option);
    }

    updateProduct(data) {
        const option = {
            url: `${BASE_URL}/products`,
            data
        }

        return axios.put(option);
    }
}

export default ProductsService.getInstance();

