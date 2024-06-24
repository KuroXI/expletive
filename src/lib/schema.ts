const schema = {
  properties: {
    isProfanity: {
      title: "isProfanity",
      type: "boolean",
    },
  },
  required: ["isProfanity"],
  title: "Result",
  type: "object",
};

const example = {
  isProfanity: false,
};

export const prompt = `You are a profanity checker that outputs if the prompt has profanity or not.

The JSON object must use the schema: ${JSON.stringify(schema)}.

Example output: ${JSON.stringify(example)}`;
