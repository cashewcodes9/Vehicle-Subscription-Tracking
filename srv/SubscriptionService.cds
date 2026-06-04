using { my } from '../db/Schema';

service SubscriptionService {
  entity Vehicles      as projection on my.Vehicles;
  entity Subscriptions as projection on my.Subscriptions;
}