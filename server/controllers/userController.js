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

        // Verify webhook signature
        webhook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const existingUser = await userModel.findOne({ clerkId: data.id });
                if (existingUser) {
                    existingUser.email = data.email_addresses[0].email_address;
                    existingUser.firstName = data.first_name;
                    existingUser.lastName = data.last_name;
                    existingUser.photo = data.image_url;
                    if (existingUser.creditBalance === undefined || existingUser.creditBalance === null) {
                        existingUser.creditBalance = 3;
                    }
                    await existingUser.save();
                } else {
                    await userModel.create({
                        clerkId: data.id,
                        email: data.email_addresses[0].email_address,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        photo: data.image_url,
                        creditBalance: 3,
                    });
                }
                res.json({})
                break;
            }

            case "user.updated": {
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
            }

            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                res.json({})
                break;
            }
        }
    } catch (error) {
        console.error("Webhook error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// API controller to get user available credits data
const userCredits = async (req, res) => {
    try {
        const { clerkId } = req
        if (!clerkId) {
            return res.json({ success: false, message: "No clerkId provided in auth token" })
        }
        
        let userData = await userModel.findOne({ clerkId })
        if (!userData) {
            // Automatically create the user document if the Clerk webhook hasn't run yet (perfect for local development/testing)
            userData = await userModel.create({
                clerkId,
                email: `${clerkId}@placeholder.com`,
                photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
                creditBalance: 3
            })
        }
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
            case "Starter":
                plan = 'Starter'
                credits = 5
                amount = 0
                break;
            case "Basic":
                plan = 'Basic'
                credits = 10
                amount = 49
                break;
            case "Pro":
                plan = 'Pro'
                credits = 25
                amount = 99
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

export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay };