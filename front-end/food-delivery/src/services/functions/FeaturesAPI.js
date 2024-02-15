import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { apiConnector } from '../apiconnector';
import { endpoints } from "../apis";

export async function BuyIteam(token, foods, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    
    try {
        // Create a Checkout Session on the server-side
        const sessionResponse = await apiConnector("POST", endpoints.FOOD_PAYMENT_API, {
            foods,
            // Add any other necessary data to create the Checkout Session
        }, {
            Authorization: `Bearer ${token}`,
        });

        if (!sessionResponse.data || !sessionResponse.data.sessionId) {
            toast.error("Failed to create Checkout Session");
            return;
        }

        // Load Stripe.js and initialize Stripe
        const stripe = await loadStripe("pk_test_51OiV6DSE4ou3ybiqaVltOn0KZuAaH9t2Hg0cBrwttK5XwWYUYoyHNrKI9dmeHsPyn99dY0r2wBDWp7xCffQ4dDOe00I7AKCM0L");

        // Redirect to Checkout using the Session ID
        const { error } = await stripe.redirectToCheckout({
            sessionId: sessionResponse.data.sessionId,
        });

        if (error) {
            console.error("Error redirecting to Checkout:", error);
            toast.error("Failed to redirect to Checkout");
            return;
        }
        localStorage.removeItem("cart")

        // Handle successful redirection to Checkout (this code block will not be executed if there's an error)
        console.log("Redirected to Checkout successfully");
    } catch (error) {
        console.error("Payment API Error:", error);
        toast.error("Could not make Payment");
    }

    toast.dismiss(toastId);
}

// async function sendPaymentSuccessEmail(response, amount, token) {
//     try {
//         console.log("sendPaymentSuccessEmail r :", response)
//         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId: response.razorpay_order_id,
//             paymentId: response.razorpay_payment_id,
//             amount,
//         }, {
//             Authorization: `Bearer ${token}`
//         })
//     }
//     catch (error) {
//         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//     }
// }

// //verify payment
// async function verifyPayment(bodyData, token, navigate, dispatch) {
//     const toastId = toast.loading("Verifying Payment....");
//     dispatch(setPaymentLoading(true));
//     try {
//         const response = await apiConnector("POST", FOOD_VERIFY_API, bodyData, {
//             Authorization: `Bearer ${token}`,
//         })

//         if (!response.data.success) {
//             throw new Error(response.data.message);
//         }
//         toast.success("payment Successful, ypou are addded to the food");
//         navigate("/dashboard/enrolled-foods");
//         dispatch(resetCart());
//     }
//     catch (error) {
//         console.log("PAYMENT VERIFY ERROR....", error);
//         toast.error("Could not verify Payment");
//     }
//     toast.dismiss(toastId);
//     dispatch(setPaymentLoading(false));
// }