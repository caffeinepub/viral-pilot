function pick<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] || key);
}

// --- Instagram Caption Generator ---
const captionTemplates: Record<string, string[]> = {
  happy: [
    "Living my best life with {topic} ✨ Every day is a new adventure! 🌟 Drop a ❤️ if you agree!",
    "This {topic} energy is everything right now 🥳 Can't stop, won't stop! Tag someone who gets it! 👇",
    "When {topic} hits different 😍 Grateful for these moments. Save this for your next mood board! 💫",
    "Pure joy. Pure {topic}. Pure magic. ✨🌈 Double tap if this speaks to your soul!",
    "Good vibes only with {topic} 🎉 Life's too short not to enjoy every moment! Who's with me? 🙋",
    "{topic} is my happy place and I'm never leaving 🌸 Tag your happy place below! ⬇️",
    "Turning {topic} into my whole personality and I regret nothing 😊✨ Which one are you? Comment below!",
    "Obsessed doesn't even cover it. {topic} has my whole heart 💜 Anyone else? 🙋‍♀️",
  ],
  inspirational: [
    "{topic} taught me that growth lives outside your comfort zone. 🚀 Keep pushing. Your breakthrough is closer than you think. Save this for days you need a reminder. 💪",
    "The journey with {topic} isn't always easy. But easy was never the goal. 🌟 Tag someone who needs to hear this today! 👇",
    "Every expert was once a beginner at {topic}. Progress, not perfection. ✨ What's one small step you're taking today? 💬",
    "Your {topic} story is still being written. Don't close the book before the best chapter. 📖 Share this with someone on their journey! 🙌",
    "Doing {topic} scared me. Doing it anyway changed everything. 🔥 What are you doing despite the fear? Tell me below! ⬇️",
    "Consistency with {topic} is the unsexy secret nobody talks about. Show up daily. Results follow. 💎 Save this reminder! 📌",
    "The best investment you'll ever make is in your {topic} journey. No returns, only growth. 🌱 Double tap if you agree! ❤️",
  ],
  funny: [
    "Me explaining my {topic} obsession to people who don't get it 🤷‍♀️ (Thread) Step 1: They don't get it. Step 2: I don't care. The end. 😂 Tag someone who's been here!",
    "My bank account after {topic}: 😅 My happiness after {topic}: 📈 Worth it. 10/10 would do again. 😂 Who relates?",
    "Woke up thinking about {topic}. I am not well. Please send help (and more {topic}). 😂💀 Tag an enabler!",
    "Hot take: {topic} is a personality. I've done the research. The research is me. 🔬😂 Agree or disagree? ⬇️",
    "Current mood: {topic} and absolutely no responsibilities 😂✨ Who's joining me in this delusion?",
    "They said I couldn't make {topic} a whole lifestyle. Reader, I absolutely did. 💅😂 What's your unhinged interest?",
    "Normal people: have hobbies. Me: have {topic} as my entire identity. 😂 No notes, no regrets!",
  ],
  aesthetic: [
    "{topic} ✧ quiet mornings ✧ golden light ✧ this is the life we're building 🌿",
    "soft {topic} era. only good things allowed. 🤍 save for your vision board ✨",
    "the way {topic} makes everything feel lighter ☁️ aesthetic living isn't a trend, it's a practice 🌸",
    "{topic} and slow mornings are my love language 🫧 who else is living intentionally this season?",
    "curating a life that feels as good as {topic} looks 🍃 romanticize everything, darling ✨",
    "in my {topic} era and the vibe is immaculate ✦ soft life, beautiful things, no rush 🌙",
    "some things are just beautifully {topic} and I refuse to overthink it 🕊️ save this energy ✨",
  ],
};

export function generateInstagramCaptions(
  topic: string,
  mood: string,
): string[] {
  const templates = captionTemplates[mood] || captionTemplates.happy;
  return pick(templates, 3).map((t) => fill(t, { topic }));
}

