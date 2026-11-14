import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
    member.discount = 10;
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total despues de descuentos", () => {
    list.add(member);
    expect(list.totalDiscounted()).toBe(1350);
  });

  test("cambiar cuota de un miembro", () => {
    list.add(member);
    list.updateFee(member.documentId, 100);
    expect(list.totalFees()).toBe(100);
  });

  test("cambiar cuota de un miembro inexistente", () => {
    list.add(member);
    expect(() => (list.updateFee("1234", 100))).toThrow();
  });
});
