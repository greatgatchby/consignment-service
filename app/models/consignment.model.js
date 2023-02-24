module.exports = mongoose => {
    const Consignment = mongoose.model(
        "consignment",
        mongoose.Schema(
            {
                _id: String,
                item: String,
                sku: String,
                item_size: String,
                asking_price: Number,
                listing_price: Number,
                selling_price: Number,
                merchant: String,
                vendor: String,
                venue: String,
                terms: String,
                terms_agreed: Boolean,
            },
            { timestamps: true }
        )
    );

    return Consignment;
};
