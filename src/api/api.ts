import axios, { AxiosResponse } from "axios";
import { getJwtToken } from "../utils/helper";
import { showToast } from "../components/Toaster";

const BASE_URL = "http://localhost:5000/api/v1";

const getApi = async<T>(tag: string = "", isHeader: boolean = false): Promise<AxiosResponse<T>> => {
    try {
        const response = await axios.get<T>(BASE_URL + tag, {
            headers: isHeader
                ? {
                    Authorization: getJwtToken(),
                }
                : {},
        });
        return response;
    } catch (error) {
        ErrorHandler(error);
        throw error;
    }
};

const postApi = async <T>(
    tag: string = "",
    reqBody: string,
    isHeader: boolean = false,
    flag: boolean
): Promise<AxiosResponse<T>> => {
    let flagCheck = flag
        ? "multipart/form-data; boundary=----WebKitFormBoundaryueI4YvrqiXxUgVGA"
        : "application/json";

    try {
        const response = await axios.post<T>(BASE_URL + tag, reqBody, {
            headers: isHeader
                ? {
                    "Content-Type": flagCheck,
                    accept: "application/json",
                    Authorization: getJwtToken(),
                }
                : {},
        });
        return response;
    } catch (error) {
        ErrorHandler(error);
        throw error;
    }
};

const deleteApi = async <T>(
    tag: string = "",
    isHeader: boolean = false
): Promise<AxiosResponse<T>> => {
    try {
        const response = await axios.delete<T>(BASE_URL + tag, {
            headers: isHeader
                ? {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    Authorization: getJwtToken(),
                }
                : {},
        });
        return response;
    } catch (error) {
        ErrorHandler(error);
        throw error;
    }
};

const PutApi = async <T>(
    tag: string = "",
    reqBody: any,
    isHeader: boolean
): Promise<AxiosResponse<T>> => {
    const headers = {
        accept: "application/json",
        Authorization: getJwtToken(),
    };

    try {
        const response = await axios.put<T>(BASE_URL + tag, reqBody !== null && reqBody, {
            headers: isHeader ? headers : {},
        });
        return response;
    } catch (error) {
        ErrorHandler(error);
        throw error;
    }
};

const ErrorHandler = (error: any): void => {
    if (error.response?.data?.message) {
        if (error.response?.data?.code === 498) {
            // 
        } else if (error.response?.data?.code === 401) {
            showToast(error.response.data.message, 'error')
        } else {
            showToast(error.response.data.message, 'error')
        }
    } else {
        //
    }
};

export const Api = {
    loginApi: async (reqBody: any) => await postApi("/users/login", reqBody),
    forgotPassword: async (reqBody: any) => await postApi("/users/forgot-password", reqBody),
    createCategory: async (reqBody: any) => await postApi("/category/add", reqBody),
    getCategories: async () => await getApi('/category/all'),
    deleteCategory: async (categoryId: string) => await deleteApi(`/category/delete/${categoryId}`),
    createProduct: async (reqBody: any) => await postApi("/product/add", reqBody),
    getProduct: async () => await getApi('/product'),
    deleteProduct: async (productId: string) => await deleteApi(`/product/delete/${productId}`)
};
