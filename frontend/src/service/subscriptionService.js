import axios from 'axios'


const axiosInstance = axios.create({
    baseURL:`http://localhost:4444/api/v1/subscription`
})

export class SubscriptionService{
    
    async toggleSubscription(followingId){
        try {
            
            const response = await axiosInstance.post(`/toggle/${followingId}`, {}, {withCredentials: true,})
            console.log(response.data)
            return response.data

        } catch (error) {

            console.log("Subscription Service :: toggleSubscription :: Errors", error.response?.data?.message);

            throw new Error(`Subscription Service :: toggleSubscription :: Errors ${error.response?.data?.message || "something went wrong while toggleSubscription"}`)

        }
    }

    async getUserFollower(userId){
        try {
            
            const response = await axiosInstance.get(`/${userId}/follower`,{withCredentials: true,})

            console.log(response.data)
            return response.data

        } catch (error) {
            
            console.log("Subscription Service :: getUserFollower :: Errors", error.response?.data?.message);

            throw new Error(`Subscription Service :: getUserFollower :: Errors ${error.response?.data?.message || "something went wrong while getUserFollower"}`)

        }
    }


    async getUserFollowing(userId){
        try {
            
            const response = await axiosInstance.get(`/${userId}/following`,{withCredentials: true,})

            console.log(response.data)
            return response.data

        } catch (error) {
            
            console.log("Subscription Service :: getUserFollowing :: Errors", error.response?.data?.message);

            throw new Error(`Subscription Service :: getUserFollowing :: Errors ${error.response?.data?.message || "something went wrong while getUserFollowing"}`)

        }
    }

}

const subscriptionService = new SubscriptionService();
export {subscriptionService};