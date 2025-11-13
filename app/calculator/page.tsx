"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Calculator = () => {
  useEffect(() => {
    const form = document.getElementById("form");
    const totalExpenseElement = document.getElementById("total-expense");
    const balanceElement = document.getElementById("balance");
    const savingsBtn = document.getElementById("savings");
    const savingsTotalElement = document.getElementById("savings-total");
    const remainingElement = document.getElementById("remaining");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const income = Number(document.getElementById("income")?.value);
      const food = Number(document.getElementById("food")?.value);
      const rent = Number(document.getElementById("rent")?.value);
      const others = Number(document.getElementById("others")?.value);

      const totalExpense = food + rent + others;
      const balance = income - totalExpense;

      totalExpenseElement.textContent = `Total Expense: ${totalExpense}`;
      balanceElement.textContent = `Balance: ${balance}`;
    });

    savingsBtn?.addEventListener("click", (e) => {
      e.preventDefault();

      const savingsPercent = Number(
        document.getElementById("savingsInp")?.value
      );
      const income = Number(document.getElementById("income")?.value);
      const food = Number(document.getElementById("food")?.value);
      const rent = Number(document.getElementById("rent")?.value);
      const others = Number(document.getElementById("others")?.value);

      const totalExpense = food + rent + others;
      const balance = income - totalExpense;
      const savingsAmount = (income * savingsPercent) / 100;
      const remaining = balance - savingsAmount;

      savingsTotalElement.textContent = `Savings: ${savingsAmount}`;
      remainingElement.textContent = `Remaining: ${remaining}`;
    });
  }, []);

  return (
    <section className="p-6">
      <form
        id="form"
        className="space-y-7 max-w-2xl mx-auto bg-accent p-5 rounded-md"
      >
        <div>
          <Label htmlFor="income">Income</Label>
          <Input
            className="mt-2"
            id="income"
            name="income"
            type="number"
            placeholder="000"
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="food">Food</Label>
            <Input
              className="mt-2"
              id="food"
              name="food"
              type="number"
              placeholder="000"
            />
          </div>
          <div>
            <Label htmlFor="rent">Rent</Label>
            <Input
              className="mt-2"
              id="rent"
              name="rent"
              type="number"
              placeholder="000"
            />
          </div>
          <div>
            <Label htmlFor="others">Others</Label>
            <Input
              className="mt-2"
              id="others"
              name="others"
              type="number"
              placeholder="000"
            />
          </div>

          <Button id="submit" type="submit">
            Calculate
          </Button>

          <div className="flex flex-col gap-2">
            <span id="total-expense" className="font-medium"></span>
            <span id="balance" className="font-medium"></span>
          </div>
        </div>

        <div>
          <Label htmlFor="savings">Savings %</Label>
          <Input
            className="mt-2"
            id="savingsInp"
            name="savings"
            type="number"
            placeholder="000"
          />
          <Button className="mt-5" id="savings">
            Calculate Savings
          </Button>

          <div className="flex flex-col gap-2 mt-3">
            <span id="savings-total" className="font-medium"></span>
            <span id="remaining" className="font-medium"></span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Calculator;