// --- Hashtag Generator ---
const hashtagSets: Record<string, string[]> = {
  default: [
    "#contentcreator",
    "#digitalmarketing",
    "#socialmedia",
    "#growthmindset",
    "#entrepreneur",
    "#smallbusiness",
    "#onlinebusiness",
    "#marketingtips",
    "#brandbuilding",
    "#creatoreconomy",
    "#contentmarketing",
    "#instagramgrowth",
    "#socialmediamarketing",
    "#digitalcreator",
    "#buildingabrand",
    "#creatortips",
    "#onlinemarketing",
    "#personalbranding",
    "#communitybuilding",
    "#thoughtleader",
  ],
};

export function generateHashtags(niche: string, platform: string): string[] {
  const nicheSlug = niche.toLowerCase().replace(/\s+/g, "");
  const base = [
    `#${nicheSlug}`,
    `#${nicheSlug}creator`,
    `#${nicheSlug}community`,
    `#${nicheSlug}tips`,
    `#${nicheSlug}lifestyle`,
    `#${nicheSlug}goals`,
    `#${nicheSlug}inspo`,
    `#${nicheSlug}life`,
  ];
  const platformTags: Record<string, string[]> = {
    instagram: [
      "#instagramcreator",
      "#reelsofinstagram",
      "#instagramgrowth",
      "#igtips",
    ],
    tiktok: [
      "#tiktokcreator",
      "#tiktokgrowth",
      "#tiktoktips",
      "#fyp",
      "#foryoupage",
    ],
    youtube: [
      "#youtubecreator",
      "#youtubemarketing",
      "#youtubegrowth",
      "#youtubestrategy",
    ],
    linkedin: [
      "#linkedincreator",
      "#linkedintips",
      "#professionalnetwork",
      "#thoughtleadership",
    ],
    twitter: [
      "#twittermarketing",
      "#twittergrowth",
      "#twittercreator",
      "#xplatform",
    ],
  };
  const extras = hashtagSets.default;
  const platformSpecific =
    platformTags[platform.toLowerCase()] || platformTags.instagram;
  return [...base, ...platformSpecific, ...pick(extras, 8)].slice(0, 20);
}

// --- Viral Reel Ideas ---
const reelTemplates: Record<
  string,
  Array<{ title: string; hook: string; structure: string; audio: string }>
