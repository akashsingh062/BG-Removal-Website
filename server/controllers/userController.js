import { messageInRaw, Webhook } from "svix";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";

// api controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
    try {
        // create a svix instance with clerk webhook secret
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const payload = req.body; // raw buffer
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // ✅ Verify signature using RAW body
        webhook.verify(payload, headers);

        // ✅ Parse AFTER verification
        const event = JSON.parse(payload.toString());
        const { data, type } = event;

        switch (type) {
            case "user.created":
                await userModel.create({
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                });
                res.json({})
                break;

            case "user.updated":
                await userModel.findOneAndUpdate(
                    { clerkId: data.id },
                    {
                        email: data.email_addresses[0].email_address,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        photo: data.image_url,
                    }
                );
                res.json({})
                break;

            case "user.deleted":
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({})
                break;
        }

    }
    catch (error) {
        console.error("Webhook error:", error.message);
    }
}


// API controller to get user available credits data
const userCredits = async (req, res) => {
    try {
        const { clerkId } = req
        const userData = await userModel.findOne({ clerkId })
        res.json({ success: true, credits: userData.creditBalance })
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}



const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
// API to make payment for credits
const paymentRazorpay = async (req, res) => {
    try {
        const { clerkId } = req
        const { planId } = req.body
        const userData = await userModel.findOne({ clerkId })
        if (!userData || !planId) {
            res.json({ success: false, message: "Invalid credentials" })
        }

        let credits, plan, amount, date

        switch (planId) {
            case "Basic":
                plan = 'Basic'
                credits = 100
                amount = 10
                break;
            case "Advanced":
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;
            case "Business":
                plan = 'Business'
                credits = 5000
                amount = 250
                break;
            default:
                break;
        }
        date = Date.now()

        // creating transaction 
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                return res.json({ success: false, message: error })
            }
            res.json({ success: true, order })
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {

                res.json({ success: false, message: "Payment Failed" })
            }

            // adding credits to user data
            const userData = await userModel.findOne({ clerkId: transactionData.clerkId })
            const creditBalance = userData.creditBalance + transactionData.credits

            await userModel.findByIdAndUpdate(userData._id, { creditBalance })

            // making the payment true
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })
            res.json({ success: true, message: "Credits Added" })
        } else {
            res.json({ success: false, message: "Payment Failed" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay }