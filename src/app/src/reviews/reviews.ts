// .EXE reviews — what our clients say.
//
// TO ADD A REVIEW: replace one of the placeholder entries below with the
// client's real words, name, and business — or append a new object to
// `reviews`. The section on the home page picks it up automatically.
//   quote       — the client's words, in their voice (1–3 sentences)
//   name        — the client's name, as they want it shown
//   business    — their business name
//   placeholder — true while the slot is waiting for a real review.
//                 Placeholder slots render as "coming soon" cards, so the
//                 page stays honest that reviews are still being collected.
//
// Never invent a client, a quote, or a rating: only publish words a real
// client actually said, with their permission.

export interface Review {
  quote: string
  name: string
  business: string
  placeholder?: boolean
}

export const reviews: Review[] = [
  { quote: '', name: '', business: '', placeholder: true },
  { quote: '', name: '', business: '', placeholder: true },
  { quote: '', name: '', business: '', placeholder: true },
]
