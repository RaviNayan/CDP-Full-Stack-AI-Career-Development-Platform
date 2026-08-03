"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    // Check if industry insights already exist
    let industryInsight = await db.industryInsight.findUnique({
      where: {
        industry: data.industry,
      },
    });

    // Generate AI insights BEFORE transaction
    let insights = null;

    if (!industryInsight) {
      insights = await generateAIInsights(data.industry);
    }

    // Short transaction
    const result = await db.$transaction(async (tx) => {
      if (!industryInsight) {
        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
            ...insights,
            nextUpdate: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
          },
        });
      }

      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return updatedUser;
    });

    revalidatePath("/");
    revalidatePath("/dashboard");
    revalidatePath("/onboarding");

    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    select: {
      industry: true,
    },
  });

  return {
    isOnboarded: !!user?.industry,
  };
}

export async function resetOnboarding() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      industry: null,
      experience: null,
      bio: "",
      skills: [],
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/onboarding");
}