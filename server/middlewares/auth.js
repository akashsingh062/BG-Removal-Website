import jwt from 'jsonwebtoken'

// middleware function to decode jwt to get clerk id
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers
        if (!token) {
            return res.json({ success: false, message: "Authorization failed" })
        }
        const token_decode = jwt.decode(token)
        req.body.clerkId = token_decode.clerkId
        next()

    } catch (error) {
        return res.json({ success: false, message: "Authentication failed" })
    }
}
export default authUser