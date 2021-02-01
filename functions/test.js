exports.handler = async(e, context) => {
    return {
        statusCode: 200,
        body: `public key: ${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
    }
}