> = {
  educational: [
    {
      title: "5 {niche} Secrets Nobody Tells You",
      hook: "I spent 2 years figuring this out so you don't have to",
      structure: "Hook → 5 quick tips with text overlays → save CTA",
      audio: "Trending motivational beat",
    },
    {
      title: "The {niche} Mistake 90% of People Make",
      hook: "Stop doing this if you're serious about {niche}",
      structure:
        "Problem reveal → correct approach → before/after → follow CTA",
      audio: "Dramatic reveal sound",
    },
    {
      title: "What I Learned After 1 Year in {niche}",
      hook: "Honest lessons from someone who's been there",
      structure:
        "Year-in-review montage → 3 key lessons → transformation reveal",
      audio: "Nostalgic trending audio",
    },
    {
      title: "The {niche} Beginner Roadmap",
      hook: "If I were starting {niche} from scratch today",
      structure: "Step 1 → Step 2 → Step 3 → resource CTA",
      audio: "Upbeat instructional beat",
    },
    {
      title: "Advanced {niche} Tips Most People Ignore",
      hook: "Level up your {niche} game with these underrated tactics",
      structure: "Teaser → 4 tips rapid fire → proof/results → CTA",
      audio: "High energy trending track",
    },
  ],
  entertaining: [
    {
      title: "Day in My Life as a {niche} Creator",
      hook: "POV: Your day when you're obsessed with {niche}",
      structure:
        "Morning routine → work sessions → results reveal → funny moment",
      audio: "Trending day-in-life audio",
    },
    {
      title: "I Tried Every {niche} Hack So You Don't Have To",
      hook: "Rating {niche} hacks from 1 to 10",
      structure:
        "Hack 1 try → reaction → Hack 2 try → reaction → winner reveal",
      audio: "Comedic reaction sounds",
    },
    {
      title: "Things Only {niche} People Understand",
      hook: "You'll only get this if you're deep in {niche}",
      structure: "Relatable scenario 1 → 2 → 3 → community CTA",
      audio: "Relatable trending audio",
    },
    {
      title: "Expectation vs Reality: {niche} Edition",
      hook: "What they show vs what actually happens in {niche}",
      structure: "Pretty expectation clip → chaotic reality → humor + lesson",
      audio: "Expectation vs reality sound",
    },
    {
      title: "Rating My Old {niche} Content",
      hook: "Cringing at how far I've come in {niche}",
      structure: "Old content clip → reaction → growth moment → inspire CTA",
      audio: "Nostalgic throwback audio",
    },
  ],
  inspiring: [
    {
      title: "My {niche} Transformation Story",
      hook: "From zero to this — my honest {niche} journey",
      structure:
        "Starting point → struggles → turning point → current results → inspire CTA",
      audio: "Emotional journey music",
    },
    {
      title: "How {niche} Changed My Life",
      hook: "I almost gave up on {niche}. Glad I didn't.",
      structure:
        "Dark moment reveal → decision → action montage → outcome → motivate CTA",
      audio: "Triumph/rise music",
    },
    {
      title: "The {niche} Mindset That Changed Everything",
      hook: "One belief shift that transformed my {niche} results",
      structure: "Old mindset → painful result → new mindset → positive result",
      audio: "Mindset shift trending audio",
    },
    {
      title: "Proof {niche} Results Are Possible for Anyone",
      hook: "Stop saying you can't succeed at {niche}",
      structure:
        "Doubts voiced → evidence montage → community wins → encourage CTA",
      audio: "Empowering beat",
    },
    {
      title: "1 Year of Consistent {niche} Content",
      hook: "What consistency in {niche} actually looks like",
      structure:
        "Month 1 → Month 6 → Month 12 → stats reveal → consistency message",
      audio: "Timelapse/journey audio",
    },
  ],
};

export function generateReelIdeas(
  niche: string,
  style: string,
): Array<{ title: string; hook: string; structure: string; audio: string }> {
  const templates = reelTemplates[style] || reelTemplates.educational;
  return templates.map((t) => ({
    title: fill(t.title, { niche }),
    hook: fill(t.hook, { niche }),
    structure: t.structure,
    audio: t.audio,
  }));
}

// --- YouTube Title Generator ---
const youtubeTitleTemplates: Record<string, string[]> = {
  tutorial: [
    "{topic} Tutorial for Beginners (Complete Guide 2024)",
    "How to {topic} Step by Step — Everything You Need to Know",
    "The Only {topic} Tutorial You'll Ever Need",
    "{topic} Masterclass: From Zero to Pro in One Video",
    "Learn {topic} in 30 Minutes (Works for Beginners)",
  ],
  vlog: [
    "A Week in My Life Doing {topic} (Raw & Honest)",
    "I Tried {topic} for 30 Days — Here's What Happened",
    "Day in the Life of a {topic} Creator (Not What You'd Expect)",
    "The Reality of {topic}: What Nobody Shows You",
    "My {topic} Journey — 1 Year Later (Honest Update)",
  ],
  review: [
    "I Tested Every {topic} Method So You Don't Have To (Honest Review)",
    "{topic} Review: Is It Actually Worth It in 2024?",
    "The TRUTH About {topic} Nobody is Talking About",
    "Best {topic} of 2024 — I Ranked Them All",
    "{topic} Review After 6 Months: What I Really Think",
  ],
  listicle: [
    "10 {topic} Tips That Will Change Your Game in 2024",
    "7 Things I Wish I Knew Before Starting {topic}",
    "5 {topic} Mistakes You're Probably Making (And How to Fix Them)",
    "The Top 10 {topic} Strategies for 2024",
    "8 Underrated {topic} Secrets the Pros Don't Want You to Know",
  ],
};

