"use server";

import { revalidatePath } from "next/cache";

import User from "../DB/model/user.model";
import { connectToDatabase } from "../DB/mongo.db";
import { handleError } from "../utils";
import { auth, currentUser } from "@clerk/nextjs/server";

// CREATE
export async function createUser() {
  try {
    await connectToDatabase();

    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    const existingUser = await User.findOne({ clerkId: userId });
    console.log(existingUser);

    if (existingUser) return existingUser;

    const dbUser = new User({
      clerkId: userId,
      firstName: `${user.firstName || ""} ${user.lastName || ""}`,
      username:
        user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
      email: user.emailAddresses[0].emailAddress,
      photo: user.imageUrl,
    });

    dbUser.save();

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

// READ
export async function getUserById(userId) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId, user) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId, creditFee) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
