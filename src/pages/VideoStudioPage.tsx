import AIWizard, { WizardConfig } from "@/components/AIWizard";
import { useI18n } from "@/lib/i18n";
import { Video } from "lucide-react";
import { generateImage, generateText } from "@/lib/ai-service";

const VideoStudioPage = () => {
  const { t, lang } = useI18n();

  const config: WizardConfig = {
    title: t("video.title"),
    subtitle: t("video.subtitle"),
    icon: <Video size={28} className="text-muted-foreground" />,
    generateLabel: lang === "he" ? "צור סרטון" : "Create Video",
    generatingLabel: lang === "he" ? "מייצר סרטון..." : "Creating video...",
    resultTitle: lang === "he" ? "הסרטון מוכן!" : "Video is ready!",
    resultType: "gallery",
    downloadLabel: lang === "he" ? "הורד תמונות סצנות" : "Download Scene Images",
    downloadFormat: "png",
    questions: [
      {
        id: "duration",
        question: lang === "he" ? "מה אורך הסרטון הרצוי?" : "What video length do you want?",
        type: "select",
        options: [
          { id: "15", label: lang === "he" ? "15 שניות" : "15 seconds", desc: lang === "he" ? "סטורי / רילס" : "Story / Reels" },
          { id: "30", label: lang === "he" ? "30 שניות" : "30 seconds", desc: lang === "he" ? "סרטון קצר" : "Short video" },
          { id: "45", label: lang === "he" ? "45 שניות" : "45 seconds", desc: lang === "he" ? "סרטון בינוני" : "Medium video" },
          { id: "60", label: lang === "he" ? "דקה" : "1 minute", desc: lang === "he" ? "סרטון מלא" : "Full video" },
        ],
      },
      {
        id: "style",
        question: lang === "he" ? "איזה סגנון סרטון?" : "What video style?",
        type: "select",
        options: [
          { id: "promo", label: lang === "he" ? "פרסומת" : "Promo" },
          { id: "tutorial", label: lang === "he" ? "הדרכה" : "Tutorial" },
          { id: "music", label: lang === "he" ? "מוזיקלי" : "Music" },
          { id: "story", label: lang === "he" ? "סיפור" : "Storytelling" },
        ],
      },
      {
        id: "businessName",
        question: lang === "he" ? "מה שם העסק שלך?" : "What's your business name?",
        type: "text",
        placeholder: lang === "he" ? "לדוגמה: סטודיו לאנה" : "Example: Studio Lana",
      },
      {
        id: "content",
        question: lang === "he" ? "טקסט או קריינות שתרצה לכלול?" : "Any text or voiceover to include?",
        type: "textarea",
        placeholder: lang === "he" ? "תאר את התוכן שתרצה בסרטון, או תן ל-AI לנסח..." : "Describe the content you want, or let AI write it...",
      },
      {
        id: "images",
        question: lang === "he" ? "רוצה להעלות תמונות לסרטון?" : "Want to upload images for the video?",
        type: "upload",
        maxUploads: 4,
      },
    ],
  };

  const handleGenerate = async (answers: Record<string, any>): Promise<string[]> => {
    const styleMap: Record<string, string> = { promo: "promotional advertisement", tutorial: "educational tutorial", music: "music video style", story: "storytelling narrative" };
    const style = styleMap[answers.style] || "promotional";
    const businessName = answers.businessName || "Business";
    const content = answers.content || "";
    const duration = answers.duration || "30";

    const numScenes = duration === "15" ? 3 : duration === "30" ? 4 : duration === "45" ? 5 : 6;
    const shortDuration = duration === "15" ? (isHe ? "15 שניות" : "15 seconds") : duration === "30" ? (isHe ? "30 שניות" : "30 seconds") : duration === "45" ? (isHe ? "45 שניות" : "45 seconds") : (isHe ? "60 שניות" : "60 seconds");

    const scriptPrompt = isHe
      ? `כתוב תסריט ויזואלי ל-${numScenes} סצנות של סרטון ${style} באורך ${shortDuration} עבור העסק "${businessName}". ${content ? `התוכן צריך לכלול: ${content}.` : ""} צור כותרת קצרה לכל סצנה ותיאור קונקרטי של המראה והאווירה.`
      : `Write a visual script for ${numScenes} scenes of a ${style} video lasting ${shortDuration} for the business "${businessName}". ${content ? `The content should include: ${content}.` : ""} Create a short title for each scene and a concrete description of the look and atmosphere.`;

    const scriptText = await generateText(scriptPrompt, isHe
      ? "אתה במאי יצירתי ללקוחות פרימיום. תן תסריט יוקרתי, ברור וממוקד, שמתאים לשוק העסקי הישראלי."
      : "You are a premium creative director. Provide a luxurious, clear, and business-focused video script for modern entrepreneurs."
    );

    const sceneDescriptions = [
      `Opening scene: ${businessName} introduction in a premium ${style} style. Use cinematic lighting, refined composition, and a polished vertical 9:16 layout. ${content ? `Include the message: ${content}.` : ""} ${scriptText}`,
      `Middle scene: Showcase the core offer of ${businessName} in an elegant promotional frame. Vertical 9:16, premium branding, soft shadows, and crisp detail. ${content ? `Reference: ${content}.` : ""}`,
      `Highlight scene: A strong benefit-focused moment for ${businessName}, with bold typography and sophisticated color contrast. Professional luxury aesthetic, vertical format.`,
      `Closing scene: Call to action and brand signature for ${businessName}. Elegant layout with space for contact or logo. Cinematic finish and premium visual polish.`,
    ];

    const scenePromises = sceneDescriptions.slice(0, Math.min(numScenes, sceneDescriptions.length)).map(desc => generateImage(`${desc} Render in ultra-high resolution, contemporary premium style, 8K quality, polished finish.`));

    const results = await Promise.allSettled(scenePromises);
    const images = results
      .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
      .map(r => r.value);

    if (images.length === 0) throw new Error("Failed to generate video scenes");
    return images;
  };

  return <AIWizard config={config} onGenerate={handleGenerate} mockDelay={3000} />;
};

export default VideoStudioPage;
