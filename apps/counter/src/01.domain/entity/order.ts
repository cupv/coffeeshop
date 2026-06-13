export interface Order {
  /**
   * uuidv7
   */
  id: string;
  source: number;
  /**
   * uuidv7
   */
  loyaltyMemberId: string;
  status: number;
  modifiedAt: Date;
  createdAt: Date;
}