export function generateYouTubeTitles(topic: string, type: string): string[] {
  const templates =
    youtubeTitleTemplates[type] || youtubeTitleTemplates.tutorial;
  return templates.map((t) => fill(t, { topic }));
}

// --- Bio Generator ---
const bioTemplates: Record<string, string[]> = {
  instagram: [
    "{name} | {profession} 🌟\nHelping you {profession_action} ✨\n📩 Collabs: DM me\n⬇️ Free guide below",
    "✦ {name} ✦\n{profession} & Content Creator\nTurning {profession_noun} into art 🎨\nDM for collabs 💌",
    "{profession} with a passion for creating 🔥\n{name} | Building in public\n👇 Latest project below",
  ],
  twitter: [
    "{name} | {profession}. Writing about what I learn building in public. Tweets are my thoughts, not advice.",
    "building things @ the intersection of {profession} + creativity | {name} | sharing the journey openly",
    "{profession} by day, {profession} by night 😄 | {name} | Tweeting insights + honest takes",
  ],
  linkedin: [
    "{name} | {profession} helping businesses grow through strategic thinking and execution. 10x your results. DM to connect.",
    "🚀 {profession} | {name}. I help teams solve complex problems with clarity and momentum. Let's build something meaningful.",
    "{name} — {profession} focused on impact. I share frameworks, lessons, and honest insights from the front lines.",
  ],
  tiktok: [
    "{name} 🎯 {profession} tips daily\n🔥 Going viral so you don't have to\n👇 Free resources",
    "teaching {profession} on the internet ✨ | {name} | watch until the end 🎬",
    "{profession} made simple | {name} | new video every day 🚀",
  ],
};

export function generateBios(
  name: string,
  profession: string,
  platform: string,
): string[] {
  const templates =
    bioTemplates[platform.toLowerCase()] || bioTemplates.instagram;
  const professionAction = `${profession.toLowerCase()} better`;
  const professionNoun = profession.toLowerCase();
  return templates.map((t) =>
    fill(t, {
      name,
      profession,
      profession_action: professionAction,
      profession_noun: professionNoun,
    }),
  );
}

// --- Trending Hashtags Finder ---
const trendingHashtags: Record<
  string,
  Array<{ tag: string; posts: string; trend: string }>
