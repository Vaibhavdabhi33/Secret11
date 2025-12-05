
// OFFLINE AI SIMULATION SERVICE
// This replaces the live Gemini API to allow the app to run on static hosting without API keys.

// Helper to convert file to base64 (still useful for previewing, though not sent to API)
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// MOCK SKIN ANALYSIS ENGINE
export const analyzeSkinImage = async (base64Image: string, mimeType: string): Promise<string> => {
  // Simulate network delay for realism (2.5 seconds)
  await new Promise(resolve => setTimeout(resolve, 2500));

  // Generate randomized but realistic skin metrics
  const randomScore = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const overallScore = randomScore(72, 94);
  const skinAge = randomScore(20, 35);
  
  const types = ["Combination", "Oily", "Dry", "Normal"];
  const skinType = types[Math.floor(Math.random() * types.length)];

  // Create a realistic JSON response simulating the AI output
  const mockResponse = {
    overallScore: overallScore,
    skinAge: skinAge,
    skinType: skinType,
    summary: `Based on the visual analysis, your skin barrier appears ${overallScore > 80 ? 'resilient' : 'moderate'} with some localized areas of concern. We detected ${skinType.toLowerCase()} tendencies in the T-zone and minor textural irregularities consistent with environmental exposure.`,
    metrics: {
      hydration: randomScore(50, 90),
      oiliness: skinType === "Oily" ? randomScore(70, 95) : randomScore(30, 60),
      texture: randomScore(60, 85),
      pigmentation: randomScore(20, 50),
      acne: randomScore(10, 40)
    },
    topConcerns: [
      { name: skinType === "Oily" ? "Excess Sebum" : "Dehydration", severity: "Moderate" },
      { name: "Uneven Tone", severity: "Mild" }
    ],
    routine: {
      morning: [
        "Gentle pH-Balanced Cleanser", 
        "Niacinamide 10% Serum", 
        "SPF 50 Matte Sunscreen"
      ],
      evening: [
        "Double Cleanse (Oil + Foam)", 
        "Hyaluronic Acid Serum", 
        skinType === "Oily" ? "Lightweight Gel Moisturizer" : "Ceramide Rich Cream"
      ]
    },
    keyIngredients: [
      "Niacinamide (Vitamin B3)",
      skinType === "Dry" ? "Ceramides" : "Salicylic Acid",
      "Hyaluronic Acid"
    ]
  };

  return JSON.stringify(mockResponse);
};

// MOCK CHATBOT ENGINE
export const chatWithSkincareBot = async (message: string, history: any[]): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMsg = message.toLowerCase();

    // Simple keyword matching logic to simulate AI understanding
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
        return "Namaste! I am your Secret11 AI Assistant. How can I help you achieve your skincare goals today?";
    }
    
    if (lowerMsg.includes("acne") || lowerMsg.includes("pimple") || lowerMsg.includes("breakout")) {
        return "For acne concerns, I highly recommend our Niacinamide 10% Serum combined with the Anti-Acne Kit. They work together to regulate sebum and unclog pores without drying out your skin.";
    }

    if (lowerMsg.includes("dry") || lowerMsg.includes("hydration") || lowerMsg.includes("flake")) {
        return "It sounds like your skin barrier needs some love! Hydration is key. Look for products with Hyaluronic Acid and Ceramides to lock in moisture. Avoid harsh cleansers.";
    }

    if (lowerMsg.includes("oil") || lowerMsg.includes("greas")) {
        return "Excess oil can be managed effectively with Niacinamide. It helps regulate oil production over time. Our SPF 50 Matte Sunscreen is also perfect as it doesn't leave a greasy finish.";
    }

    if (lowerMsg.includes("sun") || lowerMsg.includes("spf") || lowerMsg.includes("tan")) {
        return "Sun protection is the most important step! Our SPF 50 Matte Sunscreen offers broad-spectrum PA++++ protection, specifically formulated for the intense Indian sun.";
    }

    if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("how much")) {
        return "We believe in affordable luxury. Our serums start at ₹599 and our complete kits offer great value. You can check the latest prices in the Shop section.";
    }

    if (lowerMsg.includes("ingredient") || lowerMsg.includes("contain")) {
        return "We are an ingredient-first brand. All our products are transparently labeled, free from harmful parabens, and BIS/CDSCO approved.";
    }

    // Default Fallback
    return "That's a great question! Based on our ingredient-first philosophy, I'd recommend browsing our Collection for targeted solutions, or try our Free AI Skin Scan for a fully personalized routine.";
};
