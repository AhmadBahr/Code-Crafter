import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userId: v.string(), // clerkId
        email: v.string(),
        name: v.string(),
        isPro: v.boolean(),
        proSince: v.optional(v.number()),
        lemonSqueezyCustomerId: v.optional(v.string()),
        lemonSqueezyOrderId: v.optional(v.string()),
        lastActive: v.optional(v.number()),
        avatarUrl: v.optional(v.string()),
    }).index("by_user_id", ["userId"]),

    codeExecutions: defineTable({
        userId: v.string(),
        language: v.string(),
        code: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string()),
        executionTime: v.optional(v.number()),
        createdAt: v.number(),
    })
        .index("by_user_id", ["userId"])
        .index("by_created_at", ["createdAt"]),

    snippets: defineTable({
        userId: v.string(),
        title: v.string(),
        description: v.optional(v.string()),
        language: v.string(),
        code: v.string(),
        userName: v.string(), // store user's name for easy access
        isPublic: v.boolean(),
        createdAt: v.number(),
        updatedAt: v.number(),
        starCount: v.number(),
        viewCount: v.number(),
        tags: v.optional(v.array(v.string())),
    })
        .index("by_user_id", ["userId"])
        .index("by_created_at", ["createdAt"])
        .index("by_language", ["language"])
        .index("by_star_count", ["starCount"]),

    snippetComments: defineTable({
        snippetId: v.id("snippets"),
        userId: v.string(),
        userName: v.string(),
        content: v.string(), // This will store HTML content
        createdAt: v.number(),
        updatedAt: v.optional(v.number()),
    })
        .index("by_snippet_id", ["snippetId"])
        .index("by_created_at", ["createdAt"]),

    stars: defineTable({
        userId: v.string(),
        snippetId: v.id("snippets"),
        createdAt: v.number(),
    })
        .index("by_user_id", ["userId"])
        .index("by_snippet_id", ["snippetId"])
        .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});
