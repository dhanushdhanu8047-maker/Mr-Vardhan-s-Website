export interface MemoryCardData {
  id: string;
  number: string;
  title: string;
  description: string;
  interactiveLabel: string;
  backstageNote: string;
  emoji: string;
}

export interface TechPillarData {
  id: 'html' | 'css' | 'js' | 'web';
  title: string;
  subtitle: string;
  caption: string;
  lessonNote: string;
}

export interface TributeContent {
  hero: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    supporting: string;
    ctaLabel: string;
  };
  intro: {
    heading: string;
    photoCaption: string;
    paragraphs: string[];
  };
  chronicles: {
    heading: string;
    subheading: string;
    memories: MemoryCardData[];
  };
  confidence: {
    heading: string;
    pillars: TechPillarData[];
    paragraphs: string[];
  };
  emotional: {
    heading: string;
    stanzas: string[][];
  };
  envelope: {
    heading: string;
    buttonLabel: string;
    letterSalutation: string;
    letterParagraphs: string[];
    letterSignOff: string;
    letterAuthor: string;
    closingHeading: string;
    closingSubheading: string;
  };
}

export const DEFAULT_TRIBUTE_CONTENT: TributeContent = {
  hero: {
    eyebrow: 'A LITTLE SOMETHING FROM DHANUSH',
    heading: 'Dear Vardhan Sir...',
    subtitle: 'Some teachers teach subjects. Some make us fall in love with learning.',
    supporting: 'A little website, a few memories, some laughter and a whole lot of gratitude.',
    ctaLabel: 'Open Your Surprise ✨',
  },
  intro: {
    heading: 'More Than Just a Teacher.',
    photoCaption: 'Vardhan Sir · Web Technology Mentor',
    paragraphs: [
      'Dear Vardhan Sir,',
      'I wanted to create something a little different to say thank you.',
      "You didn't just teach us Web Technology. You made us understand it.",
      'What initially seemed complicated slowly became simple because of your way of explaining things.',
      'Your patience, teaching style and the way you made concepts understandable made a real difference.',
      "And honestly, that's something I truly appreciate.",
    ],
  },
  chronicles: {
    heading: 'Well... Not Every Moment Was About Coding!',
    subheading: 'Tap any memory card to reveal a quiet classroom flashback.',
    memories: [
      {
        id: 'laughter',
        number: '01',
        title: 'The Classroom Laughter',
        description:
          "Those moments when the entire class suddenly burst into laughter. Sometimes, the funniest classroom memories weren't even planned!",
        interactiveLabel: 'Classroom Flashback',
        backstageNote:
          'Half the class trying to stay serious, the other half already gone — and somehow, Sir always kept the mood warm and effortless.',
        emoji: '😂',
      },
      {
        id: 'confusion',
        number: '02',
        title: 'The Coding Confusion',
        description:
          'When we thought we understood the code, but one more explanation was needed!',
        interactiveLabel: 'Plot Twist',
        backstageNote:
          'Confidence level before running the file: 100%. Confidence level two seconds later: "Sir, please explain that part one more time."',
        emoji: '🤔',
      },
      {
        id: 'doubt',
        number: '03',
        title: 'The Famous Doubt',
        description:
          '"Sir, just one last doubt!" And somehow, that one doubt turned into another mini-session.',
        interactiveLabel: 'Classic Moment',
        backstageNote:
          'Spoiler alert: It was never actually just one doubt — and you never once hesitated to stay and explain it patiently.',
        emoji: '🙋',
      },
      {
        id: 'output',
        number: '04',
        title: 'The Great Output Moment',
        description:
          'When the code finally worked after all the confusion, and suddenly everyone felt like a professional software developer!',
        interactiveLabel: 'Victory Mode',
        backstageNote:
          'Instant celebration in the lab. One clean page render and suddenly we were ready to build the next big thing on the internet.',
        emoji: '🚀',
      },
      {
        id: 'unexpected',
        number: '05',
        title: 'The Unexpected Moments',
        description:
          'Those little funny interactions, classroom conversations and random moments that made the lectures memorable.',
        interactiveLabel: 'Unscripted Gold',
        backstageNote:
          'The best lectures are never just slides and syntax — they are the smiles, light banter, and human moments in between.',
        emoji: '✨',
      },
    ],
  },
  confidence: {
    heading: 'You Made It Easier Than We Expected.',
    pillars: [
      {
        id: 'html',
        title: 'HTML',
        subtitle: 'Understanding the structure of the web.',
        caption: '01 · Structure & Meaning',
        lessonNote: 'You showed us that every great page starts with clean, thoughtful architecture.',
      },
      {
        id: 'css',
        title: 'CSS',
        subtitle: 'Giving life and beauty to web pages.',
        caption: '02 · Visual Craft',
        lessonNote: 'Boxes, spacing, color, and balance stopped feeling random and started making sense.',
      },
      {
        id: 'js',
        title: 'JavaScript',
        subtitle: 'Making websites interactive.',
        caption: '03 · Logic & Motion',
        lessonNote: 'Static pages came alive the moment you broke down events and logic step by step.',
      },
      {
        id: 'web',
        title: 'Web Technology',
        subtitle: 'Connecting everything together.',
        caption: '04 · The Complete Picture',
        lessonNote: 'All the separate tags, styles, and scripts finally clicked into one unified craft.',
      },
    ],
    paragraphs: [
      'Honestly, Web Technology became so much easier because of you, Sir.',
      'The way you explained difficult concepts in simple language made learning enjoyable.',
      "Sometimes, a subject doesn't become easier because the subject changes. It becomes easier because the person teaching it knows exactly how to make us understand.",
      "And that's what you did.",
    ],
  },
  emotional: {
    heading: 'Some Lessons Stay Beyond the Classroom.',
    stanzas: [
      ['Dear Vardhan Sir,'],
      [
        'We might forget a few definitions.',
        'We might forget some syntax.',
        'We might even forget a few lines of code.',
      ],
      ['But we won’t forget the teacher who made learning those things easier.'],
      [
        'Thank you for your patience.',
        'Thank you for explaining things until they made sense.',
        'Thank you for the laughter in the classroom.',
        'Thank you for making difficult concepts feel simple.',
      ],
      ['You made Web Technology more than just another subject for me.'],
      ["And that's something I will genuinely remember."],
      [
        "Sometimes, the biggest impact a teacher makes isn't just what students learn, but how they feel while learning it.",
      ],
      ['Thank you for being that teacher, Sir.'],
    ],
  },
  envelope: {
    heading: 'One Last Thing, Sir...',
    buttonLabel: 'Open Your Letter 💌',
    letterSalutation: 'Dear Vardhan Sir,',
    letterParagraphs: [
      'This little website might not be a big gift, but every part of it comes with genuine appreciation.',
      'Thank you for making Web Technology so easy to understand.',
      'Thank you for every explanation, every classroom laugh, every coding moment and every lesson.',
      'I hope this website brings a smile to your face, just as your teaching brought smiles and confidence to our classroom.',
      'You truly made a difference.',
      'With respect, gratitude and a little bit of classroom nostalgia,',
    ],
    letterSignOff: 'Your student,',
    letterAuthor: 'Dhanush ❤️',
    closingHeading: 'THANK YOU, VARDHAN SIR.',
    closingSubheading: 'Some teachers become a part of our memories forever.',
  },
};
