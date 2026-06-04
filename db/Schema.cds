namespace my;

// schema.cds
entity Vehicles {
  key ID        : String;
  brand         : String;
  model         : String;
  monthlyRate   : Decimal;
  status        : String enum { available; subscribed; maintenance; };
}

entity Subscriptions {
  key ID         : String;
  vehicle        : Association to Vehicles;
  customerName   : String;
  startDate      : Date;
  durationMonths : Integer;
  totalValue     : Decimal;
}
  