import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"

// Aray-Scan™ powered by Google Gemini 1.5 Flash
export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'File is required' }, { status: 400 })
        }

        // Check for API Key
        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            // Fallback to mock if no key provided (for demo/testing without key)
            console.warn("GEMINI_API_KEY missing, using mock data.")
            await new Promise(resolve => setTimeout(resolve, 1500))
            return NextResponse.json({
                success: true,
                data: {
                    title: "Mock: " + file.name,
                    description: "This is a mock description because GEMINI_API_KEY is missing in .env.local. Please add it to unlock real AI powers.",
                    suggested_price: 19.99,
                    tags: ["mock", "ai", "demo"],
                    category: "digital_asset"
                }
            })
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        // Convert file to base64
        const arrayBuffer = await file.arrayBuffer()
        const base64Data = Buffer.from(arrayBuffer).toString("base64")
        const mimeType = file.type || "image/png" // Default fallback

        // Prompt for Gemini
        const prompt = `
    You are an expert digital product analyzer for an e-commerce platform called Aray.
    Analyze the attached file (image or preview) and generate metadata for selling it.
    
    Return ONLY a JSON object with this structure (no markdown, no code blocks):
    {
      "title": "A catchy, professional title for this product",
      "description": "A compelling, SEO-friendly marketing description (approx 2 sentences).",
      "suggested_price": 25.00 (a number representing a logical price in USD based on quality),
      "tags": ["tag1", "tag2", "tag3"],
      "category": "software" | "digital_asset" | "course"
    }
    `

        // Generate content
        // Note: detailed parts or inlineData depending on file type (simpler for images)
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType
                }
            }
        ])

        const response = await result.response
        const text = response.text()

        // Clean up response (Gemini sometimes adds markdown code blocks)
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim()
        const analysis = JSON.parse(cleanedText)

        return NextResponse.json({
            success: true,
            data: analysis
        })

    } catch (error) {
        console.error('Analysis failed:', error)
        return NextResponse.json({ error: 'AI Analysis Failed' }, { status: 500 })
    }
}
