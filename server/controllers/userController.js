import { Webhook } from "svix";
import userModel from "../models/userModel.js";

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
                await userModel.create({
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                });
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
        const { clerkId } = req.body
        const userData = await userModel.findOne({ clerkId })
        res.json({ success: true, credits: userData.creditBalance })
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

export { clerkWebhooks, userCredits };