> = {
  fashion: [
    { tag: "#OOTD", posts: "450M", trend: "🔥 Hot" },
    { tag: "#FashionWeek", posts: "120M", trend: "📈 Rising" },
    { tag: "#StyleInspo", posts: "80M", trend: "✅ Stable" },
    { tag: "#FashionBlogger", posts: "200M", trend: "✅ Stable" },
    { tag: "#WhatIWore", posts: "35M", trend: "📈 Rising" },
    { tag: "#StreetStyle", posts: "150M", trend: "🔥 Hot" },
    { tag: "#FashionPhotography", posts: "95M", trend: "✅ Stable" },
    { tag: "#SustainableFashion", posts: "45M", trend: "📈 Rising" },
    { tag: "#OutfitOfTheDay", posts: "390M", trend: "✅ Stable" },
    { tag: "#VintageFashion", posts: "30M", trend: "📈 Rising" },
    { tag: "#FashionStyle", posts: "260M", trend: "✅ Stable" },
    { tag: "#Lookbook", posts: "75M", trend: "✅ Stable" },
  ],
  food: [
    { tag: "#FoodPhotography", posts: "380M", trend: "🔥 Hot" },
    { tag: "#FoodBlogger", posts: "200M", trend: "✅ Stable" },
    { tag: "#Foodie", posts: "450M", trend: "🔥 Hot" },
    { tag: "#RecipeOfTheDay", posts: "55M", trend: "📈 Rising" },
    { tag: "#HealthyEating", posts: "180M", trend: "📈 Rising" },
    { tag: "#MealPrep", posts: "70M", trend: "📈 Rising" },
    { tag: "#VeganFood", posts: "95M", trend: "✅ Stable" },
    { tag: "#HomeCooking", posts: "120M", trend: "🔥 Hot" },
    { tag: "#FoodStyling", posts: "30M", trend: "📈 Rising" },
    { tag: "#WhatIEat", posts: "25M", trend: "📈 Rising" },
    { tag: "#CleanEating", posts: "140M", trend: "✅ Stable" },
    { tag: "#FoodLovers", posts: "210M", trend: "✅ Stable" },
  ],
  fitness: [
    { tag: "#FitnessMotivation", posts: "320M", trend: "🔥 Hot" },
    { tag: "#WorkoutRoutine", posts: "60M", trend: "📈 Rising" },
    { tag: "#GymLife", posts: "180M", trend: "✅ Stable" },
    { tag: "#HealthyLifestyle", posts: "250M", trend: "✅ Stable" },
    { tag: "#FitFam", posts: "200M", trend: "✅ Stable" },
    { tag: "#PersonalTrainer", posts: "45M", trend: "📈 Rising" },
    { tag: "#HomeWorkout", posts: "35M", trend: "🔥 Hot" },
    { tag: "#BodyTransformation", posts: "55M", trend: "📈 Rising" },
    { tag: "#FitnessGoals", posts: "120M", trend: "✅ Stable" },
    { tag: "#WeightLoss", posts: "90M", trend: "✅ Stable" },
    { tag: "#StrengthTraining", posts: "40M", trend: "📈 Rising" },
    { tag: "#FitnessJourney", posts: "85M", trend: "📈 Rising" },
  ],
  travel: [
    { tag: "#TravelPhotography", posts: "520M", trend: "🔥 Hot" },
    { tag: "#Wanderlust", posts: "430M", trend: "✅ Stable" },
    { tag: "#TravelBlogger", posts: "120M", trend: "✅ Stable" },
    { tag: "#BucketList", posts: "80M", trend: "📈 Rising" },
    { tag: "#TravelGram", posts: "210M", trend: "✅ Stable" },
    { tag: "#SoloTravel", posts: "45M", trend: "🔥 Hot" },
    { tag: "#TravelTips", posts: "60M", trend: "📈 Rising" },
    { tag: "#LuxuryTravel", posts: "90M", trend: "📈 Rising" },
    { tag: "#AdventureTravel", posts: "55M", trend: "📈 Rising" },
    { tag: "#TravelLife", posts: "170M", trend: "✅ Stable" },
    { tag: "#InstaTravel", posts: "280M", trend: "✅ Stable" },
    { tag: "#TravelVlog", posts: "35M", trend: "🔥 Hot" },
  ],
  tech: [
    { tag: "#TechNews", posts: "45M", trend: "🔥 Hot" },
    { tag: "#AI", posts: "120M", trend: "🔥 Hot" },
    { tag: "#Programming", posts: "80M", trend: "📈 Rising" },
    { tag: "#TechStartup", posts: "30M", trend: "📈 Rising" },
    { tag: "#CodingLife", posts: "25M", trend: "📈 Rising" },
    { tag: "#MachineLearning", posts: "35M", trend: "🔥 Hot" },
    { tag: "#WebDevelopment", posts: "50M", trend: "📈 Rising" },
    { tag: "#TechCommunity", posts: "20M", trend: "📈 Rising" },
    { tag: "#Innovation", posts: "90M", trend: "✅ Stable" },
    { tag: "#FutureOfTech", posts: "15M", trend: "🔥 Hot" },
    { tag: "#SoftwareDev", posts: "28M", trend: "📈 Rising" },
    { tag: "#TechTwitter", posts: "18M", trend: "🔥 Hot" },
  ],
  beauty: [
    { tag: "#BeautyBlogger", posts: "280M", trend: "✅ Stable" },
    { tag: "#MakeupTutorial", posts: "150M", trend: "🔥 Hot" },
    { tag: "#SkincareRoutine", posts: "90M", trend: "🔥 Hot" },
    { tag: "#GlowUp", posts: "75M", trend: "📈 Rising" },
    { tag: "#NaturalBeauty", posts: "110M", trend: "✅ Stable" },
    { tag: "#MakeupArtist", posts: "200M", trend: "✅ Stable" },
    { tag: "#CleanBeauty", posts: "35M", trend: "📈 Rising" },
    { tag: "#SkincareCommunity", posts: "45M", trend: "🔥 Hot" },
    { tag: "#BeautyTips", posts: "120M", trend: "✅ Stable" },
    { tag: "#HairCare", posts: "80M", trend: "📈 Rising" },
    { tag: "#MakeupLooks", posts: "130M", trend: "✅ Stable" },
    { tag: "#GlowingSkin", posts: "40M", trend: "📈 Rising" },
  ],
};

