import { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    let flag = false;
    for(const miembro of this.#items){
      if(miembro.documentId === _documentId){
        miembro.monthlyFee = _fee;
        flag = true;
      }
    }
    if(!flag){
      throw new Error("No existe ningun miembor con ese id");
    }
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    let sum = 0;
    for (let i = 0; i < this.#items.length; i++) {
      const member = this.#items[i];
      sum += member.monthlyFee * (1 - member.discount / 100);
    }
    return sum;
  }
}
