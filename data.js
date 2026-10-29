// Kit Locker – seed data
// These are the starting items. "Reset all" puts the app back to exactly this list.
// bookedBy is null when an item is available, or the member's name when it is booked.

const CATEGORIES = ["Water", "Camping", "Hill", "Bike", "General"];

const SEED_ITEMS = [
  { id: 1, name: "Sea kayak", category: "Water", bookedBy: null },
  { id: 2, name: "Buoyancy aid", category: "Water", bookedBy: null },
  { id: 3, name: "Wetsuit", category: "Water", bookedBy: "Sam" },
  { id: 4, name: "Two-person tent", category: "Camping", bookedBy: null },
  { id: 5, name: "Camping stove", category: "Camping", bookedBy: null },
  { id: 6, name: "Crampons", category: "Hill", bookedBy: null },
  { id: 7, name: "Ice axe", category: "Hill", bookedBy: "Alex" },
  { id: 8, name: "Walking poles", category: "Hill", bookedBy: null },
  { id: 9, name: "Bike pump", category: "Bike", bookedBy: null },
  { id: 10, name: "Bike lights set", category: "Bike", bookedBy: null },
  { id: 11, name: "Head torch", category: "General", bookedBy: null },
  { id: 12, name: "First aid kit", category: "General", bookedBy: null },
];
