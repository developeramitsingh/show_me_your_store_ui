import storeService from "../services/storeService";
import userService from "../services/userService";

class ControllerHelper {
    static async getAllStores() {
        const storeIds = userService.getUserStoreIds();

        const allStores = await storeService.getAllStores({
            "_id": storeIds
        })

        return allStores;
    }
}

export default ControllerHelper;