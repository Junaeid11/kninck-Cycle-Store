/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams()
        if (args) {
          args.forEach((item: any) => {
            params.append(item.name, item.value as string)

          });
        }
        return {
          url: '/products',
          method: 'GET',
          params: params,
          providesTags: ['products'],  
        }
        
      }

    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['products', ]
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
        providesTags: ['products'],
         
      }),
      
    }),
    getProductUpdate: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "PUT",
        providesTags: ['products'],
         
      }),
      invalidatesTags: ['products' ]
    }),
  }),
});

export const { useGetProductQuery, useAddProductMutation, useGetSingleProductQuery , useGetProductUpdateMutation} = productApi;
