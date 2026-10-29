# Kit Locker

A kit-booking app for a sports and outdoor club: type your name, browse the kit, book an item, and return it when you're done.

## How to run it

Open `index.html` in a web browser. You don't need to install anything, and it works offline.

Bookings are saved in your browser, so refreshing the page keeps them. **Reset all** puts everything back to the starting data.

## Your task

The app works, but it looks like every other first draft. Your job is to make the UI **much more exciting**.

- **Prompt only.** Change the app only by giving prompts to your AI agent. Don't edit the code by hand.
- **Keep it working.** Every feature in the list below must still work at the end.
- **Save as you go.** After each round of prompting, save a copy or make a git commit, so you can go back if something breaks.
- **Show your work.** At the end you'll show a before and an after, and share your best prompt.

## What must still work

The judge will test each of these:

1. **Name:** you can type your name. Clicking **Book** with an empty name is refused with a plain message.
2. **Category filter:** **All** and each category (Water, Camping, Hill, Bike, General) show the right items.
3. **Kit table:** each item shows its name, category and status (**Available** or **Booked**), with a **Book** button when it's available.
4. **My bookings:** lists the items booked under the current name, each with a **Return** button.
5. **Status message:** a one-line message appears after each action ("Booked.", "Returned.").
6. **Saving:** after a refresh, bookings are still there.
7. **Reset all:** puts the starting data back.
