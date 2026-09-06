import { describe, expect, it } from "vitest";
import {
  confirmPassword,
  hasLengthLimit,
  passwordValidation,
  valueIsEmail,
  valueIsNull,
} from "./formValidation";

describe("form validation", () => {
  it("requires non-empty values", () => {
    expect(valueIsNull("")).toBe("Field cannot be empty");
    expect(valueIsNull("   ")).toBe("Field cannot be empty");
    expect(valueIsNull("Grace")).toBeUndefined();
  });

  it("validates email format only when an email is provided", () => {
    expect(valueIsEmail("")).toBeUndefined();
    expect(valueIsEmail("grace@example.com")).toBeUndefined();
    expect(valueIsEmail("grace")).toBe("Invalid Email Address");
  });

  it("validates username and password constraints", () => {
    expect(hasLengthLimit("ab", 3, 20)).toBe("Please enter a value longer than 3");
    expect(hasLengthLimit("valid-name", 3, 20)).toBeUndefined();
    expect(passwordValidation("abcdef")).toBe(
      "Password must contain characters and numbers"
    );
    expect(passwordValidation("abc123")).toBeUndefined();
    expect(confirmPassword("abc123", "abc124")).toBe("Password didn't match");
  });
});
