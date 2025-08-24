import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const recentProjects = pgTable("recent_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageUrl: text("image_url").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  tools: json("tools").$type<string[]>().notNull(),
  liveLink: text("live_link").notNull(),
  isPublished: boolean("is_published").default(false),
  projectLink: text("project_link").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at"),
});
