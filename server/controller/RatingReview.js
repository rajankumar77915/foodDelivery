import Item from "../models/Item.js";
import Restaurant from "../models/Restaurant.js";
import RatingReview from "../models/ratingReview.js";

export const addRatingReview = async (req, res) => {
    try {
        const user = req.user;
        const { itemId, rating, review } = req.body;
        
        const Ritem=await Item.findById(itemId);
        const newRatingReview = new RatingReview({
            user: user.id, 
            item:Ritem._id,
            rating,
            review,
        });
        const Rrestrunt=await Restaurant.findById(Ritem.restaurantId);
        
        await newRatingReview.save();
        Rrestrunt.RatingReviews.push(newRatingReview._id);
        
        await Rrestrunt.save()

        res.status(201).json({ message: "Rating and review added successfully" });
    } catch (error) {
        console.error("Error adding rating and review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getRatingReview = async (req, res) => {
    try {
        const user = req.user;

        const ratingReviews = await RatingReview.find({ user: user.id });

        res.status(200).json(ratingReviews);
    } catch (error) {
        console.error("Error fetching rating reviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
