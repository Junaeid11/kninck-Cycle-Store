/* eslint-disable @typescript-eslint/no-explicit-any */


import { baseApi } from "../../api/baseApi";
const userManagementApi = baseApi.injectEndpoints({
     endpoints: (builder) => ({
            getUsersData: builder.query({
                query: (args) => {
    
                    const params = new URLSearchParams()
                    if(args){
                        args.forEach((item: any) => {
                            params.append(item.name, item.value as string)
                            
                        });
                    } 
                    return {
                        url: '/user',
                        method: 'GET',
                        params: params,
                        providesTags: ['user'],  
                    }
                },
    
            }),
            updateStatus: builder.mutation({
                query: (args) => ({
                  url: `/user/change-status/${args.id}`,
                  method: "PATCH",
                  providesTags: ['user'],
                  body: args.data
                }),
                
              }),
        

        })
})

export const { useGetUsersDataQuery, useUpdateStatusMutation } = userManagementApi