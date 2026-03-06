import { describe, it, expect } from "vitest";
import {
  lessons,
  getLessonBySlug,
  getModuleLessons,
  getAdjacentLessons,
} from "@/content/lessons";

describe("lesson metadata", () => {
  it("has at least one lesson", () => {
    expect(lessons.length).toBeGreaterThan(0);
  });

  it("every lesson has required fields", () => {
    for (const lesson of lessons) {
      expect(lesson.slug).toBeTruthy();
      expect(lesson.title).toBeTruthy();
      expect(lesson.module).toBeGreaterThan(0);
      expect(lesson.order).toBeGreaterThan(0);
      expect(lesson.description).toBeTruthy();
    }
  });

  it("slugs are unique", () => {
    const slugs = lessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getLessonBySlug", () => {
  it("finds an existing lesson", () => {
    const lesson = getLessonBySlug("01-what-is-claude-code");
    expect(lesson).toBeDefined();
    expect(lesson?.title).toContain("Claude Code");
  });

  it("returns undefined for unknown slug", () => {
    expect(getLessonBySlug("nonexistent")).toBeUndefined();
  });
});

describe("getModuleLessons", () => {
  it("returns lessons for module 1", () => {
    const mod1 = getModuleLessons(1);
    expect(mod1.length).toBeGreaterThan(0);
    expect(mod1.every((l) => l.module === 1)).toBe(true);
  });

  it("returns sorted by order", () => {
    const mod1 = getModuleLessons(1);
    for (let i = 1; i < mod1.length; i++) {
      expect(mod1[i].order).toBeGreaterThan(mod1[i - 1].order);
    }
  });

  it("returns empty array for nonexistent module", () => {
    expect(getModuleLessons(999)).toEqual([]);
  });
});

describe("getAdjacentLessons", () => {
  it("first lesson has no prev", () => {
    const { prev, next } = getAdjacentLessons(lessons[0].slug);
    expect(prev).toBeNull();
    expect(next).toBeDefined();
  });

  it("last lesson has no next", () => {
    const { prev, next } = getAdjacentLessons(
      lessons[lessons.length - 1].slug,
    );
    expect(prev).toBeDefined();
    expect(next).toBeNull();
  });
});
