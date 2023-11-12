import { Booking } from "../booking/booking.interface";
import { Rule } from "./rule.interface";

export class RuleFactory {
  private _rule: Rule;

  constructor(rule: Rule) {
    this._rule = rule;
  }

  public setRule(rule: Rule) {
    this._rule = rule;
  }

  check = async (booking: Booking): Promise<boolean> => {
    return await this._rule.validate(booking);
  };
}
