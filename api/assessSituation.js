// api/assessSituation.js

import Constants from 'expo-constants';

const GEMINI_API_KEY =
  Constants.expoConfig?.extra?.geminiApiKey;

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';

const SYSTEM_PROMPT = `
You are a triage assistant inside an emergency-response app called resQ.

A person in a stressful, possibly dangerous situation has typed a short description of what is happening.

Your job:

1. Classify severity as exactly one of:
"critical", "urgent", or "moderate".

critical:
Any sign of immediate life threat such as unconsciousness, not breathing, severe bleeding, chest pain, choking, stroke signs, severe allergic reaction, drowning, or major trauma.

urgent:
Needs medical attention soon but no immediate life threat described.

moderate:
Needs care but is not time-critical based on what was described.

If the description is ambiguous or missing key details, classify UP in severity, not down.

Never minimize risk.

2. Write a short, calm, plain-language summary.

3. Give 3-6 short, prioritized first-aid steps.

Each step must be an imperative instruction that a scared, non-medical person could understand quickly.

Hard rules:

- Never diagnose a specific medical condition.
- Never suggest a specific medication, dosage, or drug.
- Never tell the user NOT to call emergency services.
- If severity is "critical" or "urgent", the first step must be to call emergency services.
- Do not invent details the user did not provide.
- If the input is not a medical/safety emergency, set severity to "moderate".
- Output ONLY valid JSON.
- No markdown.
- No code fences.
- No commentary.

Exactly this JSON shape:

{
  "severity": "critical" | "urgent" | "moderate",
  "summary": "string",
  "steps": ["string", "..."]
}
`;

function getLanguageInstruction(language) {
  if (language === 'ur') {
    return `
LANGUAGE REQUIREMENT:

Respond in simple, natural Urdu suitable for people in Pakistan.

The "summary" MUST be in Urdu.

Every item inside "steps" MUST be in Urdu.

Keep Urdu sentences SHORT.

Use simple everyday Urdu.

Avoid unnecessarily complicated medical terminology.

If a medical term is necessary, explain it simply.

Do not make the response unnecessarily long.

Each first-aid step should preferably be one short sentence.

IMPORTANT:

The JSON property names must remain exactly:

severity
summary
steps

The severity value must remain exactly:

critical
urgent
moderate

Only the human-readable content inside "summary" and "steps" should be Urdu.
`;
  }

  return `
LANGUAGE REQUIREMENT:

Respond in clear, simple English.

The "summary" and every item inside "steps" must be in English.

Keep sentences short and easy to understand.
`;
}

export async function assessSituation(
  description,
  language = 'en'
) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Missing Gemini API key. Set geminiApiKey in app.json under expo.extra.'
    );
  }

  const languageInstruction =
    getLanguageInstruction(language);

  const response = await fetch(
    `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text:
                SYSTEM_PROMPT +
                languageInstruction,
            },
          ],
        },

        contents: [
          {
            role: 'user',

            parts: [
              {
                text: description,
              },
            ],
          },
        ],

        generationConfig: {
          maxOutputTokens: 1000,

          responseMimeType:
            'application/json',

          responseSchema: {
            type: 'OBJECT',

            properties: {
              severity: {
                type: 'STRING',

                enum: [
                  'critical',
                  'urgent',
                  'moderate',
                ],
              },

              summary: {
                type: 'STRING',
              },

              steps: {
                type: 'ARRAY',

                items: {
                  type: 'STRING',
                },
              },
            },

            required: [
              'severity',
              'summary',
              'steps',
            ],
          },

          thinkingConfig: {
            thinkingLevel: 'low',
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();

    throw new Error(
      `Gemini request failed (${response.status}): ${errText}`
    );
  }

  const data = await response.json();

  const rawText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error(
      'Gemini returned no usable content.'
    );
  }

  let parsed;

  try {
    parsed = JSON.parse(rawText);
  } catch (error) {
    throw new Error(
      'Gemini response was not valid JSON: ' +
        rawText
    );
  }

  const validSeverities = [
    'critical',
    'urgent',
    'moderate',
  ];

  if (
    !validSeverities.includes(
      parsed.severity
    )
  ) {
    parsed.severity = 'urgent';
  }

  if (
    !Array.isArray(parsed.steps) ||
    parsed.steps.length === 0
  ) {
    parsed.steps =
      language === 'ur'
        ? [
            'ایمرجنسی سروس کو کال کریں اور صورتحال واضح طور پر بتائیں۔',
          ]
        : [
            'Call emergency services and describe the situation clearly.',
          ];
  }

  if (
    !parsed.summary ||
    typeof parsed.summary !== 'string'
  ) {
    parsed.summary =
      language === 'ur'
        ? 'نیچے دیے گئے اقدامات پر عمل کریں اور ضرورت پڑنے پر مدد حاصل کریں۔'
        : 'Please review the steps below and call for help if unsure.';
  }

  return parsed;
}