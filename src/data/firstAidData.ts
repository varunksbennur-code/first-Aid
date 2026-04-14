export interface FirstAidTopic {
  id: string;
  title: {
    en: string;
    kn: string;
  };
  icon: string;
  instructions: {
    en: string[];
    kn: string[];
  };
  dos: {
    en: string[];
    kn: string[];
  };
  donts: {
    en: string[];
    kn: string[];
  };
}

export const firstAidData: FirstAidTopic[] = [
  {
    id: 'burns',
    title: {
      en: 'Burns',
      kn: 'ಸುಟ್ಟ ಗಾಯಗಳು',
    },
    icon: 'Flame',
    instructions: {
      en: [
        'Cool the burn under cool running water for at least 10 minutes.',
        'Remove rings or other tight items from the burned area quickly and gently.',
        'Apply a soothing lotion, such as aloe vera.',
        'Bandage the burn loosely with a sterile gauze pad.',
      ],
      kn: [
        'ಕನಿಷ್ಠ 10 ನಿಮಿಷಗಳ ಕಾಲ ತಂಪಾದ ಹರಿಯುವ ನೀರಿನ ಅಡಿಯಲ್ಲಿ ಸುಟ್ಟ ಗಾಯವನ್ನು ತಂಪಾಗಿಸಿ.',
        'ಸುಟ್ಟ ಪ್ರದೇಶದಿಂದ ಉಂಗುರಗಳು ಅಥವಾ ಇತರ ಬಿಗಿಯಾದ ವಸ್ತುಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಮತ್ತು ನಿಧಾನವಾಗಿ ತೆಗೆದುಹಾಕಿ.',
        'ಅಲೋವೆರಾದಂತಹ ಹಿತವಾದ ಲೋಷನ್ ಅನ್ನು ಅನ್ವಯಿಸಿ.',
        'ಕ್ರಿಮಿನಾಶಕ ಗಾಜ್ ಪ್ಯಾಡ್ನೊಂದಿಗೆ ಸುಟ್ಟಗಾಯವನ್ನು ಸಡಿಲವಾಗಿ ಬ್ಯಾಂಡೇಜ್ ಮಾಡಿ.',
      ],
    },
    dos: {
      en: ['Cool the burn immediately.', 'Cover with a clean, dry cloth.'],
      kn: ['ಸುಟ್ಟ ಗಾಯವನ್ನು ತಕ್ಷಣ ತಂಪಾಗಿಸಿ.', 'ಸ್ವಚ್ಛವಾದ, ಒಣ ಬಟ್ಟೆಯಿಂದ ಮುಚ್ಚಿ.'],
    },
    donts: {
      en: ['Do not apply ice directly.', 'Do not break blisters.', 'Do not apply butter or ointments.'],
      kn: ['ನೇರವಾಗಿ ಮಂಜುಗಡ್ಡೆಯನ್ನು ಹಚ್ಚಬೇಡಿ.', 'ಗುಳ್ಳೆಗಳನ್ನು ಒಡೆಯಬೇಡಿ.', 'ಬೆಣ್ಣೆ ಅಥವಾ ಮುಲಾಮುಗಳನ್ನು ಹಚ್ಚಬೇಡಿ.'],
    },
  },
  {
    id: 'cuts',
    title: {
      en: 'Cuts and Bleeding',
      kn: 'ಗಾಯಗಳು ಮತ್ತು ರಕ್ತಸ್ರಾವ',
    },
    icon: 'Droplet',
    instructions: {
      en: [
        'Wash your hands to avoid infection.',
        'Stop the bleeding by applying gentle pressure with a clean cloth.',
        'Clean the wound with water.',
        'Apply an antibiotic or petroleum jelly.',
        'Cover the wound with a bandage.',
      ],
      kn: [
        'ಸೋಂಕನ್ನು ತಪ್ಪಿಸಲು ನಿಮ್ಮ ಕೈಗಳನ್ನು ತೊಳೆಯಿರಿ.',
        'ಸ್ವಚ್ಛವಾದ ಬಟ್ಟೆಯಿಂದ ಮೃದುವಾದ ಒತ್ತಡವನ್ನು ಅನ್ವಯಿಸುವ ಮೂಲಕ ರಕ್ತಸ್ರಾವವನ್ನು ನಿಲ್ಲಿಸಿ.',
        'ಗಾಯವನ್ನು ನೀರಿನಿಂದ ಸ್ವಚ್ಛಗೊಳಿಸಿ.',
        'ಆಂಟಿಬಯೋಟಿಕ್ ಅಥವಾ ಪೆಟ್ರೋಲಿಯಂ ಜೆಲ್ಲಿಯನ್ನು ಅನ್ವಯಿಸಿ.',
        'ಗಾಯವನ್ನು ಬ್ಯಾಂಡೇಜ್ನಿಂದ ಮುಚ್ಚಿ.',
      ],
    },
    dos: {
      en: ['Elevate the injured area if possible.', 'Apply direct pressure.'],
      kn: ['ಸಾಧ್ಯವಾದರೆ ಗಾಯಗೊಂಡ ಪ್ರದೇಶವನ್ನು ಮೇಲಕ್ಕೆತ್ತಿ.', 'ನೇರ ಒತ್ತಡವನ್ನು ಅನ್ವಯಿಸಿ.'],
    },
    donts: {
      en: ['Do not remove objects impaled in the wound.', 'Do not pick at scabs.'],
      kn: ['ಗಾಯದಲ್ಲಿ ಸಿಲುಕಿರುವ ವಸ್ತುಗಳನ್ನು ತೆಗೆಯಬೇಡಿ.', 'ಗಾಯದ ಕಲೆಗಳನ್ನು ಕೆದಕಬೇಡಿ.'],
    },
  },
  {
    id: 'fractures',
    title: {
      en: 'Fractures',
      kn: 'ಮೂಳೆ ಮುರಿತಗಳು',
    },
    icon: 'Bone',
    instructions: {
      en: [
        'Stop any bleeding by applying pressure.',
        'Immobilize the injured area. Do not try to realign the bone.',
        'Apply ice packs to limit swelling.',
        'Treat for shock if the person feels faint.',
      ],
      kn: [
        'ಒತ್ತಡವನ್ನು ಅನ್ವಯಿಸುವ ಮೂಲಕ ಯಾವುದೇ ರಕ್ತಸ್ರಾವವನ್ನು ನಿಲ್ಲಿಸಿ.',
        'ಗಾಯಗೊಂಡ ಪ್ರದೇಶವನ್ನು ಅಲುಗಾಡದಂತೆ ಮಾಡಿ. ಮೂಳೆಯನ್ನು ಮರುಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಬೇಡಿ.',
        'ಊತವನ್ನು ಮಿತಿಗೊಳಿಸಲು ಐಸ್ ಪ್ಯಾಕ್ಗಳನ್ನು ಅನ್ವಯಿಸಿ.',
        'ವ್ಯಕ್ತಿಗೆ ಮೂರ್ಛೆ ಬಂದಂತೆ ಅನಿಸಿದರೆ ಆಘಾತಕ್ಕೆ ಚಿಕಿತ್ಸೆ ನೀಡಿ.',
      ],
    },
    dos: {
      en: ['Keep the limb still.', 'Support the injured area.'],
      kn: ['ಕೈಕಾಲುಗಳನ್ನು ಸ್ಥಿರವಾಗಿಡಿ.', 'ಗಾಯಗೊಂಡ ಪ್ರದೇಶವನ್ನು ಬೆಂಬಲಿಸಿ.'],
    },
    donts: {
      en: ['Do not move the person unless necessary.', 'Do not try to push the bone back.'],
      kn: ['ಅಗತ್ಯವಿಲ್ಲದಿದ್ದರೆ ವ್ಯಕ್ತಿಯನ್ನು ಚಲಿಸಬೇಡಿ.', 'ಮೂಳೆಯನ್ನು ಹಿಂದಕ್ಕೆ ತಳ್ಳಲು ಪ್ರಯತ್ನಿಸಬೇಡಿ.'],
    },
  },
  {
    id: 'heart-attack',
    title: {
      en: 'Heart Attack',
      kn: 'ಹೃದಯಾಘಾತ',
    },
    icon: 'HeartPulse',
    instructions: {
      en: [
        'Call emergency medical help immediately.',
        'Have the person sit down, rest, and try to keep calm.',
        'Loosen any tight clothing.',
        'Ask if the person takes any chest pain medication, such as nitroglycerin, and help them take it.',
        'If the person is unconscious and you are trained, begin CPR.',
      ],
      kn: [
        'ತಕ್ಷಣ ತುರ್ತು ವೈದ್ಯಕೀಯ ಸಹಾಯಕ್ಕೆ ಕರೆ ಮಾಡಿ.',
        'ವ್ಯಕ್ತಿಯನ್ನು ಕುಳಿತುಕೊಳ್ಳಲು, ವಿಶ್ರಾಂತಿ ಪಡೆಯಲು ಮತ್ತು ಶಾಂತವಾಗಿರಲು ಪ್ರಯತ್ನಿಸಿ.',
        'ಯಾವುದೇ ಬಿಗಿಯಾದ ಬಟ್ಟೆಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ.',
        'ವ್ಯಕ್ತಿಯು ನೈಟ್ರೋಗ್ಲಿಸರಿನ್‌ನಂತಹ ಯಾವುದೇ ಎದೆನೋವಿನ ಔಷಧಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತಾರೆಯೇ ಎಂದು ಕೇಳಿ ಮತ್ತು ಅದನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಅವರಿಗೆ ಸಹಾಯ ಮಾಡಿ.',
        'ವ್ಯಕ್ತಿಯು ಪ್ರಜ್ಞಾಹೀನನಾಗಿದ್ದರೆ ಮತ್ತು ನಿಮಗೆ ತರಬೇತಿ ಇದ್ದರೆ, CPR ಅನ್ನು ಪ್ರಾರಂಭಿಸಿ.',
      ],
    },
    dos: {
      en: ['Call for help immediately.', 'Keep the person calm and seated.'],
      kn: ['ತಕ್ಷಣ ಸಹಾಯಕ್ಕಾಗಿ ಕರೆ ಮಾಡಿ.', 'ವ್ಯಕ್ತಿಯನ್ನು ಶಾಂತವಾಗಿ ಮತ್ತು ಕುಳಿತುಕೊಳ್ಳುವಂತೆ ಮಾಡಿ.'],
    },
    donts: {
      en: ['Do not leave the person alone.', 'Do not wait to see if symptoms go away.'],
      kn: ['ವ್ಯಕ್ತಿಯನ್ನು ಒಂಟಿಯಾಗಿ ಬಿಡಬೇಡಿ.', 'ರೋಗಲಕ್ಷಣಗಳು ಹೋಗುತ್ತವೆಯೇ ಎಂದು ನೋಡಲು ಕಾಯಬೇಡಿ.'],
    },
  },
  {
    id: 'choking',
    title: {
      en: 'Choking',
      kn: 'ಉಸಿರುಗಟ್ಟುವಿಕೆ',
    },
    icon: 'AlertCircle',
    instructions: {
      en: [
        'Stand behind the person and wrap your arms around their waist.',
        'Make a fist with one hand and place it slightly above the person\'s navel.',
        'Grasp your fist with the other hand.',
        'Press hard into the abdomen with a quick, upward thrust (Heimlich maneuver).',
        'Repeat until the object is dislodged.',
      ],
      kn: [
        'ವ್ಯಕ್ತಿಯ ಹಿಂದೆ ನಿಂತು ಅವರ ಸೊಂಟದ ಸುತ್ತ ನಿಮ್ಮ ತೋಳುಗಳನ್ನು ಸುತ್ತಿಕೊಳ್ಳಿ.',
        'ಒಂದು ಕೈಯಿಂದ ಮುಷ್ಟಿಯನ್ನು ಮಾಡಿ ಮತ್ತು ಅದನ್ನು ವ್ಯಕ್ತಿಯ ಹೊಕ್ಕುಳಿನ ಸ್ವಲ್ಪ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಇರಿಸಿ.',
        'ನಿಮ್ಮ ಮುಷ್ಟಿಯನ್ನು ಇನ್ನೊಂದು ಕೈಯಿಂದ ಹಿಡಿಯಿರಿ.',
        'ತ್ವರಿತ, ಮೇಲ್ಮುಖವಾದ ಒತ್ತಡದೊಂದಿಗೆ (ಹೈಮ್ಲಿಕ್ ಕುಶಲತೆ) ಹೊಟ್ಟೆಯೊಳಗೆ ಗಟ್ಟಿಯಾಗಿ ಒತ್ತಿರಿ.',
        'ವಸ್ತುವು ಹೊರಬರುವವರೆಗೆ ಪುನರಾವರ್ತಿಸಿ.',
      ],
    },
    dos: {
      en: ['Encourage them to cough if they can.', 'Perform Heimlich maneuver if they cannot breathe.'],
      kn: ['ಅವರಿಗೆ ಸಾಧ್ಯವಾದರೆ ಕೆಮ್ಮಲು ಪ್ರೋತ್ಸಾಹಿಸಿ.', 'ಅವರಿಗೆ ಉಸಿರಾಡಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ ಹೈಮ್ಲಿಕ್ ಕುಶಲತೆಯನ್ನು ನಿರ್ವಹಿಸಿ.'],
    },
    donts: {
      en: ['Do not give them water.', 'Do not blindly sweep the mouth with your finger.'],
      kn: ['ಅವರಿಗೆ ನೀರು ಕೊಡಬೇಡಿ.', 'ನಿಮ್ಮ ಬೆರಳಿನಿಂದ ಕುರುಡಾಗಿ ಬಾಯಿಯನ್ನು ಗುಡಿಸಬೇಡಿ.'],
    },
  },
  {
    id: 'snake-bite',
    title: {
      en: 'Snake Bite',
      kn: 'ಹಾವು ಕಡಿತ',
    },
    icon: 'Activity',
    instructions: {
      en: [
        'Move beyond the snake\'s striking distance.',
        'Remain still and calm to help slow the spread of venom.',
        'Remove jewelry and tight clothing before swelling starts.',
        'Position yourself, if possible, so that the bite is at or below the level of your heart.',
        'Clean the wound, but don\'t flush it with water. Cover it with a clean, dry dressing.',
      ],
      kn: [
        'ಹಾವಿನ ಹೊಡೆಯುವ ಅಂತರದಿಂದ ಆಚೆಗೆ ಸರಿಸಿ.',
        'ವಿಷದ ಹರಡುವಿಕೆಯನ್ನು ನಿಧಾನಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡಲು ಸ್ಥಿರವಾಗಿ ಮತ್ತು ಶಾಂತವಾಗಿರಿ.',
        'ಊತ ಪ್ರಾರಂಭವಾಗುವ ಮೊದಲು ಆಭರಣಗಳು ಮತ್ತು ಬಿಗಿಯಾದ ಬಟ್ಟೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.',
        'ಸಾಧ್ಯವಾದರೆ, ಕಡಿತವು ನಿಮ್ಮ ಹೃದಯದ ಮಟ್ಟದಲ್ಲಿ ಅಥವಾ ಕೆಳಗಿರುವಂತೆ ನಿಮ್ಮನ್ನು ಇರಿಸಿಕೊಳ್ಳಿ.',
        'ಗಾಯವನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ, ಆದರೆ ಅದನ್ನು ನೀರಿನಿಂದ ತೊಳೆಯಬೇಡಿ. ಅದನ್ನು ಸ್ವಚ್ಛವಾದ, ಒಣ ಡ್ರೆಸ್ಸಿಂಗ್ನಿಂದ ಮುಚ್ಚಿ.',
      ],
    },
    dos: {
      en: ['Keep the bitten limb still.', 'Seek medical help immediately.'],
      kn: ['ಕಚ್ಚಿದ ಅಂಗವನ್ನು ಸ್ಥಿರವಾಗಿಡಿ.', 'ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯವನ್ನು ಪಡೆಯಿರಿ.'],
    },
    donts: {
      en: ['Do not try to suck out the venom.', 'Do not apply a tourniquet.', 'Do not apply ice.'],
      kn: ['ವಿಷವನ್ನು ಹೀರಿಕೊಳ್ಳಲು ಪ್ರಯತ್ನಿಸಬೇಡಿ.', 'ಟೂರ್ನಿಕೆಟ್ ಅನ್ನು ಅನ್ವಯಿಸಬೇಡಿ.', 'ಮಂಜುಗಡ್ಡೆಯನ್ನು ಅನ್ವಯಿಸಬೇಡಿ.'],
    },
  },
];
