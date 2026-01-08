// server/src/services/instagram/db.source.js
import { Profile } from "../../models/Profile.js";
import { Post } from "../../models/Post.js";

/**
 * Fetch Instagram analysis data from MongoDB.
 * Returns a unified payload (same shape as Rapid provider will return).
 *
 * @param {string} username
 * @param {{ limit?: number }} [opts]
 * @returns {Promise<null | { profile: any, posts: any[], metrics: any, meta: { source: "db" } }>}
 */
export async function fetchFromDb(username, opts = {}) {
  const limit = typeof opts.limit === "number" ? opts.limit : 12; //Posts limit
  const profileDoc = await Profile.findOne({ username });

  if (!profileDoc) return { ok: false, error: "db_miss" }; //username not in db

  const postsDocs = await Post.find({ username })
    .sort({ createdAt: -1 })
    .limit(limit);

    return {
      ok: true,
      profile: profileDoc,
      posts: postsDocs,
      metrics: profileDoc.metrics ?? {},
      meta: { source: "db" }
    };
}
