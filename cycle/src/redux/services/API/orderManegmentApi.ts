/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ['orders' ]
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
        providesTags: ['orders'],
         
      }),
    }),

    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        method: "GET",
        params: {order_id},
        providesTags: ['orders'],
         
      }),
      
    }),
    updateOrder: builder.mutation({
      query: ( args) => ({
        url: `/orders/${args.id}`,
        method: "PATCH",
        providesTags: ['orders'],
        body: args.data
      }),
      
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url:  `/orders/${id}`,
        method: "DELETE",
        providesTags: ['orders'],
         
      }),
      
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation
} = orderApi;
