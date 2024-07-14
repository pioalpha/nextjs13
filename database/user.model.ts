import { Schema, models, model, Document } from "mongoose";

/* fakedata users collection
 {
    "_id":{"$oid":"64fd98dfc66cff4d161a6081"},
    "clerkId":"123456789",
    "name":"Jhon Doe",
      "username": "jhondoe123",
      "email": "jhondoe123@example.co",
      "password": "password123",
      "bio": "This is my bio",
      "picture": "profile.jpg",
      "location": "New York, USA",
      "portfolioWebsite": "https://example.com",
      "reputation": 0,
      "saved": [],
      "joinedAt": "2023-09-10T00:00:00.00Z"
    }
       */

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
