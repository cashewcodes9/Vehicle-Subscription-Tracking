namespace my;

// schema.cds
entity Vehicles {
  key ID        : UUID;
  brand         : String;
  model         : String;
  monthlyRate   : Decimal;
  status        : String enum { available; subscribed; maintenance; };
}

entity Subscriptions {
  key ID         : UUID;
  vehicle        : Association to Vehicles;
  customerName   : String;
  startDate      : Date;
  durationMonths : Integer;
  totalValue     : Decimal;
}
  