export function getTrendingHashtags(
  category: string,
): Array<{ tag: string; posts: string; trend: string }> {
  return trendingHashtags[category.toLowerCase()] || trendingHashtags.fashion;
}

// --- Post Idea Generator ---
const postIdeaTemplates: Record<string, string[]> = {
  daily: [
    "Share a {niche} tip your audience can use today",
    "Behind-the-scenes of your {niche} process",
    "Answer a common {niche} question in your comments",
    "Share a {niche} win (yours or a client's)",
    "Post a {niche} myth-busting carousel",
    "Share your {niche} morning routine",
    "Poll your audience: What's their biggest {niche} challenge?",
    "Repurpose a top-performing {niche} post",
    "Share a {niche} quote that resonates with you",
    "Teach one micro-skill related to {niche}",
  ],
  weekly: [
    "Monday: Motivational {niche} story from your journey",
    "Tuesday: Tutorial — teach one core {niche} skill",
    "Wednesday: Case study — real results in {niche}",
    "Thursday: Throwback — a {niche} lesson you learned the hard way",
    "Friday: Feature — spotlight a community member in {niche}",
    "Saturday: {niche} product/tool review or recommendation",
    "Sunday: Reflection — what you learned about {niche} this week",
  ],
};

export function generatePostIdeas(niche: string, frequency: string): string[] {
  const templates =
    postIdeaTemplates[frequency.toLowerCase()] || postIdeaTemplates.weekly;
  return templates.map((t) => fill(t, { niche }));
}

// --- Comment Reply Generator ---
const replyTemplates: Record<string, string[]> = {
  professional: [
    "Thank you for your thoughtful comment! {response} I appreciate you taking the time to engage.",
    "Great point! {response} Feel free to reach out if you'd like to discuss further.",
    "I appreciate your feedback. {response} Looking forward to continuing the conversation.",
  ],
  friendly: [
    "Aww, thank you so much! {response} You made my day! 😊",
    "Yes!! {response} So glad this resonated with you! 🙌",
    "Love this! {response} Thanks for being part of this community! 💜",
  ],
  funny: [
    "Okay but you didn't have to call me out like that 😂 {response} Glad you're here though!",
    "Haha! {response} You get it 😂 We're basically the same person at this point!",
    "Not me already planning my response 😅 {response} Hope to see you in the next one!",
  ],
  empathetic: [
    "Thank you for sharing that — it means a lot. {response} You're not alone in this! 💙",
    "I completely understand where you're coming from. {response} Sending you so much support! 🤗",
    "This really touched me. {response} Thank you for being vulnerable and sharing your experience. 💜",
  ],
};

const responseInserts = [
  "This is exactly why I create content like this.",
  "I'm so happy this was helpful for you.",
  "Comments like yours keep me going.",
  "I hope this continues to be useful on your journey.",
  "It's feedback like this that makes the work worthwhile.",
];

export function generateCommentReplies(
  comment: string,
  tone: string,
): string[] {
  const templates =
    replyTemplates[tone.toLowerCase()] || replyTemplates.friendly;
  const commentLength = comment.length;
  const context =
    commentLength > 20
      ? "I really appreciate your detailed thoughts."
      : "Thanks for the kind words.";
  return templates.map((t) =>
    fill(t, { response: `${pick(responseInserts, 1)[0]} ${context}` }),
  );
}
